import { Component, OnInit } from '@angular/core';
import { Images } from 'app/pretty-slider/images';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";
import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from 'firebase/app';
import { SlideGroup } from 'app/simply-slider/slideGroup';
import { Slide } from 'app/simply-slider/slide';

@Component({
  selector: 'app-civil',
  templateUrl: './civil.component.html',
  styleUrls: ['./civil.component.css']
})
export class CivilComponent implements OnInit {


  productsList: FirebaseListObservable<any[]>;
  productsData: any[];
  slides:SlideGroup;
  id1:string = "id1";

  imagesArray:Images[] = [
    new Images("http://assets.voxel3d.net/sectores/ingenieria/civil/DistribucionEnPlanta_CarlosBolivar.jpg","Distribución en planta","Carlos Bolívar"),
    new Images("http://assets.voxel3d.net/sectores/ingenieria/civil/EdificioSilos_CarlosBolivar.jpg","Edificios Silos","Carlos Bolívar"),
    new Images("http://assets.voxel3d.net/sectores/ingenieria/civil/EstructuraBodegas_CarlosBolivar.jpg","Estructura Bodegas","Carlos Bolívar"),
    new Images("http://assets.voxel3d.net/sectores/ingenieria/civil/MontajeFiltro_CarlosBolivar.jpg","Montaje Filtro","Carlos Bolívar"),
    new Images("http://assets.voxel3d.net/sectores/ingenieria/civil/MontrealRhinoterrain_Claude_Vuattoux.png","Montreal Rhino Terrain","Claude Vuattoux"),    
    new Images("http://assets.voxel3d.net/sectores/ingenieria/civil/ciudadArribaVray.jpg","Ciudad desde arriba","V-Ray"),
    new Images("http://assets.voxel3d.net/sectores/ingenieria/civil/ciudadArribaVray2.jpg","Ciudad desde arriba","V-Ray"),
    new Images("http://assets.voxel3d.net/sectores/ingenieria/civil/ciudadArribaVray3.jpg","Ciudad desde arriba","V-Ray"),
    new Images("http://assets.voxel3d.net/sectores/ingenieria/civil/torresVray.jpg","Torres","V-Ray"),
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
          if(product.sectors[i].name == "civil"){
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
