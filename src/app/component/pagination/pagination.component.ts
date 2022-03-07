import { Component, OnInit } from '@angular/core';
import { PaginationService } from 'src/app/service/pagination/pagination.service';
import * as _ from 'lodash';
@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
})
export class PaginationComponent implements OnInit {
  viewMode = 0;
  totalPages = 0;
  range: number[] = [];
  constructor(private paginationService: PaginationService) {}

  ngOnInit(): void {
    this.getTotalPages();
    this.range = _.range(1, this.totalPages);
  }

  selectColorAndSendNo(index: any) {
    this.viewMode = index;
    this.paginationService.pageNoChanged.next(index + 1);
  }

  getTotalPages() {
    this.totalPages = this.paginationService.getTotalPages();
  }
}
