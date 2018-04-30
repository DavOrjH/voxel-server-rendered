import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { FirebaseApp } from 'angularfire2';
import { User } from 'app/user';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserDataService {
  private subject = new Subject<any>();

  private user:User;
  constructor(private fireBaseApp:FirebaseApp) {

   }

   init():void{
    var id = localStorage.getItem("currentUser");
    if(id){
        var ref = this.fireBaseApp.database().ref().child("/User/"+id);
         ref.on("value", this.setUser.bind(this));
    }
   }
   setUser(user):void{
    let data = user.val();
    this.user= new User(data.firstName,data.lastName,
                data.phone, 
                data.phone2,
                data.photoURL,
                data.email,
                data.email2,
                data.country,
                data.city,
                new Date(data.createdAt),
                new Date(data.updatedAt),
                new Date(data.lastLogin),
                data.active,
                data.completed,
                data.userRole); 
    if(data.activeCourses){
      for(var i = 0;i<data.activeCourses.length;i++){
        this.user.addActiveCourse(data.activeCourses[i]);
      }
    }
    if(data.purchases){
      for(var i = 0;i<data.purchases.length;i++){
        this.user.addPurchase(data.purchases[i]);
      }
    }
    this.subject.next(this.user);
    
   }

   getUser():Observable<any> {
    return this.subject.asObservable();
   }

}
