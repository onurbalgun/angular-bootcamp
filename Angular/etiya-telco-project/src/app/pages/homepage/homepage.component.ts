import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  sideBarStatus: boolean = false;

  onStatusChange(val: boolean) {
    this.sideBarStatus = val;
  }
}
