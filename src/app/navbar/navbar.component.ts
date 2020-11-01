import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  private userLogin: any;
  private siteData: any;
  private appUrl: String;
  constructor(private commonService: CommonService) {
  }

  ngOnInit() {
  	this.userLogin = localStorage.getItem('userHash') != null
  	this.appUrl = this.commonService.appUrl()
  	this.commonService.getData().subscribe(result=>{
  		if(result.status) {
        this.siteData = result.msg
        this.commonService.setAppTitle(result.msg.sitename)
      }
  	})
  }

}
