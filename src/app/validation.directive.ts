import { Directive,Injectable } from '@angular/core';
import { Router,PRIMARY_OUTLET,UrlTree,UrlSegment,UrlSegmentGroup } from '@angular/router';

@Directive({
  selector: '[appValidation]'
})
@Injectable({
	providedIn:'root'
})
export class ValidationDirective {

  constructor(private router: Router) { }
  required(control){
	 return control.value.trim() != '' ? null : { 'required': true } ;
  }
  segment(){
    const tree : UrlTree = this.urlTree()
    const g : UrlSegmentGroup = this.urlSegmentGroup(tree)
    const s : UrlSegment[] = g.segments
    return s;
  }
  urlTree(){
    return this.router.parseUrl(this.router.url)
  }
  urlSegmentGroup(tree: UrlTree){
    return tree.root.children[PRIMARY_OUTLET]
  }
  reachMe(){
  	console.log('hi')
  }
  format(str=null): String{
  	const d = str ? new Date(str) : new Date()
  	return d.getFullYear()+'-'+d.getMonth()+'-'+d.getDate()+' '+d.getHours()+':'+d.getMinutes()+':'+d.getSeconds()
  }
}