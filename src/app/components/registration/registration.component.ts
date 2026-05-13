
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserserviceService } from '../../Services/userservice.service';
import { StateserviceService } from '../../Services/stateservice.service';
import { CityserviceService } from '../../Services/cityservice.service';  
import { HttpClientModule } from '@angular/common/http';

import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [ReactiveFormsModule,HttpClientModule, FormsModule,CommonModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent  implements OnInit {
  
   registrationForm!: FormGroup;

  states: any[] = [];
  cities: any[] = [];

  hobbiesList: string[] = [];

  constructor(
    private fb: FormBuilder,
    private userService: UserserviceService,
    private stateService: StateserviceService,
    private cityService: CityserviceService,
    private router: Router
  ) {}
 ngOnInit(): void {

    this.registrationForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(25)]],
      gender: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      email: ['', Validators.email],
      contactNo: ['', Validators.required],
      stateId: ['', Validators.required],
      cityId: ['', Validators.required],
      hobbies: [''],
      photoPath: [''],
      isTermsAccepted: [false, Validators.requiredTrue]
    });

     this.loadStates();
  }

  loadStates() {

    this.stateService.getStates()
      .subscribe(response => {
        this.states = response;
      });
  }

   onStateChange(event: any) {

    const stateId = event.target.value;

    this.cityService.getCitiesByState(stateId)
      .subscribe(response => {
        this.cities = response;
      });
  }
   
   onHobbyChange(event: any) {

    if (event.target.checked) {
      this.hobbiesList.push(event.target.value);
    }
    else {
      this.hobbiesList = this.hobbiesList.filter(x => x != event.target.value);
    }

    this.registrationForm.patchValue({
      hobbies: this.hobbiesList.join(',')
    });
  }

  onFileChange(event: any) {

    const file = event.target.files[0];

    if (file) {

      const extension = file.name.split('.').pop().toLowerCase();

      if (extension !== 'jpg' && extension !== 'png' && extension !== 'jpeg') {
        alert('Only jpg and png allowed');
        return;
      }

      this.registrationForm.patchValue({
        photoPath: file.name
      });
    }
  }
  onSubmit() {
     debugger;
    if (this.registrationForm.invalid) {
      this.registrationForm.markAllAsTouched();
      return;
    }

    this.userService.createUser(this.registrationForm.value)
      .subscribe({
        next: () => {
          alert('User Registered Successfully');
          this.router.navigate(['/users']);
        },
        error: () => {
          alert('Something went wrong');
        }
      });
  }

}
