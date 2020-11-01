import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CommonService } from '../common.service';
import { Response } from '../response';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  cond: Boolean;
  prop2: String;
  prop: String;
  userid: String;
  regiserForm;
  @ViewChild('msg',{static:false}) msgDiv: ElementRef;
  constructor(private formBuilder: FormBuilder,private commonService: CommonService,private router: Router) {
    this.userid = '1';
  	this.cond = true;
  	this.prop = 'hello';
  	this.prop2 = 'hi';
    this.regiserForm = this.formBuilder.group({
      username:['',[Validators.required]], 
      email:['',[Validators.required]],
      password:['',Validators.required],
      cpassword:['',Validators.required]
    });
    this.commonService.add('hello world')
    this.commonService.getData()
  }

  get f(){
    return this.regiserForm.controls;
  }

  ngOnInit() {
    console.log(this.commonService.getMessage())
  	this.cond = false;
  }

  onSubmit(registerData){
      console.log(registerData);
      this.commonService.register(registerData.value).subscribe((reg: Response)=>{
        if(reg){
          if(reg.status == 1){
            this.commonService.success(this.msgDiv.nativeElement,reg.msg)
            setTimeout(()=>this.router.navigate(['/login']),1500)
          } else {
            this.commonService.error(this.msgDiv.nativeElement,reg.msg)
          }
        }
      })
  }

}
