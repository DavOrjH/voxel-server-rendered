import { Injectable, OnInit } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { AngularFireDatabase } from "angularfire2/database";
import { FirebaseApp } from "angularfire2";

@Injectable()
export class UserRoleService{
    private subject = new Subject<any>();
    private isAdmin:boolean;
   constructor(private fireBaseApp:FirebaseApp){
   }
   init():void{
       var id = localStorage.getItem("currentUser");
       if(id){
           var ref = this.fireBaseApp.database().ref().child("/User/"+id+"/userRole");
            ref.on("value", this.setUserRole2.bind(this));
       }
   }
    setUserRole2(newRole):void{ // when the session is already started
        this.isAdmin=newRole.val()=="Admin"?true:false;
        this.subject.next(newRole.val());
    }

    setUserRole(newRole):void{// when the session is starting
        this.isAdmin=newRole=="Admin"?true:false;
        this.subject.next(newRole);
    }
    clearMessage() {
        this.subject.next();
    }
    getIsAdmin():boolean{
        return this.isAdmin;
    }
    getUserRole(): Observable<any> {
        return this.subject.asObservable();
    }
}