import { ActivatedRoute, Router } from '@angular/router';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  faEye,
  faGears,
  faUser,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  templateUrl: './new-customer.component.html',
  styleUrls: ['./new-customer.component.css'],
})
export class NewCustomerComponent implements OnInit {
  @ViewChild('userCircleEl') userCircleEl!: ElementRef;
  @ViewChild('lineEl1') lineEl1!: ElementRef;
  @ViewChild('servicesCircleEl') servicesCircleEl!: ElementRef;
  @ViewChild('lineEl2') lineEl2!: ElementRef;
  @ViewChild('overviewCircleEl') overviewCircleEl!: ElementRef;
  userIcon: IconDefinition = faUser;
  servicesIcon: IconDefinition = faGears;
  overviewIcon: IconDefinition = faEye;
  isCustomerInfoFormCompleted: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router) {}
  url: string = '/homepage/newcustomer';

  ngOnInit(): void {
    //* FORM TASARIMINDA YER ALAN VE PROGRESI GOSTEREN YAPININ
    //* DUZGUN CALISMASI ICIN URL'E GORE CLASS EKLENMESI VEYA CIKARILMASI ISLEMLERI
    this.route.url.subscribe(() => {
      if (this.userCircleEl !== undefined) {
        if (this.router.url === `${this.url}/info`) {
          this.userCircleEl.nativeElement.classList.remove('completed');
          this.lineEl1.nativeElement.classList.remove('completed');
          this.servicesCircleEl.nativeElement.classList.remove('active');
        }
        if (this.router.url === `${this.url}/services`) {
          this.userCircleEl.nativeElement.classList.add('completed');
          this.lineEl1.nativeElement.classList.add('completed');
          this.servicesCircleEl.nativeElement.classList.add('active');

          this.servicesCircleEl.nativeElement.classList.remove('completed');
          this.lineEl2.nativeElement.classList.remove('completed');
          this.overviewCircleEl.nativeElement.classList.remove('active');
        }
        if (this.router.url === `${this.url}/overview`) {
          this.servicesCircleEl.nativeElement.classList.add('completed');
          this.lineEl2.nativeElement.classList.add('completed');
          this.overviewCircleEl.nativeElement.classList.add('active');
        }
      }
    });
  }
}
