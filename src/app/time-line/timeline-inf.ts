import { NgModule, HostListener } from '@angular/core';

declare var $:any;
declare var Jquery:any;

export class TimeLineInf {
  icon:String;
  title:String;
  date:String;
  descrp:String;
  img:String;
  state:String = "inactive";
  constructor(icon:String,title:String,date:String,descrp:String, img:String){
     this.icon = icon;
     this.title= title;
     this.date=date;
     this.descrp = descrp;
     this.img = img;
    }

  getIcon(){
    return this.icon;
  }

  getTitle(){
    return this.title;
  }

  getDate(){
    return this.date;
  }

  getDescrp(){
    return this.descrp;
  }

  getImg(){
    return this.img;
  }

  getState(){
    return this.state;
  }

  setActive(){
  (this.state==="inactive")?this.state='active':this.state='active';
  }

  setInactive(){
  (this.state==="active")?this.state='inactive':this.state='inactive';
  }

}
