import { Component, OnInit, HostListener } from '@angular/core';

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-desarrollo',
  templateUrl: './desarrollo.component.html',
  styleUrls: ['./desarrollo.component.css']
})
export class DesarrolloComponent implements OnInit {

  videoWidth:number = 640;
  videoHeight:number = 360;


  constructor() { }

  ngOnInit() {
    this.setVideoSize();
  }

  
  setVideoSize():void{
    
       if($( window ).width()>942 && $( window ).width()<1240 ){
         this.videoWidth = ($( window ).width()-60)/2-20;
         this.videoHeight = this.videoWidth*360/640;
       }else if($( window ).width()>1240){
        this.videoWidth = (1240-60)/2-20;
        this.videoHeight = this.videoWidth*360/640;
       }else{
        this.videoWidth = ($( window ).width()-60)-20;        
        this.videoHeight = this.videoWidth*360/640;         
       }
     }

  @HostListener('window:resize', ['$event'])
  onResize($event:any){

    this.setVideoSize();
  }  

}
