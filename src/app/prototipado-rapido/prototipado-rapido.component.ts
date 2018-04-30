import { Component, OnInit, AfterViewInit, OnDestroy, HostListener } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";
import { Observable } from "rxjs/Observable";
import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from 'firebase/app';
import { FirebaseApp } from 'angularfire2';
import { Http, RequestOptionsArgs , Headers} from '@angular/http';
import { Images } from 'app/pretty-slider/images';


@Component({
  selector: 'app-prototipado-rapido',
  templateUrl: './prototipado-rapido.component.html',
  styleUrls: ['./prototipado-rapido.component.css']
})
export class PrototipadoRapidoComponent implements OnInit {


  stlSlider:Images[] = [
    new Images("http://assets.voxel3d.net/prototipado-rapido/impresionAnilloSTL.jpg", "Impresión de anillo en STL" ),
    new Images("http://assets.voxel3d.net/prototipado-rapido/impresionAnilloSTL2.jpg", "Impresión de anillo en STL" ),
    new Images("http://assets.voxel3d.net/prototipado-rapido/muestraCocoChannelSTL.jpg", "Muestra de Coco Channel" ),
    new Images("http://assets.voxel3d.net/prototipado-rapido/muestraCocoChannelSTL2.jpg", "Muestra de Coco Channel" ),
    new Images("http://assets.voxel3d.net/prototipado-rapido/muestraCocoChannelSTL3.jpg", "Muestra de Coco Channel" ),
  ]

  fffSlider:Images[] = [
    new Images("http://assets.voxel3d.net/prototipado-rapido/casaPuritanaFFF.jpg", "Casa puritana" ),
    new Images("http://assets.voxel3d.net/prototipado-rapido/hormaDeZapatoFFF.jpg", "Horma de zapato" ),
    new Images("http://assets.voxel3d.net/prototipado-rapido/impresionDobleFilamentoFFF.jpg", "Impresión de filamento" ),
    new Images("http://assets.voxel3d.net/prototipado-rapido/impresionEnTPUFlexibleFFF.jpg", "Impresión en TPU flexible" ),
    new Images("http://assets.voxel3d.net/prototipado-rapido/torreFosterFFF.jpg", "Torre Foster" ),

  ]
  modelUser: any = {};
  user: Observable<firebase.User>;
  userRef:any;
  model={
    name:"",
    city:"",
    email:"",
    phone:"",
    entity:"",
    entityName:"",
    size:"",
    resinType:"",
    resolution:"",
    isRubber:"",
    isFoundry:"",
    addInfo:" ",    
    agreement:false,
  };
  model2={
    name:"",
    city:"",
    email:"",
    phone:"",
    entity:"",
    entityName:"",
    size:"",
    materialType:"",
    otherMaterial:"",
    color:"",
    resolution:"",    
    addInfo:" ",    
    agreement:false,
  };
  reqURLSTL:string = "https://voxel3d.herokuapp.com/apis/stl-req" //""
  reqURLFFF:string = "https://voxel3d.herokuapp.com/apis/fff-req" //""
  loading:any;
  isComingWayActive:boolean = false;
  isHotelsActive:boolean = false;
  isRestaurantsActive:boolean = false;
  topDist:number;
  sltActive:boolean = false;
  fffActive:boolean = false;

  
  constructor(private db:AngularFireDatabase,
    private http:Http,
    public afAuth:AngularFireAuth, private fireBaseApp:FirebaseApp) { 
      this.getFirebaseUserData();
    }
  
  ngOnInit() {
  }

  isSltActive():boolean{
    return this.sltActive;
  }

  isFffActive():boolean{
    return this.fffActive;
  }

  setSltActive():void{
    this.sltActive = true;
    this.fffActive = false;
  }

  setFffActive():void{
    this.sltActive = false;
    this.fffActive = true;
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
  checkEmail(email):boolean{
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  storeUserData(){
    this.model.name = this.modelUser.firstName + ' ' + this.modelUser.lastName;
    this.model.city = this.modelUser.city?this.modelUser.city:"";
    this.model.email = this.modelUser.email;
    this.model.phone = this.modelUser.phone;

    this.model2.name = this.modelUser.firstName + ' ' + this.modelUser.lastName;
    this.model2.city = this.modelUser.city?this.modelUser.city:"";
    this.model2.email = this.modelUser.email;
    this.model2.phone = this.modelUser.phone;
  }

  sendStlRequest(){
    let headers = new Headers();
    headers.append("Content-Type","application/json");
    headers.append("Accept","application/json");
    let options:RequestOptionsArgs = {
      headers: headers
    };
    let body = this.model;
    //make de request
   this.http.post(this.reqURLSTL,body,options).subscribe(
      res =>{
        //handle response
        if (res.status ==200){
          alert("mail enviado con exito");
        }
        //this.setLoading(false);
      }
    );  
  }

  sendFffRequest(){
    let headers = new Headers();
    headers.append("Content-Type","application/json");
    headers.append("Accept","application/json");
    let options:RequestOptionsArgs = {
      headers: headers
    };

    if(this.model2.materialType == "other"){
      this.model2.materialType == this.model2.otherMaterial;
    }

    let body = this.model2;
    //make de request
   this.http.post(this.reqURLFFF,body,options).subscribe(
      res =>{
        //handle response
        if (res.status ==200){
          alert("mail enviado con exito");
        }
        //this.setLoading(false);
      }
    );  
  }



    


}
