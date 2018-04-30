import { Component, OnInit,AfterViewInit, HostListener } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";
import { UserRoleService } from "app/user-role.service";
import { Subscription } from "rxjs";
import { AngularFireAuth } from "angularfire2/auth";
import { Observable } from "rxjs/Observable";
import * as firebase from 'firebase/app';
// import { PRODUCTS } from 'app/store/products';
import {Product} from 'app/store/product';
import 'rxjs/add/operator/switchMap';
import { ShoppingCartService } from 'app/shopping-cart.service';


declare var $:any;
declare var Jquery:any;


@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css'],
  animations: [
    trigger('menuMobState', [
      state('inactive', style({
        'right': '-100%'
      })),
      state('active',   style({
        'right': '0%'
      })),
      transition('inactive => active', animate('400ms ease-in')),
      transition('active => inactive', animate('400ms ease-out'))
    ]),

    trigger('iconMobState', [
      state('inactive', style({
        'display': 'none',
      })),
      state('active',   style({
        'display': 'block',
      })),
      transition('inactive => active', animate('100ms 100ms ease-in')),
      transition('active => inactive', animate('100ms  ease-out'))
    ]),

    trigger('sectionState', [
      state('inactive', style({
        'backgroundColor': 'rgb(255,255,255)',
        'color': 'rgb(179,179,179)',
        'border-radius':'0%',
      })),
      state('active',   style({
        'backgroundColor': 'rgb(179,179,179)',
        'color': 'rgb(255,255,255)',
        'border-radius':'10px',
      })),
      transition('inactive => active', animate('5ms ease-in')),
      transition('active => inactive', animate('5ms ease-out'))
    ]),

    trigger('pretty-effect-act', [
      state('inactive', style({
          transform: 'scale(0)'
        })),
      state('active',   style({
          transform: 'scale(1)'
      })),
      transition('inactive => active', animate('200ms ease-in')),
      transition('active => inactive', animate('200ms ease-out'))
    ]),
  ]
})
export class StoreComponent implements OnInit,AfterViewInit {
  
  timer:any;
  handleInput:any;
  productDataModel: any;
  menuMobState: string = "inactive";
  iconMobState:string = "active";
  iconExitMobState:string = "inactive"
  sectionState:string[] = ["active", "inactive","inactive", "inactive"];
  sectionId:string[] = [ "promotions", "courses", "virtual", "licences"];
  sectionName:string[] = ["Promociones","Cursos", "Cursos Virtuales", "Licencias"];
  sectionIcon:string[] = ["-gift", "-education", "-cloud", "-cd"];
  prettyEffectState:string = "inactive";
  key:any;
  products:FirebaseListObservable<any[]>;
  promotions:Product[] = [];
  courses:Product[] = [];
  virtualCourses:Product[] = [];
  licences:Product[] = [];
  isSetDetailed:boolean = false;
  model:Product;

  constructor( private route: ActivatedRoute,private location: Location, 
              private db:AngularFireDatabase,private cart:ShoppingCartService) {

    // this.products = PRODUCTS;
    this.queryProducts();
    this.timer = window.setTimeout(()=>this.setMargins(),1000);
    

  }

  ngOnInit(){
    this.route.paramMap
    .switchMap((params: ParamMap) => this.getProductFromURL(+params.get('id')))
    .subscribe( productSelected => this.model = productSelected );
  }
 
  ngAfterViewInit() {

    for(let m=0; m < this.sectionState.length; m++){
      if(m === 0){
        $("#" + this.sectionId[m]).css({
          'display':'block',
        });
        
      }else{
        $("#" + this.sectionId[m]).css({
          'display':'none',
        });
        
      }
    }      
    this.scrollTop();
    this.timer = window.setTimeout(()=>this.setMargins(),1000);
     
  }

  getProductFromURL(id):Promise<Product>{
    
    let productSelected:Product;
    let findArray:Product[] = [];
    findArray = this.courses.concat(this.virtualCourses,this.licences);
    for(let i = 0; i<findArray.length;i++){
      if(id === findArray[i].getIdent()){
        productSelected = findArray[i]
        break
      }
    }
    return Promise.resolve(productSelected)
  }

  queryProducts():void{
    this.products = this.db.list('/Product', {
          query: {
            limitToLast: 33 ,
                      }
        });
    this.products.forEach(this.storeProducts.bind(this));
  }

  storeProducts(products):void{
    products.forEach(product => {
       var theProduct = new Product(
        product.$key,
        product.idProduct,
        product.name,
        product.type,
        product.description,
        product.imageURL,
        product.price,
        product.hasDiscount,
        product.discount,
        product.tax,
        product.relatedProducts,
        product.virtualURL             
      );
      if(product.type==="course"){
        this.courses.push(theProduct);
      } else if(product.type==="virtual-course"){
        this.virtualCourses.push(theProduct);
      } else if(product.type==="licence"){
        this.licences.push(theProduct);
      }
      if(product.hasDiscount){
        this.promotions.push(theProduct);
      }
    });
        
  }
    
  setProductCategories(){
    this.products.forEach((product:Product[]) => {
      
    });
  }

  getProductArray(i:number):Product[]{
    switch(i) {
      case 0:
          return this.promotions;          
      case 1:
          return this.courses;          
      case 2:
          return this.virtualCourses;
      case 3:
          return this.licences;
  }
    
  }

  setPrettyEffectState():void{
    this.activePrettyState();
   }

   activePrettyState(){
    this.prettyEffectState = "active";
  }

  inactivePrettyState(){
    this.prettyEffectState = "inactive";
  }

  getPrettyEffectState():string{
    return this.prettyEffectState;
  }

  scrollTop():void{
    $('html,body').animate({
     scrollTop:0
   },200);
 }

  getMenuMobState():string{
    return this.menuMobState;
  }

  getIconMobState():string{
    return this.iconMobState;
  }

  getIconExitMobState():string{
    return this.iconExitMobState;
  }

  setMenuMobState(state:boolean){
    if(state){
      (this.menuMobState==="inactive")? this.menuMobState="active":this.menuMobState="inactive";
      (this.iconMobState==="inactive")? this.iconMobState="active":this.iconMobState="inactive";
      (this.iconExitMobState==="inactive")? this.iconExitMobState="active":this.iconExitMobState="inactive";
    }else{
      this.menuMobState = "inactive";
      this.iconMobState = "active";
      this.iconExitMobState = "inactive";
    }    
  }

  setSectionState(i:number, state:boolean){
    if(state===true){
      this.sectionState[i]="active";
    }else{
      this.sectionState[i]="inactive";
    }

  }

  getSectionState(i:number):string{
    return this.sectionState[i];
  }

  getSectionId(i:number):string{
    return this.sectionId[i];
  }

  getSectionName(i:number):string{
    return this.sectionName[i];
  }

  getSectionIcon(i:number):string{
    return "glyphicon"+this.sectionIcon[i];
  }



  setSectionActive(i:number,state:boolean){
    for(let m=0; m < this.sectionState.length; m++){
      if(i === m){
        $("#" + this.sectionId[m]).css({
          'display':'block',
        });
        this.setSectionState(m, true);
      }else{
        $("#" + this.sectionId[m]).css({
          'display':'none',
        });
        this.setSectionState(m, false);
      }
    }
    this.setMenuMobState(state);
    this.scrollTop();
    this.isSetDetailed = false;    
  }


  setMargins():void{
    let productSecWidth:number = $('#product-cnt').width();   
    let margin:number = (productSecWidth - Math.floor(productSecWidth/200)*200)/(Math.floor(productSecWidth/200)*2)-0.1;     
    if(margin<5 && $(window).width()>942 ){
     margin = (productSecWidth - (Math.floor(productSecWidth/200)-1)*200)/((Math.floor(productSecWidth/200)-1)*2)-0.1; 
    }else if($(window).width()<942 && $(window).width()>500 && productSecWidth>0 ){
      margin = Math.abs((productSecWidth - 400)/(4)-0.1);      
    }else if($(window).width()<500){
      margin = Math.abs((productSecWidth-200)/2); 
    }
    for(let i = 0; i < this.promotions.length; i++){
     $('#products-gadgeti0'+'j'+i).css({
       'margin-left': margin,
       'margin-right': margin
     }) 
    }
    for(let i = 0; i < this.courses.length; i++){
      $('#products-gadgeti1'+'j'+i).css({
        'margin-left': margin,
        'margin-right': margin
      }) 
     }
     for(let i = 0; i < this.virtualCourses.length; i++){
      $('#products-gadgeti2'+'j'+i).css({
        'margin-left': margin,
        'margin-right': margin
      }) 
     }
     for(let i = 0; i < this.licences.length; i++){
      $('#products-gadgeti3'+'j'+i).css({
        'margin-left': margin,
        'margin-right': margin
      }) 
     }   
  }

  setRelProdMargins(array:Product[]):void{
    let productSecWidth:number = $('#rel-prod-cnt').width();
    
     let margin:number = (productSecWidth - Math.floor(productSecWidth/200)*200)/(Math.floor(productSecWidth/200)*2)-0.1;   
      
     if(margin<5 && $(window).width()>942 ){
      margin = (productSecWidth - (Math.floor(productSecWidth/200)-1)*200)/((Math.floor(productSecWidth/200)-1)*2)-0.1; 
     }else if($(window).width()<942 && $(window).width()>500 ){
       margin = (productSecWidth - 400)/(4)-0.1; 
      
     }else if($(window).width()<500){
       margin = (productSecWidth-200)/2;      
    }

    for(let i = 0; i < array.length; i++){
      $('#rel-products-gadget'+ array[i].getIdStore() +'j'+i).css({
        'margin-left': margin,
        'margin-right': margin
      }) 
     }    
  }

  setModel(i:number,j:number):void{    
    let arraySearch = this.getProductArray(i);
    for(let p=0; p<arraySearch.length; p++){
      if(p === j){
        this.model = arraySearch[p];
        break;
      }
    }    
  } 

  setDetailledView(i:number,j:number):void{
    this.setSectionActive(-1,false);    
    this.isSetDetailed = true;
    this.setModel(i,j);
  }

  
  
getRelProdArray(array:any):any{
  
  let relProducts:Product[] = [];
  let findArray:Product[] = [];
  findArray = this.courses.concat(this.virtualCourses,this.licences);
 

  array.forEach(relProd => {    

    for(let i = 0; i<findArray.length;i++){
      if(relProd.idProduct === findArray[i].getIdStore()){
        relProducts.push(findArray[i])
        break
      }
    }     
  });  
  this.setRelProdMargins(relProducts);
  return relProducts 
}
  
setRelatedToDetailed(relProd:string){
  let findArray:Product[] = [];
  findArray = this.courses.concat(this.virtualCourses,this.licences);
  for(let i = 0; i<findArray.length;i++){
    if(relProd === findArray[i].getIdStore()){
      this.model = findArray[i]
      break
    }
  }
}

showRounded(num:number):number{
  return Math.round(num)
}

addShoppingCart(product:Product):void{
  this.cart.add(product);
}

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent)  {
    this.key = event.key;
    if(this.key === "Escape"){
      this.inactivePrettyState();
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize($event:any){
    this.setMargins();

   
  }
}


