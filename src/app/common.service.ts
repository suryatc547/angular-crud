import { Injectable, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient,HttpHeaders,HttpInterceptor,HttpRequest,HttpHandler,HttpEvent,HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Product } from './dashboard/product';
import { Editproduct } from './dashboard/editproduct';
import { Response } from './response';
import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class CommonService implements HttpInterceptor {
  test: String[] = [];
  url: String;
  appurl: String;
  ele;
  alertType: String;
  appTitle: String;
  socket: any;
  @ViewChild('msg',{static:false}) msgDiv: ElementRef;
  constructor(private http: HttpClient) { 
    this.url = 'http://localhost:3000/api/';
    this.appurl = 'http://localhost:3000/';
    this.socket = io.connect(this.appurl,{
      transports:['websocket']
    });
    this.ioOnConnect()
    this.ioOnError()
    this.ioOnDisconnect()
  }
  intercept(req: HttpRequest<any>,next: HttpHandler):Observable<HttpEvent<any>>{
    const token = 'TEST'
    let newHeaders = req.headers;
    newHeaders = newHeaders.append('Token',token)
    const authReq = req.clone({headers:newHeaders})
    return next.handle(authReq).pipe(
      map((resp: HttpResponse<any>) => {
        console.log('Response',resp.headers)
        return resp;
      })
      )
  }
  ioOnConnect(){
    this.socket.on('connect',()=>{
      console.log('io connection established')
    })
  }
  ioOnError(){
    this.socket.on('error',(e: any)=>{
      console.log('io error',e)
    })
  }
  ioOnDisconnect(){
    this.socket.on('disconnect',(e: any)=>{
      console.log('io disconnected',e)
    })
  }
  ioCounter(){
    return Observable.create(observer=>{
      this.socket.on('check_r',(msg: any)=>{
        observer.next(msg)
      })
    })
  }
  getAppTitle(): String{
    return this.appTitle
  }
  setAppTitle(title: any){
    this.appTitle = title
  }
  appUrl(): String{
    return this.appurl
  }
  add(message){
  	this.test.push(message)
  }
  getData(): any{
    return this.http.get<Response>(this.url+'settings')
  }
  register(formData): any{
    return this.http.post<Response>(this.url+'register',formData)
  }
  login(formData){
    return this.http.post<Response>(this.url+'login',formData.value)
  }
  forgot(formData){
    return this.http.post(this.url+'forgot',formData)
  }
  product(): Observable<any>{
    return this.http.get<Product[]>(this.url+'products')
  }
  addProduct(formData: any, id: any = null){
    const addProductUrl = id ? 'addproduct/'+id : 'addproduct'
    return this.http.post<Response>(this.url+addProductUrl,formData)
  }
  deleteProduct(id: any){
    return this.http.post<Response>(this.url+'deleteproduct',{id:id})
  }
  editProduct(id: any){
    return this.http.post<Editproduct>(this.url+'editProduct',{id:id})
  }
  clear(){
  	this.test = []
  }
  getMessage(){
  	return this.test
  }
  success(ele,message: String,time = 3000){
    this.showAlert(message,time,1,ele)
  }
  error(ele,message: String,time = 3000){
    this.showAlert(message,time,0,ele)
  }
  showAlert(message: String,time,type = 0,ele){
    console.log(this.msgDiv)
    this.ele = ele
    if(this.ele){
      this.alertType = type ? 'success' : 'danger' ;
      this.ele.innerHTML = `<div class="bg-${this.alertType} p-2 text-white text-center">${message}</div>`;
      setTimeout(()=>this.ele.innerHTML = '',time)
    }
  }
}
