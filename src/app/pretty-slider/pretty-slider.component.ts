import {Component,Input,OnInit, HostListener, AfterViewInit} from '@angular/core';
import { trigger, state,style,animate, transition} from '@angular/animations';
import {Images} from './images';

declare var jQuery:any;
declare var $:any;


@Component({
  selector: 'app-pretty-slider',
  templateUrl: './pretty-slider.component.html',
  styleUrls: ['./pretty-slider.component.css']
})
export class PrettySliderComponent implements OnInit,AfterViewInit {
  ngAfterViewInit(): void {
    
  }

  @Input() images:Images[];
  @Input() index:number;
  key:any;  
  state:boolean = false;

  constructor() { }
  ngOnInit() {
  }
  

  getItems(){
    return this.images;
  }

  setActive(ind:number):boolean{
    (ind === this.index)?this.state = false:this.state=true;
    return this.state;
  }

  setIndexPlus(){
    if(this.index > this.images.length-2){
      this.index = 0;
    }else{
      this.index = this.index + 1;
    }

  }

  setIndexMinus(){
    if(this.index < 1){
      this.index = this.images.length-1;
    }else{
      this.index = this.index - 1;
    }
  }



  @HostListener('document:keydown', ['$event'])
 handleKeyboardEvent(event: KeyboardEvent) {
   this.key = event.key;
   if(this.key==="ArrowRight"){
     this.setIndexPlus();
   }

   if(this.key==="ArrowLeft"){
     this.setIndexMinus();
   }
 }

}
