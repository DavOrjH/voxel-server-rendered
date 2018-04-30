import { Injectable, OnInit } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserRoleService } from "app/user-role.service";
import { Subscription } from "rxjs";
import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from 'firebase/app';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";
import { Observable } from "rxjs/Observable";
import { FirebaseApp } from "angularfire2";
import { UserActiveCoursesService } from 'app/user-active-courses.service';

@Injectable()
export class AuthCourseGuard implements CanActivate,OnInit {
    subscription:Subscription;
    userRole:string;
    db: AngularFireDatabase;    
    user: Observable<firebase.User>;
    userRef:any;
    activeCourses:any=[];

    constructor(private router: Router, public afAuth:AngularFireAuth, db:AngularFireDatabase,
        private fireBaseApp:FirebaseApp, private userActiveCourses:UserActiveCoursesService) {
        this.db=db;
        this.user=afAuth.authState;
        //this.getfirebaseUserData();
     }
    ngOnInit(){
        this.getfirebaseUserData();
        
    }

    getfirebaseUserData():void{
       this.activeCourses = this.userActiveCourses.getActiveCourses();
       console.log("-----------------------------------------------------------------------------");
       console.log(this.activeCourses);
       console.log(this.activeCourses.length);
       console.log(this.activeCourses[0]);
      }

      
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        this.getfirebaseUserData();
        let cState:boolean = false;
        let product:any;
        

        if (localStorage.getItem('currentUser')) {
            
            if(this.activeCourses.length != 0){

                console.log(this.activeCourses)
                
                for(let i = 0; i<this.activeCourses.length; i++) {
                    console.log(this.activeCourses[i].idCourse + " " + route.params.id );
    
                    if( route.params.id == this.activeCourses[i].idCourse){
                        cState = true;
                        return true
                                          
                    }                   
                }
                if(!cState){
                    
                    this.fireBaseApp.database().ref('/Course/'+ route.params.id + "/productVirtual/")
                                        .once("value", prod => product=prod.val());
                                        
                    this.router.navigate(['/product-detail',product]);
                    alert("adquiera nuestro producto para poder acceder");
                   }
                   
                   return cState 

            }else{          

                
    //                  this.fireBaseApp.database().ref('/Course/'+ route.params.id + "/productVirtual/")
    //                  .once("value", prod => product=prod.val());
                
                this.router.navigate(['/home']);
                alert("adquiera nuestro producto para poder acceder (no hay activecourses array)");
                return cState   

            }
    
            
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