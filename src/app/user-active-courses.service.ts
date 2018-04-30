import { Injectable } from '@angular/core';
import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from 'firebase/app';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";
import { Observable } from "rxjs/Observable";
import { FirebaseApp } from "angularfire2";
import { Subscription } from 'rxjs';

@Injectable()
export class UserActiveCoursesService {

  constructor(private fireBaseApp:FirebaseApp) { }

  subscription:Subscription;
  userRole:string;
  db: AngularFireDatabase;    
  user: Observable<firebase.User>;
  userRef:any;
  activeCourses:any=[];

  

  getFirebaseUserData():void{
    var id = localStorage.getItem("currentUser");
    //console.log(id);
    if(id){
      this.userRef = this.fireBaseApp.database().ref('/User/'+id + "/activeCourses/");
      this.userRef.once("value",
        userCourses =>{
           this.activeCourses=userCourses.val();
        }
      );
    }
    
  }

  getActiveCourses():any{
    console.log(this.activeCourses);
    return this.activeCourses;
  }

}
