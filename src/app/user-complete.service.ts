import { Injectable, OnInit } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { AngularFireDatabase } from "angularfire2/database";
import { FirebaseApp } from "angularfire2";


@Injectable()
export class UserCompleteService implements OnInit{
  private subject = new Subject<any>();
  private isCompleted:string;

  constructor(private fireBaseApp:FirebaseApp){
  }

  ngOnInit(){
    //this.init();
  }
  init():void{
      var id = localStorage.getItem("currentUser");
      if(id){
          var ref = this.fireBaseApp.database().ref().child("/User/"+id+"/completed");
            ref.on("value", this.setUserState2.bind(this));          
      }     
  }
  
  setUserState2(newState):void{ // when the session is already started
      this.isCompleted=newState.val();
     // console.log(newState.val());
      this.subject.next(newState.val());
    
  }

  setUserState(newState):void{// when the session is starting
      this.isCompleted=newState;
      this.subject.next(newState);
  }
  clearMessage() {
      this.subject.next();
  }
  getIsCompleted():string{
/*       this.init()
     
       */
      console.log(this.isCompleted);
      return this.isCompleted;
      
  }
  getUserState(): Observable<any> {
      return this.subject.asObservable();
  }

}
