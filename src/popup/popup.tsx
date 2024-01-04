import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import './popup.css'
import { Grid, ThemeProvider } from '@mui/material'
import Sort from './sort/sort.component'
import Search from './search/search.component'
import Session from './session/session.component'
import { theme } from '../utils/materialTheme'

// NOTE: In this file "tab" refers to the tabs within the popup (sort, search, & session)
enum TAB {
  SORT, SEARCH, SESSION
}

// Main Popup for the extension
// Where users can use the sort, search, & session functionality
const App: React.FC<{}> = () => {
  const [activeTab, setActiveTab] = useState(TAB.SORT)

  // Check if the given tab is active and return the corresponding css class
  const getCSS = (tabType : TAB) => {
    return `controlTab ${tabType === activeTab ? 'activeTab' : ''}`
  }

  // Get the tab content based on what tab was selected
  const getTabContent = () => {
    switch(activeTab) {
      case TAB.SORT:
        return <Sort />
      case TAB.SEARCH:
        return <Search />
      default:
        return <Session />
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <div className='w-96 h-96'>
        {/* Tabs */}
        <Grid container justifyContent='center' alignItems='center' className='my-3 text-center'>
          <Grid item xs={4}>
            <div 
                className={getCSS(TAB.SORT)} 
                onClick={() => {setActiveTab(TAB.SORT)}}>
              Sort
            </div>
          </Grid>
          <Grid item xs={4}>
            <div 
                className={getCSS(TAB.SEARCH)} 
                onClick={() => {setActiveTab(TAB.SEARCH)}}>
              Search
            </div>
          </Grid>
          <Grid item xs={4}>
            <div 
                className={getCSS(TAB.SESSION)} 
                onClick={() => {setActiveTab(TAB.SESSION)}}>
              Session
            </div>
          </Grid>
        </Grid>

        <hr />

        {/* Tab Content */}
        <div className='m-3'>
          {getTabContent()}
        </div>

      </div>
    </ThemeProvider>
  )
}

const root = document.createElement('div')
document.body.appendChild(root)
ReactDOM.render(<App />, root)
