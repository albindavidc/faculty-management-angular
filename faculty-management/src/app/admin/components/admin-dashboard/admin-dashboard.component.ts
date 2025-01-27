import { Component, OnInit } from '@angular/core';
import { FacultyDataComponent } from './faculty-data/faculty-data.component';
import { FacultyTrainingsComponent } from './faculty-trainings/faculty-trainings.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  imports: [FacultyDataComponent, FacultyTrainingsComponent, CommonModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css',
})
export class AdminDashboardComponent implements OnInit {
  training: boolean = false;
  faculty: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.showFacultyData();
  }

  setOff(): void {
    this.training = false;
    this.faculty = false;
  }

  showFacultyData() {
    this.setOff();
    this.faculty = true;
  }

  showTrainingData() {
    this.setOff();
    this.training = true;
  }

  signOut() {
    localStorage.removeItem('token');
    this.router.navigate(['']);
  }
}
