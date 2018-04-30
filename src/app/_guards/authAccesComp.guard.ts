import { Injectable, OnInit } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserRoleService } from "app/user-role.service";
import { Subscription } from "rxjs";
import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from 'firebase/app';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";
import { Observable } from "rxjs/Observable";
import { FirebaseApp } from "angularfire2";

@Injectable()
export class AuthCourseGuard implements CanActivate,OnInit {
    subscription:Subscription;
    userRole:string;
    db: AngularFireDatabase;    
    user: Observable<firebase.User>;
    userRef:any;
    activeCourses:any=[];

    constructor(private router: Router, public afAuth:AngularFireAuth, db:AngularFireDatabase,
        private fireBaseApp:FirebaseApp) {
        this.db=db;
        this.user=afAuth.authState;
        //this.getfirebaseUserData();
     }
    ngOnInit(){
        
    }

    getfirebaseUserData():void{
        var id = localStorage.getItem("currentUser");
        this.userRef = this.fireBaseApp.database().ref('/User/'+id + "/activeCourses/");
        this.userRef.once("value",
          userCourses =>{
             this.activeCourses=userCourses.val();
          }
        );
      }

      
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        

        if (localStorage.getItem('currentUser')) {
            this.getfirebaseUserData();
            let cState:boolean = false;
            // logged in
             
            
            for(let i = 0; i<this.activeCourses.length; i++) {
                console.log(this.activeCourses[i].idCourse);

                if( route.params.id === this.activeCourses[i].idCourse){
                    cState = true;
                    break;                    
                }else{                    
                    
                }                        
            }
            if(!cState){
                let product:any;
                this.fireBaseApp.database().ref('/Course/'+ route.params.id + "/productVirtual/")
                                    .once("value", prod => product=prod.val());
                                    
                this.router.navigate(['/product-detail',product]);
                alert("adquiera nuestro producto para poder acceder");
               }
               
               return cState     
            
        }else{
            //not logged so, redirect to index
            this.router.navigate(['/login-firebase']);
            alert("Debe loguearse para acceder");
            // not logged in so redirect to login page with the return url
            // this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
            return false;
        }
        
    }
}