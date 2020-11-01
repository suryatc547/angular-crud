import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CommonService } from '../common.service';
import { Product } from './product';
import { Editproduct } from './editproduct';
import { ValidationDirective } from '../validation.directive';
import { Router,UrlSegment } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  productForm;
  product:Product[] = [];
  cateGory = ['food','cloth','medicine'];
  url: String;
  private timer: String;
  editable:Boolean = false;
  editProductData: Editproduct[];
  segment: UrlSegment[];
  counter: any = 0;
  @ViewChild('proForm',{static:false}) proForm: ElementRef;
  constructor(
    private commonService: CommonService,
    private formBuilder: FormBuilder,
    private helper: ValidationDirective,
    private router: Router,
    private location: Location
    ) {
    this.getProduct()
    this.segment = this.helper.segment()
  }

  ngOnInit() {
    this.url = this.commonService.appUrl()
  	this.productForm = this.formBuilder.group({
  		name:['',[Validators.required,this.helper.required]],
  		image:['',Validators.required],
  		category:['',Validators.required]
  	})
    this.checkSegment()
    this.ioCounter()
    this.startTimer()
  }

  startTimer(){
    setInterval(() => {
      this.timer = this.helper.format(new Date())
    },1000)
  }

  ngAfterViewInit(){
    
  }

  ioCounter(){
    this.commonService.ioCounter().subscribe((msg: any)=>{
      this.counter = msg
    })
  }

  checkSegment(){
    if(this.segment[1] && this.segment[1].path){
      this.editable = true;
      this.editProduct(this.segment[1].path)
      console.log(this.segment[1].path)
    }
  }

  selectedOption(cat: any,editProductData: any){
    return editProductData && editProductData.category && editProductData.category.indexOf(cat) > -1
  }

  get f(){ 
  	return this.productForm.controls
  }

  getProduct(){
    this.commonService.product().subscribe(result=>{
      this.product = result
    })
  }

  editProduct(segment){
    this.commonService.editProduct(segment).subscribe(result=>{
      if(result.status == 1) this.editProductData = result.msg
    })
  }

  deleteProduct(id: any){
    this.commonService.deleteProduct(id).subscribe(result=>{
      if(result.status == 1) this.getProduct()
    })
  }

  goAdd(){
    this.editable = true
  }

  onAdd(productForm){
    const sendId = (this.segment[1] && this.segment[1].path) ? this.segment[1].path : null;
    const formEle = this.proForm.nativeElement
    const formData = new FormData(formEle);
    this.commonService.addProduct(formData,sendId).subscribe((result)=>{
      console.log(result)
      if(this.editable) this.editable = false
      setTimeout(()=>this.router.navigate(['/dashboard']),1500)
    })
  }

  goBack(){
    console.log('back')
    this.location.back()
  }

}
