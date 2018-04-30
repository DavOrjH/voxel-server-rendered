import { Injectable, OnInit } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserCompleteService } from "app/user-complete.service";
import { Subscription } from "rxjs";

@Injectable()
export class AuthCompleteGuard implements CanActivate,OnInit{
    subscription:Subscription;
    userState:string;
    constructor(private router: Router, private userCompleteService:UserCompleteService) {
        this.subscription= this.userCompleteService.getUserState().subscribe(
            state =>{
                this.userState=state;
            }
        );
     }

    ngOnInit(){
        //this.userCompleteService.init();
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
                
        if (localStorage.getItem('currentUser')) {                 
            
            if(this.userCompleteService.getIsCompleted()=="completed"){
                if(this.userCompleteService.getIsCompleted()=="completed"){
                    return true
                }else{
                alert('Completa tus datos en "Mi cuenta" para poder acceder a la sección de pagos');
                console.log(this.userCompleteService.getIsCompleted())
                this.router.navigate(['/index']);
                return false;
                }                
            }else{
                this.router.navigate(['/index']);
                return false                            
            }                 

        }else{
            //not logged so, redirect to index
            
            alert("Inicie sesión para continuar");
            this.router.navigate(['/index']);
        // not logged in so redirect to login page with the return url
        // this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
            return false;
        }        
        
    }
}
