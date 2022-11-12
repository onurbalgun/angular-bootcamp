import { AuthService } from 'src/app/services/auth.service';
import { Component, ElementRef, Input, OnInit } from '@angular/core';
import {
  IconDefinition,
  faRightFromBracket,
  faGears,
  faUsers,
  faUser,
  faGear,
} from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  @Input() isActive: boolean = false;
  logoutIcon: IconDefinition = faRightFromBracket;
  servicesIcon: IconDefinition = faGears;
  customersIcon: IconDefinition = faUsers;
  profileIcon: IconDefinition = faUser;
  settingsIcon: IconDefinition = faGear;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  logout() {
    this.authService.logout();
  }

  onLogo() {
    this.router.navigate(['homepage', 'services']);
  }

  onNavClick() {
    this.isActive = false;
  }
}
