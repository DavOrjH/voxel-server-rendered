import { AcademicoComponent } from './academico/academico.component';
import { ProtesisOrtesisComponent } from './protesis-ortesis/protesis-ortesis.component';
import { OdontologiaComponent } from './odontologia/odontologia.component';
import { BimComponent } from './bim/bim.component';
import { DiseñoComponent } from './diseño/diseno.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {FormsModule} from '@angular/forms';
import {SliderComponent} from './slider/slider.component';
//import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NavbarComponent } from './navbar/navbar.component';

// new for database support
import { HttpModule } from '@angular/http';
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {environment} from '../environments/environment';
import { routing } from './app.routing';
import { IndexComponent } from './index/index.component';
//import { customHttpProvider } from './_helpers/index';
import { AlertComponent } from './_directives/index';
import { AuthGuard } from './_guards/auth.guard';
import { AlertService, AuthenticationService, UserService } from './_services/index';
import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { AcercaDeVoxelComponent } from './acerca-de-voxel/acerca-de-voxel.component';
import { NuestraHistoriaComponent } from './nuestra-historia/nuestra-historia.component';
import { AliadosComponent } from './aliados/aliados.component';
import { NovedadesComponent } from './novedades/novedades.component';
import { ContactoComponent } from './contacto/contacto.component';
import { CasosDeExitoComponent } from './casos-de-exito/casos-de-exito.component';
import { VinculacionComponent } from './vinculacion/vinculacion.component';
import { McneelComponent } from './mcneel/mcneel.component';
import { OnlineComponent } from './online/online.component';
import { PresencialComponent } from './presencial/presencial.component';
import { TdmsolutionsComponent } from './tdmsolutions/tdmsolutions.component';
import { AsunicadComponent } from './asunicad/asunicad.component';
import { ChaosgroupComponent } from './chaosgroup/chaosgroup.component';
import { AsesoramientoComponent } from './asesoramiento/asesoramiento.component';
import { PrototipadoRapidoComponent } from './prototipado-rapido/prototipado-rapido.component';
import { ModeladoAnimacionRenderComponent } from './modelado-animacion-render/modelado-animacion-render.component';
import { Digitalizacion3dComponent } from './digitalizacion-3d/digitalizacion-3d.component';
import { DesarrolloComponent } from './desarrollo/desarrollo.component';
import { ProductosComponent } from './productos/productos.component';
import { PublicidadComponent } from './publicidad/publicidad.component';
import { SistemasDeTransporteComponent } from './sistemas-de-transporte/sistemas-de-transporte.component';
import { CalzadoComponent } from './calzado/calzado.component';
import { JoyeriaComponent } from './joyeria/joyeria.component';
import { JugueteriaComponent } from './jugueteria/jugueteria.component';
import { CivilComponent } from './civil/civil.component';
import { MecanicaComponent } from './mecanica/mecanica.component';
import { InversaComponent } from './inversa/inversa.component';
import { FooterComponent } from './footer/footer.component';
import { TimeLineComponent } from './time-line/time-line.component';
import { CourseCatalogueComponent } from './course-catalogue/course-catalogue.component';
import { ProductDesignComponent } from './product-design/product-design.component';
import { SpaceAndArchitComponent } from './space-and-archit/space-and-archit.component';
import { PrettySliderComponent } from './pretty-slider/pretty-slider.component';
import { ScriptHackComponent } from './script-hack/script-hack.component';
import { AnimationAndVisualComponent } from './animation-and-visual/animation-and-visual.component';
import { EngineeringAndFabComponent } from './engineering-and-fab/engineering-and-fab.component';
import { AdvancedTrainingComponent } from './advanced-training/advanced-training.component';
import { LoginFirebaseComponent } from './login-firebase/login-firebase.component';
//import { MdDialogModule } from "@angular/material";
import { MyAccountComponent } from './my-account/my-account.component';
import { AdminConsoleComponent } from './admin-console/admin-console.component';
import { UserRoleService } from "app/user-role.service";
import { AuthAdminGuard } from "app/_guards/authAdmin.guard";
import { PrettyBookComponent } from './pretty-book/pretty-book.component';
import { HttpClientModule } from "@angular/common/http";
import { PaypalBtnComponent } from './paypal-btn/paypal-btn.component';
import { StoreComponent } from './store/store.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { CourseComponent } from './course/course.component';
import { AuthCourseGuard } from 'app/_guards/authCourse.guard';
import { TestimonySliderComponent } from './testimony-slider/testimony-slider.component';
import { BrandSliderComponent } from './brand-slider/brand-slider.component';
import { PayuApiComponent } from './payu-api/payu-api.component';
import { ShoppingCartService } from "app/shopping-cart.service";
import {AgmCoreModule} from '@agm/core';
import { AuthCompleteGuard } from 'app/_guards/authComplete.guard';
import { UserCompleteService } from 'app/user-complete.service';
import { TerminosYCondicionesComponent } from './terminos-y-condiciones/terminos-y-condiciones.component';
import { UserActiveCoursesService } from 'app/user-active-courses.service';
import { SafePipe } from 'app/safe-pipe';
import { UserDataService } from 'app/user-data.service';
import { MiniSliderComponent } from './mini-slider/mini-slider.component';
import { Pretty3dsliderComponent } from './pretty3dslider/pretty3dslider.component';
import { SimplySliderComponent } from './simply-slider/simply-slider.component';
import { EquiposComponent } from './equipos/equipos.component';
import { PrettyPhotoViewerComponent } from './pretty-photo-viewer/pretty-photo-viewer.component';
import { RhinocerosComponent } from './rhinoceros/rhinoceros.component';
import { FlamingoComponent } from './flamingo/flamingo.component';
import { PenguinComponent } from './penguin/penguin.component';
import { BongoComponent } from './bongo/bongo.component';
import { BrazilComponent } from './brazil/brazil.component';
import { VrayComponent } from './vray/vray.component';
import { ClayooComponent } from './clayoo/clayoo.component';
import { RhinonestComponent } from './rhinonest/rhinonest.component';


@NgModule({
  declarations: [
    AppComponent,
    SliderComponent,
    NavbarComponent,
    IndexComponent,
    AlertComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    AcercaDeVoxelComponent,
    NuestraHistoriaComponent,
    AliadosComponent,
    NovedadesComponent,
    ContactoComponent,
    CasosDeExitoComponent,
    VinculacionComponent,
    McneelComponent,
    OnlineComponent,
    PresencialComponent,
    TdmsolutionsComponent,
    AsunicadComponent,
    ChaosgroupComponent,
    AsesoramientoComponent,
    PrototipadoRapidoComponent,
    ModeladoAnimacionRenderComponent,
    Digitalizacion3dComponent,
    DesarrolloComponent,
    ProductosComponent,
    PublicidadComponent,
    SistemasDeTransporteComponent,
    CalzadoComponent,
    JoyeriaComponent,
    JugueteriaComponent,
    CivilComponent,
    MecanicaComponent,
    InversaComponent,
    DiseñoComponent,
    BimComponent,
    OdontologiaComponent,
    ProtesisOrtesisComponent,
    AcademicoComponent,
    FooterComponent,
    TimeLineComponent,
    CourseCatalogueComponent,
    ProductDesignComponent,
    SpaceAndArchitComponent,
    PrettySliderComponent,
    ScriptHackComponent,
    AnimationAndVisualComponent,
    EngineeringAndFabComponent,
    AdvancedTrainingComponent,
    LoginFirebaseComponent,
    MyAccountComponent,
    AdminConsoleComponent,
    PrettyBookComponent,
    PaypalBtnComponent,
    StoreComponent,
    ProductDetailComponent,
    CourseComponent,
    TestimonySliderComponent,
    BrandSliderComponent,
    PayuApiComponent,
    AppComponent,
    TerminosYCondicionesComponent,
    SafePipe,
    MiniSliderComponent,
    Pretty3dsliderComponent,
    SimplySliderComponent,
    EquiposComponent,
    PrettyPhotoViewerComponent,
    RhinocerosComponent,
    FlamingoComponent,
    PenguinComponent,
    BongoComponent,
    BrazilComponent,
    VrayComponent,
    ClayooComponent,
    RhinonestComponent,

  ],exports:[
    //MdDialogModule
  ],
  imports: [
    BrowserModule.withServerTransition({appId:'my-app'}),
    FormsModule,
   // NgbModule.forRoot(),
    BrowserAnimationsModule,
    HttpModule,
    HttpClientModule,
    routing,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AgmCoreModule.forRoot({
      apiKey: ''
    })
  ],
  providers: [
   // customHttpProvider,
    AuthGuard,
    AuthAdminGuard,
    AlertService,
    AuthenticationService,
    UserService,
    UserRoleService,
    AuthCourseGuard,
    ShoppingCartService,
    AuthCompleteGuard,
    UserCompleteService,
    UserActiveCoursesService,
    UserDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
