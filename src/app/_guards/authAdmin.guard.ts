import { Injectable, OnInit } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserRoleService } from "app/user-role.service";
import { Subscription } from "rxjs";

@Injectable()
export class AuthAdminGuard implements CanActivate,OnInit {
    subscription:Subscription;
    userRole:string;
    constructor(private router: Router, private userRoleService:UserRoleService) {
        this.subscription= this.userRoleService.getUserRole().subscribe(
            role =>{
                this.userRole=role;
            }
        );
     }
    ngOnInit(){
        this.userRoleService.init();
        
    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (localStorage.getItem('currentUser')) {
            // logged in 
            if( this.userRoleService.getIsAdmin()){
                return this.userRoleService.getIsAdmin()
            }else{
                this.router.navigate(['/home']);
                return false
            }
        }else{
            //not logged so, redirect to index
            this.router.navigate(['/index']);

        // not logged in so redirect to login page with the return url
        // this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
            return false;
        }
        
    }
}
