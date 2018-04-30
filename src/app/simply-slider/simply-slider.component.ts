import {Component,Input, OnInit, AfterViewInit, HostListener} from '@angular/core';
import { trigger, state,style,animate, transition} from '@angular/animations';
import {SlideGroup} from './slideGroup';

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-simply-slider',
  templateUrl: './simply-slider.component.html',
  styleUrls: ['./simply-slider.component.css']
})
export class SimplySliderComponent implements OnInit {
 

  @Input() id:String;
  @Input() slides:SlideGroup;

  ngOnInit() {
           
  }

  constructor(){
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


}
