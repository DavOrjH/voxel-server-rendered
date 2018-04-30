import { Component, OnInit, HostListener, AfterViewInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { trigger, state, style, animate, transition } from '@angular/animations';
import {Images} from '../pretty-slider/images';
import {Courses} from './courses';
import {SubCat} from './sub-cat';
import {Pages} from '../pretty-book/pages'
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Location }                 from '@angular/common';
import { UserDataService } from 'app/user-data.service';
import { Subscription } from 'rxjs';
import { User } from 'app/user';

declare var $:any;
declare var Jquery:any;
@Component({
  selector: 'app-advanced-training',
  templateUrl: './advanced-training.component.html',
  styleUrls: ['./advanced-training.component.css'],
  animations: [
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
  trigger('itemState', [
    state('inactive', style({
        transform: 'translateX(-10000px)',
        visibility: 'hidden'
      })),
    state('active',   style({
      transform: 'translateX(0px)',
      visibility: 'visible'
    })),
    transition('inactive => active', animate('1000ms ease-in')),
    transition('active => inactive', animate('1000ms ease-out'))

  ]
),
]
})
export class AdvancedTrainingComponent implements OnInit,AfterViewInit {
  timer1: number;
  lastActive:number = 0;
  sumaItems:number=0;
  allLoaded:boolean=false;
  topTimeLineDist:number;
  firstLoad:boolean = true;
  courses: any;
  courseList: FirebaseListObservable<any[]>;
  prettySliderState: string = "inactive";
  handleInput:any;
  key:any;
  gallId:any;
  bookId:any;
  isFixed:boolean = false;
  scroll:number = 0;
  topCoursesBar:number = 0;
  isCourseBarAtInit:boolean = true;
  topbodyDist:number;
  topSubCatDist:number[] =[];
  isHighLighterActive:boolean[] = [];
  navbarHeight:number;
  isGalleryActive:boolean = false;
  isBookActive:boolean = false;
  subCat:SubCat[];
  scrollTo:string;
  timer:any;
  coursesLength:number = 0;
  subCatActivated:number = 0;
  itemActivated:number;

  constructor(private db:AngularFireDatabase, private location: Location, private route: ActivatedRoute,
    private router:Router) {
    this.subCat = [new SubCat("joyeria","Joyería"),
                  new SubCat("calzado","Calzado"),
                  new SubCat("programacion","Programación"),
                  new SubCat("bio-cad","BIOCAD"),
                  new SubCat("transporte","Transporte"),
                  new SubCat("jugueteria","Juguetería"),
                  new SubCat("arquietectura-naval","Arquitectura Naval"),
                  new SubCat("arquitectura","Arquitectura")
                ]
    this.courseList = this.db.list("/Course",{
      query:{
        limitToLast: 20,
        orderByChild: "category",
        equalTo:"advanced-training"
      }
    });
    this.courseList.forEach(this.storeData.bind(this));
   }

   ngOnInit(){
    this.route.paramMap.switchMap(
      (params:ParamMap)=> {
        this.scrollTo = params.get("id");
        return this.scrollTo
      }
  ).subscribe(
    courseId =>{

    }   
  ); 
   }

  storeData(courses):void{
    courses.forEach(course => {
      var images:Images[]=[];      
      for (var index = 0; index < course.images.length; index++) {
        images.push(new Images(course.images[index].imageURL,course.images[index].name,course.images[index].author));
        
      }
      var theCourse = new Courses(
        course.$key,
        course.cenefaURL,
        course.mainImageURL,
        course.description,
        images,
        new Pages([
          "../../assets/contents/advanced-training/architecture/rct1pdf.jpg",
            "../../assets/contents/advanced-training/architecture/rct2pdf.jpg",
            "../../assets/contents/advanced-training/architecture/rct3pdf.jpg",
        ],course.contentPDF),
        course.productId,
        course.hasVirtual,
        course.contentPDF,
        this.createArrange(course.goal),
        course.addressedTo,
        course.topics
      );
      if(course.subCat=="joyeria"){      
        this.subCat[0].addCourse(theCourse);
      }else if(course.subCat=="calzado"){
        this.subCat[1].addCourse(theCourse);
      }else if(course.subCat=="programacion"){
        this.subCat[2].addCourse(theCourse);
      } else if(course.subCat=="bio-cad"){
        this.subCat[3].addCourse(theCourse);
      }else if(course.subCat=="transporte"){
          this.subCat[4].addCourse(theCourse);
      }else if(course.subCat=="jugueteria"){
        this.subCat[5].addCourse(theCourse);
      }else if(course.subCat=="arquietectura-naval"){
        this.subCat[6].addCourse(theCourse);
      }else if(course.subCat=="arquitectura"){
        this.subCat[7].addCourse(theCourse);
      }
      this.coursesLength++;
    });
  }

  
  createArrange(charChain?:string):string[]{
    let arrange:string[] = [];
    if(charChain){
      arrange = charChain.split("\n");      
      return arrange
    }else{
      return arrange
    }
  }


  ngAfterViewInit() {
     this.topCoursesBar =  $('#'+this.subCat[0].getIdSubCat()).offset().top - $('#courses-bar').height();
     this.topTimeLineDist = $('#courses-beg').offset().top; 
     this.timer1 = window.setTimeout(()=>this.getTopDist(),500); 
     this.setnavBarHeight();      
     this.timer = window.setTimeout(()=>this.scrollSubCatTop(-1,this.scrollTo),1000);
  }

setnavBarHeight():void{
  let screenWidth:number = $(window).width();
  if(screenWidth<=942){
    this.navbarHeight = 60; 
  }else{
    this.navbarHeight = 135;   
  }
}

getSubCat():SubCat[]{
  return this.subCat;
}

  setPrettySliderState(galleryId:any){
    this.activePrettyState();
    this.setGallerySlider(galleryId);
    this.isGalleryActive=true;
  }

  setPrettyBookState(bookId:any){
    this.activePrettyState();
    this.setBookReader(bookId);
    this.isBookActive=true;
  }

  setGallerySlider(galleryId:any):void{
    this.gallId = galleryId;
  }
  setBookReader(bookId:any):void{
    this.bookId = bookId;
  }

  getGalleryId():any{
    return this.gallId;
  }

  getBookId():any{
    return this.bookId;
  }
  activePrettyState(){
    this.prettySliderState = "active";
  }

  inactivePrettyState(){
    this.isGalleryActive=false;
    this.isGalleryActive=false;
    this.prettySliderState = "inactive";
  }

  getPrettySliderState():string{
    return this.prettySliderState;
  }

  getFixed():boolean{
    return this.isFixed;
  }

  courseBarAtInit():boolean{
      return this.isCourseBarAtInit;
  }

  scrollSubCatTop(index:number,url?:string):void{
    if(index<0){
      for(let i = 0; i<this.subCat.length; i++){
        if(url == this.subCat[i].getIdSubCat()){
          index = i;
          
          break;         
        }
      }
    }

     $('html,body').animate({
      scrollTop:this.topSubCatDist[index]
    },200);
  }

  scrollTop():void{
     $('html,body').animate({
       scrollTop:0
     },200);
  }

  getTopDist():void{
    for(let i = 0; i < this.subCat.length; i++){
      this.topSubCatDist[i] = $('#' + this.subCat[i].getIdSubCat()).offset().top-134;
    }
  }

  askSubCatBar(scroll:number):void{
    let iSubOne = -1;
    if(scroll+this.navbarHeight < this.topSubCatDist[0]){
      this.setSubBarCat(-1);
      
    }else{
      for(let i = 0; i <= this.subCat.length; i++){
        if(iSubOne != -1){
          if(i === this.subCat.length){
            if(scroll+this.navbarHeight >= this.topSubCatDist[i-1]) {
              
              this.setSubBarCat(i-1);              
              
            }
          }else{
            if(scroll+this.navbarHeight<= this.topSubCatDist[i] && scroll+this.navbarHeight >= this.topSubCatDist[iSubOne]) {
              this.setSubBarCat(iSubOne);             
              }
            else{
              iSubOne = i;
            }
          }
        }else{
          iSubOne = 0;
        }
      }
    }
  }

  getActiveHighlighter(i:number){
    return this.isHighLighterActive[i]
  }

// Setea la seccion subCat actual-----------------------------------------------------------------------------------------------------

setSubBarCat(i:number):void{

    for(let m = 0; m <= this.subCat.length; m++){
      if( m === i){

        this.isHighLighterActive[i] = true;
        // this.subCatActivated = i;
                

      }else{

      this.isHighLighterActive[m] = false;
    }
  }
}

//----------------------------------------------------------------------------------------------------------------------------------

setCourseActivate(subCat:number, item:number){
  this.subCat[subCat].getCourses()[item].setActive();
}

getStateCourses(m:number, n:number):String{
  return this.subCat[m].getCourses()[n].getState();
}

setSumaItems(subCat:number, item:number){
  this.sumaItems=this.sumaItems+$('#course'+ '-'+ subCat + '-' + item).height()+25;
}

getLastActivated(subCat:number):number{
  let sum = 0;
  for(let i = 0; i < subCat;i++){
    sum = sum + this.subCat[i].getCourses().length;
  }
return sum
}





@HostListener('document:keydown', ['$event'])
 handleKeyboardEvent(event: KeyboardEvent)  {
   this.key = event.key;
   if(this.key === "Escape"){
     this.inactivePrettyState();
   }
 }

 @HostListener('window:scroll', ['$event'])
   onScroll($event:any) {
    this.topCoursesBar =  $('#'+this.subCat[0].getIdSubCat()).offset().top - $('#courses-bar').height(); 
     this.scroll = $event.path[1].scrollY;
     this.topbodyDist = $('#body-page').offset().top;
     this.getTopDist();
     this.setnavBarHeight();

     if(this.scroll+this.navbarHeight>=this.topCoursesBar){
       $("#courses-bar").css({
         "width": $(window).width(),
         "left": "0",
         "font-size": "14px",
       });
      this.isFixed=true;
      this.isCourseBarAtInit=false;

     }else{
       $("#courses-bar").css({
         "width":"100%",
         "font-size": "20px",
      });
      this.isFixed= false;
      this.isCourseBarAtInit=true;

     }
     this.askSubCatBar(this.scroll);

     let topDistance:number = $event.path[1].scrollY;
     let windowHeight:number = $(window).height();

    
      if(this.topTimeLineDist+100 > topDistance+windowHeight){
        this.subCat.forEach( subCat =>{
          subCat.getCourses().forEach( course =>{
            course.setInactive();
          })
          
        });
        this.sumaItems = 0;
        this.lastActive = -1;
        this.allLoaded = false;
      }

     if(!this.subCat[0].getCourses()[0]){

       this.scrollTop()
     }else{
      if (this.lastActive>0) {
        if((this.sumaItems+this.topTimeLineDist+100<=topDistance+windowHeight) && !this.allLoaded && this.lastActive-1<this.coursesLength+1){
          if(this.lastActive-1>this.getLastActivated(this.subCatActivated)){            
            this.subCatActivated = this.subCatActivated+1;
          }else{
            
          }
          
          this.itemActivated = this.lastActive-1-this.getLastActivated(this.subCatActivated) 

          this.setCourseActivate(this.subCatActivated,this.itemActivated);
          this.setSumaItems(this.subCatActivated-1,this.itemActivated);
          this.lastActive++;
          if(this.coursesLength==this.lastActive-1){

            this.allLoaded=true;
          }
        }
    }else{

      if(this.topTimeLineDist+100 <= topDistance+windowHeight){
        this.setCourseActivate(0,0)
        this.setSumaItems(0,0);
        this.subCatActivated = 0;
        this.lastActive=1;
      }
        
      }
      topDistance=0;
      windowHeight=0;
    }

    }

   @HostListener('window:resize', ['$event'])
   onResize($event:any){
     this.getTopDist();
     this.topbodyDist = $('#body-page').offset().top;
     let screenWidth:number = $(window).width();
     this.topCoursesBar =  $('#'+this.subCat[0].getIdSubCat()).offset().top - $('#courses-bar').height();
     this.topTimeLineDist = $('#courses-beg').offset().top;      
     this.setnavBarHeight();
   }

}
