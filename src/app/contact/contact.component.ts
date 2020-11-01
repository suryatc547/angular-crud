import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  contactForm;
  constructor(private formBuilder: FormBuilder) { 
  	this.contactForm = this.formBuilder.group({
  		username:['',[Validators.required,Validators.minLength(3),Validators.maxLength(8)]]
  	});
  }

  ngOnInit():void {
  	console.log(this.contactForm.controls.username);
  }

  get f():any{
  	console.log(this.contactForm.controls.username.errors);
  	return this.contactForm.controls;
  }

}
