import { Component, OnInit, HostListener, Input } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { trigger, state, style, animate, transition } from '@angular/animations';
import {Images} from '../pretty-slider/images';


@Component({
  selector: 'app-pretty-photo-viewer',
  templateUrl: './pretty-photo-viewer.component.html',
  styleUrls: ['./pretty-photo-viewer.component.css'],
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

  trigger('slide-act',[
    state('inactive', style({
        'visibility':'hidden',
        'position':'absolute',
        'zIndex':'-1',
        transform: 'scale(0)'
        
    })),
    state('active', style({
      'visibility':'visible',
      transform: 'scale(1)'

      
    })),
    transition('inactive => active', animate('1ms ease-in')),
    transition('active => inactive', animate('1ms ease-out'))  
  ])
  ]
})

export class PrettyPhotoViewerComponent implements OnInit {
  index: number;
  @Input() images:Images[];  
  prettySliderState: string = "inactive";
  key:any;
  sliderIndex:number = 0;
  imageHoverActive:boolean[] = [];
  imagesStates:string[] = [];

  constructor() { }

  ngOnInit() {
    this.setInactives();
    this.setImagesStates();

  }

  setInactives(){
    for(let i = 0; i<this.images.length;i++){
      this.imageHoverActive.push(false);
    }
  }

  setImagesStates():void{
    for(let i = 0; i<this.images.length; i++){
      if(i == this.sliderIndex){
        this.imagesStates.push("active");
      }else{
        this.imagesStates.push("inactive");
      }
     
    }

  }

  isArrowVisible():boolean{
    if( this.images.length > 1){
      return true
    }else{
      return false
    }
  }

  getImageState(index:number):string{
    return this.imagesStates[index]

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
   
    this.sliderIndex = index;

  }

  setActives(index:number){
    for(let i = 0; i<this.images.length; i++){
      if(i == index){
        this.imagesStates[i] = "active";
      }else{
        this.imagesStates[i] = "inactive";
      }
    }
  }

  leftSlice(){
    if(this.sliderIndex == 0){
      this.sliderIndex = this.images.length-1;
    }else{
      this.sliderIndex = this.sliderIndex-1;
    }
    this.setActives(this.sliderIndex);  
     
  }

  rightSlice(){
    if(this.sliderIndex == this.images.length-1){
      this.sliderIndex = 0;
    }else{
      this.sliderIndex = this.sliderIndex+1;
    }
    this.setActives(this.sliderIndex);    
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent)  {
    this.key = event.key;
    if(this.key === "Escape"){
      this.inactivePrettyState();
    }
  }
 

}
