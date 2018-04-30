import { Component, OnInit} from '@angular/core';
import { Http, RequestOptions, RequestOptionsArgs } from "@angular/http";
import { NgForm } from "@angular/forms/forms";
import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from 'firebase/app';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from "angularfire2/database";
import {FirebaseApp} from 'angularfire2';
import { Slide } from "app/slider/slide";
import { SlideGroup } from "app/slider/slideGroup";

@Component({
  selector: 'app-vinculacion',
  templateUrl: './vinculacion.component.html',
  styleUrls: ['./vinculacion.component.css']
})
export class VinculacionComponent implements OnInit{
  slides: any;
  sliderList: FirebaseListObservable<any[]>;
  ref: any;
 
  id1="slider1"; 
  constructor( private fireBaseApp:FirebaseApp,private db:AngularFireDatabase) { 
    this.querySliders();
  }

  querySliders():void{
    
    this.sliderList = this.db.list('/Sliders', {
      query: {
        limitToLast: 200, 
        
      }
    });
    this.sliderList.forEach(this.storeSliders.bind(this));
  }
storeSliders(sliders):void{
    let sliderData = [];
    sliders.forEach(slider=>{
      let slideNew:Slide = new Slide(slider.imageURL, slider.description, slider.title, slider.urlPage);
      sliderData.push(slideNew);
    })

    this.slides = new SlideGroup(sliderData) 
  }
  ngOnInit() {

    this.ref =  this.fireBaseApp.database().ref().child("/Testing/");
    console.log(this.ref)
    
  }

  eliminateTesting():void{
    this.ref.remove();
  }

   
    
   }
