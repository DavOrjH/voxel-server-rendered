import { Component, OnInit, Input, HostListener, AfterViewInit } from '@angular/core';
import { Model3d } from 'app/pretty3dslider/model3d';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { trigger, state, style, animate, transition } from '@angular/animations';

declare var jQuery:any;
declare var $:any;


@Component({
  selector: 'app-pretty3dslider',
  templateUrl: './pretty3dslider.component.html',
  styleUrls: ['./pretty3dslider.component.css'],
  animations: [
    trigger('pretty-slider-act', [
      state('inactive', style({
        transform: 'scale(0)',        
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
        'zIndex':'-1'
        
    })),
    state('active', style({
      'visibility':'visible',
      
    })),
    transition('inactive => active', animate('1ms ease-in')),
    transition('active => inactive', animate('1ms ease-out'))  
  ]
    
  )  
]
})
export class Pretty3dsliderComponent implements OnInit {
    
  @Input() models3d:Model3d[];

  sliderWidth: number;
  key: string;
  iframeHeight:number;
  index:number = 0;
  modelIndex:number = 0;
  modelsNumber:number;
  modelsPerSlice:number;
  slicesStates:string[] = [];
  windowWidth:number;  
  slices:any[] = [];
  modelHeight:number;
  modelWidth:number;
  prettyView:string = "inactive";
  url:string = "";
  sliceHoverState:any[]=[];
  jIndex:number = 0;
  
  
  constructor() {     
    
  }

  ngOnInit() { 
    this.modelsNumber = this.models3d.length;
    this.windowWidth = $( window ).width();  
    this.setImagesNumber();    
    this.storeCourses();
    this.setIframeHeight();
     
  }

  ngAfterViewInit(){
    this.setIframeHeight();  
   
  }

  setIndexPlus(){
    if(this.index > this.slices.length-2){
      this.index = 0;
    }else{
      this.index = this.index + 1;
    }

  }

  setIndexMinus(){
    if(this.index < 1){
      this.index = this.slices.length-1;
    }else{
      this.index = this.index - 1;
    }
  }

  setImagesNumber(){
    if(this.modelsNumber<=4 && this.windowWidth <= 942){
      this.modelsPerSlice = 1;
    }else if(this.modelsNumber<=4 && this.windowWidth > 942){
      this.modelsPerSlice = this.modelsNumber;
    }else if(this.modelsNumber>4 && this.windowWidth <= 942){
      this.modelsPerSlice = 1;
    }else if(this.modelsNumber>4 && this.windowWidth > 942){
      this.modelsPerSlice = 4;
    }    
  }

  storeCourses(){
    let groupsNumber = Math.ceil(this.modelsNumber/this.modelsPerSlice);
    this.slices = [];
    this.sliceHoverState = [];
    this.slicesStates = [];
    for(let i = 0; i<groupsNumber; i++){
      let slice:Model3d[] = [];
      let imageHoverState:boolean[] = [];
      let modelsSliceNumber:number = this.modelsPerSlice;

      if(Number.isInteger(this.modelsNumber/this.modelsPerSlice)){
            
      }else{
        if( i == groupsNumber-1){
          modelsSliceNumber = this.modelsNumber-(groupsNumber-1)*this.modelsPerSlice;
        }else{

        }
      }
      for(let j = 0;j<modelsSliceNumber;j++){
        
        slice.push(this.models3d[(j+i*this.modelsPerSlice)]);
        imageHoverState.push(false);

      }
      this.slices.push(slice);
      this.sliceHoverState.push(imageHoverState);
      if(this.index == i ){
        this.slicesStates.push("active")
      }else{
        this.slicesStates.push("inactive")
      }
    } 
  }  

  setInfoTrue(i:number, j:number):void{
    let slice:boolean[] = this.sliceHoverState[i];
    slice[j] = true;    
  }

  setInfoFalse(i:number, j:number):void{
    let slice:boolean[] = this.sliceHoverState[i];
    slice[j] = false;    
  }

  isInfoActive(i:number, j:number):boolean{
    let slice:boolean[] = this.sliceHoverState[i];
    return slice[j]   
  }


   setIframeHeight(){
    this.iframeHeight = (this.windowWidth-20)*0.7/2;
    $("#iframe-3d").height(this.iframeHeight);
  }

  inactivePrettyState(){
    this.prettyView = "inactive"
  }

  setPrettyModel(slice:number,model:number){    

    this.prettyView = "active";
    this.setIframeHeight();
    let sliceN = this.slices[slice];
    this.url = sliceN[model].getSrc();
    this.index = slice;
    this.jIndex = model;    
  }

  setDotActive(ind:number, jInd:number):boolean{
    if(ind == this.index && jInd == this.jIndex){
      return false
    }else{
      return true
    }
  }

  setDotBarActive(ind:number):boolean{
    if(ind == this.index){
      return true
    }else{
      return false
    }
  }

  getUrl():string{
    return this.url;
  }

  getSliceState(index:number):string{
    return this.slicesStates[index]
  }

  getPrettySliderState():string{
    return this.prettyView;
  }

  isVertical():boolean{
    if($( window ).width()<$( window ).height()){
      return true;
    }else{
      return false
    }
  }

  setActives(index:number){
    for(let i = 0; i<this.slices.length; i++){
      if(i == index){
        this.slicesStates[i] = "active";
      }else{
        this.slicesStates[i] = "inactive";
      }
    }
  }

 
  leftSlice(){
    if(this.index == 0){
      this.index = this.slices.length-1;
    }else{
      this.index = this.index-1;
    }
    this.setActives(this.index);    
  }

  rightSlice(){
    if(this.index == this.slices.length-1){
      this.index = 0;
    }else{
      this.index = this.index+1;
    }
    this.setActives(this.index);    
  }

  isArrowVisible():boolean{
    if( this.modelsNumber<=this.modelsPerSlice){
      return false
    }else{
      return true
    }
  }
 
  setLeftModel():void{

    let numberSlices:number = this.slices.length;

    if(this.index == 0 && this.jIndex == 0){
      this.index = numberSlices-1;
      this.jIndex = this.slices[this.index].length-1;
    }else{
      if(this.jIndex == 0){
        this.index = this.index-1;
        this.jIndex = this.slices[this.index].length-1; 
      }else{
        this.jIndex = this.jIndex-1;
      }
    }
    this.setPrettyModel(this.index,this.jIndex);

  }
  
  setRightModel(){

    let numberSlices:number = this.slices.length;

    if(this.index == numberSlices-1 && this.jIndex ==  this.slices[numberSlices-1].length-1){
      this.index = 0;
      this.jIndex = 0;
    }else{
      if(this.jIndex == this.slices[this.index].length-1){
        this.index = this.index+1;
        this.jIndex = 0;
      }else{
        this.jIndex = this.jIndex+1;
      }
    }
    this.setPrettyModel(this.index,this.jIndex);

  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent)  {
    this.key = event.key;
    if(this.key === "Escape"){
      this.inactivePrettyState();
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize($event:any){
    this.windowWidth = $( window ).width();
    this.sliderWidth = $("#slider-cnt").width();
    this.setImagesNumber();
    this.storeCourses();   
    this.setIframeHeight(); 
    if(this.index>=this.slices.length){
      this.index = 0;
    }
  }  

  

}
