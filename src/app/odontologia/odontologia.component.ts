import { Images } from 'app/pretty-slider/images';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";
import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from 'firebase/app';
import { SlideGroup } from 'app/simply-slider/slideGroup';
import { Slide } from 'app/simply-slider/slide';
import { OnInit, Component } from '@angular/core';

@Component({
  selector: 'app-odontologia',
  templateUrl: './odontologia.component.html',
  styleUrls: ['./odontologia.component.css']
})
export class OdontologiaComponent implements OnInit {

  productsList: FirebaseListObservable<any[]>;
  productsData: any[];
  slides:SlideGroup;
  id1:string = "id1";

  imagesArray:Images[] = [
    // new Images("http://assets.voxel3d.net/sectores/arquitectura/diseno/banoCarolinaCanon.png","Baño","Carolina Cañon"),
    // new Images("http://assets.voxel3d.net/sectores/arquitectura/diseno/casaAurlienBrion.jpg","Casa","Aurlien-brion"),
    // new Images("http://assets.voxel3d.net/sectores/arquitectura/diseno/casaAurlienBrion2.jpg","Casa","Aurlien-brion"),
    // new Images("http://assets.voxel3d.net/sectores/arquitectura/diseno/casaPalmerasAnaPedroza.png","Casa de playa","Ana Pedroza"),
    // new Images("http://assets.voxel3d.net/sectores/arquitectura/diseno/casaPalmerasAnaPedroza2.png","Casa de playa","Ana Pedroza"),
    // new Images("http://assets.voxel3d.net/sectores/arquitectura/diseno/comedorJuanOrtiz.jpg","Comedor","Juan Ortiz"),
    // new Images("http://assets.voxel3d.net/sectores/arquitectura/diseno/interiorFreddyBoada.jpg","Interior","Freddy Boada"),
    // new Images("http://assets.voxel3d.net/sectores/arquitectura/diseno/interiorFreddyBoada.png","Interior","Freddy Boada"),
    // new Images("http://assets.voxel3d.net/sectores/arquitectura/diseno/interiorFreddyBoada2.png","Interior","Freddy Boada"),
    // new Images("http://assets.voxel3d.net/sectores/arquitectura/diseno/interiorJorgeAndresLopez.png","Interior","Jorge Andres Lopez"),
    // new Images("http://assets.voxel3d.net/sectores/arquitectura/diseno/interiorLauraMoraVillamizar.jpg","Interior","Laura Mora Villamizar"),
    // new Images("http://assets.voxel3d.net/sectores/arquitectura/diseno/oficinaJesusDavidAmayaBriceno.png","Oficina","Jesus David Amaya"),
    // new Images("http://assets.voxel3d.net/sectores/arquitectura/diseno/salaBibianaOvalle.bmp","Sala","Bibiana Ovalle"),
    // new Images("http://assets.voxel3d.net/sectores/arquitectura/diseno/salaJuanOrtiz.jpg","Sala","Juan Ortiz"),
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
          if(product.sectors[i].name == "odontologia"){
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
