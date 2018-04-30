import { Component, OnInit, AfterViewInit } from '@angular/core';
import {SlideGroup} from '../slider/slideGroup';
import { Testimony } from 'app/testimony-slider/testimony';
import { Brand } from 'app/brand-slider/brand';
import { Model3d } from 'app/pretty3dslider/model3d';
import { Slide } from 'app/slider/slide';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Images } from 'app/pretty-slider/images';


declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit, AfterViewInit {
  sliderList: FirebaseListObservable<any[]>;  
  slider3dWidth: number;
  slides:SlideGroup;

 

  constructor(private db:AngularFireDatabase,) {
   
    this.querySliders();
   }

  ngOnInit() {
    this.slider3dWidth = $("#slider-cnt").width();
  }   

  ngAfterViewInit(){

  }
  
  id1="slider1"; 
  
  querySliders():void{
    
    this.sliderList = this.db.list('/Sliders', {
      query: {
        limitToLast: 200,         
      }
    });
    this.sliderList.forEach(this.storeSliders.bind(this));
  }

  storeSliders(sliders):void{
    let sliderData = [];
    sliders.forEach(slider=>{
      let slideNew:Slide = new Slide(slider.urlPage,slider.imageURL,slider.description, slider.title, slider.urlVideo, slider.urlFirstImage, slider.urlSecImage );
      sliderData.push(slideNew);
    })

    this.slides = new SlideGroup(sliderData) 
  }
  
  id2 ="test1";
  testimonies:Testimony[] = [
  new Testimony("<a class='inside-quote'>Rhinoceros</a> es una herramienta muy versátil, con muchas posibilidades de modelado, con facilidad de crear las formas que uno quiera sin restringirse tanto a una forma. Tiene tanto libertad como parámetros para realizar buenos diseños que se sacan en producción y renderizado para los profesionales en las áreas afines a la creación de elementos 3d.",
    "Philippe Jeanneret","http://assets.voxel3d.net/testimonial/philippe.jpg","Diseñador Industrial" ),
  new Testimony("Modelar y renderizar como herramienta para un diseñador es esencial y, en <a class='inside-quote'>Voxel</a>, cuando te asesoran identificas y entiendes la importancia de saber manejarla. Después de este curso siempre que desarrollo un proyecto lo trabajo con <a class='inside-quote'>Rhino</a> y <a class='inside-quote'>V-Ray</a>, donde me brinda la parte de ingeniería, la flexibilidad del modelado y la agilidad del desarrollo del diseño, por eso recomiendo siempre a <a class='inside-quote'>Voxel</a> como el mejor asesor en Colombia para aprender y dominar estas herramientas.",
    "Jorge Gomez R., Director de Proyectos en Madego y Profesor de Ingeniería de Diseño de Productos",
    "http://assets.voxel3d.net/testimonial/jorgegomez.jpg","Londres, Inglaterra"),
  new Testimony("El curso en <a class='inside-quote'>Voxel</a> es bastante bueno, los instructores de cada módulo son altamente capacitados.",
    "Jasleidy Gutierrez Duque","http://assets.voxel3d.net/testimonial/jasleidy.jpg"),
  new Testimony("Afortunadamente utilizamos <a class='inside-quote'>Rhino</a> para la visualización de un motor VW a la hora de convertir partes IGES en modelos de alta calidad perfectamente optimizados para SOFTIMAGE. No ha habido ningún otro software capaz de hacerlo con la misma velocidad, control y precisión. No sé qué habríamos hecho sin <a class='inside-quote'>Rhino</a> para realizar el control de calidad de los ingenieros de VW.",
    "Michael Klein, Director Creativo, Supervisor de Animación","http://assets.voxel3d.net/testimonial/michael.jpg","M O T I O N GmbH, Duesseldorf, Alemania"),
  new Testimony("La empresa <a class='inside-quote'>Voxel</a>, no solo nos ha facilitado esta dinámica de confrontación de saberes, sino que nos ha permitido ampliar el conocimiento de nuestros futuros profesionales del Diseño industrial, con la asesoría técnico científica, su gran infraestructura y el gran sentido humano de todos los profesionales que intervienen en el desarrollo industrial de <a class='inside-quote'>Voxel</a>.",
    "GUILLERMO CORTÉS CAMARGO. MsC. Docente, Diseñador Industrial, Master en Desarrollo de Proyectos de Innovación y Diseño de Producto",
    "http://assets.voxel3d.net/testimonial/guillermo.jpg","Fundación Universidad Autónoma de Colombia."),
  new Testimony("He trabajado como constructor, moldeador y diseñador de barcos, así como de director de Ingeniería CAD durante 34 años. No existe todavía ningún detalle en el diseño de astilleros que no pudiera realizar simple y efectivamente con <a class='inside-quote'>Rhino</a>. Una aplicación simple, una herramienta increíble.",
    "James McConnell, Gerente, Ingeniería y Planificación","http://assets.voxel3d.net/testimonial/james.jpg",
    "Pictou Industries - http://www.pictoushipyard.com/"),
  new Testimony("Con <a class='inside-quote'>Rhino</a>, todo sale bien. Usamos Rhino porque producimos cascos más precisos de alta calidad con menos problemas de construcción.",
    "Ed Monk Jr.","http://assets.voxel3d.net/testimonial/ed.jpg"),
  new Testimony("Como diseñador aeronáutico, considero que <a class='inside-quote'>Rhino</a> ofrece facilidad, versatilidad y velocidad para generar superficies complejas con la precisión necesaria que requiere la aerodinámica. Un producto excelente, en innovación continua, y con un buen sistema de soporte. Lo he estado utilizando desde que salió en el mercado sin ninguna necesidad de reemplazarlo, si es que hay sustituto.",
    "Dr. A. K. Kundu","http://assets.voxel3d.net/testimonial/kundu.jpg","Belfast, Reino Unido")
  ];

  id3 = "brand1";
  brand:Brand[] = [
    new Brand("http://assets.voxel3d.net/slider-clients/madekit.jpg","http://maderkit.com.co/"),
    new Brand("http://assets.voxel3d.net/slider-clients/hunterdouglas.jpg","http://www.hunterdouglas.com.co/"),
    new Brand("http://assets.voxel3d.net/slider-clients/grival.jpg","http://www.grival.com/"),
    new Brand("http://assets.voxel3d.net/slider-clients/finart.jpg","http://ww1.finartsa.biz/"),
    new Brand("http://assets.voxel3d.net/slider-clients/cotecmar.jpg","http://www.cotecmar.com/"),
    new Brand("http://assets.voxel3d.net/slider-clients/aquiles.jpg","https://www.aquiles.com.co/"),
    new Brand("http://assets.voxel3d.net/slider-clients/sanbuenaventura.jpg","http://www.usbcali.edu.co/"),
    new Brand("http://assets.voxel3d.net/slider-clients/tadeo.jpg","http://www.utadeo.edu.co/es"),
    new Brand("http://assets.voxel3d.net/slider-clients/ultralaserlogo.png","http://ultralasercnc.com/"),
    new Brand("http://assets.voxel3d.net/slider-clients/promob.jpg","http://www.promob.com/mx"),
    new Brand("http://assets.voxel3d.net/slider-clients/pizanodeirisarri.jpg","http://pizanoyde-irisarri.com/"),
    new Brand("http://assets.voxel3d.net/slider-clients/javerianacali.jpg","http://www.javerianacali.edu.co/"),
    new Brand("http://assets.voxel3d.net/slider-clients/fuac.jpg","http://www.fuac.edu.co/"),
    new Brand("http://assets.voxel3d.net/slider-clients/escuelanavalalmirantepadila.jpg","https://www.armada.mil.co/es/content/escuela-naval-de-cadetes-almirante-padilla-enap-0"),
    new Brand("http://assets.voxel3d.net/slider-clients/dimar.jpg","https://www.dimar.mil.co/"),
    new Brand("http://assets.voxel3d.net/slider-clients/columbusschool.jpg","http://www.columbus.edu.co/es/"),
    new Brand("http://assets.voxel3d.net/slider-clients/busscar.jpg","http://www.busscar.com.co/es/inicio.html"),
    new Brand("http://assets.voxel3d.net/slider-clients/coltoys.jpg","http://www.coltoys.com/"),
    new Brand("http://assets.voxel3d.net/slider-clients/upedagogicatecnologica.jpg","http://www.uptc.edu.co/"),
    new Brand("http://assets.voxel3d.net/slider-clients/unitec.jpg","http://www.unitec.edu.co/"),
    new Brand("http://assets.voxel3d.net/slider-clients/uis.jpg","http://www.uis.edu.co/webUIS/es/index.jsp"),
    new Brand("http://assets.voxel3d.net/slider-clients/uddistrital.jpg","https://www.udistrital.edu.co/"),
    new Brand("http://assets.voxel3d.net/slider-clients/usantotomas.jpg","http://www.usta.edu.co/"),
    new Brand("http://assets.voxel3d.net/slider-clients/uandes.jpg","http://uniandes.edu.co/"),
    new Brand("http://assets.voxel3d.net/slider-clients/totto.jpg","http://www.totto.com/"),
    new Brand("http://assets.voxel3d.net/slider-clients/straza.jpg","http://www.straza.com.co/"),
    new Brand("http://assets.voxel3d.net/slider-clients/signproducts.jpg","http://www.signproducts.com.co/"),
    new Brand("http://assets.voxel3d.net/slider-clients/sena.jpg","http://www.sena.edu.co/es-co/Paginas/Portada/index.aspx"),
    new Brand("http://assets.voxel3d.net/slider-clients/rbdiseno.jpg","http://rb-diseno.webnode.com.co/")    
  ];

  id4 = "brand2";
  brand2:Brand[] = [
    new Brand("http://assets.voxel3d.net/slider-products/grasshopper.jpg","http://www.grasshopper3d.com/photo"),
    new Brand("http://assets.voxel3d.net/slider-products/flamingo.jpg","http://nxt.flamingo3d.com/photo/interior-design-nyda-design?context=latest"),
    new Brand("http://assets.voxel3d.net/slider-products/emicroscribe.jpg","http://revware.net/products/microscribe-portable-cmm/"),
    new Brand("http://assets.voxel3d.net/slider-products/clayoo.jpg","https://www.tdmsolutions.com/es/clayoo/#featured_in"),
    new Brand("http://assets.voxel3d.net/slider-products/brazil.jpg","http://brazil.rhino3d.com/"),
    new Brand("http://assets.voxel3d.net/slider-products/bongo.jpg","http://bongo.rhino3d.com/"),
    new Brand("http://assets.voxel3d.net/slider-products/vrayforrhino.jpg","https://www.chaosgroup.com/"),
    new Brand("http://assets.voxel3d.net/slider-products/visualarq.jpg","http://www.visualarq.com/es/"),
    new Brand("http://assets.voxel3d.net/slider-products/rhinoshoe.jpg","https://www.tdmsolutions.com/es/rhinoshoe/"),
    new Brand("http://assets.voxel3d.net/slider-products/rhinophoto.jpg","http://www.rhinophoto3d.com/"),
    new Brand("http://assets.voxel3d.net/slider-products/rhinobim.jpg","http://rhinobim.com/"),
    new Brand("http://assets.voxel3d.net/slider-products/rhinogold.jpg","https://www.tdmsolutions.com/es/rhinogold/"),
    new Brand("http://assets.voxel3d.net/slider-products/rhinoceros.jpg","http://www.rhino3d.com/es/sales/latin-america/Colombia/Cundinamarca"),
    new Brand("http://assets.voxel3d.net/slider-products/rhinocam.jpg","https://mecsoft.com/rhinocam-software/"),
    new Brand("http://assets.voxel3d.net/slider-products/rhinobim.jpg","http://rhinobim.com/"),
    new Brand("http://assets.voxel3d.net/slider-products/penguin.jpg","http://www.penguin3d.com/"),
    new Brand("http://assets.voxel3d.net/slider-products/orca3d.jpg","https://orca3d.com/modules/hull-design-fairing/"),
     
  ];

  models3d:Model3d[] = [
    new Model3d("../../assets/pretty-360-slider/Bionicle_Philippe_Jeanneret_VR.10.html","http://assets.voxel3d.net/gallery-3d/Bionicle_Philippe_Jeanneret_VR.10/0_0.png"),
    new Model3d("../../assets/pretty-360-slider/dragon_VR.8.html","http://assets.voxel3d.net/gallery-3d/dragon_VR.8/0_0.png"),
    new Model3d("../../assets/pretty-360-slider/DUCATI_VR.39.html","http://assets.voxel3d.net/gallery-3d/DUCATI_VR.39/0_0.jpg"),
    new Model3d("../../assets/pretty-360-slider/F1_Mclaren_MP4_1988_VOXEL_VR.33.html","http://assets.voxel3d.net/gallery-3d/F1_Mclaren_MP4_1988_VOXEL_VR.33/0_0.png"),
    new Model3d("../../assets/pretty-360-slider/anillo_VR.4.html","http://assets.voxel3d.net/gallery-3d/anillo_VR.4/0_0.png"),
    new Model3d("../../assets/pretty-360-slider/reloj_cartier_VR.1.html","http://assets.voxel3d.net/gallery-3d/reloj_cartier_VR.1/0_0.png"),
    new Model3d("../../assets/pretty-360-slider/capilla_VR.33.html","http://assets.voxel3d.net/gallery-3d/capilla_VR.33/0_0.jpg"),
    new Model3d("../../assets/pretty-360-slider/estadio_VR.3.html","http://assets.voxel3d.net/gallery-3d/estadio_VR.3/0_0.png"),     
  ]

  arquitectura:Images[] = [
    new Images("http://assets.voxel3d.net/index/galerias/arquitectura/AndresForeroEscenaInterior.jpg","Escena Interior", "Andrés Forero"),
    new Images("http://assets.voxel3d.net/index/galerias/arquitectura/bibianaOvalleEstudio.bmp","Sala", "Bibiana Ovalle"),
    new Images("http://assets.voxel3d.net/index/galerias/arquitectura/carolinaCanonBano.png","Baño", "Carolina Cañon"),
    new Images("http://assets.voxel3d.net/index/galerias/arquitectura/freddyBoadaInterior.png","Interior", "Freddy Boada"),
    new Images("http://assets.voxel3d.net/index/galerias/arquitectura/jorgeAndresLopezSala.png","Sala", "Jorge Andrés López"),
    new Images("http://assets.voxel3d.net/index/galerias/arquitectura/juanOrtizSala.jpg","Sala", "Juan Ortiz"),
    new Images("http://assets.voxel3d.net/index/galerias/arquitectura/juanSebastianRamirezSala.png","Sala", "Juan Sebastián Ramírez"),
    new Images("http://assets.voxel3d.net/index/galerias/arquitectura/katherinMendezSala.jpg","Sala", "Katherin Mendez"),
    new Images("http://assets.voxel3d.net/index/galerias/arquitectura/lauraMoraVillamizarSala.jpg","Sala", "Laura Molina Villamizar"),
    new Images("http://assets.voxel3d.net/index/galerias/arquitectura/sebastianParraAlcoba.jpg","Alcoba", "Sebastián Parra"),
  ]

  disenoProducto:Images[] = [
    new Images("http://assets.voxel3d.net/index/galerias/diseno-de-producto/AndresBohorquezDiscoDuro.jpg","Disco duro", "Andrés Bohorquez"),
    new Images("http://assets.voxel3d.net/index/galerias/diseno-de-producto/andreaDelPilarCamachoGuitarra.bmp","Guitarra", "Andrea del Pilar Camacho"),
    new Images("http://assets.voxel3d.net/index/galerias/diseno-de-producto/carolinaVargasCafetera.png","Cafetera", "Carolina Vargas"),
    new Images("http://assets.voxel3d.net/index/galerias/diseno-de-producto/julianDelgadoDesodorantes.jpg","Desodorantes", "Julian Delgado"),
    new Images("http://assets.voxel3d.net/index/galerias/diseno-de-producto/luisAlejandroGuzman.png","Relojes", "Luis Alejandro Guzmán"),
    new Images("http://assets.voxel3d.net/index/galerias/diseno-de-producto/manuelFigueroaCafetera.jpg","Cafetera", "Manuel Figueroa"),
    new Images("http://assets.voxel3d.net/index/galerias/diseno-de-producto/nokiaXpressmusicDiegoGarcia.png","Nokia Xpress Music", "Diego García"),
    new Images("http://assets.voxel3d.net/index/galerias/diseno-de-producto/oscarMartinezEmpaqueChivas.png","USB", "Oscar Martínez"),
  ]

  joyeria:Images[] = [
    new Images("http://assets.voxel3d.net/index/galerias/joyeria/elizabethZapataAnillo.png","Anillo", "Elizabeth Zapata"),
    new Images("http://assets.voxel3d.net/index/galerias/joyeria/elizabethZapataAnillo2.png","Anillo", "Elizabeth Zapata"),
    new Images("http://assets.voxel3d.net/index/galerias/joyeria/faustoHuertasAnillo.png","Anillo", "Fausto Huertas"),
    new Images("http://assets.voxel3d.net/index/galerias/joyeria/javierRicardiAnillo.jpg","Anillo", "Javier Riccardi"),
    new Images("http://assets.voxel3d.net/index/galerias/joyeria/javierRicardiAnillo.png","Anillo", "Javier Riccardi"),
    new Images("http://assets.voxel3d.net/index/galerias/joyeria/javierRicardiAnillo2.png","Anillo", "Javier Riccardi"),
    new Images("http://assets.voxel3d.net/index/galerias/joyeria/javierRicardiAnilloHalo.png","Anillo Halo", "Javier Riccardi"),
    new Images("http://assets.voxel3d.net/index/galerias/joyeria/mariaMercedezPosadaAnillo.jpg","Anillo", "Maria Mercedes Posada"),
    new Images("http://assets.voxel3d.net/index/galerias/joyeria/wielandRingRome.png","Ring Rome ", "Wieland"),
  ]

  jugueteria:Images[] = [
    new Images("http://assets.voxel3d.net/index/galerias/jugueteria/alexanderPenaBatimovil.png","Batimóvil", "Alexander Peña"),
    new Images("http://assets.voxel3d.net/index/galerias/jugueteria/andresRamiresSpiderman.jpg","Lego Spiderman", "Andrés Ramires"),
    new Images("http://assets.voxel3d.net/index/galerias/jugueteria/carlosNovoaTRON.jpg","TRON", "Carlos Novoa"),
    new Images("http://assets.voxel3d.net/index/galerias/jugueteria/danielFelipePinerosHelicoptero.jpg","Helicóptero", "Daniel Felipe Piñeros"),
    new Images("http://assets.voxel3d.net/index/galerias/jugueteria/jorgeTorresDinosaurio.png","Dinosaurio", "Jorge Torres"),
    new Images("http://assets.voxel3d.net/index/galerias/jugueteria/juanMartinezAIBOjpg.jpg","AIBO", "Juan Martínez"),
    new Images("http://assets.voxel3d.net/index/galerias/jugueteria/marvinDavidGarcia.jpg","Marvin", "David García"),
    new Images("http://assets.voxel3d.net/index/galerias/jugueteria/nicolasAscanioRobot.bmp","Robot", "Nicolas Ascanio"),
    new Images("http://assets.voxel3d.net/index/galerias/jugueteria/patricioLeonardoVera.png","Patricio", "Leonardo Vera"),
    new Images("http://assets.voxel3d.net/index/galerias/jugueteria/wallEPaulaGonzales.jpg","Wall-E", "Paula Gonzales"),
  ]

}
