import { Component, OnInit, HostListener } from '@angular/core';
import { CommonService } from './common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title: any = 'checkAngular';
  constructor(private commonService: CommonService){

  }
  @HostListener('document:click',['$event'])
  onClick(event: any){
  	console.log('click event')
  }
  ngOnInit(){
  	this.title = this.commonService.getAppTitle()
  }
  @HostListener('document:contextmenu',['$event'])
  onContextmenu(event: any){
  	console.log('context menu clicked');
  }
}
