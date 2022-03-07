import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { sampleData } from 'src/app/mock/assignment_sample';

@Injectable({
  providedIn: 'root',
})
export class PaginationService {
  totalPages = 0;
  pageNoChanged: Subject<number> = new Subject<number>();

  constructor() {}

  /**
   * @description Calculate pages needed to display course list
   * @returns Total number of pages
   */
  getTotalPages() {
    this.totalPages = sampleData.length / 4;
    if (sampleData.length % 4 !== 0) {
      this.totalPages = this.totalPages + 1;
    }
    return this.totalPages;
  }
}
