import {Item} from './item';

export class SubMenu{
  name:String;
  url:String;
  items:Item[];
  state:String;
  clickeable:boolean;
  constructor(name:String,url:String,items:Item[],clickeable?:boolean){
    this.name = name;
    this.url = url;
    this.items = items;
    this.state="inactive";
    this.clickeable=clickeable||false;
  }
  add(item:Item):void{
    this.items.push(item);
  }
  isClickeable():boolean{
    return this.clickeable;
  }
  getName(){
    return this.name;
  }
  getUrl(){
    if(this.clickeable){
      return this.url;
    }else{
      return '';
    }
  }

  getItems(){
    return this.items;
  }

  getState(){
    return this.state;
  }

  setActive():void{
    (this.state==="active") ? this.state="inactive":this.state="active";
  }


}
