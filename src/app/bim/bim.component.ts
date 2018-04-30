import { Images } from 'app/pretty-slider/images';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";
import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from 'firebase/app';
import { SlideGroup } from 'app/simply-slider/slideGroup';
import { Slide } from 'app/simply-slider/slide';
import { OnInit, Component } from '@angular/core';

@Component({
  selector: 'app-bim',
  templateUrl: './bim.component.html',
  styleUrls: ['./bim.component.css']
})
export class BimComponent implements OnInit {
  productsList: FirebaseListObservable<any[]>;
  productsData: any[];
  slides:SlideGroup;
  id1:string = "id1";

  imagesArray:Images[] = [
    new Images("http://assets.voxel3d.net/sectores/arquitectura/bim/AirbusCenter_DalyMoreno.jpg","Airbus Center","Daly Moreno"),
    new Images("http://assets.voxel3d.net/sectores/arquitectura/bim/AyuntamientoDeBolivar_SistemaFormal.jpg","Ayuntamiento de Bolívar","Sistema Formal"),
    new Images("http://assets.voxel3d.net/sectores/arquitectura/bim/BasiicaGospeOdOtoka_Vyonyx_Architecture.jpg","Basílica Gospe Od Otoka","Vyonyx Architecture"),
    new Images("http://assets.voxel3d.net/sectores/arquitectura/bim/CasaDasCanoas_OscarNiemeyer.jpg","Casas das canoas","Oscar Niemeyer"),
    new Images("http://assets.voxel3d.net/sectores/arquitectura/bim/InnovateABQ_NicholasLarranaga.jpg","Innovate ABQ","Nicholas Larrañaga"),
    new Images("http://assets.voxel3d.net/sectores/arquitectura/bim/InnovationCenterHouston_Anthony_O.jpg","Innovation Center Houston","Anthony O"),
    new Images("http://assets.voxel3d.net/sectores/arquitectura/bim/ResidentialBuidingGdansk_AndrzejSkalany.jpg","Residential buiding Gdansk","Andrzej Skalany"),
    new Images("http://assets.voxel3d.net/sectores/arquitectura/bim/SolitudoBuilding_VyonyxArchitecture.jpg","Solitudo Building","Vyonyx Architecture"),
    new Images("http://assets.voxel3d.net/sectores/arquitectura/bim/WanchaiHelipad_DalyMoreno.jpg","Wanchai Helipad","Daly Moreno"),
    new Images("http://assets.voxel3d.net/sectores/arquitectura/bim/WaterTreatmentStation_DalyMorenoAndLeisHo.jpg","Water treatment station","Daly Moreno & Leis Ho"),   
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
          if(product.sectors[i].name == "bim"){
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
