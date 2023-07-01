import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, debounceTime } from 'rxjs';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';
import keys from 'keys';

const { EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, EMAILJS_PUBLIC_KEY } = keys;

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
 
  onSubmit(event: Event) {
    event.preventDefault();
    if (this.contactForm.valid) {
      const formData = {
        name: this.contactForm.get('name')?.value,
        email: this.contactForm.get('email')?.value,
        message: this.contactForm.get('message')?.value,
		city: this.contactForm.get('city')?.value,
		postalCode: this.contactForm.get('postalCode')?.value,
		address: this.contactForm.get('address')?.value,
      };
      
      this.sendEmail(formData);
    }
  }

  sendEmail(formData: any) {
    console.log('Sending email...');
    emailjs
      .send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formData,
        EMAILJS_PUBLIC_KEY
      )
      .then(
        (res: EmailJSResponseStatus) => {
          console.log(res.text);
		  // TODO: Clear form and popup a success message       
        },
        (error) => {
          console.log(error.text);
		  // TODO: Popup an error message       
        }
      );
  }
}
