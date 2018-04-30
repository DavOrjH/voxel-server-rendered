import { Component, OnInit, HostListener, Input } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { trigger, state, style, animate, transition } from '@angular/animations';
import {Images} from '../pretty-slider/images';


@Component({
  selector: 'app-mini-slider',
  templateUrl: './mini-slider.component.html',
  styleUrls: ['./mini-slider.component.css'],
  animations:[
    trigger('pretty-slider-act', [
      state('inactive', style({
          transform: 'scale(0)'
        })),
      state('active',   style({
          transform: 'scale(1)'
      })),
      transition('inactive => active', animate('200ms ease-in')),
      transition('active => inactive', animate('200ms ease-out'))
    ]
  ),
  ]
})
export class MiniSliderComponent implements OnInit {

  @Input() images:Images[];
  
  prettySliderState: string = "inactive";
  key:any;
  sliderIndex:number = 0;
  imageHoverActive:boolean[] = [];

  constructor() { }

  ngOnInit() {
    this.setInactives();
  }

  setInactives(){
    for(let i = 0; i<this.images.length;i++){
      this.imageHoverActive.push(false);
    }
  }

  setInfoTrue(i:number){
    this.imageHoverActive[i] = true;
  }

  setInfoFalse(i:number){
    this.imageHoverActive[i] = false;
  }

  getPrettySliderState():string{
    return this.prettySliderState;
  }

  getImagesArray():Images[]{
    return this.images;
  }

  activePrettyState(){
    this.prettySliderState = "active";
  }

  inactivePrettyState(){   
   
    this.prettySliderState = "inactive";    
  }

  getSliderIndex():number{
    return this.sliderIndex;
  }

  isInfoActive(i:number):boolean{
    return this.imageHoverActive[i]
  }


  

  setPrettySlider(index:number){
    this.activePrettyState();
    console.log("se ejecuta");
    this.sliderIndex = index;

  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent)  {
    this.key = event.key;
    if(this.key === "Escape"){
      this.inactivePrettyState();
    }
  }
 

}
