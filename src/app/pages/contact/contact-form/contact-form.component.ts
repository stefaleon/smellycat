import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, debounceTime } from 'rxjs';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css'],
})
export class ContactFormComponent implements OnInit {
  contactForm!: FormGroup;
  private contactFormValueChanges$ = new Subject<any>();

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    let mySessionDataString = sessionStorage.getItem('contact-data');

    console.log(mySessionDataString);

    if (mySessionDataString) {
      this.contactForm = this.formBuilder.group(
        JSON.parse(mySessionDataString)
      );
    } else {
      this.contactForm = this.formBuilder.group({
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        city: ['', Validators.required],
        postalCode: ['', Validators.required],
        address: ['', Validators.required],
        message: [''],
        termsAndConditions: [false, Validators.requiredTrue],
      });
    }
    
    this.contactForm.valueChanges
      .pipe(debounceTime(500))
      .subscribe((formData) => {
        this.contactFormValueChanges$.next(formData);
      });
    
    this.contactFormValueChanges$.subscribe((formData) => {
      sessionStorage.setItem('contact-data', JSON.stringify(formData));
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      // Process the form data here
      console.log(this.contactForm.value);
      // Clear form
    }
  }
}
