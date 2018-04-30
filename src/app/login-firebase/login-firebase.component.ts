import { Component, OnInit, HostListener } from '@angular/core';
import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from 'firebase/app';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from "angularfire2/database";
import { Observable } from "rxjs/Observable";
import { User } from "firebase/app";
import { Router} from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { NgForm } from "@angular/forms/src/forms";
import { Subject } from "rxjs";
import { UserRoleService } from "app/user-role.service";
import {FirebaseApp} from 'angularfire2';
import { UserCompleteService } from 'app/user-complete.service';
import { UserActiveCoursesService } from 'app/user-active-courses.service';

@Component({
  selector: 'login-firebase',
  templateUrl: './login-firebase.component.html',
  styleUrls: ['./login-firebase.component.css'],
  animations: [
    trigger('pretty-popup-act', [
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
]
})
export class LoginFirebaseComponent implements OnInit{

  popUpState:string = "inactive"
  userRef:FirebaseListObservable<any>;
  user: Observable<firebase.User>;
  model: any = {}; // stores form user data
  isLogin:boolean=true;
  menuListStatus:boolean = false;
  loading = false;
  db:AngularFireDatabase;

  constructor(
        db:AngularFireDatabase,
        public afAuth:AngularFireAuth,
        private router: Router,
        private userRoleService:UserRoleService,
        private fireBaseApp:FirebaseApp,
        private userCompleteService:UserCompleteService, 
        private userActiveCourses:UserActiveCoursesService) {
    this.db=db;
    this.user=afAuth.authState;
  }
  ngOnInit(){

  }

  getPopUpState():string{
    return this.popUpState;
  }

  setPopUpState(state):void{
    this.popUpState = state;
  }

   register(): void {
      this.afAuth.auth.createUserWithEmailAndPassword(this.model.email,this.model.password).catch(function(err){
        ///TODO handle errors
        console.error(err);
        alert(err.message);
      }).then(this.pushUser.bind(this));
  }
  pushUser(that:any):void{
    this.grantUserAccess();
    this.afAuth.auth.currentUser.updateProfile({
      displayName:this.model.firstName,
      photoURL:"../../assets/icons/Login 2.png"
    });
    
    this.db.object('/User/'+this.afAuth.auth.currentUser.uid).set({
      email: this.model.email,
      email2:this.model.emailn2?this.model.emailn2:'n/a',
      firstName: this.model.firstName,
      lastName:this.model.lastName,
      userRole:"Regular",
      createdAt:new Date().toJSON(),
      lastLogin:new Date().toJSON(),
      updatedAt:new Date().toJSON(),
      active:true,
      completed:"completed",
      phone:this.model.phone,
      phone2:this.model.phone?this.model.phone:"n/a",
      country:this.model.country,
      city:this.model.city,
      photoURL:"../../assets/icons/Login 2.png",
      activeCourses:[],
      purchases:[],
    });
    // window.location.reload();
  }
  grantUserAccess(){
      localStorage.setItem('currentUser', this.afAuth.auth.currentUser.uid);
      var id = this.afAuth.auth.currentUser.uid;
      var ref = this.fireBaseApp.database().ref().child("/User/"+id+"/userRole");
      ref.on("value", this.setUserRole.bind(this));
  }
    setUserRole(newRole){
      this.userRoleService.setUserRole(newRole.val());
    }

  pushUserPasword():void{
    var user = this.afAuth.auth.currentUser;
    var userRef =this.db.object('/User/'+user.uid);
        userRef.update({
            lastLogin:new Date().toJSON(),
          }).catch(
            err =>{
              console.error(err);
            }
        );
        var roleRef= this.fireBaseApp.database().ref("User/"+user.uid+'/userRole');
        roleRef.once("value").then(
          role =>{
            this.userRoleService.setUserRole(role.val());
          }
        );
        this.grantUserAccess();
        this.userCompleteService.init();
        this.userActiveCourses.getFirebaseUserData();
        window.location.reload();
  }

  loginUserPswd():void{
    this.afAuth.auth.signInWithEmailAndPassword(this.model.email1,this.model.password1).catch(
      function(err){
        console.error(err);
      }
    ).then(this.pushUserPasword.bind(this));
    this.router.navigate(["/home"]);
    this.userCompleteService.init();
    this.userActiveCourses.getFirebaseUserData();
    // window.location.reload();
  }


    loginGoogle() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(this.pushUserGoogle.bind(this))
    // TODO: manejar excepciones !!!
    this.userCompleteService.init();
    this.userActiveCourses.getFirebaseUserData();

    }

  pushUserGoogle():void{
    
    var user = this.afAuth.auth.currentUser;
    var id = this.afAuth.auth.currentUser.uid;
    var ref =  this.fireBaseApp.database().ref().child("/User/");
    ref.once("value").then(
      snapshot =>{
        var exist = snapshot.hasChild(id);
        user = this.afAuth.auth.currentUser;
        if(exist){
          var userRef =this.db.object('/User/'+user.uid);
          userRef.update({
              lastLogin:new Date().toJSON(),
            }).catch(
              err =>{
                console.error(err);
              }
          );
          var roleRef= this.fireBaseApp.database().ref("User/"+user.uid+'/userRole');
          roleRef.once("value").then(
            role =>{
              this.userRoleService.setUserRole(role.val());
              
            }
          );
          

        }else{
           this.db.object('/User/'+user.uid).set({
              email: user.email,
              email2: "",
              firstName: user.displayName,
              lastName:"",
              userRole:"Regular",
              createdAt:new Date().toJSON(),
              updatedAt:new Date().toJSON(),
              lastLogin:new Date().toJSON(),
              active:true,
              completed:false,
              phone:"",
              phone2: "",
              country: "",
              city:"",
              photoURL: user.photoURL,
              activeCourses:[],
              purchases:[],
            }).catch(
              err =>{
                console.error(err);
              }
          );
        }
        // this.router.navigate(["/home"]);
        window.location.reload();
      }
    );
     this.grantUserAccess();
     this.userCompleteService.init();
     this.userActiveCourses.getFirebaseUserData();
    
   
  }
loginFacebook():void{
  var facebookProv = new firebase.auth.FacebookAuthProvider();
  facebookProv.addScope('public_profile');
  this.afAuth.auth.signInWithPopup(facebookProv).catch(
    err =>{
      if(err.message=="An account already exists with the same email address but different sign-in credentials. Sign in using a provider associated with this email address."){
        alert("no se puede loggear con el mismo correo bajo google y facebook");
      }else{
        console.error(err);
      }
      
    }
  ).then(this.pushUserFacebook.bind(this));
  this.userCompleteService.init();
  this.userActiveCourses.getFirebaseUserData();
}

pushUserFacebook(res):void{
  var profile = res.additionalUserInfo.profile;
  var user = this.afAuth.auth.currentUser;
  var id = this.afAuth.auth.currentUser.uid;
  var ref =  this.fireBaseApp.database().ref().child("/User/");

  ref.once("value").then(
      snapshot =>{
        var exist = snapshot.hasChild(id);
        user = this.afAuth.auth.currentUser;
        if(exist){
          var userRef =this.db.object('/User/'+user.uid);
          userRef.update({
              lastLogin:new Date().toJSON(),
              photoURL: profile.picture.data.url
            }).catch(
              err =>{
                console.error(err);
              }
          );
          var roleRef= this.fireBaseApp.database().ref("User/"+user.uid+'/userRole');
          roleRef.once("value").then(
            role =>{
              this.userRoleService.setUserRole(role.val());
            }
          );
          

        }else{
           this.db.object('/User/'+user.uid).set({
              email: user.email,
              email2: "",
              firstName: user.displayName,
              lastName:"",
              userRole:"Regular",
              createdAt:new Date().toJSON(),
              updatedAt:new Date().toJSON(),
              lastLogin:new Date().toJSON(),
              active:true,
              completed:"noncompleted",
              phone:"",
              phone2: "",
              country: "",
              city:"", 
              photoURL: profile.picture.data.url,
              activeCourses:[],
              purchases:[],
            }).catch(
              err =>{
                console.error(err);
              }
          );
        }
        // this.router.navigate(["/home"]);
        window.location.reload();
      }
    );
     this.grantUserAccess();
     this.userCompleteService.init();
     this.userActiveCourses.getFirebaseUserData();
}


/// form manage methods
  checkPassword(pass1:any, pass2:any):boolean{
    if(pass1 === pass2){
      return true;
    }else{
      return false;
    }

  }
  checkEmail(email):boolean{
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
    }
  setIsLogin():void{
    this.isLogin= !this.isLogin;
  }
  onFormSubmit(userForm: NgForm) {
      if(userForm.valid && this.checkPassword(this.model.password, this.model.password2)===true && this.checkEmail(this.model.email)===true){
        this.register();
        this.router.navigate(["/home"]);

      }else{
        alert("formulario inconsistente, por favor revise los datos");
        this.router.navigate(["/login-firebase"]);
      }
  }


  }
