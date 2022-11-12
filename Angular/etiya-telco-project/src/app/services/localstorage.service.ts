import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalstorageService {
  constructor() {}

  getItem(key: string) {
    return localStorage.getItem(key);
  }

  setItem(key: string, item: any) {
    localStorage.setItem(key, item);
  }

  deleteItem(key: string) {
    localStorage.removeItem(key);
  }
}
