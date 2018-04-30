import { Component, OnInit, HostListener, AfterViewInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { trigger, state, style, animate, transition } from '@angular/animations';
import {Images} from '../pretty-slider/images';
import {Courses} from '../advanced-training/courses';
import {Pages} from '../pretty-book/pages'
import 'rxjs/add/operator/switchMap';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Location }                 from '@angular/common';

declare var $:any;
declare var Jquery:any;
@Component({
  selector: 'app-animation-and-visual',
  templateUrl: './animation-and-visual.component.html',
  styleUrls: ['./animation-and-visual.component.css'],
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

export class AnimationAndVisualComponent implements OnInit,AfterViewInit {
  
  firstLoad:boolean = true;
  timer:any;
  scrollTo:string;
  lastActive:number = 0;
  sumaItems:number=0;
  courses: Courses[] = [];
  courseList: FirebaseListObservable<any[]>;
  prettySliderState: string = "inactive";
  handleInput:any;
  key:any;
  gallId:any;
  bookId:any;
  navbarHeight:number;
  isGalleryActive:boolean = false;
  isBookActive:boolean = false;
  topTimeLineDist:number;
  allLoaded:boolean=false;

 
  constructor(private db:AngularFireDatabase, private route: ActivatedRoute, private location: Location,
    private router:Router) {
   
    this.queryCourses();   
    
  }

  ngOnInit(){        
    this.route.paramMap.switchMap(
        (params:ParamMap)=> {
          this.scrollTo = params.get("id");
          return this.scrollTo
        }
    ).subscribe(
      courseId =>{
        console.log(this.scrollTo);
      }   
    ); 
  }

 

  ngAfterViewInit() {
    this.topTimeLineDist = $('#courses-beg').offset().top;
    this.timer = window.setTimeout(()=>this.goToCourse(this.courses),1000);
  }

  goToCourse(courses:Courses[]){
   
    for(let i = 0; i<courses.length; i++){

      if(this.scrollTo == courses[i].getIdCourse()){ 
              
        $('html,body').animate({
          scrollTop: $('#course'+i).offset().top - 100,
        },200);   
        break     
      }
    }
  }

  queryCourses(){
    this.courseList = this.db.list("/Course",{
      query:{
      limitToLast: 20,
      orderByChild: "category",
      equalTo:"animation-and-visual"
      }
      });
      this.courseList.forEach(this.storeData.bind(this));
 
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
    this.courses.push(theCourse);
    });
  }

  
  createArrange(charChain?:string):string[]{
    let arrange:string[] = [];
    if(charChain){
      arrange = charChain.split("\n");
      console.log(arrange)
      return arrange
    }else{
      return arrange
    }
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
    this.prettySliderState = "inactive";
  }

  getPrettySliderState():string{
    return this.prettySliderState;
  }

  getState1(index:number):String{
    return this.courses[index].getState();
  }

  scrollTop():void{
    $('html,body').animate({
      scrollTop:0
    },200);
 }

 setSumaItems(n:number){
  this.sumaItems=this.sumaItems+$('#course'+n).height()+25;
}

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent)  {
    this.key = event.key;
    if(this.key === "Escape"){
      this.inactivePrettyState();
    }
  }

  @HostListener('window:scroll', ['$event'])
  onScroll($event:any,index:number) {

     this.firstLoad = false;
     let topDistance:number = $event.path[1].scrollY;
     let windowHeight:number = $(window).height();

    //  console.log("ultimo activo " + this.lastActive);     
    //  console.log(this.courses[this.lastActive]);
    //  console.log("todos cargados? " + this.allLoaded);
    //  console.log("Distancia del ultimo activo" + (this.sumaItems+100+this.topTimeLineDist));
    //  console.log("Posicion pantalla baja: " + topDistance+windowHeight);
    //  console.log("Suma de los items: " + this.sumaItems)   ; 

      if(this.topTimeLineDist+100 > topDistance+windowHeight){
        this.courses.forEach( course =>{
          course.setInactive();
        });
        this.sumaItems = 0;
        this.lastActive = null;
        this.allLoaded = false;
      }

     if(!this.courses[0]){
      //  console.log("no ha cargado")
       this.scrollTop()
     }else{
      if (this.lastActive) {
        if((this.sumaItems+this.topTimeLineDist+100<=topDistance+windowHeight) && !this.allLoaded && this.lastActive<this.courses.length){
          
          this.courses[this.lastActive].setActive();
          // console.log("se ha activado el número" + this.lastActive);
          this.setSumaItems(this.lastActive);
          this.lastActive++;
          if(this.courses.length==this.lastActive){
            // console.log(this.courses.length);
            // console.log(this.allLoaded);
            this.allLoaded=true;
          }
        }
    }else{
      // console.log(this.topTimeLineDist+100 + " < " + (topDistance+windowHeight) + " ? " )
      if(this.topTimeLineDist+100 <= topDistance+windowHeight){
        this.courses[0].setActive();
        // console.log("se ha activado el primero")
        // console.log(this.courses[this.lastActive].getState());
        this.setSumaItems(0);
        this.lastActive=1;
      }
        
      }
      topDistance=0;
      windowHeight=0;
    }
  }
  @HostListener('window:resize', ['$event'])
  onResize($event:any){    
    this.topTimeLineDist = $('#courses-beg').offset().top;   
    let windowHeight:number = $(window).height();    
  
  }  

}
