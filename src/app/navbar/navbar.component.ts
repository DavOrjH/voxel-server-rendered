import { Component, OnInit,Input } from '@angular/core';
import {Menu} from './menu';
import {SubMenu} from './submenu';
import {Item} from './item';
import { NgModule, EventEmitter, Output, HostListener, AfterViewInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { AngularFireAuth } from "angularfire2/auth";
import { Observable } from "rxjs/Observable";
import * as firebase from 'firebase/app';
import { Subscription } from "rxjs";
import { UserRoleService } from "app/user-role.service";
import { UserCompleteService } from 'app/user-complete.service';
import { UserActiveCoursesService } from 'app/user-active-courses.service';
import { UserDataService } from 'app/user-data.service';
import {LoginFirebaseComponent} from "app/login-firebase/login-firebase.component"

declare var jQuery:any;
declare var $:any;


@Component({
  selector: 'my-navbar', 
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  animations: [
    trigger('menuState', [
      state('inactive', style({
          transform: 'translateX(-300%)',

      })),
      state('active',   style({
        transform: 'translateX(0%)'
      })),
      transition('inactive => active', animate('400ms ease-in')),
      transition('active => inactive', animate('400ms ease-out'))

    ]
  ),
  trigger('menubarState', [
    state('active',style({
      backgroundColor: 'rgba(0,0,0,0.7)',
      color: 'white',
      'fontWeight': 'bold',
    })),
    state('inactive', style({
      backgroundColor: 'white',
      color: 'rgb(102,102,102)',
      'fontWeight': 'normal',
    })),
    transition('* => active',animate('300ms ease-in')),
    transition('active => *',animate('300ms ease-out'))
  ]),

  trigger('menumobState', [
    state('inactive', style({
      transform: 'translateX(-200%)'
    })),
    state('active',   style({
      transform: 'translateX(0%)'
    })),
    transition('inactive => active', animate('400ms ease-in')),
    transition('active => inactive', animate('400ms ease-out'))
  ]),

  trigger('iconmobState', [
    state('inactive', style({
      color: 'black',
    })),
    state('active',   style({
      color:'white',
      backgroundColor: 'black',
    })),
    transition('inactive => active', animate('100ms ease-in')),
    transition('active => inactive', animate('100ms ease-out'))
  ]),

    trigger('pretty-slider-act', [
      state('inactive', style({
        transform: 'scale(0)',        
        })),
      state('active',   style({
          transform: 'scale(1)'
      })),
      transition('inactive => active', animate('200ms ease-in')),
      transition('active => inactive', animate('200ms ease-out'))

]),
  ]
})
export class NavbarComponent implements OnInit,AfterViewInit {
  key: string;
    // this output give the user information trhough the components to AppComponent (root)
  @Output() exampEvent= new EventEmitter();
  @Input() menuBar: Menu[];

  

  prettySliderState:string = "inactive";
  menuListStatus: boolean = false;
  responsive:boolean=false;
  mobState:String="inactive";
  ALL:number =100;
  user: Observable<firebase.User>;
  userRole:string;
  subscription:Subscription;

  constructor(public afAuth:AngularFireAuth,private userRoleService:UserRoleService, 
             private userCompleteService:UserCompleteService,
              private userActiveCourses:UserActiveCoursesService,
            private userDataService:UserDataService,
           ) { 
    this.user=afAuth.authState; 
    this.subscription=this.userRoleService.getUserRole().subscribe(
      role =>{
        this.userRole=role;
      }
    );
  }

  ngOnInit() {
    this.userRoleService.init();
    this.userDataService.init();
   
  }

  ngAfterViewInit(){
 
  }
  logout() {
    this.scrollTop()
    this.setmobState()
    this.afAuth.auth.signOut();
    this.setMenuListStatus();
    localStorage.removeItem('currentUser');
    this.userCompleteService.init();
    this.userActiveCourses.getFirebaseUserData();
  }
  isAdmin():boolean{
    return this.userRole==="Admin";
  }
  getMenuListStatus():boolean{
    return this.menuListStatus;
  }
  isResp():boolean{
    return this.responsive;
  }

  getmobState():String{
    return this.mobState;
  }

  setmobState():void{
    (this.mobState==="active")?this.mobState='inactive':this.mobState='active'
  }
  setResp():void{
    this.responsive=this.responsive;
    this.setmobState();
  }
  getMenuBar(){
    return this.menuBar;
  }
  showSubcat(index:number):void{
    this.menuBar[index].setActive(true);
    for (let i = 0; i < this.menuBar.length; i++) {
      if (i!=index) {
          this.menuBar[i].setActive(false);
      }
    }
  }
  scrollTop():void{
     $('html,body').animate({
      scrollTop:0
    },200);
  }
  setMobStateScroll():void{
      this.setmobState();
      this.scrollTop();
  }
  scrollSetActive(index:number):void{
    this.setActive(index);
    this.scrollTop();
  }

  getSubMenuBar(){
    return this.menuBar;
  }
  
  setActive(index:number):void{
    if(index==this.ALL){
      for (let i = 0; i < this.menuBar.length; i++) {
            this.menuBar[i].setState(false);
        }
    }else{
      this.menuBar[index].setState(true);
      for (let i = 0; i < this.menuBar.length; i++) {
        if (i!=index) {
            this.menuBar[i].setState(false);
        }
      }
    }

  }

  setMenuListStatus(){
    (this.menuListStatus===false)? this.menuListStatus=true:this.menuListStatus=false;
  }

  setOverTrue(){
    this.menuListStatus=true;
  }

  setOverFalse(){
    this.menuListStatus=false;
  }

  getPrettySliderState():string{
    return this.prettySliderState;
  }

  ngOnDestroy() {
    }

    inactivePrettyState(){    
     this.prettySliderState = "inactive"
    }
    activePrettyState(){
      this.prettySliderState = "active"
    }

    @HostListener('document:keydown', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent)  {
      this.key = event.key;
      if(this.key === "Escape"){
        this.inactivePrettyState();
      }
    }
}
