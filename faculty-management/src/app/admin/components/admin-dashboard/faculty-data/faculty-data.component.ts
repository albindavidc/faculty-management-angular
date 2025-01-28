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


  facultyObj:Faculty = {
    _id: '',
    faculty_number: 0,
    faculty_name: '',
    department: '',
    joining_year: 0,
    date_of_birth: '',
    mobile_number: 0,
    aadhaar_number: 0,
    email: '',
    password: ''
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.facultyDetailsForm = this.fb.group({
      _id: ['', [Validators.required]],
      faculty_name: ['', [Validators.required]],
      department: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required], Validators.minLength(10), Validators.maxLength(10)],
      joining_year: ['', [Validators.required]],
      date_of_birth: ['', [Validators.required]],
      mobile_number: ['', [Validators.required, Validators.minLength(6)]],
      aadhaar_number: ['', [Validators.required]],
    })
  }

  addNewFaculty() {}
}
