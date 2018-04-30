import {Component,Input, OnInit, AfterViewInit, HostListener} from '@angular/core';
import { trigger, state,style,animate, transition} from '@angular/animations';
import {SlideGroup} from './slideGroup';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';


// Declaramos las variables para jQuery
declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css'],
})
export class SliderComponent implements OnInit, AfterViewInit{
  isMessageError: boolean;
  timer1: number;
  sliderHeight:number;
  timer:any;
  timer2:any;
  timer3:any;
  slider:SlideGroup;
  activeEffects:boolean = false;
  videoWidth:number = 640;
  videoHeight:number = 360; 
  hideVideo:boolean[] = [];
  interval:any;  
  constructor(){
  }
  

  @Input() id:String;
  @Input() slides:SlideGroup;

  ngOnInit() {       
  }

  ngAfterViewInit() {
    if($( window ).width()<942){
      this.sliderHeight = $(window).height()-60;
    }else{
      this.sliderHeight = $(window).height()-130;
    }
    $("#wait").height(this.sliderHeight);
    $("#"+this.id).height(this.sliderHeight);
    $("#message-error").height(this.sliderHeight);
    
    this.timer1 = window.setTimeout(()=>{
      if(this.slides){
        this.activeEffects = true;        
        this.setVideoSize(); 
        this.interval = window.setInterval(()=>{
          for(let i=0; i<this.slides.getSlides().length+1;i++){

            // if($("#video"+i)[0]){
            //   console.log($("#video"+i)[0])
            // }
            
            if($("#slider"+i).hasClass("active")){        
              if($("#video"+i)[0]){ 
                
              $("#video"+i)[0].contentWindow.postMessage('{"event":"command","func":"' + 'playVideo' + '","args":""}', '*');
              }
            }else{
              if($("#video"+i)[0]){
                $("#video"+i)[0].contentWindow.postMessage('{"event":"command","func":"' + 'pauseVideo' + '","args":""}', '*');
              }else{
              }         
            }
          }
        },20);        
      }else{
        this.timer2 = window.setTimeout(()=>{
          if(this.slides){
            this.activeEffects = true; 
            this.setVideoSize();              
            this.interval = window.setInterval(()=>{
              for(let i=0; i<this.slides.getSlides().length+1;i++){
    
                // if($("#video"+i)[0]){
                //   console.log($("#video"+i)[0])
                // }
                
                if($("#slider"+i).hasClass("active")){        
                  if($("#video"+i)[0]){ 
                    
                  $("#video"+i)[0].contentWindow.postMessage('{"event":"command","func":"' + 'playVideo' + '","args":""}', '*');
                  }
                }else{
                  if($("#video"+i)[0]){
                    $("#video"+i)[0].contentWindow.postMessage('{"event":"command","func":"' + 'pauseVideo' + '","args":""}', '*');
                  }else{
                  }         
                }
              }
            },20);   
          }else{
            this.isMessageError = true;
          }
        },10000);        
      }  
           
    },2500);
    this.timer = window.setTimeout(()=>{
      if(this.activeEffects){
        this.setSliderHeight();
        $("#"+this.id).height("auto");
         
      }else{
        this.timer3 = window.setTimeout(()=>{
          if(this.activeEffects){
            this.setSliderHeight();
            $("#"+this.id).height("auto");
          } 
        },10001);
      }          
    },2501);
       
  }

  setVideoSize():void{
 
    if($( window ).width()>942 && $( window ).width()<1240 ){
      this.videoWidth = ($( window ).width())/2-40;
      this.videoHeight = this.videoWidth*360/640;
    }else if($( window ).width()>1240){
      this.videoWidth = 580;
      this.videoHeight = this.videoWidth*360/640;
    }else{
      if($(window).width() > $(window).height()){
        this.videoWidth =  200;
        this.videoHeight =this.videoWidth*360/640;
      }else{
        this.videoWidth = ($( window ).width())-20;
        this.videoHeight = this.videoWidth*360/640;
      }
      
    }
  }

  showVideoFrame():void{
    console.log("se ejecuta el comando");
            
    for(let i=0; i<this.slides.getSlides().length+1;i++){
      if($("#slider"+i).hasClass("active")){        
        if($("#video"+i)){  
        // $("#video"+i).contentWindow.postMessage('{"event":"command","func":"' + 'playVideo' + '","args":""}', '*');
        console.log("se ejecuta el play");
        }
      }else{
        if($("#video"+i)){
          //$("#video"+i).contentWindow.postMessage('{"event":"command","func":"' + 'pauseVideo' + '","args":""}', '*');
          console.log("se ejecuta la pausa");
        }else{
        }         
      }
    }      
  }

  setSliderHeight(){
    if($( window ).width()<942){
      this.sliderHeight = $(window).height()-60;
    }else if($( window ).height()>800){
      this.sliderHeight = 800;
    }else{
      this.sliderHeight = $(window).height()-130;
    }
    for(let i = 0; i<=this.slides.getSlides().length;i++){
      $("#slider-cnt"+i).height(this.sliderHeight);
      $("#slider-img"+i).height(this.sliderHeight);  
    }    
  }

  nextSlide():void{
    $(".right").click(function(){
        $('#'+this.id).carousel("next");
    });
  }
  prevSlide():void{
    $(".left").click(function(){
       $('#'+this.id).carousel("prev");
   });
  }

  @HostListener('window:resize', ['$event'])
  onResize($event:any){
    this.setSliderHeight();
    this.setVideoSize();
  }  

}
