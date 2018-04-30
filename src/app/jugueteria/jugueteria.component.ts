import { Component, OnInit } from '@angular/core';
import { Images } from 'app/pretty-slider/images';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";
import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from 'firebase/app';
import { SlideGroup } from 'app/simply-slider/slideGroup';
import { Slide } from 'app/simply-slider/slide';

@Component({
  selector: 'app-jugueteria',
  templateUrl: './jugueteria.component.html',
  styleUrls: ['./jugueteria.component.css']
})
export class JugueteriaComponent implements OnInit {

  


  productsList: FirebaseListObservable<any[]>;
  productsData: any[];
  slides:SlideGroup;
  id1:string = "id1";

  imagesArray:Images[] = [
    new Images("http://assets.voxel3d.net/sectores/diseno-industrial/jugueteria/aiboJuanMartinez.jpg","AIBO","Juan Martinez"),
    new Images("http://assets.voxel3d.net/sectores/diseno-industrial/jugueteria/batimovilDeJugueteAlexanderPena.png","Batimovil de juguete","Alexander Peña"),
    new Images("http://assets.voxel3d.net/sectores/diseno-industrial/jugueteria/dinosaurioJorgeTorres.png","Dinosaurio","Jorge Torres"),
    new Images("http://assets.voxel3d.net/sectores/diseno-industrial/jugueteria/goofyDiegoMauricioNarvaez.jpg","Goofy","Diego Mauricio Narvaez"),
    new Images("http://assets.voxel3d.net/sectores/diseno-industrial/jugueteria/helicopteroDanielFelipePinerosAlarcon.jpg","Helicóptero","Daniel Felipe Piñeros Alarcon"),
    new Images("http://assets.voxel3d.net/sectores/diseno-industrial/jugueteria/helicopteroJugueteDianaHernandez.bmp","Helicoptero juguete","Diana Hernandez"),
    new Images("http://assets.voxel3d.net/sectores/diseno-industrial/jugueteria/insectosDeJugueteOmarGiedelman.bmp","insectos de juguete","Omar Giedelman"),
    new Images("http://assets.voxel3d.net/sectores/diseno-industrial/jugueteria/krakenOscarJavierRodriguez.png","Kraken","Oscar Javier Rodriguez"),
    new Images("http://assets.voxel3d.net/sectores/diseno-industrial/jugueteria/legoSpidermanAndresRamires.jpg","Lego Spiderman","Andres Ramires"),
    new Images("http://assets.voxel3d.net/sectores/diseno-industrial/jugueteria/robotAlfredoGonzales.png","Robot","Alfredo Gonzales"),
    new Images("http://assets.voxel3d.net/sectores/diseno-industrial/jugueteria/robotAudreyArevalo.jpg","Robot","Audrey Arevalo"),
    new Images("http://assets.voxel3d.net/sectores/diseno-industrial/jugueteria/robotNicolasAscanio.bmp","Robot","Nicolas Ascanio"),
    new Images("http://assets.voxel3d.net/sectores/diseno-industrial/jugueteria/robotNicolasAscanio2.bmp","Robot","Nicolas Ascanio"),
    new Images("http://assets.voxel3d.net/sectores/diseno-industrial/jugueteria/WallE_PaulaGonzales.jpg","Wall-E","Paula Gonzales"),
    new Images("http://assets.voxel3d.net/sectores/diseno-industrial/jugueteria/Toy_OmarGiedelman.bmp","Toy","Omar Giedelman"),
    new Images("http://assets.voxel3d.net/sectores/diseno-industrial/jugueteria/Rockets_OmarGiedelman.bmp","Rockets","Omar Giedelman"),
    new Images("http://assets.voxel3d.net/sectores/diseno-industrial/jugueteria/LightningMcQueen_RobertoYoshida.jpg","Lightning McQueen","Roberto Yoshida"),
    new Images("http://assets.voxel3d.net/sectores/diseno-industrial/jugueteria/AIBO_ErikaFigueroa.jpg","AIBO","Érika Figueroa"),
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
          if(product.sectors[i].name == "jugueteria"){
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
