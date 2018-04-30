import { Component, OnInit } from '@angular/core';
import { Images } from 'app/pretty-slider/images';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";
import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from 'firebase/app';
import { SlideGroup } from 'app/simply-slider/slideGroup';
import { Slide } from 'app/simply-slider/slide';

@Component({
  selector: 'app-sistemas-de-transporte',
  templateUrl: './sistemas-de-transporte.component.html',
  styleUrls: ['./sistemas-de-transporte.component.css']
})
export class SistemasDeTransporteComponent implements OnInit {


  productsList: FirebaseListObservable<any[]>;
  productsData: any[];
  slides:SlideGroup;
  id1:string = "id1";

  imagesArray:Images[] = [
    new Images("http://assets.voxel3d.net/sectores/diseno-industrial/sistemas-de-transporte/BMWSerie1_JulianDelgado.jpg","BMW Serie 1","Julián Delgado"),
    new Images("http://assets.voxel3d.net/sectores/diseno-industrial/sistemas-de-transporte/BMWSerie1b_JulianDelgado.jpg","BMW Serie 1","Julián Delgado"),
    new Images("http://assets.voxel3d.net/sectores/diseno-industrial/sistemas-de-transporte/F1_SENA.png","F1","SENA"),
    new Images("http://assets.voxel3d.net/sectores/diseno-industrial/sistemas-de-transporte/LockheedP-38_SebastianPinzon.png","LockheedP-38","Sebastian Pinzón"),
    new Images("http://assets.voxel3d.net/sectores/diseno-industrial/sistemas-de-transporte/R4Conepto_IvanRomero.jpg","R4 Conepto","Ivan Romero"),  
    new Images("http://assets.voxel3d.net/sectores/diseno-industrial/sistemas-de-transporte/automovilIvanBasso.jpg","Automovil","Ivan Basso"),
    new Images("http://assets.voxel3d.net/sectores/diseno-industrial/sistemas-de-transporte/avionFelipeMarconi.jpg","Avión","Felipe Marconni"),
    new Images("http://assets.voxel3d.net/sectores/diseno-industrial/sistemas-de-transporte/avionFelipeMendoza.png","Avión","Felipe Mendoza"),
    new Images("http://assets.voxel3d.net/sectores/diseno-industrial/sistemas-de-transporte/bicicletaTrek6500Andresramirez.jpg","Bicicleta Trek 6500","Andres Ramírez"),
    new Images("http://assets.voxel3d.net/sectores/diseno-industrial/sistemas-de-transporte/bicicletasAlexanderPena.png","Bicicletas","Alexander Peña"),
    new Images("http://assets.voxel3d.net/sectores/diseno-industrial/sistemas-de-transporte/helicopteroMariaJoseGonzales.png","Helicóptero","Maria José Gonzales"),
    new Images("http://assets.voxel3d.net/sectores/diseno-industrial/sistemas-de-transporte/helicopteroRicardoPeralta.png","Helicóptero","Ricardo Peralta"),
    new Images("http://assets.voxel3d.net/sectores/diseno-industrial/sistemas-de-transporte/minicooperJulianDelgado.jpg","Mini Cooper","Julian Delgado"),
    new Images("http://assets.voxel3d.net/sectores/diseno-industrial/sistemas-de-transporte/motoDucatyLeonelOrtiz.jpg","Moto Ducaty","Leonel Ortiz"),
    new Images("http://assets.voxel3d.net/sectores/diseno-industrial/sistemas-de-transporte/speedbackNeilODonnel.jpg","Speedback","Neil O'Donnel"),
    new Images("http://assets.voxel3d.net/sectores/diseno-industrial/sistemas-de-transporte/tractomulaEdwinRodrigoEscobar.jpg","Tractomula","Edwin Rodrigo Escobar"),
    new Images("http://assets.voxel3d.net/sectores/diseno-industrial/sistemas-de-transporte/tractomulaEdwinRodrigoEscobar2.jpg","Tractomula","Edwin Rodrigo Escobar"),
    new Images("http://assets.voxel3d.net/sectores/diseno-industrial/sistemas-de-transporte/vehiculoCarlosAvila.png","Vehículo","Carlos Ávila"),
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
          if(product.sectors[i].name == "sistemas-de-transporte"){
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
