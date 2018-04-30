import { Component, OnInit } from '@angular/core';
import { Images } from 'app/pretty-slider/images';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";
import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from 'firebase/app';
import { SlideGroup } from 'app/simply-slider/slideGroup';
import { Slide } from 'app/simply-slider/slide';


@Component({
  selector: 'app-publicidad',
  templateUrl: './publicidad.component.html',
  styleUrls: ['./publicidad.component.css']
})
export class PublicidadComponent implements OnInit {

  productsList: FirebaseListObservable<any[]>;
  productsData: any[];
  slides:SlideGroup;
  id1:string = "id1";

  imagesArray:Images[] = [
    new Images("http://assets.voxel3d.net/sectores/diseno-industrial/publicidad/Barrel_VasiliyVatsyk.jpg","Barrel","Vasiliy Vatsyk"),
    new Images("http://assets.voxel3d.net/sectores/diseno-industrial/publicidad/BudLight_VasiliyVatsyk.jpg","Bud Light","Vasiliy Vatsyk"),
    new Images("http://assets.voxel3d.net/sectores/diseno-industrial/publicidad/CocaColaJakubGoda.jpg","Coca Cola","Jakub Goda"),
    new Images("http://assets.voxel3d.net/sectores/diseno-industrial/publicidad/CocaColaJakubGoda2.jpg","Coca Cola","Jakub Goda"),
    new Images("http://assets.voxel3d.net/sectores/diseno-industrial/publicidad/HeinekenPack_LeonardoLato.jpg","Heineken Pack","Leonardo Lato"),
    new Images("http://assets.voxel3d.net/sectores/diseno-industrial/publicidad/InspectorCuumbus_VijayPaul_DotSanLtd.jpg","Inspector Cuumbus","Vijay Paul, Dot San Ltd"),
    new Images("http://assets.voxel3d.net/sectores/diseno-industrial/publicidad/Rhinologo_Gery.jpg","Rhino Logo","Gery"),
    new Images("http://assets.voxel3d.net/sectores/diseno-industrial/publicidad/RockStarUKDelicateMachines.png","Rock Star UK","Delicate Machines"),
    new Images("http://assets.voxel3d.net/sectores/diseno-industrial/publicidad/SupradynPack_ViniciusCosta.jpg","Supradyn Pack","Vinicius Costa"),
    new Images("http://assets.voxel3d.net/sectores/diseno-industrial/publicidad/TelephoneBox_EnesBuyuktopbas.jpg","Telephone Box","Enes Buyuktopbas"),
    new Images("http://assets.voxel3d.net/sectores/diseno-industrial/publicidad/pisapapelesCamiloReyna.png","Pisapapeles","Camilo Reyna"),
    new Images("http://assets.voxel3d.net/sectores/diseno-industrial/publicidad/tiendaBrittoGinaRobayo.jpg","Tienda Britto","Gina Robayo"),
    new Images("http://assets.voxel3d.net/sectores/diseno-industrial/publicidad/tiendaBrittoGinaRobayo2.jpg","Tienda Britto","Gina Robayo"),
    new Images("http://assets.voxel3d.net/sectores/diseno-industrial/publicidad/tiendaBrittoGinaRobayo3.jpg","Tienda Britto","Gina Robayo"),
    new Images("http://assets.voxel3d.net/sectores/diseno-industrial/publicidad/tiendaBrittoGinaRobayo4.png","Tienda Britto","Gina Robayo"),
    new Images("http://assets.voxel3d.net/sectores/diseno-industrial/publicidad/tiendaBrittoGinaRobayo5.png","Tienda Britto","Gina Robayo"),
    new Images("http://assets.voxel3d.net/sectores/diseno-industrial/publicidad/tiendaBrittoGinaRobayo6.png","Tienda Britto","Gina Robayo"),
    new Images("http://assets.voxel3d.net/sectores/diseno-industrial/publicidad/tiendaBrittoGinaRobayo7.png","Tienda Britto","Gina Robayo"),

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
          if(product.sectors[i].name == "publicidad"){
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
