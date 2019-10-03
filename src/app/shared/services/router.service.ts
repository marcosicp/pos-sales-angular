import { Injectable } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  constructor(
    private router: Router
  ) {

  }

  navigate(data: any, route: string) {
    const navigationExtras: NavigationExtras = {
      queryParams: { data: JSON.stringify(data)}
    };

  this.router.navigate([route], navigationExtras);
  }
}
