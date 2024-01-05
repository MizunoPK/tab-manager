import { WindowData } from "./model/WindowData.model"

export interface LocalStorage {
  options?: LocalStorageOptions,
  activeSession?: WindowData[]
}

export interface LocalStorageOptions {

}

export type LocalStorageKeys = keyof LocalStorage

export function setStoredOptions(options: LocalStorageOptions): Promise<void> {
  const vals: LocalStorage = {
    options,
  }
  return new Promise((resolve) => {
    chrome.storage.local.set(vals, () => {
      resolve()
    })
  })
}

export function getStoredOptions(): Promise<LocalStorageOptions> {
  const keys: LocalStorageKeys[] = ['options']
  return new Promise((resolve) => {
    chrome.storage.local.get(keys, (res: LocalStorage) => {
      resolve(res.options)
    })
  })
}

export function setStoredActiveSession(activeSession: WindowData[]): Promise<void> {
  console.log("STORAGE: Saving active session...", activeSession)
  const vals: LocalStorage = {
    activeSession,
  }
  return new Promise((resolve) => {
    chrome.storage.local.set(vals, () => {
      resolve()
    })
  })
}

export function getStoredActiveSession(): Promise<WindowData[]> {
  const keys: LocalStorageKeys[] = ['activeSession']
  return new Promise((resolve) => {
    chrome.storage.local.get(keys, (res: LocalStorage) => {
      console.log("STORAGE: Got active session...", res.activeSession)
      resolve(res.activeSession ?? [])
    })
  })
}
