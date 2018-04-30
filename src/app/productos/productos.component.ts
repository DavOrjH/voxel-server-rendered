import { Component, OnInit } from '@angular/core';
import { Images } from 'app/pretty-slider/images';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";
import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from 'firebase/app';
import { SlideGroup } from 'app/simply-slider/slideGroup';
import { Slide } from 'app/simply-slider/slide';


@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  productsList: FirebaseListObservable<any[]>;
  productsData: any[];
  slides:SlideGroup;
  id1:string = "id1";

  imagesArray:Images[] = [
    new Images("http://assets.voxel3d.net/sectores/diseno-industrial/producto/Androidamepad_Fardin.jpg","Android gamepad","Fardin"),    
    new Images("http://assets.voxel3d.net/sectores/diseno-industrial/producto/Cafetera_Carolina_Vargas.png","Cafetera","Carolina Vargas"),
    new Images("http://assets.voxel3d.net/sectores/diseno-industrial/producto/CamaraAlanCrighton.jpg","Camara","Alan Crighton"),
    new Images("http://assets.voxel3d.net/sectores/diseno-industrial/producto/CascoAlbertoBaso.png","Casco","Alberto Baso"),
    new Images("http://assets.voxel3d.net/sectores/diseno-industrial/producto/Chivas_OscarMartinez.png","Chivas","Óscar Martínez"),
    new Images("http://assets.voxel3d.net/sectores/diseno-industrial/producto/GuitarraAlejandroGarcia.png","Guitarra","Alejandro García"),
    new Images("http://assets.voxel3d.net/sectores/diseno-industrial/producto/Magneciser400_JulianDelgado.jpg","Magneciser 400","Julián Delgado"),
    new Images("http://assets.voxel3d.net/sectores/diseno-industrial/producto/NESControl_AndresRamires.jpg","Control NES","Andrés Ramires"),
    new Images("http://assets.voxel3d.net/sectores/diseno-industrial/producto/NokiaXpressmusic_DiegoGarcia.75.png","Nokia Xpress Music","Diego García"),
    new Images("http://assets.voxel3d.net/sectores/diseno-industrial/producto/RotaryToolBAndDRTX-15_MartinNavia.png","Rotary Tool B & DRTX-15","Martín Navia"),
    new Images("http://assets.voxel3d.net/sectores/diseno-industrial/producto/cafeteraManuelFigueroa.jpg","cafetera","Manuel Figueroa"),
    new Images("http://assets.voxel3d.net/sectores/diseno-industrial/producto/guitarraAndreaDelPilarCamacho.bmp","Guitarra","Andrea Del Pilar Camacho"),
    new Images("http://assets.voxel3d.net/sectores/diseno-industrial/producto/headphonesDustinBrown.jpg","Headphones","Dustin Brown"),
    new Images("http://assets.voxel3d.net/sectores/diseno-industrial/producto/hpPrinterCamiloReyna.png","HP Printer","Camilo Reyna"),
    new Images("http://assets.voxel3d.net/sectores/diseno-industrial/producto/palmClaraHernandez.png","Palm","Clara Hernández"),
    new Images("http://assets.voxel3d.net/sectores/diseno-industrial/producto/palmClaraHernandez2.png","Palm","Clara Hernández"),
    new Images("http://assets.voxel3d.net/sectores/diseno-industrial/producto/ps3NicolasDuenas.jpg","PS3","Nicolas Dueñas"),
    new Images("http://assets.voxel3d.net/sectores/diseno-industrial/producto/relojLuisAlejandroGuzman.png","Reloj","Luis Alejandro Guzman"),    
    new Images("http://assets.voxel3d.net/sectores/diseno-industrial/producto/usbPabloRamirez.jpg","USB","Pablo Ramírez"),
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
          if(product.sectors[i].name == "productos"){
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
