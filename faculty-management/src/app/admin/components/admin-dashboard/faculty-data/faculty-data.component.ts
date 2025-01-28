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
  facultyDetailsForm: FormGroup = new FormGroup({});

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

  constructor(private fb: FormBuilder, private dataService: AdminDataService) {
    // Move form initialization here
    this.initForm();
  }

  private initForm(): void {
    this.facultyDetailsForm = this.fb.group({
      _id: [''], // Remove required validator since it's likely auto-generated
      faculty_name: ['', [Validators.required]],
      department: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(9),
          Validators.maxLength(11),
        ],
      ],
      joining_year: [
        '',
        [
          Validators.required,
          Validators.min(1900), // Add reasonable year validation
          Validators.max(new Date().getFullYear()),
        ],
      ],
      date_of_birth: ['', [Validators.required]],
      mobile_number: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]{10}$'), // Use pattern instead of minLength for phone numbers
        ],
      ],
      aadhaar_number: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]{12}$'), // Aadhaar is typically 12 digits
        ],
      ],
    });

    // Add this to debug form validation
    this.facultyDetailsForm.statusChanges.subscribe((status) => {
      console.log('Form Status:', status);
      console.log('Form Errors:', this.getFormValidationErrors());
    });
  }

  ngOnInit(): void {
    this.allFaculties = [];
    this.getAllEmployees();
  }

  addNewFaculty() {
    if (this.facultyDetailsForm.valid) {
      console.log('Form is valid, preparing submission...');

      const formValue = this.facultyDetailsForm.value;
      const facultyData: Faculty = {
        _id: '',
        faculty_number: this.getFacultiesData(),
        faculty_name: formValue.faculty_name,
        department: formValue.department,
        email: formValue.email,
        password: formValue.password,
        joining_year: Number(formValue.joining_year),
        date_of_birth: formValue.date_of_birth,
        mobile_number: Number(formValue.mobile_number),
        aadhaar_number: Number(formValue.aadhaar_number),
      };

      console.log('Submitting faculty data:', facultyData);

      this.dataService.addFaculty(facultyData).subscribe({
        next: (response) => {
          console.log('Successfully added faculty:', response);
          this.facultyDetailsForm.reset();
          alert('Faculty added successfully!');
          this.getAllEmployees();
        },
        error: (error) => {
          console.error('Error details:', error);
          alert(`Failed to add faculty: ${error.message}`);
        },
      });
    } else {
      console.log('Form validation errors:', this.getFormValidationErrors());
      alert('Please fill all required fields correctly.');
    }
  }

  // Helper method to debug validation errors
  getFormValidationErrors(): string[] {
    const errors: string[] = [];
    Object.keys(this.facultyDetailsForm.controls).forEach((key) => {
      const control = this.facultyDetailsForm.get(key);
      if (control?.errors) {
        Object.keys(control.errors).forEach((errorKey) => {
          errors.push(`${key}: ${errorKey}`);
        });
      }
    });
    return errors;
  }

  getFacultiesData(): number {
    if (this.allFaculties.length === 0) {
      return 1;
    }
    return this.allFaculties.length + 1;
  }

  getAllEmployees() {
    this.dataService.getAllFaculty().subscribe(
      (res) => {
        console.log(res);
        this.allFaculties = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
