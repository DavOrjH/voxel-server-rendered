import { Component, OnInit, HostListener } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

declare var jQuery:any;
declare var $:any;


@Component({
  selector: 'app-rhinoceros',
  templateUrl: './rhinoceros.component.html',
  styleUrls: ['./rhinoceros.component.css']
})
export class RhinocerosComponent implements OnInit {
  licenceList: FirebaseListObservable<any[]>;
  licenceDataModel: any[];

  infoView:string = "global-vision";
  videoWidth:number = 768;
  videoHeight:number = 1366;


  constructor(private db:AngularFireDatabase,) { 
    this.queryLicences();
    let timer:any = window.setTimeout(()=>{
      console.log(this.licenceDataModel);
    },3000);

  }

  ngOnInit() {
    this.setVideoSize();
    this.scrollTop();
  }

  scrollTop():void{
    $('html,body').animate({
      scrollTop:0
    },200);
 }


  queryLicences():void{
    this.licenceDataModel=[];
    this.licenceList = this.db.list('/Licence', {
          query: {
            limitToLast: 200,
            orderByChild: "licenceMain",
            equalTo: 'rhinoceros'
            
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





  setVideoSize():void{
    
      if($( window ).width()>942 && $( window ).width()<1240 ){
        this.videoWidth = ($( window ).width()-60)/2-20;
        this.videoHeight = this.videoWidth*360/640;
      }else if($( window ).width()>1240){
      this.videoWidth = (1240-60)/2-20;
      this.videoHeight = this.videoWidth*360/640;
      }else{
      this.videoWidth = ($( window ).width()-60)-20;        
      this.videoHeight = this.videoWidth*360/640;         
      }
    }


  getInfoView():string{
    return this.infoView
  }

  setInfoView(view:string):void{
    this.infoView = view;
  }

  @HostListener('window:resize', ['$event'])
  onResize($event:any){

    this.setVideoSize();
  }  

}
