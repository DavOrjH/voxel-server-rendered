import { Images } from 'app/pretty-slider/images';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";
import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from 'firebase/app';
import { SlideGroup } from 'app/simply-slider/slideGroup';
import { Slide } from 'app/simply-slider/slide';
import { OnInit, Component } from '@angular/core';

@Component({
  selector: 'app-mecanica',
  templateUrl: './mecanica.component.html',
  styleUrls: ['./mecanica.component.css']
})
export class MecanicaComponent implements OnInit {


  productsList: FirebaseListObservable<any[]>;
  productsData: any[];
  slides:SlideGroup;
  id1:string = "id1";

  imagesArray:Images[] = [
    new Images("http://assets.voxel3d.net/sectores/ingenieria/mecanica/BearingRace_BrendasEllenMake.jpg","Bearing Race","Brendas Ellen Make"),
    new Images("http://assets.voxel3d.net/sectores/ingenieria/mecanica/DCMotor_TedKyte.jpg","DC Motor","Ted Kyte"),
    new Images("http://assets.voxel3d.net/sectores/ingenieria/mecanica/Engranes_AlanUrbina.jpg","Engranes","Alan Urbina"),
    new Images("http://assets.voxel3d.net/sectores/ingenieria/mecanica/EnsambleDeTee_CarlosBolivar.jpg","Ensamble De Tee","Carlos Bolívar"),
    new Images("http://assets.voxel3d.net/sectores/ingenieria/mecanica/InnaffiatriceRestaurata_RobertoTesta.jpg","Innaffiatrice Restaurata","Roberto Testa"),
    new Images("http://assets.voxel3d.net/sectores/ingenieria/mecanica/MagneticSpectrograph_RochAndrzejewski.jpg","Magnetic Spectrograph","Roch & Rzejewski"),
    new Images("http://assets.voxel3d.net/sectores/ingenieria/mecanica/MechanicalWatch_PaulLoatman.jpg","Mechanical Watch","Paul Loatman"),
    new Images("http://assets.voxel3d.net/sectores/ingenieria/mecanica/MontajeDeMolinos_CarlosBolivar.jpg","Montaje de molinos","Carlos Bolívar"),
    new Images("http://assets.voxel3d.net/sectores/ingenieria/mecanica/Pelatubo_AlbertoGarza.jpg","Pelatubo","Alberto Garza"),
    new Images("http://assets.voxel3d.net/sectores/ingenieria/mecanica/PipeFlange_AlexanderObika.jpg","Pipe Flange","Alexander Obika"),
    new Images("http://assets.voxel3d.net/sectores/ingenieria/mecanica/RuedaIndustrial_CarlosBolivar.jpg","Rueda industrial","Carlos Bolívar"),
    new Images("http://assets.voxel3d.net/sectores/ingenieria/mecanica/SmallMotorFan_WagnerLipnharski.jpg","Small motor fan","Wagner Lipnharski"),
    new Images("http://assets.voxel3d.net/sectores/ingenieria/mecanica/SwagelockGauges_AntoineCardenas.jpg","Swagelock gauges","Antoine Cardenas"),
    new Images("http://assets.voxel3d.net/sectores/ingenieria/mecanica/TitaniumWheel_MarioDelgado,.jpg","Titanium wheel","Mario Delgado"),
  
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
          if(product.sectors[i].name == "mecanica"){
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
