import { Component, OnInit, HostListener } from '@angular/core';
import 'rxjs/add/operator/switchMap';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Location }                 from '@angular/common';
import {Product} from 'app/store/product';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";
import { Lesson } from 'app/course/lesson';


declare var $:any;
declare var Jquery:any;


@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css'],
  animations: [
    trigger('menuMobState', [
      state('inactive', style({
        'right': '-100%'
      })),
      state('active',   style({
        'right': '0%'
      })),
      transition('inactive => active', animate('400ms ease-in')),
      transition('active => inactive', animate('400ms ease-out'))
    ]),

    trigger('iconMobState', [
      state('inactive', style({
        'display': 'none',
      })),
      state('active',   style({
        'display': 'block',
      })),
      transition('inactive => active', animate('100ms 100ms ease-in')),
      transition('active => inactive', animate('100ms  ease-out'))
    ]),
  ]
})
export class CourseComponent implements OnInit {
  userNotificationList: FirebaseListObservable<any[]>;
  userNotification: FirebaseListObservable<any>;
  isCompleted: boolean;
  menuMobState: string = "inactive";
  iconMobState:string = "active";
  iconExitMobState:string = "inactive"
  timer:any;
  userList:FirebaseListObservable<any[]>;
  courseLessons:Lesson[] = [];
  id:string;
  courseName:string;
  activeCourses:any;
  currentLesson:number = 0;
  courseId:number = 0;
  activeCoursesKey:string = "";
  granted:boolean=false;
  idProduct:string;

  constructor(private route: ActivatedRoute,
    private location: Location,private db:AngularFireDatabase,
     private router:Router) { }

  ngOnInit() {
    this.scrollTop();    
    this.route.paramMap.switchMap(
        (params:ParamMap)=> {

          return this.db.object("/Course/"+ params.get("id"));
        }
    ).subscribe(
      course =>{
        this.courseName = course.name;
        this.idProduct = course.productVirtual;
        course.lessons.forEach(element => {
          var theLesson = new Lesson(
            element.name,
            element.videoURL,
            element.desc,
            true
            );
          this.courseLessons.push(theLesson); 
        });
        this.courseLessons[0].setIsCurrent(true);
      }   
    ); 

    this.id = localStorage.getItem('currentUser');
      
    this.route.paramMap.switchMap(
        (params:ParamMap)=> {
          return this.db.list("/User/"+ this.id +"/activeCourses/", 
        { query: {
            orderByChild: "idCourse",
            equalTo: params.get("id")
          }});
        }
    ).subscribe(
      activeCourse =>{      
        
        if(activeCourse.length >0){
          let actCour = activeCourse[0];
          let expDate = new Date(actCour.expDate);
          let todDate = new Date();
  
          if(expDate > todDate){
            this.activeCourses = activeCourse;
            this.courseId = this.activeCourses[0].idCourse;
            this.activeCoursesKey = this.activeCourses[0].$key;
            this.timer = window.setTimeout(()=>this.setAccomplished(this.activeCourses[0].achieved),200);            
            this.granted=true;
          }else{
            alert("Tiempo de prueba expirado, adquiera nuestro producto para poder acceder");
            this.router.navigate(['/product-detail/'+ this.idProduct]);
          }

        }else{
          alert("Adquiera nuestro producto para poder acceder");
          this.router.navigate(['/product-detail/'+ this.idProduct]);
        }
        
        ; 
      }   
    );
    
  }
  
  isGranted():boolean{
    return this.granted;
  }

  setAccomplished(accomp:number):void{

    for(let i = 0; i< this.courseLessons.length; i++){
      if(i<accomp){
        this.courseLessons[i].setIsAccomplished(true);
      }else{
        this.courseLessons[i].setIsAccomplished(false);
      }
    }

    if(accomp == this.courseLessons.length ){
      this.isCompleted = true;
      this.setCompletedAlert(this.isCompleted);
    }

  }

    setMenuMobState(state:boolean){
      if(state){
        (this.menuMobState==="inactive")? this.menuMobState="active":this.menuMobState="inactive";
        (this.iconMobState==="inactive")? this.iconMobState="active":this.iconMobState="inactive";
        (this.iconExitMobState==="inactive")? this.iconExitMobState="active":this.iconExitMobState="inactive";
      }else{
        this.menuMobState = "inactive";
        this.iconMobState = "active";
        this.iconExitMobState = "inactive";
      }    
    }

    setActiveLesson(index:number){
      for(let i = 0; i< this.courseLessons.length; i++){
          if(i == index){
            this.courseLessons[i].setIsCurrent(true);
            this.currentLesson = i;

          }else{
            this.courseLessons[i].setIsCurrent(false);
          } 
      }
      
      this.setMenuMobState(false);
    }

    scrollTop():void{
      $('html,body').animate({
      scrollTop:0
    },200);
  }

    getMenuMobState():string{
      return this.menuMobState;
    }

    getIconMobState():string{
      return this.iconMobState;
    }

    getIconExitMobState():string{
      return this.iconExitMobState;
    }

    nextLesson(index:number):void{

 
      
      if(index+1 == this.activeCourses[0].achieved && index<this.courseLessons.length){

        this.userList= this.db.list("/User/"+this.id+"/activeCourses/");

        this.userList.update(this.activeCoursesKey,{
          achieved: index+2,  
          idCourse: this.courseId,                        
        }).catch(
          err => {
            console.error(err);
          }
        );



       var activeCourses = this.db.list("/User/"+ this.id +"/activeCourses/", 
        { query: {
            orderByChild: "idCourse",
            equalTo: this.courseId,
          }});
        
        activeCourses.forEach(element=>{
          this.activeCourses = element;
        })

          this.setActiveLesson(index+1);
        

       }else if(index<this.activeCourses[0].achieved-1){
        this.setActiveLesson(index+1);
       }
    }

    prevLesson(index:number):void{
      this.setActiveLesson(index-1);
    }

    showButton(index:number,button:string):boolean{
      if(button == "previous"){
        if(index>0){
          return true;
        }else{
          return false;
        }
      }else if(button == "next"){
        if(index < this.courseLessons.length-1){          
          return true;      

        }else{
          return false;
        }

      }

    }

    getIsCompleted():boolean{
      return this.isCompleted;
    }
   
    setCompletedAlert(completed:boolean):void{
      this.userNotification = this.db.list("/CompletedCourse/"+ this.courseId + "/" + this.id + "/");
      this.userNotification.subscribe(notification=>{
        console.log(notification)
        if(!notification.length && completed){
          console.log("se va a llenar la tabla CompletedCourse")
          this.userNotificationList = this.db.list("/CompletedCourse/"+ this.courseId + "/");
          this.userNotificationList.update(this.id,{
            date: new Date(),
          });
        }else{
          console.log("ya existe el usuario en esta tabla")
        }

      })
    }
    
  
}


