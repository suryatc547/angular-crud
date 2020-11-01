import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CommonService } from '../common.service';
// import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Response } from '../response';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  loginForm;
  userLogin = localStorage.getItem('userHash');
  @ViewChild('msg',{static:false}) msgDiv: ElementRef;
  constructor(private formBuilder: FormBuilder,private commonService: CommonService,private router: Router) { 
  	if(this.userLogin != null){
  		this.router.navigate(['/dashboard'])
  	}
  }

  get f(){
  	return this.loginForm.controls
  }

  ngOnInit() {
  	this.loginForm = this.formBuilder.group({
  		username:['',Validators.required],
  		password:['',Validators.required]
  	})
  }

  ngAfterViewInit(){
    console.log('loginDiv',this.msgDiv)
  }

  onLogin(loginForm) {
  	this.commonService.login(loginForm).subscribe(
      (login: Response) => {
        if(login.status == 1){
          this.commonService.success(this.msgDiv.nativeElement,login.msg)
          localStorage.setItem('userHash',login.user)
          this.loginForm.reset()
          setTimeout(()=>this.router.navigate(['/dashboard']),500)
        } else {
          this.commonService.error(this.msgDiv.nativeElement,login.msg)
        }
      }
    )
  }

}
