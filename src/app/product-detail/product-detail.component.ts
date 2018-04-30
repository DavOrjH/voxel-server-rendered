import { Component, OnInit, HostListener } from '@angular/core';
import 'rxjs/add/operator/switchMap';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Location }                 from '@angular/common';
import {Product} from 'app/store/product';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";
import { ShoppingCartService } from "app/shopping-cart.service";
import { UserDataService } from "app/user-data.service";
import { User } from "app/user";
import { Subscription, Subject } from 'rxjs';
import { FirebaseApp } from "angularfire2";
import { Observable } from "rxjs/Observable";
import { Http, RequestOptionsArgs , Headers} from '@angular/http';
import 'rxjs/add/operator/first';

declare var $:any;
declare var Jquery:any;


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  
  timer3: number;
  timer2: any;
  currentUser: User  
  userSubscription: Subscription;
  timer:any;
  todayDate: string;
  reqURL:string = "https://voxel3d.herokuapp.com/apis/course-req";
  showScheduleB: boolean = false;
  productProm: Promise<Product>;
  scheduleList: FirebaseListObservable<any[]>;
  product: Product = new Product();
  schedule:any = [];
  relProducts:Product[]=[];
  userState:string = "indeterminado"; 
  private user:User;
  model={
    name:"",
    email:"",
    phone:"",
    subject:"",
    message:"",
    agreement:false,
  };

  constructor(private route: ActivatedRoute,
    private location: Location,private db:AngularFireDatabase,
     private router:Router, private cart:ShoppingCartService, private userService:UserDataService,
     private fireBaseApp:FirebaseApp, private http:Http,
    ) {
      this.setCurrentUser();

         
    this.userSubscription=this.userService.getUser().subscribe(
      user =>{
        this.user= user as User;
        console.log(this.user)
      }
    );
   
   }

     
  ngOnInit() {
    this.scrollTop();    
    this.relProducts = [];
    this.route.paramMap.switchMap(
      (params:ParamMap)=> {
        return this.db.object("/Product/"+ params.get("id"));
      }
  ).subscribe(
    prod =>{
    this.product =new Product(
      prod.$key,
      prod.idProduct,
      prod.name,
      prod.type,
      prod.description,
      prod.imageURL,
      prod.price,
      prod.hasDiscount,
      prod.discount,
      prod.tax,
      prod.relatedProducts,
      prod.virtualURL         
    );
    this.getRelProdArray(this.product.relProd);
    // this.timer = setInterval(()=> this.render(), 1000 / 60 );
    this.timer = window.setTimeout(()=>this.setRelProdMargins(),1000);
    this.timer2 =  window.setTimeout(()=>{
      if(this.getUserState()){
        this.setGetNow();
      }else{
        this.timer3 =  window.setTimeout(()=>{
          if(this.getUserState()){
            this.setGetNow();
          }else{
            this.userState == "sinLoguear";
            console.log("definitivamente sin lougear")
          }
        }
        ,2000)
      }

    },2000);
              
    }
  );  
  this.userService.init();  
  this.getTodayDate();  
  
  //set config of the button get now 
  }

  getUserState():boolean{
    if(!this.user){
      console.log("no hay usuario");
      return false
    }else{
      console.log("hay usuario");
      // this.setGetNow();
      return true
    }
  }



  setGetNow():void{
    let theState="";
    console.log(this.user);
    if(localStorage.getItem("currentUser")){
      if(this.user.getCompleted()=="completed"){
        if(this.user.hasCourse(this.product.getIdShelf())){
          // si esta habilitado
          if(this.user.isActiveCourse(this.product.getIdShelf())){
            theState="habilitado";
          }else{
            theState = "porRegistrar";  
          }
        }else{
          theState = "porRegistrar";
        }
      }else{
        theState = "incompleto";
      }
    }else{
      theState="sinLoguear";
    }

    this.userState=theState;
    console.log(this.userState)
  }

  getNow():void{
    let id = localStorage.getItem("currentUser");
    this.db.object("CourseRequest/"+this.product.getIdShelf()+"/"+id).first().subscribe(
      course =>{
        if(course.date){ // the course is already requested
          alert("Su solicitud ya se encuentra en tramite");
        }else{
          let ref = this.db.object("CourseRequest/"+this.product.getIdShelf()+"/"+id);
          ref.update({
            date: new Date()
          }).catch(
            err=>{
              console.error(err);
            }
          ).then(
            
          );
          
        }
      }
    );
   
  }

  setCurrentUser():void{

    this.userSubscription=this.userService.getUser().subscribe(
      user =>{
        this.currentUser= user as User;
      }
    );

  }

 querySchedule(product:Product):void{    
     this.scheduleList = this.db.list('/ActiveCourse', {
      query: {        
        orderByChild: "idCourse",
        equalTo: product.getIdShelf()
      }
    });
    this.scheduleList.forEach(this.storeSchedule.bind(this));      
  }

  storeSchedule(courses):void{ //TODO: check multiple schedules
    courses.forEach(course=> {
      this.schedule=[];
      var startDate = new Date(course.dateStart + "(Bogota Time)" );

      if( startDate > new Date()){
        this.schedule.push(course);
      }
        
    });
  }

  showSchedule(){
    if(!this.schedule[0]) {
      this.querySchedule(this.product);      
    };
    this.showScheduleB = true;   
        
  }

  getTodayDate(){
    var today = new Date();   
    var d= today.getDate();
    var m = today.getMonth()+1; 
    var yyyy = today.getFullYear();    
    if(d<10) {
       var dd = '0'+String(d)
    } else {
      var dd = String(d)
    }
    
    if(m<10) {
        var mm = '0'+String(m)
    }else{
      var mm = String(m)
    }
    this.todayDate = String(yyyy) + '-' + mm + '-' + dd ;
   
  }
    
  

  scrollTop():void{
    $('html,body').animate({
     scrollTop:0
   },200);
 }

 newProduct(route):void{  
  this.schedule = [];
  this.showScheduleB = false;
  this.relProducts=[];  
  this.router.navigate(['/product-detail', route]);
 }

 getCourseDay(date:string):number{
   var nDate = new Date(date + "(Bogota Time)");
  return nDate.getDate()
 }

 getCourseMonth(date):string{
  var month = new Date(date + "(Bogota Time)").getMonth();
  month = month+1;

  switch(month){
    case 1:
      return "Enero"
    case 2:
      return "Febrero"
    case 3:
      return "Marzo"
    case 4:
      return "Abril"
    case 5:
      return "Mayo"
    case 6:
      return "Junio"
    case 7:
      return "Julio"
    case 8:
      return "Agosto"
    case 9:
      return "Septiembre"
    case 10:
      return "Octubre"
    case 11:
      return "Noviembre"
    case 12:
      return "Diciembre"
  }
}

  getCourseYear(date):number{
    var year = new Date(date  + "(Bogota Time)").getFullYear();
    return year
  }

  showRounded(num:number):number{
    return Math.round(num)
  }

  getRelProdArray(array:any){

    let relProducts:Product[] = []; 
     
    array.forEach(relProdId => {    
      this.db.object("/Product/" + relProdId.idProduct).forEach(
        relProd => {
          var productElement = new Product(
            relProd.$key,
            relProd.idProduct,
            relProd.name,
            relProd.type,
            relProd.description,
            relProd.imageURL,
            relProd.price,
            relProd.hasDiscount,
            relProd.discount,
            relProd.tax,
            relProd.relatedProducts,
            relProd.virtualURL
          );
          this.relProducts.push(productElement);
          this.setRelProdMargins(); 
          
        }        
      )   
      
    });    
  }

  setRelProdMargins():void{
    let productSecWidth:number = $('#rel-prod-cnt').width();
    
     let margin:number = (productSecWidth - Math.floor(productSecWidth/200)*200)/(Math.floor(productSecWidth/200)*2)-0.1;   
      
     if(margin<5 && $(window).width()>942 ){
      margin = (productSecWidth - (Math.floor(productSecWidth/200)-1)*200)/((Math.floor(productSecWidth/200)-1)*2)-0.1; 
     }else if($(window).width()<942 && $(window).width()>500 ){
       margin = (productSecWidth - 400)/(4)-0.1; 
      
     }else if($(window).width()<500){
       margin = (productSecWidth-200)/2;      
    }

    for(let i = 0; i < this.relProducts.length; i++){
      $('#rel-products-gadget'+ this.relProducts[i].getIdStore() +'j'+i).css({
        'margin-left': margin,
        'margin-right': margin
      }) 
     }    
    
  }

  addShoppingcart(product?:Product):void{
    if(!product){
      product = this.product;
    }

    this.cart.add(product);
  }

  sendMessage(course:string){

    this.model = {
      name:this.currentUser.getFirstName()+ " " + this.currentUser.getLastName(),
      email:this.currentUser.getEmail(),
      phone:String(this.currentUser.getPhone()),
      subject: "Solicitud de curso " + course,
      message: "Hola, me encuentro interesado en el curso de " + course + ", espero pronta respuesta",
      agreement: true       
    }
    
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
    this.setRelProdMargins();   
  }
  
}
