import { Component, OnInit } from '@angular/core';
import { Images } from 'app/pretty-slider/images';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";
import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from 'firebase/app';
import { SlideGroup } from 'app/simply-slider/slideGroup';
import { Slide } from 'app/simply-slider/slide';


@Component({
  selector: 'app-joyeria',
  templateUrl: './joyeria.component.html',
  styleUrls: ['./joyeria.component.css']
})
export class JoyeriaComponent implements OnInit {



  productsList: FirebaseListObservable<any[]>;
  productsData: any[];
  slides:SlideGroup;
  id1:string = "id1";

  imagesArray:Images[] = [
    new Images("http://assets.voxel3d.net/sectores/diseno-industrial/joyeria/Anillo_BeatrizMontalvo.png","Anillo","Beatriz Montalvo"),
    new Images("http://assets.voxel3d.net/sectores/diseno-industrial/joyeria/Anillo_JoseMora.jpg","Anillo","José Mora"),
    new Images("http://assets.voxel3d.net/sectores/diseno-industrial/joyeria/Anillo_MercedezPosada.png","Anillo","Mercedez Posada"),
    new Images("http://assets.voxel3d.net/sectores/diseno-industrial/joyeria/Argollas_JavierRiccardi.png","Argollas","Javier Riccardi"),
    new Images("http://assets.voxel3d.net/sectores/diseno-industrial/joyeria/Aros_ElizabethZapata.png","Aros","Elizabeth Zapata"),
    new Images("http://assets.voxel3d.net/sectores/diseno-industrial/joyeria/anilloHaloJavierRiccardi.png","Anillo Halo","Javier Riccardi"),
    new Images("http://assets.voxel3d.net/sectores/diseno-industrial/joyeria/anilloJavierRiccardi.png","Anillo","Javier Riccardi"),
    new Images("http://assets.voxel3d.net/sectores/diseno-industrial/joyeria/anilloPetalosJavierRiccardi.png","Anillo Pétalos","Javier Riccardi"),
    new Images("http://assets.voxel3d.net/sectores/diseno-industrial/joyeria/anilloPetalosJavierRiccardi2.png","Anillo Pétalos","Javier Riccardi"),
    new Images("http://assets.voxel3d.net/sectores/diseno-industrial/joyeria/anilloPulpoJavierRiccardi.jpg","Anillo Pulpo","Javier Riccardi"),
    new Images("http://assets.voxel3d.net/sectores/diseno-industrial/joyeria/anilloPulpoJavierRiccardi.png","Anillo Pulpo","Javier Riccardi"),
    new Images("http://assets.voxel3d.net/sectores/diseno-industrial/joyeria/anilloPulpoJavierRiccardi2.jpg","Anillo Pulpo","Javier Riccardi"),
    new Images("http://assets.voxel3d.net/sectores/diseno-industrial/joyeria/anillosElizabethZapata.png","Anillos","Elizabeth Zapata"),
    new Images("http://assets.voxel3d.net/sectores/diseno-industrial/joyeria/anillosMariaMercedezPosada.jpg","Anillos","Maria Mercedez Posada"),
    new Images("http://assets.voxel3d.net/sectores/diseno-industrial/joyeria/anillosMarioStivenOliveros.jpg","Anillos","Mario Stiven Oliveros"),
    new Images("http://assets.voxel3d.net/sectores/diseno-industrial/joyeria/brocheDePetalosJavierRiccardi.png","Broche de Petalos","Javier Riccardi"),
    new Images("http://assets.voxel3d.net/sectores/diseno-industrial/joyeria/corazonesElizabethZapata.png","Corazones","Elizabeth Zapata"),
    new Images("http://assets.voxel3d.net/sectores/diseno-industrial/joyeria/ringRomeWieland.png","Ring Rome","Wieland"),

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
          if(product.sectors[i].name == "joyeria"){
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
