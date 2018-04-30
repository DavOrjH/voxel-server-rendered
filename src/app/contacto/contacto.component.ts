import { Component, OnInit, AfterViewInit, OnDestroy, HostListener } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";
import { Observable } from "rxjs/Observable";
import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from 'firebase/app';
import { FirebaseApp } from 'angularfire2';
import { Http, RequestOptionsArgs , Headers} from '@angular/http';

declare var $:any;
declare var Jquery:any;

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit, AfterViewInit, OnDestroy {
  modelUser: any = {};
  commercialData: any =[];
  commercialList: FirebaseListObservable<any[]>;
  user: Observable<firebase.User>;
  userRef:any;
  model={
    name:"",
    email:"",
    phone:"",
    subject:"",
    message:"",
    agreement:false,
  };
  reqURL:string = "https://voxel3d.herokuapp.com/apis/email-req"//""
  loading:any;
  isComingWayActive:boolean = false;
  isHotelsActive:boolean = false;
  isRestaurantsActive:boolean = false;
  topDist:number;

  constructor(private db:AngularFireDatabase,
              private http:Http,
    public afAuth:AngularFireAuth, private fireBaseApp:FirebaseApp){
      this.getFirebaseUserData();
      this.queryCommercials();
      
     }

  ngOnInit() {
   
  }

  ngAfterViewInit(){
    this.getTopDist();
  }

  ngOnDestroy(){ 

  }

  queryCommercials(){
    this.commercialList = this.db.list('/User', {
      query: {
        orderByChild: "userRole",
        equalTo: "Comercial"
      }
    });    
  this.commercialList.forEach(this.storeCommercials.bind(this));  
  }

  getFirebaseUserData():void{
    if(localStorage.getItem('currentUser')){
      var id = localStorage.getItem("currentUser");     
      this.userRef = this.fireBaseApp.database().ref('/User/'+id);
      this.userRef.once("value",
        userData =>{
           this.modelUser=userData.val();         
           this.storeUserData();
        }
      ); 
    }   
  }

  storeUserData(){
    this.model.name = this.modelUser.firstName + ' ' + this.modelUser.lastName;
    this.model.email = this.modelUser.email;
    this.model.phone = this.modelUser.phone;
  }

 
  storeCommercials(users):void{
        users.forEach(user => {
        if(user.completed === "completed"){
          this.commercialData.push(user);
        }  
      });    
    }

  getIsComingWayActive():boolean{
    return this.isComingWayActive
  }

  getIsHotelsActive():boolean{
    return this.isHotelsActive
  }

  getIsRestaurantsActive():boolean{
    return this.isRestaurantsActive
  }

  getTopDist():void{
    this.topDist=$('#info-limit').offset().top-134
  }

  setSectionActive(section:string){
    if(section === "comingWay"){
      this.isComingWayActive = true;
      this.isHotelsActive = false;
      this.isRestaurantsActive = false;
    }else if(section === "hotels"){
      this.isComingWayActive = false;
      this.isHotelsActive = true;
      this.isRestaurantsActive = false;
    }else if(section === "restaurants"){
      this.isComingWayActive = false;
      this.isHotelsActive = false;
      this.isRestaurantsActive = true;
    }
    $('html,body').animate({
      scrollTop:this.topDist
    },200);
  }

  
  checkEmail(email):boolean{
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  sendMessage(){
    
    let headers = new Headers();
    headers.append("Content-Type","application/json");
    headers.append("Accept","application/json");
    let options:RequestOptionsArgs = {
      headers: headers
    };
    let body = this.model
    //make de request
   this.http.post(this.reqURL,body,options).subscribe(
      res =>{
        //handle response
        if (res.status ==200){
          alert("mail enviado con exito");
        }
        //this.setLoading(false);
      }
    );  
  }

  @HostListener('window:resize', ['$event'])
  onResize($event:any){
    this.getTopDist(); 
    }

}


