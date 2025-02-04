import { Component, OnInit } from '@angular/core';
import { FacultyDataComponent } from './faculty-data/faculty-data.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AdminProfileComponent } from '../admin-profile/admin-profile.component';

@Component({
  selector: 'app-admin-dashboard',
  imports: [FacultyDataComponent, CommonModule, AdminProfileComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css',
})
export class AdminDashboardComponent implements OnInit {
  profile: boolean = false;
  faculty: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.showFacultyData();
  }

  setOff(): void {
    this.profile = false;
    this.faculty = false;
  }

  showFacultyData() {
    this.setOff();
    this.faculty = true;
  }

  showProfileData() {
    this.setOff();
    this.profile = true;
  }

  signOut() {
    localStorage.removeItem('token');
    this.router.navigate(['']);
  }
}
