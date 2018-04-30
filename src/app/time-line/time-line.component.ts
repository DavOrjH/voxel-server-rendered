import { Component, OnInit, Input } from '@angular/core';
import { NgModule, HostListener, AfterViewInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { trigger, state, style, animate, transition } from '@angular/animations';
import {TimeLineInf} from './timeline-inf';

declare var $:any;
declare var Jquery:any;

@Component({
  selector: 'app-time-line',
  templateUrl: './time-line.component.html',
  styleUrls: ['./time-line.component.css'],
  animations: [
    trigger('itemState', [
      state('inactive', style({
          transform: 'scale(0)',
        })),
      state('active',   style({
        transform: 'scale(1)',
      })),
      transition('inactive => active', animate('400ms ease-in')),
      transition('active => inactive', animate('400ms ease-out'))

    ]
  ),

]
})
export class TimeLineComponent implements AfterViewInit{
  @Input() timeline:TimeLineInf[];
  firstLoad:boolean = true;
  state:String;
  l0:number = 154;
  l1:number = this.l0;
  allLoaded:boolean=false;
  alturaAcum:number=0;
  timeLineHeight:number[]=[];
  lastActive:number;
  sumaItems:number=0;
  topTimeLineDist:number;
  constructor() {
   }

  ngAfterViewInit() {
    this.topTimeLineDist = $('#timeline').offset().top;
  }

  getState1(index:number):String{
    return this.timeline[index].getState();
  }

  getItems(){
    return this.timeline;
  }

    setPosition(index:number):boolean{
      if(index % 2 == 0) {
      return true;
    }
    else {
      return false;
    }
  }
  setSumaItems(n:number){
    this.sumaItems=this.sumaItems+$('#timeLineItem'+n).height()+25;
  }

  @HostListener('window:scroll', ['$event'])
    onScroll($event:any,index:number) {

       this.firstLoad = false;
       let topDistance:number = $event.path[1].scrollY;
       let windowHeight:number = $(window).height();

       if (this.lastActive) {
          if((this.sumaItems+100+this.topTimeLineDist<=topDistance+windowHeight) && !this.allLoaded){
            this.timeline[this.lastActive].setActive();
            this.setSumaItems(this.lastActive);
            this.lastActive++;
            if(this.timeline.length==this.lastActive){
              this.allLoaded=true;
            }
          }
      }else{
          this.timeline[0].setActive();
          this.setSumaItems(0);
          this.lastActive=1;
        }
        topDistance=0;
        windowHeight=0;
      }


}
