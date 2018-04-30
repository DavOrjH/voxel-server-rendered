import {Routes, RouterModule } from '@angular/router';
import {IndexComponent} from './index/index.component';
import {HomeComponent } from './home/index';
import {LoginComponent } from './login/index';
import {RegisterComponent } from './register/index';
import {AuthGuard } from './_guards/auth.guard';
import {AcercaDeVoxelComponent} from './acerca-de-voxel/acerca-de-voxel.component';
import {NuestraHistoriaComponent} from './nuestra-historia/nuestra-historia.component';
import {AliadosComponent} from './aliados/aliados.component';
import {NovedadesComponent} from './novedades/novedades.component';
import {ContactoComponent} from './contacto/contacto.component';
import {CasosDeExitoComponent} from './casos-de-exito/casos-de-exito.component';
import {VinculacionComponent} from './vinculacion/vinculacion.component';
import {OnlineComponent} from './online/online.component';
import {McneelComponent} from './mcneel/mcneel.component';
import {PresencialComponent} from './presencial/presencial.component';
import {TdmsolutionsComponent} from './tdmsolutions/tdmsolutions.component';
import {AsunicadComponent} from './asunicad/asunicad.component';
import {ChaosgroupComponent} from './chaosgroup/chaosgroup.component';
import {AsesoramientoComponent} from './asesoramiento/asesoramiento.component';
import {PrototipadoRapidoComponent} from './prototipado-rapido/prototipado-rapido.component';
import {ModeladoAnimacionRenderComponent} from './modelado-animacion-render/modelado-animacion-render.component';
import {Digitalizacion3dComponent} from './digitalizacion-3d/digitalizacion-3d.component';
import {DesarrolloComponent} from './desarrollo/desarrollo.component';
import {ProductosComponent} from './productos/productos.component';
import {PublicidadComponent} from './publicidad/publicidad.component';
import {SistemasDeTransporteComponent} from './sistemas-de-transporte/sistemas-de-transporte.component';
import {CalzadoComponent} from './calzado/calzado.component';
import {JoyeriaComponent} from './joyeria/joyeria.component';
import {JugueteriaComponent} from './jugueteria/jugueteria.component';
import {CivilComponent} from './civil/civil.component';
import {MecanicaComponent} from './mecanica/mecanica.component';
import {InversaComponent} from './inversa/inversa.component';
import {DiseñoComponent} from './diseño/diseno.component';
import {BimComponent} from './bim/bim.component';
import {OdontologiaComponent} from './odontologia/odontologia.component';
import {ProtesisOrtesisComponent} from './protesis-ortesis/protesis-ortesis.component';
import {AcademicoComponent} from './academico/academico.component';
import {ProductDesignComponent } from "app/product-design/product-design.component";
import {SpaceAndArchitComponent} from 'app/space-and-archit/space-and-archit.component';
import {AnimationAndVisualComponent} from 'app/animation-and-visual/animation-and-visual.component';
import {EngineeringAndFabComponent} from 'app/engineering-and-fab/engineering-and-fab.component'
import {AdvancedTrainingComponent} from 'app/advanced-training/advanced-training.component'
import {MyAccountComponent} from 'app/my-account/my-account.component'
import { LoginFirebaseComponent } from "app/login-firebase/login-firebase.component";
import { AdminConsoleComponent } from "app/admin-console/admin-console.component";
import { AuthAdminGuard } from "app/_guards/authAdmin.guard";
import { StoreComponent } from 'app/store/store.component';
import { ProductDetailComponent } from 'app/product-detail/product-detail.component';
import { CourseComponent } from 'app/course/course.component';
import { AuthCourseGuard } from 'app/_guards/authCourse.guard';
import { PayuApiComponent } from 'app/payu-api/payu-api.component';
import { AuthCompleteGuard } from 'app/_guards/authComplete.guard';
import { TerminosYCondicionesComponent } from 'app/terminos-y-condiciones/terminos-y-condiciones.component';
import { EquiposComponent } from 'app/equipos/equipos.component';
import { RhinocerosComponent } from 'app/rhinoceros/rhinoceros.component';
import { FlamingoComponent } from 'app/flamingo/flamingo.component';
import { PenguinComponent } from 'app/penguin/penguin.component';
import { BongoComponent } from 'app/bongo/bongo.component';
import { BrazilComponent } from 'app/brazil/brazil.component';
import { VrayComponent } from 'app/vray/vray.component';
import { ClayooComponent } from 'app/clayoo/clayoo.component';
import { RhinonestComponent } from 'app/rhinonest/rhinonest.component';

const appRoutes: Routes = [
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    {path : 'index', component: IndexComponent},
    {path : 'acerca-de', component: AcercaDeVoxelComponent},
    {path : 'nuestra-historia', component: NuestraHistoriaComponent},
    // {path : 'aliados', component: AliadosComponent},
    {path : 'novedades', component: NovedadesComponent},
    {path : 'contacto', component: ContactoComponent},
    {path : 'casos-exito', component: CasosDeExitoComponent},
    {path : 'vinculacion', component: VinculacionComponent},
    {path : 'online', component: OnlineComponent},
    {path : 'presencial', component: PresencialComponent},
    {path : 'mcneel', component: McneelComponent},
    {path : 'tdm-solutions', component: TdmsolutionsComponent},
    {path : 'asunicad', component: AsunicadComponent},
    {path : 'chaosgroup', component: ChaosgroupComponent},
    {path : 'prototipado-rapido', component: PrototipadoRapidoComponent},
    {path : 'modelado-animacion-render', component: ModeladoAnimacionRenderComponent},
    {path : 'digitalizacion-3d', component:Digitalizacion3dComponent},
    {path : 'desarrollo', component:DesarrolloComponent},
    {path : 'productos', component:ProductosComponent},
    {path : 'publicidad', component:PublicidadComponent},
    {path : 'sistemas-de-transporte', component:SistemasDeTransporteComponent},
    {path : 'calzado', component:CalzadoComponent},
    {path : 'joyeria', component:JoyeriaComponent},
    {path : 'jugueteria', component:JugueteriaComponent},
    {path : 'civil', component:CivilComponent},
    {path : 'mecanica', component:MecanicaComponent},
    {path : 'inversa', component:InversaComponent},
    {path : 'diseno', component:DiseñoComponent},
    {path : 'bim', component:BimComponent},
    {path : 'odontologia', component:OdontologiaComponent},
    {path : 'protesis-ortesis', component:ProtesisOrtesisComponent},
    {path : 'academico', component:AcademicoComponent},    
    {path : 'product-design/:id', component:ProductDesignComponent},
    {path : 'space-and-archit/:id', component:SpaceAndArchitComponent},
    {path : 'animation-and-visual/:id', component:AnimationAndVisualComponent},
    {path : 'engineering-and-fab/:id', component:EngineeringAndFabComponent},
    {path : 'advanced-training/:id', component:AdvancedTrainingComponent},
    {path : 'my-account', component:MyAccountComponent,canActivate: [AuthGuard]},
    {path : 'login-firebase', component:LoginFirebaseComponent},
    {path : 'admin-console', component:AdminConsoleComponent,canActivate: [AuthAdminGuard]},
    {path : 'store', component:StoreComponent},
    {path : 'product-detail/:id', component:ProductDetailComponent},
    {path: 'course/:id', component:CourseComponent},
    {path: 'pay', component:PayuApiComponent, canActivate:[AuthCompleteGuard]},
    {path: 'politica-de-datos', component:TerminosYCondicionesComponent},
    {path: 'equipos', component:EquiposComponent},
    {path: 'rhinoceros', component:RhinocerosComponent},
    {path: 'flamingo', component:FlamingoComponent},
    {path: 'penguin', component:PenguinComponent},
    {path: 'bongo', component:BongoComponent},
    {path: 'brazil', component:BrazilComponent},
    {path: 'vray', component:VrayComponent},
    {path: 'clayoo', component:ClayooComponent},
    {path: 'rhinonest', component:RhinonestComponent},
    // otherwise redirect to home
    { path: '**', redirectTo: '/index' }
];

export const routing = RouterModule.forRoot(appRoutes,{useHash:true});
