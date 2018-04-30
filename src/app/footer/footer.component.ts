import { Component, ElementRef, ViewChild,Input} from '@angular/core';

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'my-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  constructor() { }

  scrollTop():void{
     $('html,body').animate({
      scrollTop:0
    },200);
  }

}
