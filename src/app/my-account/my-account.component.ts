import { Component, OnInit} from '@angular/core';
import {LoginFirebaseComponent} from '../login-firebase/login-firebase.component';
import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from 'firebase/app';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";
import { Observable } from "rxjs/Observable";
import { NgForm } from "@angular/forms/src/forms";
import { FirebaseApp } from "angularfire2";
import { UserDataService } from 'app/user-data.service';
import { Subscription } from 'rxjs';
import { User } from 'app/user';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {
  db: AngularFireDatabase;

  user: Observable<firebase.User>;
  editStatus:boolean = false;
  model:any={};
  userRef:any;
  private currentUser:User
  userSubscription:Subscription;
  coursesId:any[] = [];
  courses:any[]=[];

  constructor(db:AngularFireDatabase,
              public afAuth:AngularFireAuth,
              private fireBaseApp:FirebaseApp,
              private userService:UserDataService
            ) {
   
    this.db=db;
    this.user=afAuth.authState;
    this.getfirebaseUserData();
    
    this.userSubscription=this.userService.getUser().subscribe(
      user =>{
        this.coursesId= [];
        this.courses=[];
        this.currentUser= user as User;
        this.coursesId = this.currentUser.getActiveCourses();
        this.storeCourses();
      
      }
    );

    
  }

  ngOnInit(){
    this.userService.init();

  }

  storeCourses():void{
    this.coursesId.forEach(course=>{
      let courseData:any={
       id: course.idCourse
      };      
      this.db.object("/Course/"+course.idCourse).forEach(courseD =>{         
        courseData.name = courseD.name;
        courseData.mainImageURL = courseD.mainImageURL;
        courseData.cenefaURL = courseD.cenefaURL;  
      });
      this.courses.push(courseData);
    });
  }
  

  searchCourseName(id:string):string{    
        let name:string;
        this.db.object("/Course/"+id).forEach(course =>{
          name = course.name;  
        });         
        return name
  }

  searchCourseLabel(id:string):string{    
    let name:string;
    this.db.object("/Course/"+id).forEach(course =>{
      name = course.cenefaURL;  
    });         
    return name
}

searchCourseMainImage(id:string):string{    
  let name:string;
  this.db.object("/Course/"+id).forEach(course =>{
    name = course.mainImageURL;  
  });         
  return name
}


  

  getfirebaseUserData():void{
    var id = localStorage.getItem("currentUser");
    this.userRef = this.fireBaseApp.database().ref('/User/'+id);
    this.userRef.once("value",
      userData =>{
         this.model=userData.val();
      }
    );
  }


  getEditStatus():boolean{
    return this.editStatus;
  }

  setEditStatus(){
    this.editStatus=!this.editStatus;
  }

  cancelOption():void{
    this.setEditStatus();
    this.getfirebaseUserData();
  }

  updateData():void{
    console.log("update called");
    var id = localStorage.getItem("currentUser");
    var writeRef = this.db.object('/User/'+id);
    writeRef.update({
      firstName: this.model.firstName,
      email2:this.model.email2?this.model.email2:"",
      lastName: this.model.lastName,
      phone: this.model.phone,
      updatedAt: new Date().toJSON(),
      completed:"completed",
      phone2:this.model.phone2?this.model.phone2:"",
      country:this.model.country,
      city:this.model.city, 
    }).catch(
      err =>{
        console.error(err);
      }
    ).then(this.getfirebaseUserData.bind(this) ).then(this.setEditStatus.bind(this));
  }


}
