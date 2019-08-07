import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  public _loading = false;

  setLoading(): void {
    console.warn(this._loading);
    this._loading = !this._loading;
    console.warn(this._loading);
  }
}
