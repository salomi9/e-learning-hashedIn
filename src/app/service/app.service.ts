import { Injectable } from '@angular/core';
import { forkJoin, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor() {}

  public saveSampleDataInStorage(sampleData: any) {
    localStorage.setItem('SAMPLE_DATA', JSON.stringify(sampleData));
  }

  public getSampleData() {
    return localStorage.getItem('SAMPLE_DATA');
  }

  public toggleWishlist(id: string) {
    const sampleData1: any = this.getSampleData();
    const sampleData = JSON.parse(sampleData1);
    sampleData.forEach((el: { id: string; wishlisted: boolean }) => {
      if (el.id == id) {
        el.wishlisted = !el.wishlisted;
      }
    });
    return localStorage.setItem('SAMPLE_DATA', JSON.stringify(sampleData));
  }

  public toggleShoppingCart(id: string) {
    const sampleData1: any = this.getSampleData();
    const sampleData = JSON.parse(sampleData1);
    sampleData.forEach((el: { id: string; addedToCart: boolean }) => {
      if (el.id == id) {
        el.addedToCart = !el.addedToCart;
      }
    });
    return localStorage.setItem('SAMPLE_DATA', JSON.stringify(sampleData));
  }
}
