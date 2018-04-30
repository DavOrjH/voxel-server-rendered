import {SubMenu} from './submenu';
export class Menu{

  name:String;
  image:String;
  state:String;
  active:boolean;

  constructor(name:String , image:String,submenus:SubMenu[]){
    this.name = name;
    this.image = image;
    this.submenus= submenus;
    this.state="inactive";
    this.active=false;

  }

  submenus:SubMenu[];
  add(subMenu:SubMenu):void{
    this.submenus.push(subMenu);
  }
  setState(opt:boolean):void{
    if (opt){
      (this.state==="active")?this.state='inactive':this.state='active';
    }else{
      this.state='inactive';
    }
  }
  setActive(opt:boolean){
    if (opt){
      this.active=!this.active;
    }else{
      this.active=false;
    }
  }
  getActive():boolean{
    return this.active;
  }

  getState():String{
    return this.state;
  }
  getName():String{
    return this.name;
  }
  getImage():String{
    return this.image;
  }

  getSubMenus():SubMenu[]{
    return this.submenus;
  }


}
