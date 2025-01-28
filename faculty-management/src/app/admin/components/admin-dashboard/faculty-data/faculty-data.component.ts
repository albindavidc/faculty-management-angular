import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Faculty } from '../../../../model/faculty';
import { CommonModule } from '@angular/common';
import { AdminDataService } from '../../../service/admin-data.service';

@Component({
  selector: 'app-faculty-data',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './faculty-data.component.html',
  styleUrl: './faculty-data.component.css',
})
export class FacultyDataComponent implements OnInit {
  facultyDetailsForm = new FormGroup({
    _id: new FormControl(),
    faculty_name: new FormControl(),
    department: new FormControl(),
    email: new FormControl(),
    password: new FormControl(),
    joining_year: new FormControl(),
    date_of_birth: new FormControl(),
    mobile_number: new FormControl(),
    aadhaar_number: new FormControl(),
  });

  facultyObj: Faculty = {
    _id: '',
    faculty_number: 0,
    faculty_name: '',
    department: '',
    joining_year: 0,
    date_of_birth: '',
    mobile_number: 0,
    aadhaar_number: 0,
    email: '',
    password: '',
  };

  allFaculties: Faculty[] = [];

  constructor(private fb: FormBuilder, private dataService: AdminDataService) {}

  ngOnInit(): void {
    this.facultyDetailsForm = this.fb.group({
      _id: ['', [Validators.required]],
      faculty_name: ['', [Validators.required]],
      department: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [Validators.required],
        Validators.minLength(10),
        Validators.maxLength(10),
      ],
      joining_year: ['', [Validators.required]],
      date_of_birth: ['', [Validators.required]],
      mobile_number: ['', [Validators.required, Validators.minLength(6)]],
      aadhaar_number: ['', [Validators.required]],
    });
    this.allFaculties = [];
  }

  addNewFaculty() {
    this.facultyObj.faculty_name = this.facultyDetailsForm.value.faculty_name;
    this.facultyObj.department = this.facultyDetailsForm.value.department;
    this.facultyObj.email = this.facultyDetailsForm.value.email;
    this.facultyObj.password = this.facultyDetailsForm.value.password;
    this.facultyObj.joining_year = this.facultyDetailsForm.value.joining_year;
    this.facultyObj.date_of_birth = this.facultyDetailsForm.value.date_of_birth;
    this.facultyObj.mobile_number = this.facultyDetailsForm.value.mobile_number;
    this.facultyObj.aadhaar_number =
      this.facultyDetailsForm.value.aadhaar_number;
    this.facultyObj.faculty_number = this.getFacultiesData();

    this.dataService.addFaculty(this.facultyObj).subscribe(
      (res) => {
        console.log('Successfully added form to the backend');
        this.ngOnInit();
      },
      (err) => {
        console.log('There was an error adding form data to the backend');
      }
    );
  }

  getFacultiesData(): number {
    if (this.allFaculties.length === 0) {
      return 1;
    }
    return this.allFaculties.length + 1;
  }
}
