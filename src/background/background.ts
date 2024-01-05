import { TabData } from "../utils/model/TabData.model"
import { WindowData } from "../utils/model/WindowData.model"
import { getStoredActiveSession, setStoredActiveSession, setStoredOptions } from "../utils/storage"

// TODO: background script
chrome.runtime.onInstalled.addListener(() => {
  // TODO: on installed function
  // set up storage
  setStoredActiveSession([])
  setStoredOptions({})

  // save info on the open tabs
  chrome.tabs.query({}, (tabs) => {
    const windows : WindowData[] = []

    // Loop through all the open tabs
    tabs.forEach((tab) => {
      const foundWindow = windows.find(window => window.id === tab.windowId)
      const tabData : TabData = {
        id: tab.id,
        lastAccessed: new Date(),
        creationTime: new Date()
      } 

      // Just add to the existing window if it's been seen already
      // Or make a new window if it hasn't been seen yet
      if ( foundWindow !== undefined )
        foundWindow.tabs.push(tabData)
      else {
        windows.push({
          id: tab.windowId,
          creationTime: new Date(),
          tabs: [tabData]
        })
      }
    })

    // Save the data
    setStoredActiveSession(windows)

  })
})

// Detect when a new tab is created
chrome.tabs.onCreated.addListener((tab) => {
  // store info about the new tab
  // save info on creation time and last access
  console.log("New tab:", tab)

  const tabData : TabData = {
    id: tab.id,
    lastAccessed: new Date(),
    creationTime: new Date()
  }

  getStoredActiveSession().then((session) => {
    const tabWindow = session.find(window => window.id === tab.windowId)
    // if the tab is in a window we are already aware of, then just add to the tab data
    if (tabWindow !== undefined) {
      tabWindow.tabs.push(tabData)
    }
    // Otherwise, make a new window and add the tab to it
    else {
      session.push({
        id: tab.windowId,
        creationTime: new Date(),
        tabs: [tabData]
      })
    }

    // Save
    setStoredActiveSession(session)
  })
})

// Detect when an active tab changes
chrome.tabs.onActivated.addListener((activeInfo) => {
  const activeTabId = activeInfo.tabId
  const activeWindowId = activeInfo.windowId
  console.log("Active Tab Changed. New Tab:", activeTabId)
  getStoredActiveSession().then((session) => {
    const window = session.find(window => window.id === activeWindowId)
    if ( window !== undefined ) {
      const tab = window.tabs.find(tab => tab.id === activeTabId)
      if ( tab !== undefined ) {
        tab.lastAccessed = new Date()
        setStoredActiveSession(session)
      }
    }
  })
})

// Detect when a tab closes
chrome.tabs.onRemoved.addListener((tabId, removeInfo) => {
  console.log("Tab closed:", tabId);
  const windowId = removeInfo.windowId
  
  // Remove the tab from the data
  getStoredActiveSession().then((session) => {
    // Find the window
    for ( let i=0; i < session.length; i++ ) {
      if ( session[i].id === windowId ) {
        // Find the tab
        for ( let j=0; j < session[i].tabs.length; j++ ) {
          if ( session[i].tabs[j].id === tabId ) {
            // Remove the tab from the window data
            session[i].tabs.splice(j, 1)
            break
          }
        }

        // Remove the window from the data if there are no more tabs
        if ( session[i].tabs.length === 0 ) {
          session.splice(i, 1)
        }
        break
      }
    }

    // Save
    setStoredActiveSession(session)
  })
});

// Detect when a window opens
// If this is the only window open, make sure the storage is clear of any previous sessions
// chrome.windows.onCreated.addListener((window) => {
//   getStoredActiveSession().then((session) => {
//     chrome.windows.getAll({}, (openWindows) => {

//     })
//   })
// })

// Detect when a window closes
// remove the window from the session
chrome.windows.onRemoved.addListener((windowId) => {
  // remove the window from the session
  getStoredActiveSession().then(session => {
    const idx = session.findIndex(window => window.id === windowId)
    if (idx !== -1) {
      session.splice(idx, 1)
      setStoredActiveSession(session)
    }
  })
})