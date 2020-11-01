import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CommonService } from '../common.service';
import { Response } from '../response';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent implements OnInit {
  forgotForm;
  @ViewChild('msg',{static:false}) msgDiv: ElementRef;
  constructor(private formBuilder: FormBuilder,private commonService: CommonService) { }

  ngOnInit() {
  	this.forgotForm = this.formBuilder.group({
  		username:['',[Validators.required]]
  	})
  }

  get f(){
  	return this.forgotForm.controls
  }

  onForgot(forgotForm){
  	this.commonService.forgot(forgotForm.value).subscribe((result: Response) => {
  		if(result.status == 1){
  			this.commonService.success(this.msgDiv.nativeElement,result.msg)
  		} else {
  			this.commonService.error(this.msgDiv.nativeElement,result.msg)
  		}
  	})
  }

}
