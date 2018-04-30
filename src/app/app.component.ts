
import { Component, OnInit } from '@angular/core';
import {SlideGroup} from './slider/slideGroup';
import {Menu} from './navbar/menu';
import {SubMenu} from './navbar/submenu';
import {Item} from './navbar/item';
import {Observable} from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import {AngularFireDatabase,FirebaseListObservable} from 'angularfire2/database';
import { Router } from "@angular/router";
import { UserCompleteService } from "app/user-complete.service";
import { UserActiveCoursesService } from 'app/user-active-courses.service';
import { NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css','./bootstrap-theme.min.css']
})
export class AppComponent implements OnInit{
   
  courselist: FirebaseListObservable<any[]> ;
  productDesignItems:Item[] = [];
  spaceAndArchictItems: Item[] = [];
  animationAndVisualItems: Item[] = [];
  engineeringAndFabItems: Item[] = [];  

  handleInput:any;
  showMessage:any;

  constructor(private userCompleteService:UserCompleteService, private userActiveCourses:UserActiveCoursesService, private db:AngularFireDatabase,private router: Router){
    this.userCompleteService.init();
    this.userActiveCourses.getFirebaseUserData();
    this.queryCourses();
    
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        (<any>window).ga('set', 'page', event.urlAfterRedirects);
        (<any>window).ga('send', 'pageview');
      }
    });
  }

  ngOnInit(){

  }

  queryCourses():void{
   
    this.courselist = this.db.list('/Course', {
          query: {
            limitToLast: 200,
            orderByChild: "category"
          }
        });
    this.courselist.forEach(this.storeCourses.bind(this));  
  }
  
  storeCourses(courses):void{
     courses.forEach(course => {
      let item = new Item(course.virtualURL,course.category + "/" + course.$key)
        if(course.category == "product-design"){
          this.productDesignItems.push(item);
        }else if(course.category == "space-and-archit"){
          this.spaceAndArchictItems.push(item);
        }else if(course.category == "animation-and-visual"){
          this.animationAndVisualItems.push(item);
        }else if(course.category == "engineering-and-fab"){
          this.engineeringAndFabItems.push(item);
        } 
      });      
    }

  menuBar:Menu[]=[

          new Menu("Aprender","test.img",[
            new SubMenu("Diseño de Producto","product-design",this.productDesignItems),
            new SubMenu("Espacio y Arquitectura","space-and-archit",this.spaceAndArchictItems),
            new SubMenu("Animación y visualización","animation-and-visual",this.animationAndVisualItems),
            new SubMenu("Ingeniería  y  fabricación","engineering-and-fab",this.engineeringAndFabItems),
            new SubMenu("Cursos avanzados","advanced-training",[
              new Item("Joyería","advanced-training/joyeria"),
              new Item("Calzado","advanced-training/calzado"),
              new Item("Programación","advanced-training/programacion"),
              new Item("BIOCAD","advanced-training/bio-cad"),
              new Item("Transporte","advanced-training/transporte"),
              new Item("Juguetería","advanced-training/jugueteria"),
              new Item("Arquitectura naval","advanced-training/arquitectura-naval"),
              new Item("Arquitectura","arquitectura")
            ]),
          ])
          ,

            new Menu("Servicios","test.img",[
                new SubMenu("Licenciamiento","imageSM.png",[
                new Item("McNeel","mcneel"),
                new Item("ChaosGroup", "chaosgroup"),
                new Item("TDM Solutions", "tdm-solutions"),
                new Item("AsuniCAD", "asunicad")

              ]),
              new SubMenu("FABLAB","imageSM.png",[
                new Item("Prototipado rápido","prototipado-rapido"),
                new Item("Modelado 3D, animación y render","modelado-animacion-render"),
                new Item("Digitalizacion 3D","digitalizacion-3d"),
                new Item("Desarrollo","desarrollo"),
                new Item("Equipos","equipos")
              ])
            ]),
            new Menu("Sectores","test.img",[
              new SubMenu("Diseño Industrial","imageSM.png",[
                new Item("Productos","productos"),
                new Item("Publicidad", "publicidad"),
                new Item("Sistemas de Transporte","sistemas-de-transporte"),
                new Item("Calzado", "calzado"),
                new Item("Joyería","joyeria"),
                new Item("Juguetería", "jugueteria")
              ]),
                new SubMenu("Ingenieria","imageSM.png",[
                  new Item("Civil","civil"),
                  new Item("Mecánica","mecanica"),
                  new Item("Inversa", "inversa")
              ]),
              new SubMenu("Arquitectura","imageSM.png",[
                new Item("Diseño","diseno"),
                new Item("BIM","bim")
              ]),
            new SubMenu("Medicina","imageSM.png",[
              new Item("Odontologia","odontologia"),
              new Item("Prótesis / Órtesis","protesis-ortesis")
            ]),
            new SubMenu("Educación","imageSM.png",[
              new Item("Sector Académico","academico")
              ])
            ]),
            new Menu("Nosotros","test.img",[
            new SubMenu("Empresa","imageSM.png",[
              new Item("Acerca de Voxel","acerca-de"),
              new Item("Nuestra historia", "nuestra-historia"),
              // new Item("Aliados", "aliados"),
              // new Item("Novedades", "novedades"),
              new Item("Contacto", "contacto")
              ]),
            new SubMenu("Oportunidades","imageSM.png",[
              new Item("Casos de éxito","casos-exito"),
              new Item("Vinculación", "vinculacion")
              ])
            ])


    ];
 

}
