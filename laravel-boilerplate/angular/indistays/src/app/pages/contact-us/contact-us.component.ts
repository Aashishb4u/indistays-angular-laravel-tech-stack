import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

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
  constructor(public fb: FormBuilder) {
  }
  ngOnInit() {
    this.contactUsForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      finding: ['', Validators.required],
    });
  }
}
