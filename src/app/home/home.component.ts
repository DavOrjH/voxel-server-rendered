import { Component, OnInit } from '@angular/core';

import { User } from '../_models/index';
import { UserService } from '../_services/index';
import { UserRoleService } from "app/user-role.service";
import { Subscription } from "rxjs";

@Component({
    moduleId: module.id,
    templateUrl: 'home.component.html'
})

export class HomeComponent {
    userRole:string;
    RoleSuscription:Subscription;
    constructor(private userRoleService:UserRoleService) {
        this.RoleSuscription=this.userRoleService.getUserRole().subscribe(
            role =>{
                this.userRole=role;
            }
        );
    }

}