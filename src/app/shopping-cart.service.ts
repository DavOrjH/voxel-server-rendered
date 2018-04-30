import { Injectable } from '@angular/core';
import { Product } from "app/store/product";

@Injectable()
export class ShoppingCartService {

  productList:Product[];
  total:number;
  constructor() { 
    this.productList=[];
    this.total=0;
  }

  public add(prod:Product):void{
    if(localStorage.getItem("currentUser")!= null){
      this.productList.push(prod);
      this.total=Number(this.total)+Number(prod.getPrice());
      alert("producto agregado satisfactoriamente \n recuerde completar sus datos para poder efectuar el pago");
    }else{
      alert("Debe iniciar sesión para poder agregar productos al carrito.");
    }
    
  }

  public clear():void{
    this.productList=[];
    this.total=0;
  }

  public remove(index:number):void {
    let deleted:Product[] = this.productList.splice(index,1);
    this.total=Number(this.total)-Number(deleted[0].getPrice());
  }

  public getProductList():Product[]{
    return this.productList;
  }
  
  public getTotal():number{
    return this.total;

  }

}
