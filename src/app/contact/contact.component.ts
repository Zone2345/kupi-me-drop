import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: "app-contact",
  templateUrl: "./contact.component.html"
})
export class ContactComponent implements OnInit {
  constructor(private formBuilder: FormBuilder) {}
  contactForm: FormGroup;
  submitted = false;
  ngOnInit() {
    this.contactForm = this.formBuilder.group({
      name: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      message: ["", [Validators.required, Validators.minLength(10)]]
    });
  }
  get f() {
    return this.contactForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.contactForm.invalid) {
      return;
    }

    alert("SUCCESS!!!!!");
  }
}
