import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ApiService} from "../../services/api.service";

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {
  contactUsForm: FormGroup;
  findings: any = [
    'Social Media',
    'LinkedIn',
    'Owner'
  ]
  constructor(public fb: FormBuilder, public apiService: ApiService) {
  }
  ngOnInit() {
    this.contactUsForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contact_number: ['',
        [Validators.required,
          Validators.pattern(/^[0-9]{10}$/)]],
      lead_source: ['', Validators.required],
    });
  }

  sendMessage() {
    if(this.contactUsForm.invalid) {
      this.apiService.showToast('Please enter valid data');
      this.contactUsForm.markAllAsTouched();
      return;
    }
    const data = this.contactUsForm.value;
    this.apiService.makeEnquiry(data).subscribe((res) => {
      this.apiService.showToast('Enquiry submitted.');
      this.contactUsForm.reset();
    });
  }
}
