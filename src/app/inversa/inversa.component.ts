import { Images } from 'app/pretty-slider/images';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";
import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from 'firebase/app';
import { SlideGroup } from 'app/simply-slider/slideGroup';
import { Slide } from 'app/simply-slider/slide';
import { OnInit, Component } from '@angular/core';

@Component({
  selector: 'app-inversa',
  templateUrl: './inversa.component.html',
  styleUrls: ['./inversa.component.css']
})
export class InversaComponent implements OnInit {

  
  productsList: FirebaseListObservable<any[]>;
  productsData: any[];
  slides:SlideGroup;
  id1:string = "id1";

  imagesArray:Images[] = [
    new Images("http://assets.voxel3d.net/sectores/ingenieria/inversa/CurveNetworkSurface_Mes2Surface.png","Curve Network Surface"," Mesh 2 Surface"),
    new Images("http://assets.voxel3d.net/sectores/ingenieria/inversa/DeviarionAnalyzer_Mes2Surface.png","Deviarion Analyzer"," Mesh 2 Surface"),
    new Images("http://assets.voxel3d.net/sectores/ingenieria/inversa/MeasureFillet_Mes2Surface.png","Measure Fillet","Mesh 2 Surface"),
    new Images("http://assets.voxel3d.net/sectores/ingenieria/inversa/ReverseEngineering_Mesh2Surface.png","Reverse Engineering","Mesh 2 Surface"),

  ];


  constructor(private db:AngularFireDatabase,
    public afAuth:AngularFireAuth) {
      this.queryProducts();    
   }

  ngOnInit() {
  }

  getImagesArray():Images[]{
    return this.imagesArray
  }

  queryProducts():void{
    
    this.productsData=[];
    this.productsList = this.db.list('/Course', {
          query: {
            limitToLast: 200,            
          }
        });
    this.productsList.forEach(this.storeProducts.bind(this));  
  }
  
  storeProducts(products):void{
    let sliderData = [];
      products.forEach(product => {        
        for(let i = 0; i< product.sectors.length;i++) {          
          if(product.sectors[i].name == "inversa"){
              let url:string = this.getProductUrl(product);           
              let slideNew:Slide = new Slide(product.cenefaURL,url);
              sliderData.push(slideNew);
              this.productsData.push(product);
              break
            }   
                                              
            
          }                             
      });
      this.slides = new SlideGroup(sliderData);
      console.log(this.slides)     
    }

    getProductUrl(product):string{
      let url:string;
      if(product.category == "advanced-training"){
        url = "/" + product.category + "/" + product.subCat;
      }else{
        url = "/" + product.category + "/" + product.$key;
      }
      return url
    }



}
