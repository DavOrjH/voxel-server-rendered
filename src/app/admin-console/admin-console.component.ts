import { Component, OnInit, HostListener } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";
import { UserRoleService } from "app/user-role.service";
import { Subscription } from "rxjs";
import { AngularFireAuth } from "angularfire2/auth";
import { Observable } from "rxjs/Observable";
import * as firebase from 'firebase/app';
import { FirebaseApp } from 'angularfire2';

declare var $:any;
declare var Jquery:any;

@Component({
  selector: 'admin-console',
  templateUrl: './admin-console.component.html',
  styleUrls: ['./admin-console.component.css'],
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
        'backgroundColor': 'rgb(255,159,10)',
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
export class AdminConsoleComponent implements OnInit {
  activeCourses: any[];
  request: any;
  userRequestList: FirebaseListObservable<any[]>;
  requestCourseList: FirebaseListObservable<any[]>;
  requestCourseModel: any[];

  sliderReference: any;
  sliderModel: any;
  sliderList: FirebaseListObservable<any[]>;
  slidersDataModel: any[];
  userFrame: boolean = false;
  promotionModel:any = {};
  buyView: any = "promotionsList";
  productDataModel: any[];
  promotionList: FirebaseListObservable<any[]>;
  promotionDataModel: any[];

  techData: any[];
  licenceView: string = "licenceList";  
  licenceDataModel: any[];
  licenceList: FirebaseListObservable<any[]>;
  teacherData: any;
  activeModel: any;

  loading: any;
  courseDataModel: any=[];
  onSiteCourse: any = [];
  activeCourse: any = [];
  teacherList: FirebaseListObservable<any[]>;
  techList: FirebaseListObservable<any[]>;
  activeCourseList: FirebaseListObservable<any[]>;
  courselist: FirebaseListObservable<any[]>;
  productList: FirebaseListObservable<any[]>;
  productEditState:string="show";
  productEditLessonState: string = "show";
  productView:string="productList";
  user: Observable<firebase.User>;
  handleInput:any;
  menuMobState: string = "inactive";
  iconMobState:string = "active";
  iconExitMobState:string = "inactive"
  sectionState:string[] = [ "inactive","inactive", "inactive", "inactive"];
  sectionId:string[] = [ "users", "sales", "courses", "licences"];
  sectionName:string[] = ["USUARIOS", "COMPRAS", "CURSOS", "LICENCIAS"];
  sectionIcon:string[] = ["-user", "-shopping-cart", "-education", "-cd"];
  prettyEffectState:string = "inactive";
  userList:any;
  dataModel:any=[];
  userRole:string;
  subscription:Subscription;
  key:any;
  relProdId:string;
  prodId:string;
  
  searchModel={
    searchType:0 as number,
    searchValue:""
  };
  queryIds:string[]=[];
  productModel:any={
    images:[],
    topics:[],
    relatedProducts:[],
    sectors:[],
    lessons:[],
    relProd:{
      idProduct:""
    },
    image:{
      name:""
    }
  };
  licence:any={
    relProd:{
      idProduct:""
    }    
  }
  searchTypes=[ 
    {
      text:"Nombre",
      value:1
    },
    {
      text:"e-mail",
      value:2
    },
    {
      text:"Rol",
      value:3
    },
    {
      text:"Estado",
      value:4
    }
  ];


  constructor(private db:AngularFireDatabase,
              public afAuth:AngularFireAuth,
              private roleService:UserRoleService,
              private fireBaseApp:FirebaseApp) { 
      this.user=afAuth.authState;
     this.subscription=this.roleService.getUserRole().subscribe(
        role =>{
          this.userRole=role;
        }
      );
      this.queryCourses();
      this.queryActiveCourses();
      this.queryTeachers();
      this.queryLicences();
      this.queryTechnicals();
      this.queryProducts();
      this.querySliders();
      this.queryCoursesRequest();
  }

  ngOnInit() {
    this.setSectionActive(0);
    this.roleService.init();     
  }

  search():void{
    this.clearData();
    var type:number= this.searchModel.searchType;
    if(type==1){
      this.userList = this.db.list('/User', {
        query: {
          limitToLast: 10,
          orderByChild: "firstName",
          equalTo:this.searchModel.searchValue
        }
      });
      this.userList.forEach(this.storeData.bind(this));
    }else if(type==2){
      this.userList = this.db.list('/User', {
        query: {
          limitToLast: 10,
          orderByChild: "email",
          equalTo:this.searchModel.searchValue
        }
      });
      this.userList.forEach(this.storeData.bind(this));
    }else if(type==3){
     this.userList = this.db.list('/User', {
        query: {
          limitToLast: 10,
          orderByChild: "userRole",
          equalTo:this.searchModel.searchValue
        }
      });
      this.userList.forEach(this.storeData.bind(this));
    }else if(type==4){
      this.userList = this.db.list('/User', {
        query: {
          limitToLast: 10,
          orderByChild: "active",
          equalTo:this.searchModel.searchValue=="activo"?true:false
        }
      });
      this.userList.forEach(this.storeData.bind(this));      
    }
    this.userFrame = true;
  }

  getUserFrame():boolean{
    return this.userFrame;
  }
  setModel():void{
    this.searchModel.searchValue="";
  }

  getLastName(lastName):string{
    return lastName==""?"----------":lastName;
  }
  storeData(users):void{
    users.forEach(user => {
      this.dataModel.push(user);
      //this.queryIds.push(user.$key);
    });
    
  }
  clearData():void{
    this.dataModel=[];
  }
  update():void{
    this.search();
  }
  saveChanges():void{
    for(var i=0;i<this.dataModel.length;i++){
      this.userList.update(this.dataModel[i].$key, { 
        userRole: this.dataModel[i].userRole,
        active: this.dataModel[i].active
      });
    }
    

    this.update();
  }

/*
Products -------------------------
*/
addCourse():void{
  var theKey = this.db.database.ref().child("/Course/").push().key;
  this.db.object("/Course/"+theKey).set({
    name: this.productModel.name,
    cenefaURL: this.productModel.cenefaURL,
    description: this.productModel.description,
    goal: this.productModel.goal,
    addressedTo: this.productModel.addressedTo,
    mainImageURL: this.productModel.mainImageURL,
    images:this.productModel.images? this.productModel.images : [{author:"", imageURL:"", name:""}],
    topics:this.productModel.topics? this.productModel.topics : [{name:""}],
    virtualURL:this.productModel.virtualURL,
    contentPDF: this.productModel.contentPDF,
    hasVirtual:this.productModel.hasVirtual,
    lessons: this.productModel.lessons? this.productModel.lessons: {name: "", videoURL: "", desc: ""},
    category:this.productModel.category,    
    subCat: this.productModel.category=="advanced-training"?this.productModel.subCat:null,
    sectors: this.productModel.sectors? this.productModel.sectors: {name:""},

  }).catch(
    err => {
      console.error(err);
    }
  );
  
  (this.productModel.discount==0)? this.productModel.hasDiscount=false: this.productModel.hasDiscount=true;
   var keyCourse = this.addProduct(theKey,this.productModel.name,this.productModel.description,
    this.productModel.mainImageURL,this.productModel.price,"course",0,this.productModel.relatedProducts,
    this.productModel.hasDiscount,this.productModel.discount,this.productModel.virtualURL);
   var keyVirtualCourse;
   if(this.productModel.hasVirtual){
    
    (this.productModel.virtualDiscount==0)? this.productModel.hasVirtualDiscount=false: this.productModel.hasVirtualDiscount=true;
    keyVirtualCourse = this.addProduct(theKey,this.productModel.name + " virtual",
    this.productModel.description,this.productModel.mainImageURL,this.productModel.priceVirtual,
    "virtual-course",0,this.productModel.relatedProducts,this.productModel.hasVirtualDiscount,
    this.productModel.virtualDiscount,this.productModel.virtualURL + "-virtual");
   }else{
     keyVirtualCourse = 0;
   }

  this.db.object("/Course/"+theKey).update({
    productId:keyCourse,
    productVirtual:keyVirtualCourse
  });

  let index = this.productModel.relatedProducts.length

  if(keyVirtualCourse){
    this.db.object("/Product/"+ keyCourse + "/relatedProducts/" + index ).set({
      idProduct: keyVirtualCourse 
    });
  
  this.db.object("/Product/"+ keyVirtualCourse + "/relatedProducts/" + index).set({
    idProduct: keyCourse 
  });
  }  
  
  this.createCroissedRelated(this.productModel.relatedProducts,keyCourse,keyVirtualCourse); 
  this.productModel={};
  this.productView = "productList";      
}

pushCourseImage():void{
  this.productModel.images.push(this.productModel.image);
  this.productModel.image={};  
}

pushCourseTopic():void{
  this.productModel.topics.push(this.productModel.topic);
  this.productModel.topic={};
}

pushCourseLesson():void{
  this.productModel.lessons.push(this.productModel.lesson);
  this.productModel.lesson={};  
}

pushRelProd(id:string,type:string):void{ 

  if(type==="course"){ 
    this.db.object("/Course/"+id).forEach(product =>{

      if(!product.productId){
        this.db.object("/Licence/"+id).forEach(productLic =>{         
          this.productModel.relatedProducts.push({idProduct:productLic.productId});
          if(!productLic.productId){
            this.db.object("/Product/"+id).forEach(productProm =>{         
              this.productModel.relatedProducts.push({idProduct:productProm.productId});          
           });       
          }  
        });             
      }else{
        if(product.hasVirtual){      
          this.productModel.relatedProducts.push({idProduct:product.productId});
          this.productModel.relatedProducts.push({idProduct:product.productVirtual});        
        }else{
          this.productModel.relatedProducts.push({idProduct:product.productId});        
        }

      }
    });    
  }else if(type==="licence"){
    this.db.object("/Course/"+id).forEach(product =>{

      if(!product.productId){
        this.db.object("/Licence/"+id).forEach(productLic =>{         
          this.licence.relatedProducts.push({idProduct:productLic.productId});
          if(!productLic.productId){
            this.db.object("/Product/"+id).forEach(productProm =>{         
              this.licence.relatedProducts.push({idProduct:productProm.productId});          
           });       
          }         
       });
      }else{
        if(product.hasVirtual){      
          this.licence.relatedProducts.push({idProduct:product.productId});
          this.licence.relatedProducts.push({idProduct:product.productVirtual});    
        }else{
          this.licence.relatedProducts.push({idProduct:product.productId});
        }
      }  
     });
  }else if(type === "promotion"){
    this.db.object("/Course/"+id).forEach(product =>{

      if(!product.productId){
        this.db.object("/Licence/"+id).forEach(productLic =>{       
          
        
          if(!productLic.productId){

            this.db.object("/Product/"+id).forEach(productProm =>{
        
              this.promotionModel.relatedProducts.push({idProduct:productProm.$key});
     
           });       
          }else{
            this.promotionModel.relatedProducts.push({idProduct:productLic.productId});
          }           
       });      
      }else{
        if(product.hasVirtual){      
          this.promotionModel.relatedProducts.push({idProduct:product.productId});
          this.promotionModel.relatedProducts.push({idProduct:product.productVirtual});        
        }else{
          this.promotionModel.relatedProducts.push({idProduct:product.productId});        
        }
      } 
    });    

  }
  this.relProdId = "";
}

pushSector(sector:string):void{
  this.productModel.sectors.push({name:sector});  
}

removeSector(index:number):void{
  this.productModel.sectors.splice(index,1);
}




updateProduct(keyProduct,name,description,imageURl,price,type,tax, relatedProducts, hasDiscount, discount, virtualURL):void{
  this.db.object("/Product/"+keyProduct).update({
    name:name,
    description:description,
    imageURL:imageURl,
    price:price,
    tax:tax,
    type:type,
    relatedProducts:relatedProducts? relatedProducts : [{idProduct:""},{idProduct:""} ],
    hasDiscount:hasDiscount,
    discount:discount,
    virtualURL:virtualURL,
  }).catch(
    err=>{
      console.error(err);
    }
  );
}
addProduct(idProduct,name,description,imageURl,price,type,tax,relatedProducts,hasDiscount,discount,virtualURL):string{
  var theKey = this.db.database.ref().child("Product").push().key;
  this.db.object("/Product/"+theKey).set({
    idProduct:idProduct,
    name:name,
    description:description,
    imageURL:imageURl,
    price:price,
    tax:tax,
    relatedProducts:relatedProducts? relatedProducts : [{idProduct:""},{idProduct:""}],
    hasDiscount:hasDiscount,
    discount:discount,
    type:type,
    virtualURL:virtualURL
  }).catch(
    err=>{
      console.error(err);
    }
  );
  return theKey;
}

/*
Show products Tab
*/

queryActiveCourses():void{
  this.activeCourse = [];
  this.activeCourseList = this.db.list('/ActiveCourse', {
    query: {
      limitToLast: 200,
      orderByChild: "dateStart"
    }
  });
  this.activeCourseList.forEach(this.storeActiveCourses.bind(this));
}

storeActiveCourses(courses):void{
  this.activeCourse = [];
  courses.forEach(course => {

    this.activeCourse.push(course);
        
    var courseN = this.db.object("/Course/"+course.idCourse).forEach(pCourse =>{
     var name:string = pCourse.name;
     course.name = name;     
    });   
    
    
    
    let firstnameIns = String(this.db.list("/User/"+ course.idTeacher + "/firstName/"));
    let lastNameIns = String(this.db.list("/User/"+ course.idTeacher + "/lastName/"));    
    
    var tutorN = this.db.object("/User/"+ course.idTeacher).forEach(tCourse =>{
      var tName:string = String(tCourse.firstName) + String(tCourse.lastName);
      course.teacherName = tName;
    }
  )
  
  });
}

queryTeachers():void{
  this.teacherList = this.db.list('/User', {
    query: {
      orderByChild: "userRole",
      equalTo: "Tutor"
    }
  });
  this.teacherList.forEach(this.storeTeachers.bind(this));  
}

storeTeachers(teachers):void{
  this.teacherData = [];
  teachers.forEach(teacher=> {
    this.teacherData.push(teacher);

  });
}


queryCourses():void{
  this.onSiteCourse = [];
  this.courseDataModel=[];
  this.courselist = this.db.list('/Course', {
        query: {
          limitToLast: 200,
          orderByChild: "category"
        }
      });
  this.courselist.forEach(this.storeCourses.bind(this));  
}

storeCourses(courses):void{
  this.courseDataModel=[];
    courses.forEach(course => {
      if(course.hasVirtual === true){
        this.onSiteCourse.push(course);
      }

      this.courseDataModel.push(course);    
    });    
  }

  editCourse(index):void{
    this.setProductView("productEdit");    
    this.productModel=this.courseDataModel[index];
    
    
    var price = this.db.object("/Product/"+this.productModel.productId).forEach(element =>{
      this.productModel.price = element.price;          
     });
     
     var priceVirtual = this.db.object("/Product/"+this.productModel.productVirtual).forEach(element =>{
      this.productModel.priceVirtual = element.price;          
     });

     var discount = this.db.object("/Product/"+this.productModel.productId).forEach(element =>{
      this.productModel.discount = element.discount;          
     });

     var virtualDiscount = this.db.object("/Product/"+this.productModel.productVirtual).forEach(element =>{
      this.productModel.virtualDiscount = element.discount;          
     });
  
    this.productModel.lessons? this.productModel.lessons: this.productModel.lessons =[{name: "", videoUrl: "", desc: ""}];    
    this.productModel.topics? this.productModel.topics: this.productModel.topics =[{name: ""}];
    this.productModel.sectors? this.productModel.sectors: this.productModel.sectors =[];
    
    this.productModel.image={};
    this.productModel.topic = {};
    this.productModel.relProd={};
    this.productModel.lesson={};    
    this.productModel.sectorN={};

    var relProds = this.db.object("/Product/"+this.productModel.productId ).forEach(element =>{
      this.productModel.relatedProducts = element.relatedProducts;          
     });

     var relProdsVir = this.db.object("/Product/"+this.productModel.productVirtual ).forEach(element =>{
      this.productModel.relatedProductsVir = element.relatedProducts;          
     });
    }

  editOnSiteCourse(index):void{
    this.setProductView("editOnSiteCourse");       
    this.activeModel=this.activeCourse[index];         
  }

  newOnSiteCourse():void{
    this.setProductView("newOnSiteCourse");
    this.activeModel={};
    this.activeModel.schedule={}; 
    this.activeModel.schedule.monday={
      isTrue:false,
      start:"",
      end:""
    }
    this.activeModel.schedule.tuesday={
      isTrue:false,
      start:"",
      end:""
    };
    this.activeModel.schedule.wednesday={
      isTrue:false,
      start:"",
      end:""
    };
    this.activeModel.schedule.thursday={
      isTrue:false,
      start:"",
      end:""
    };
    this.activeModel.schedule.friday={
      isTrue:false,
      start:"",
      end:""
    };
    this.activeModel.schedule.saturday={
      isTrue:false,
      start:"",
      end:""
    };
    this.activeModel.schedule.sunday={
      isTrue:false,
      start:"",
      end:""
    };      
  }

  addModelPrice(product){
    console.log(product);
  }
  
  updateCourse():void{
    
    this.courselist = this.db.list("/Course/");
    this.productModel.relatedProductsVir = [];
    var OnSiteCourse = {
      idProduct: this.productModel.productId,
    }

    this.productModel.relatedProductsVir.push(OnSiteCourse);
    this.productModel.relatedProducts.forEach( relProd=>{
      if(relProd.idProduct != this.productModel.productVirtual){
        this.productModel.relatedProductsVir.push(relProd);
      }
    });

    var newProduct = this.productModel;
    this.courselist.update(newProduct.$key,{
      name: newProduct.name,
      cenefaURL: newProduct.cenefaURL,
      description: newProduct.description,
      goal: newProduct.goal,
      addressedTo: newProduct.addressedTo,
      mainImageURL: newProduct.mainImageURL,
      images:newProduct.images? newProduct.images : [{author:"", imageURL:"", name:""}],
      topics:newProduct.topics? newProduct.topics : [{name:""}],
      virtualURL:newProduct.virtualURL,
      contentPDF: newProduct.contentPDF,
      hasVirtual:newProduct.hasVirtual,
      lessons: newProduct.lessons? newProduct.lessons: {name: "", videoURL: "", desc: ""},     
      category:newProduct.category,
      subCat: newProduct.category=="advanced-training"?newProduct.subCat:null,
      sectors:newProduct.sectors? newProduct.sectors : [{name:""}],     
    });
    (this.productModel.discount==0)? this.productModel.hasDiscount=false: this.productModel.hasDiscount=true;
    this.updateProduct(newProduct.productId,newProduct.name,newProduct.description,
      newProduct.mainImageURL,newProduct.price,"course",0,
      newProduct.relatedProducts,newProduct.hasDiscount, newProduct.discount,newProduct.virtualURL);
    (this.productModel.virtualDiscount==0)? this.productModel.hasVirtualDiscount=false: this.productModel.hasVirtualDiscount=true;
    this.updateProduct(newProduct.productVirtual,newProduct.name + " virtual",
    newProduct.description,newProduct.mainImageURL,newProduct.priceVirtual,
    "virtual-course",0,newProduct.relatedProductsVir,newProduct.hasVirtualDiscount, newProduct.virtualDiscount,newProduct.virtualURL + "-virtual");
    // this.createCroissedRelated(newProduct.relatedProducts,newProduct.productId,newProduct.productVirtual)
    this.setProductView("productList");
    this.updateList();
  }

  createCroissedRelated(relatedProducts,idCourse,idVirtual?):boolean{      
      relatedProducts.forEach(product => {
        let relProd = this.db.list("/Product/"+ product.idProduct + "/relatedProducts");
        let array = [];
        let newEntry;
        let newEntryVir;
        let index = 0;

        relProd.forEach(prodList => {
          array.push(prodList);          
        });
              
        if(array[0] != ""){
          array.forEach(prodComp=> {
            
           for(let i=0; i<prodComp.length; i++){
            if(prodComp[i].idProduct != idCourse && prodComp[i].idProduct != idVirtual){
              newEntry = idCourse;
              newEntryVir = idVirtual;
   
            }else{

              newEntry = false;
              newEntryVir = false;
              break
            }
          }            
            index = prodComp.length;            
          });       

        }else{
          newEntry = idCourse;          
          newEntryVir = idVirtual;
          index = 0;          
   
        }     
      
      if(newEntry){
        this.db.object("/Product/"+ product.idProduct + "/relatedProducts/" + index).set({
          idProduct:idCourse  
        })
      }      
      if(idVirtual && newEntryVir){         
        index = index+1;         
      this.db.object("/Product/"+ product.idProduct + "/relatedProducts/" + index).set({
        idProduct:idVirtual,

      })
      }        
    }); 
    
    return true
  }

  // Create and edit on site courses

  addActiveCourse():void{

    var theKey = this.db.database.ref().child("/ActiveCourse/").push().key;
    this.db.object("/ActiveCourse/"+theKey).set({
      idCourse: this.activeModel.idCourse,
      dateStart: this.activeModel.dateStart,
      dateEnd: this.activeModel.dateEnd,
      capacity: this.activeModel.capacity,
      idTeacher:this.activeModel.idTeacher,
      isSameSchedule: this.activeModel.isSameSchedule,
      sameScheduleStart: this.activeModel.sameScheduleStart?this.activeModel.sameScheduleStart:"",
      sameScheduleEnd: this.activeModel.sameScheduleEnd?this.activeModel.sameScheduleEnd:"",
      schedule:this.activeModel.schedule,
      city: this.activeModel.city,      
    }).catch(
      err => {
        console.error(err);
      }
    );
    this.setProductView("OnSiteClass");
  }

  updateActiveCourse():void{

    var newCourse = this.activeModel;
    this.activeCourseList = this.db.list("/ActiveCourse/");
    this.activeCourseList.update(newCourse.$key,{    
      idCourse: newCourse.idCourse,
      dateStart: newCourse.dateStart,
      dateEnd: newCourse.dateEnd,
      capacity: newCourse.capacity,
      idTeacher:newCourse.idTeacher,
      isSameSchedule: newCourse.isSameSchedule,
      sameScheduleStart: newCourse.sameScheduleStart?newCourse.sameScheduleStart:"",
      sameScheduleEnd: newCourse.sameScheduleEnd?newCourse.sameScheduleEnd:"",
      schedule:newCourse.schedule,
      city: newCourse.city,      
        }).catch(
          err => {
            console.error(err);
          }
        );
    this.setProductView("OnSiteClass");
      
  }

  detailsCourse(index):void{
    this.setProductView("productDetails");
  }

  updateList():void{
    this.queryCourses();
  }

  removeImage(index):void{
    this.productModel.images.splice(index,1);
  }

  removeTopic(index):void{
    this.productModel.topics.splice(index,1);
  }

  removeLesson(index):void{
    this.productModel.lessons.splice(index,1);
  }

  removeRelatedProduct(index:number,type:string):void{
    if(type==="course"){
      this.productModel.relatedProducts.splice(index,1);
    }else if(type==="licence"){
      this.licence.relatedProducts.splice(index,1);
    }else if(type==="promotion"){
      this.promotionModel.relatedProducts.splice(index,1);
    }
    
  }

  getProductEditState():string{
    return this.productEditState;
  }

  getProductEditLessonState():string{
    return this.productEditLessonState;
  }

  setProductEditState(state):void{
    this.productEditState=state;
   
  }

  setProductEditLessonState(state):void{
    this.productEditLessonState=state;
  }

  setProductView(view:string):void{
    this.productView=view;
    this.productModel={
      adressedTo:"",
      goal:"",
      relatedProducts:[],
      relProd:{},
      images:[],
      image:{},
      topics:[],
      topic:{},
      lessons:[],
      lesson:{},
      sectors:[],
    };
    this.setProductEditState("show");
    this.setProductEditLessonState("show");
  }

  getProductView():string{
    return this.productView;
  }

  searchProductName(id:string):string{

    let name:string;
    this.db.object("/Product/"+id).forEach(product =>{
      name = product.name;  
    });
     
    return name
  }

  searchCourseName(id:string):string{
    
    let name:string;
    this.db.object("/Course/"+id).forEach(course =>{
      name = course.name;  
    });         
    return name
  }

  searchUserInformartion(id:string,info:string):string{

    let name:string, phone: string, eMail:string;
    
    this.db.object("/User/"+id).forEach(user =>{
      name = user.firstName + " " + user.lastName;
      phone = user.phone;
      eMail = user.email;  
    });

    if(info == "name"){
      return name;      
    }else if(info == "phone"){
      return phone
    }else if(info=="email"){
      return eMail
    }
  }

  // Query licences

  queryTechnicals():void{
    this.techList = this.db.list('/User', {
      query: {
        orderByChild: "userRole",
        equalTo: "Technical"
      }
    });
    this.techList.forEach(this.storeTechnicals.bind(this));  
  }
  
  storeTechnicals(technicals):void{
    this.techData = [];
    technicals.forEach(technical=> {
      this.techData.push(technical);
  
    });
  }

  queryLicences():void{
    this.licenceDataModel=[];
    this.licenceList = this.db.list('/Licence', {
          query: {
            limitToLast: 200,
            orderByChild: "parentHouse",
            
          }
        });
    this.licenceList.forEach(this.storeLicences.bind(this));
  }
  
  storeLicences(licences):void{
    this.licenceDataModel=[];
    licences.forEach(licence => {    
                
                
      var techN = this.db.object("/User/"+licence.idTechnical).forEach(tName =>{
        var name:string = String(tName.firstName) + "" + String(tName.lastName?tName.lastName:"");
        licence.namePersonOnCharge = name;     
      }); 
      
      var licPrice = this.db.object("/Product/"+licence.productId).forEach(lPrice =>{
        var price:number = lPrice.price;       
        licence.price = price;     
      }); 
      
      this.licenceDataModel.push(licence); 
              
    });    
  }

  getLicenceView():string{
    return this.licenceView;
  }

  setLicenceView(view:string):void{
    this.licenceView=view;
    this.licence = {
      relatedProducts:[],
      relProd:[]
    }
    
  }

  editLicence(index):void {
    this.setLicenceView("licenceEdit");    
    this.licence=this.licenceDataModel[index];
    var relProds = this.db.object("/Product/"+this.licence.productId ).forEach(element =>{
      this.licence.relatedProducts = element.relatedProducts;          
     }); 
    var discount = this.db.object("/Product/"+this.licence.productId).forEach(element =>{
    this.licence.discount = element.discount;          
     });   
    console.log(this.licence)

  }

  // Add licences

  addLicence():void{
    var theKey = this.db.database.ref().child("/Licence/").push().key;
    this.db.object("/Licence/"+theKey).set({
      name: this.licence.name,
      description: this.licence.description,
      imageURL: this.licence.imageURL,
      virtualURL:this.licence.virtualURL,
      parentCompany:this.licence.parentCompany,
      licenceMain: this.licence.licenceMain,    
      idTechnical:this.licence.idTechnical
  
    }).catch(
      err => {
        console.error(err);
      }
    );
  (this.licence.discount==0)? this.licence.hasDiscount=false: this.licence.hasDiscount=true;
   
     var keyLicence = this.addProduct(theKey,this.licence.name,this.licence.description,
      this.licence.imageURL,this.licence.price,"licence",0,this.licence.relatedProducts,this.licence.hasDiscount,this.licence.discount,
      this.licence.virtualURL);
       
    this.db.object("/Licence/"+theKey).update({
      productId:keyLicence,
    });
  
     
    this.createCroissedRelated(this.licence.relatedProducts,keyLicence); 
    this.licence={};
    this.setLicenceView("licenceList");  

  }

  updateLicence():void{  

    var newLicence = this.licence;
    this.licenceList = this.db.list("/Licence/");
    this.licenceList.update(newLicence.$key,{
   
      name: newLicence.name,
      description: newLicence.description,
      imageURL: newLicence.imageURL,
      virtualURL: newLicence.virtualURL,
      parentCompany: newLicence.parentCompany,    
      idTechnical: newLicence.idTechnical,
      licenceMain: newLicence.licenceMain, 
  
    }).catch(
      err => {
        console.error(err);
      }
    );

    (newLicence.discount==0)? newLicence.hasDiscount=false: newLicence.hasDiscount=true;

    this.updateProduct(newLicence.productId,newLicence.name,newLicence.description,
      newLicence.imageURL,newLicence.price,"licence",0,
      newLicence.relatedProducts,newLicence.hasDiscount, newLicence.discount, newLicence.virtualURL);
         
     
    this.createCroissedRelated(newLicence.relatedProducts,newLicence.productId);
    this.setLicenceView("licenceList");
    this.licence={};
    this.queryLicences; 

  }

  // Promotions creation

  queryProducts():void{
    this.productDataModel=[];
    this.productList = this.db.list('/Product', {
      query: {
        limitToLast: 200,  
        
      }
    });
    this.productList.forEach(this.storeProducts.bind(this));
  }

  storeProducts(products):void{
    this.productDataModel=[];
    this.promotionDataModel=[];      
    products.forEach(product => {
      let productF = {
        $key : "",
        name:"",
        description:"",
        imageURL:"",
        idProduct:[],
        price:"",
        hasDiscount:false,
        discount:0,
        tax:0,
        productName:[],
        relatedProducts:[],
        type:"",
      };   
             
      if(product.type === "promotion"){
        product.idProduct.forEach(prodName =>{          
          var prodN = this.db.object("/Product/"+prodName.idProduct).forEach(pName =>{
            console.log(prodName.idProduct)
            var name:string = pName.name;
            productF.productName.push(name);     
          });
        });
        productF = {
          $key: product.$key,
          name:product.name,
          description:product.description,
          imageURL:product.imageURL,
          idProduct:product.idProduct,
          price:product.price,
          hasDiscount:product.hasDiscount,
          discount:product.discount,
          tax:product.tax,
          productName: productF.productName,          
          relatedProducts:product.relatedProducts,
          type:product.type,
        };        
        this.promotionDataModel.push(productF);        
      }
      this.productDataModel.push(product);
    });
    //console.log(this.promotionDataModel)
  }

  getBuyView():string{
    return this.buyView;
  }

  setBuyView(view:string):void{
    this.buyView=view;
    this.promotionModel={
      relatedProducts:[],
      relProd:{},
      idProduct:[]
    };
    this.sliderModel = {};  
  }
  pushProducts(id:string):void{    
    this.promotionModel.idProduct.push({idProduct:id});
    console.log(id);
    }

  removeProducts(index:number):void{
    this.promotionModel.idProduct.splice(index,1);   
  }

 queryPrice(id:string):number{    
    let price:number;
    this.db.object("/Product/"+id).forEach(product =>{
      price = product.price;  
    });         
    return price
  }
  showRounded(num:number,type?:string):number{
    if(type === "discount"){
      return Math.round(num*100)      
    }else if(!type){
      return Math.round(num)
    }else{
      return Math.round(num)
    }
  }
   addPromotion():void{
    let realPrice:number = 0;

    this.promotionModel.idProduct.forEach(product => {      
      realPrice = realPrice + Number(this.queryPrice(product.idProduct));      
    });
    this.promotionModel.discount = (1-(Number(this.promotionModel.dPrice)/realPrice));

    var theKey = this.db.database.ref().child("/Product/").push().key;
    this.db.object("/Product/"+theKey).set({
      name: this.promotionModel.name,      
      description: this.promotionModel.description,
      idProduct: this.promotionModel.idProduct,
      imageURL: this.promotionModel.imageURL, 
      hasDiscount: true,     
      discount: this.promotionModel.discount,
      type:"promotion",
      tax:0,
      price: realPrice,
      relatedProducts: this.promotionModel.relatedProducts, 
    }).catch(
      err => {
        console.error(err);
      }
    );
     
    this.createCroissedRelated(this.promotionModel.relatedProducts,theKey); 
    this.promotionModel={};
    this.buyView = "promotionsList";      
  }

  editPromotion(index){
    this.promotionModel = this.promotionDataModel[index];
    this.promotionModel.dPrice = Math.round(this.promotionModel.price*(1-this.promotionModel.discount));
    this.buyView = "promotionsEdit";
    console.log(this.promotionModel);
  }

  updatePromotion():void{

    let realPrice:number = 0;
    this.promotionModel.idProduct.forEach(product => {      
      realPrice = realPrice + Number(this.queryPrice(product.idProduct));      
    });
    console.log(realPrice + " realPrice")
    this.promotionModel.discount = (1-(Number(this.promotionModel.dPrice)/realPrice));
    console.log(this.promotionModel.dPrice + " precio");
    console.log(this.promotionModel.discount + " descuento")    
    var newPromotion = this.promotionModel;
    console.log(newPromotion)
    console.log(this.promotionModel.$key)
    this.promotionList = this.db.list("/Product");
    this.promotionList.update(newPromotion.$key,{
      name: newPromotion.name,      
      description: newPromotion.description,
      idProduct: newPromotion.idProduct,
      imageURL: newPromotion.imageURL, 
      hasDiscount: true,     
      discount: newPromotion.discount,
      type:"promotion",
      tax:0,
      price: realPrice,
      relatedProducts: newPromotion.relatedProducts, 
    }).catch(
      err =>{
        console.error(err);
      }
    );    
    this.createCroissedRelated(newPromotion.relatedProducts,newPromotion.$key); 
    this.promotionModel={};
    this.buyView = "promotionsList";
    this.queryProducts();      
  }

  // Sliders creation

  querySliders():void{
    this.slidersDataModel=[];
    this.sliderList = this.db.list('/Sliders', {
      query: {
        limitToLast: 200,  
        
      }
    });
    this.sliderList.forEach(this.storeSliders.bind(this));
  }

  storeSliders(sliders):void{
    
    sliders.forEach(slider=>{
      this.slidersDataModel.push(slider);
    })
  }

  createSlider(){

    var theKey = this.db.database.ref().child("/Sliders/").push().key;
    this.db.object("/Sliders/"+theKey).set({
      title: this.sliderModel.title?this.sliderModel.title:"",      
      description: this.sliderModel.description?this.sliderModel.description:"",     
      imageURL: this.sliderModel.imageURL?this.sliderModel.imageURL:"", 
      urlPage: this.sliderModel.urlPage,
      urlVideo: this.sliderModel.urlVideo? this.sliderModel.urlVideo:"",
      urlFirstImage: this.sliderModel.urlFirstImage? this.sliderModel.urlFirstImage:"",
      urlSecImage: this.sliderModel.urlSecImage? this.sliderModel.urlSecImage:""

    }).catch(
      err => {
        console.error(err);
      }
    );    
    
    this.sliderModel={};
    this.querySliders();
    this.buyView = "slidesList"; 
  }  

  editSlider(index:number):void{
    this.buyView = "sliderEdit";
    this.sliderModel = this.slidersDataModel[index];
  }

  updateSlider():void{
    var newSlider = this.sliderModel;
    this.sliderList = this.db.list("/Sliders/");
    console.log(newSlider)
    this.sliderList.update(newSlider.$key,{    
      title: newSlider.title?newSlider.title:"",      
      description: newSlider.description?newSlider.description:"",     
      imageURL: newSlider.imageURL?newSlider.imageURL:"", 
      urlPage: newSlider.urlPage,
      urlVideo: newSlider.urlVideo? newSlider.urlVideo:"",
      urlFirstImage: newSlider.urlFirstImage? newSlider.urlFirstImage:"",
      urlSecImage: newSlider.urlSecImage? this.sliderModel.urlSecImage:""        
        }).catch(
          err => {
            console.error(err);
          }
        );
        this.sliderModel={};
        this.querySliders();
        this.buyView = "slidesList"; 
  }

  deleteSlider(index):void{
    this.sliderReference = this.fireBaseApp.database().ref().child("/Sliders/" + this.slidersDataModel[index].$key);
    this.sliderReference.remove();
    console.log("slider Eliminado");
    this.querySliders();

  }

  // Courses request

  queryCoursesRequest():void{
    this.requestCourseModel=[];
    this.requestCourseList = this.db.list('/CourseRequest', {
      query: {
        limitToLast: 200, 
        
      }
    });

    this.requestCourseList.forEach(this.storeRequests.bind(this));
  }

  storeRequests(requests){
    this.requestCourseModel=[];
    requests.forEach(courseList =>{ 
      let courseId:string = courseList.$key;
      console.log(courseId);
      for (var $key in courseList) {
        let userId:string = $key;
        console.log(userId);
        if (!courseList.hasOwnProperty($key)) continue;
    
        var obj = courseList[$key];
        for (var prop in obj) {
            // skip loop if the property is from prototype
            if(!obj.hasOwnProperty(prop)) continue;
            
            let request = {
              courseId:courseId,
              userId:userId,
              date: obj.date           
            };
            this.requestCourseModel.push(request);            
        }
    }
     
    });

    console.log(this.requestCourseModel);
  }

  pushActiveCourses(course):void{
   this.activeCourses = [];
    let newCourse = {};
    let todayDat = new Date();
    let oneYearDate = new Date((todayDat.getFullYear()+1),(todayDat.getMonth()),todayDat.getDate());
    let isNotRepeated: boolean;
   
      course.forEach(active=>{
        let courseDate = new Date(active.expDate)
        if(active.idCourse == this.request.courseId && courseDate < todayDat ){ // the user had the course but it expires
          let courseUpd = {
            achieved:active.achieved,
            expDate: oneYearDate.toJSON(),
            idCourse: active.idCourse
          }
          this.activeCourses.push(courseUpd);
                     
        }else if(active.idCourse != this.request.courseId){ 
          isNotRepeated = true;
          this.activeCourses.push(active);
                    
        } else if(active.idCourse == this.request.courseId && courseDate > todayDat ){
          this.activeCourses.push(active);
        }
      })

      if(isNotRepeated || !this.activeCourses[0]){
        let newCourse = {
          achieved:1,
          expDate: oneYearDate.toJSON(),
          idCourse: this.request.courseId
        } 
        this.activeCourses.push(newCourse);
      }       
 
  }

   agreeRequest(index:number){
    this.request = this.requestCourseModel[index];
    

    this.userRequestList = this.db.list("/User/" + this.request.userId + "/activeCourses/", {
      query:{
        limitToLast:200,
      }
    });

    this.userRequestList.forEach(this.pushActiveCourses.bind(this));
    
    let timer = window.setTimeout(()=>{
      this.userRequestList = this.db.list("/User/");
      this.userRequestList.update(this.request.userId,{
      activeCourses: this.activeCourses
      });
      this.denyRequest(index);
      this.queryCoursesRequest();

    },2000);     
  }

  denyRequest(index:number){
    let request = this.requestCourseModel[index];
    let ref = this.fireBaseApp.database().ref().child("/CourseRequest/"+request.courseId + "/" + request.userId);
    ref.remove();
  }
 
  /*animation and front methods
  */ 

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

  setMenuMobState(){
    (this.menuMobState==="inactive")? this.menuMobState="active":this.menuMobState="inactive";
    (this.iconMobState==="inactive")? this.iconMobState="active":this.iconMobState="inactive";
    (this.iconExitMobState==="inactive")? this.iconExitMobState="active":this.iconExitMobState="inactive";
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


  setSectionActive(i:number){
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
    this.productModel = {};
    this.licence = {};
    this.promotionModel = {};
    this.buyView = "slidesList"; 
    this.productView = "productList"
    this.licenceView = "licenceList"
    this.setMenuMobState();
    this.scrollTop();
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent)  {
    this.key = event.key;
    if(this.key === "Escape"){
      this.inactivePrettyState();
    }
  }

}
