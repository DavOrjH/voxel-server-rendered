import { Component, Input, AfterViewInit, OnInit } from '@angular/core';
import { trigger, state,style,animate, transition} from '@angular/animations';
import { Testimony } from 'app/testimony-slider/testimony';

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'testimony-slider',
  templateUrl: './testimony-slider.component.html',
  styleUrls: ['./testimony-slider.component.css'],
  animations:[
    trigger('visibility',[
      state('inactive',style({
        backgroundColor: '#eee',
        transform: 'scale(1)'
      })),
      state('active',style({
        backgroundColor: '#d9d2c6',
        transform: 'scale(1.1)',
        display: 'block',
      })),
      transition('inactive => active',animate('900ms ease-in')),
      transition('active => inactive',animate('900ms ease-out'))
    ])
  ]
})
export class TestimonySliderComponent implements AfterViewInit, OnInit{
  constructor(){
    
  }

  ngAfterViewInit(){
    
  }
  ngOnInit(){
    this.setTestimonyFirst();
  }

  
  @Input() id:String;
  @Input() testimony:Testimony[];

  testimonyFirst:Testimony;
  
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

  setTestimonyFirst(){
    this.testimonyFirst = this.testimony.shift();    
  }



}

