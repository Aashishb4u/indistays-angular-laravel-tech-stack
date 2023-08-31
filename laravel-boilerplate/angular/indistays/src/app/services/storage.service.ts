import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() {}

  async storeValue(storageKey: string, value: any) {
    // const encryptedValue = btoa(escape(JSON.stringify(value)));
    localStorage.setItem(storageKey, value);
  }

  async getStoredValue(storageKey: string) {
    return new Promise(resolve => {
      const value = localStorage.getItem(storageKey);
      if (value) {
        resolve(value);
      } else {
        resolve(false);
      }
    });
  }

  async removeStoredItem(storageKey: string) {
    localStorage.removeItem(storageKey);
  }

  getStorageValue(storageKey: any) {
    let storedVal = null;
    storedVal = localStorage.getItem(storageKey);
    return storedVal ? (storedVal) : null;
  }

  async storeEncryptedValue(storageKey: string, value: any) {
    const encryptedValue = btoa(escape(JSON.stringify(value)));
    localStorage.setItem(storageKey, encryptedValue);
  }

  getEncryptedStorageValue(storageKey: any) {
    const storedVal = localStorage.getItem(storageKey);
    return storedVal ? (JSON.parse(unescape(atob(storedVal)))) : null;
  }

}
