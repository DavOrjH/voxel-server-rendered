import { Component, OnInit } from '@angular/core';
import { Images } from 'app/pretty-slider/images';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";
import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from 'firebase/app';
import { SlideGroup } from 'app/simply-slider/slideGroup';
import { Slide } from 'app/simply-slider/slide';


@Component({
  selector: 'app-calzado',
  templateUrl: './calzado.component.html',
  styleUrls: ['./calzado.component.css']
})
export class CalzadoComponent implements OnInit {


  productsList: FirebaseListObservable<any[]>;
  productsData: any[];
  slides:SlideGroup;
  id1:string = "id1";

  imagesArray:Images[] = [
    new Images("http://assets.voxel3d.net/sectores/diseno-industrial/calzado/AirJordanConcept_MichaelWilden.jpg","Air Jordan Concept","Michael Wilden"),
    new Images("http://assets.voxel3d.net/sectores/diseno-industrial/calzado/DCConceptShoe_ChadKnightDCShoes.jpg","DC Concept Shoe","Chad Knight DC Shoes"),
    new Images("http://assets.voxel3d.net/sectores/diseno-industrial/calzado/Nature_OsvaliJr.jpg","Nature","Osvali Jr"),
    new Images("http://assets.voxel3d.net/sectores/diseno-industrial/calzado/OrcanicShoeSole_MehmetTurket.jpg","Orcanic Shoe Sole","Mehmet Turket"),
    new Images("http://assets.voxel3d.net/sectores/diseno-industrial/calzado/SandaliaEcko_Sebastian_Pinzon.png","Sandalia Ecko","Sebastian Pinzon"),
    new Images("http://assets.voxel3d.net/sectores/diseno-industrial/calzado/WhatIsThis_Caminitto.jpg","what is this","Caminitto"),
    new Images("http://assets.voxel3d.net/sectores/diseno-industrial/calzado/moldeDeSuelaVicenteArismendy.jpg","Molde de suela","Vicente Arismendy"),
    new Images("http://assets.voxel3d.net/sectores/diseno-industrial/calzado/moldeSuelasAlejandroOrtiz.png","Molde de suela","Alejandro Ortiz"),
    new Images("http://assets.voxel3d.net/sectores/diseno-industrial/calzado/moldeSuelasAlejandroOrtiz2.png","Molde de suela","Alejandro Ortiz"),
    new Images("http://assets.voxel3d.net/sectores/diseno-industrial/calzado/suelaVicenteArismendy.jpg","Suela","Vicente Arismendy"),
    new Images("http://assets.voxel3d.net/sectores/diseno-industrial/calzado/suelaVicenteArismendy2.jpg","Suela","Vicente Arismendy"),
    new Images("http://assets.voxel3d.net/sectores/diseno-industrial/calzado/suelaVicenteArismendy3.jpg","Suela","Vicente Arismendy"),
    new Images("http://assets.voxel3d.net/sectores/diseno-industrial/calzado/zapatillasPumaLauraCardona.jpg","Zapatillas Puma","Laura Cardona"),
    new Images("http://assets.voxel3d.net/sectores/diseno-industrial/calzado/zapatillasPumaLauraCardona2.jpg","Zapatillas Puma","Laura Cardona"),

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
          if(product.sectors[i].name == "calzado"){
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
