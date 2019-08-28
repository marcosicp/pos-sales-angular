import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  public showLoading = false;

  toggleLoading(): void {
    this.showLoading = !this.showLoading;
  }
}
