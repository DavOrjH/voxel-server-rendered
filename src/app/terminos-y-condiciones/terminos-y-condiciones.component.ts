import { Component, OnInit } from '@angular/core';

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-terminos-y-condiciones',
  templateUrl: './terminos-y-condiciones.component.html',
  styleUrls: ['./terminos-y-condiciones.component.css']
})
export class TerminosYCondicionesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.scrollTop();
  }

  scrollTop():void{
    $('html,body').animate({
     scrollTop:0
   },200);
 }

}
