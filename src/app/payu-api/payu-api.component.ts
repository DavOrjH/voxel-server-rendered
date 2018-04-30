import { Component, OnInit } from '@angular/core';
import { Http, RequestOptionsArgs , Headers} from '@angular/http';
import {Md5} from 'ts-md5/dist/md5';
import { ShoppingCartService } from "app/shopping-cart.service";
import { Product } from "app/store/product";
import { Observable } from "rxjs/Observable";
import * as firebase from 'firebase/app';
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireDatabase } from "angularfire2/database";
import { UserDataService } from 'app/user-data.service';
import { Subscription } from 'rxjs/Subscription';
import { User } from 'app/user';
import {payMethods} from './payMethods';


declare var $:any;
declare var Jquery:any;
@Component({
  selector: 'app-payu-api',
  templateUrl: './payu-api.component.html',
  styleUrls: ['./payu-api.component.css']
})
export class PayuApiComponent implements OnInit {

    user: Observable<firebase.User>;
    url:string;
    private apiLogin:string;
    private apiKey:string;
    private merchantId:string;
    private accountId:string;
    private notifyUrl:string="https://voxel3d.herokuapp.com/apis/PayU-res";//TODO: set notify URl
    ip:string="1.0.1.0";
    model:any = {
    payMethod:""
    };
    private payMethods:any[];
    private userData:any={};
    private referenceCode:string;
    private loading:boolean=false;

    //handle user data observer
    private userSus:Subscription;
    private currentUser:User;
    private production:boolean;
    //
    private productList:Product[];

  constructor(private http:Http, private cart:ShoppingCartService, private afAuth:AngularFireAuth,
                private db:AngularFireDatabase,
                private userService:UserDataService) {

      this.production= false; // set when change the environment

      this.url = this.production?"https://api.payulatam.com/payments-api/4.0/service.cgi":"https://sandbox.api.payulatam.com/payments-api/4.0/service.cgi";
      this.apiKey = this.production?"wj1gN6UndNh2vVY2LH2ivLvIdU":"4Vj8eK4rloUd272L48hsrarnUA";
      this.apiLogin = this.production?"S5bw99NmWvk9Ma2":"pRRXKOl8ikMmt9u";
      this.merchantId=this.production?"679276":"508029";
      this.accountId=this.production?"682047":"512321";
       // account id in payU

      this.user =afAuth.authState;

      // subscription to the observable service
      this.userSus = this.userService.getUser().subscribe(
        user =>{
          this.currentUser = user as User;
        }
      );

   }

  ngOnInit() {
    this.getUserData();
    this.getHostUri();
    this.reqPayMethods();
    this.setProductList();
    this.referenceCode= this.getDeviceSessionId();

    this.userService.init();

  }

  getTotal():number{
    return this.cart.getTotal();
  }

  setProductList():void{
    this.productList = this.cart.getProductList();
  }
  delProd(index){
    this.cart.remove(index);
    this.setProductList();
    console.log("se va a boorrar el "+ index);
  }

  getProductList():Product[] {
    return this.productList;
  }

  isLoading():boolean{
    return this.loading;
  }
  setLoading(loadState:boolean):void{
    this.loading = loadState;
  }

  /**
   * Gets the user data from database for request information
   */
  getUserData():void{
    let user = localStorage.getItem("currentUser");
    this.db.object("/User/"+user).forEach(this.storeData.bind(this));
  }
  storeData(user):void{
    this.userData.name = user.firstName+" "+user.lastName;
    this.userData.phone1 = user.phone;
    this.userData.phone2 = user.phone2;
    this.userData.email = user.email;
  }

  reqPayMethods():void{
    this.payMethods=payMethods;
  }

  getHostUri(){
    $.getJSON('//freegeoip.net/json/?callback=?',this.setIp.bind(this));
  }

  setIp(data){
    this.ip= data.ip;
  }

  getIp(){
    return this.ip;
  }

  getDeviceSessionId():string{
    let s:any="";
    let _ga;
    s= this.getCookie("_ga");
    _ga=s.split(".");
    s=_ga[2];
    s=s+this.microtime();// concat the value of the cookie with the microtime stamp
    s= Md5.hashStr(s);// aplies the md5Sum algorithm to the string
    return s;
  }

  microtime(get_as_float?) {
        var now:any = new Date().getTime() / 1000;
        var s = parseInt(now, 10);
        return (get_as_float) ? now : (Math.round((now - s) * 1000) / 1000) + ' ' + s;
    }

  getCookie(cname) {//returns  the value of the cookie @param cname
      var name = cname + "=";
      var ca = document.cookie.split(';');
      for(var i=0; i<ca.length; i++) {
              var c = ca[i].trim();
              if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
      }
      return "";
  }
  getPayMethods():any[]{ // returns the avialable paymethods in he country specified
    /**
     * let pm:any[]=[];
    if(this.payMethods){
      for (var index = 0; index < this.payMethods.length; index++) {
        if(this.payMethods[index].country == "CO") pm.push(this.payMethods[index]);
      }
    }
    
    return pm;
     */
    
     return this.payMethods;
  }


  checkEmail(email):boolean{
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  cpfCheck(cpf:string):boolean{

    if (cpf.length != 11 ||
      cpf == "00000000000" ||
      cpf == "11111111111" ||
      cpf == "22222222222" ||
      cpf == "33333333333" ||
      cpf == "44444444444" ||
      cpf == "55555555555" ||
      cpf == "66666666666" ||
      cpf == "77777777777" ||
      cpf == "88888888888" ||
      cpf == "99999999999")
      return false;

      let add = 0;

      for(let i = 0; i < 9; i++){
        add += parseInt(cpf.charAt(i)) * (10 - i);
      }

      let rev = 11 - (add % 11);
      if (rev == 10 || rev == 11)
        rev = 0;
      if (rev != parseInt(cpf.charAt(9)))
        return false;
      
      add = 0;

      for ( let i = 0; i < 10; i++)
        add += parseInt(cpf.charAt(i)) * (11 - i);
      rev = 11 - (add % 11);

      if (rev == 10 || rev == 11)
          rev = 0;
      if (rev != parseInt(cpf.charAt(10)))
          return false;

      
      return true;    

  }

  cnpjCheck(cnpj:string){
    cnpj = cnpj.replace(/[^\d]+/g,'');
       if(cnpj == '') return false
       if (cnpj.length != 14)
           return false; 
       if (cnpj == "00000000000000" || 
           cnpj == "11111111111111" || 
           cnpj == "22222222222222" || 
           cnpj == "33333333333333" || 
           cnpj == "44444444444444" || 
           cnpj == "55555555555555" || 
           cnpj == "66666666666666" || 
           cnpj == "77777777777777" || 
           cnpj == "88888888888888" || 
           cnpj == "99999999999999")
           return false;
            
      
       let tamanho = cnpj.length - 2;
       let numeros = cnpj.substring(0,tamanho);
       let digitos = cnpj.substring(tamanho);
       let soma:number = 0;
       let pos = tamanho - 7;
       for (let i = tamanho; i >= 1; i--) {
         soma += Number(numeros.charAt(tamanho - i)) * pos--;
         if (pos < 2)
               pos = 9;
       }
       let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
       if (resultado = Number(digitos.charAt(0))){
        tamanho = tamanho + 1;
        numeros = cnpj.substring(0,tamanho);
        soma = 0;
        pos = tamanho - 7;
        for (let i = tamanho; i >= 1; i--) {
          soma += Number(numeros.charAt(tamanho - i)) * pos--;
          if (pos < 2)
                pos = 9;
        }
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado = Number(digitos.charAt(1))){
          return true;

        }else{
          return false;
        }        

       }else{
        return false;
       }
  }

  isCredit(payMethod:string):boolean{
    
    let credit = ['MASTERCARD', 'VISA', 'AMEX', 'NARANJA', 'CABAL', 'SHOPPING', 'ARGENCARD', 'CENCOSUD', 'DINERS', 'ELO', 'HIPERCARD', 'CODENSA'];
    if(credit.includes(payMethod)){
      return true
    }else{
      return false
    }
  }

  pushSellOrder():string{
    //TODO: push the sellOrder in the database and return the key
    return "";
  }

  pay():void{
    if(this.isCredit(this.model.payMethod)){
      this.payCredit();
    }else{
      // handle other payments
      this.payCash();
    }
  }

  isValidCard():boolean{
    // TODO: check the number in the model based on the regular expression given by payU
    return true;
  }

 /**
   * Sends the information of a payment through Cash method
   * 
   */
  payCash():void{
    this.setLoading(true);
    // get the products fo the service
    var products:Product[]=this.getProductList();
    //var key = this.pushtransaction();
    var strProd:string="";
    var tx_value:number=this.cart.getTotal();
    for (var index = 0; index < products.length; index++) {
      strProd = strProd+" - "+products[index].getName();
    }
    
    let body ={
      "language": "es",
      "command": "SUBMIT_TRANSACTION",
      "merchant": {
        "apiKey": this.apiKey,
        "apiLogin": this.apiLogin
      },
      "transaction": {
         "order": {
            "accountId": this.accountId,
            "referenceCode": "PagoEfectivo"+this.referenceCode,
            "description": strProd,
            "language": "es",
            "signature": Md5.hashStr(this.apiKey+"~"+this.merchantId+"~"+"PagoEfectivo"+this.referenceCode+"~"+tx_value+"~USD"),
            "notifyUrl": this.notifyUrl,
            "additionalValues": {
               "TX_VALUE": {
                  "value": tx_value,
                  "currency": "USD"
               }
            },
            "buyer": {
              "merchantBuyerId": "1",
              "fullName":this.userData.name,//USer Data
              "emailAddress": this.userData.email,
              "contactPhone": this.userData.phone,
              "dniNumber": this.model.dni,
              "shippingAddress": {
                "street1": this.model.street1,
                "street2": this.model.street2,
                "city": this.model.city,
                "state": this.model.state,
                "country": this.model.country,
                "postalCode": this.model.postalCode,
                "phone": this.userData.phone
              }
            }
         },
         "type": "AUTHORIZATION_AND_CAPTURE",
         "paymentMethod": this.model.payMethod,
         "paymentCountry": this.model.country,
         "ipAddress": this.getIp()
      },
      "test": false
   };
   // set headers
   let headers = new Headers();
   headers.append("Content-Type","application/json");
   headers.append("Accept","application/json");
   headers.append("'Access-Control-Allow-Origin","*");
   headers.append("Access-Control-Allow-Methods","GET, POST, PATCH, PUT, DELETE, OPTIONS");
   let options:RequestOptionsArgs = {
     headers: headers
   };

   
   //make the request
  this.http.post(this.url,body,options).subscribe(
     res =>{
       //handle response
       this.setLoading(false);
       console.log(res.headers.toJSON());
       let bodyRes = res.json();
       console.log(bodyRes);
       if(bodyRes.code =="SUCCESS"){
         alert("todo salio bien :D");
         switch (bodyRes.transactionResponse.state) {
           case "APPROVED": 
             //TODO: conect the database through this case 
             break;
          case "ERROR":
            alert("Ha ocurrido un error durante la transaccion: "+bodyRes.transactionResponse.responseMessage);
            //TODO: reload the component
          break;
          case "DECLINED":
            alert("La transacción ha sido rechazada: "+bodyRes.transactionResponse.responseMessage);
             break;
          case "EXPIRED":
            alert("La transacción ha Expirado: "+bodyRes.transactionResponse.responseMessage);
             break;
          case "PENDING":
            alert("Se ha generado tu recibo, Recuerda que tiene una caducidad de 8 dias");
            window.open(bodyRes.transactionResponse.extraParameters.URL_PAYMENT_RECEIPT_HTML);
            // TODO: redirect to his account
             break;
             
           default:
             break;
         }
       }
       alert(bodyRes.code);// TODO: handle the code and tell to the user the next step
       
     }
   );  
   console.log(body);

  }
  

  /**
   * Sends the information of a payment through credit card
   * 
   */
  payCredit():void{
    this.setLoading(true);
    
    // get the products fo the service
    var products:Product[]=this.getProductList();
    //var key = this.pushtransaction();
    var strProd:string="Desc: ";
    var tx_value:number=this.cart.getTotal();
    for (var index = 0; index < products.length; index++) {
      strProd = strProd+" - "+products[index].getName();
    }
    
    // set the body request
    let body =
    {
      "language": "es",
      "command": "SUBMIT_TRANSACTION",
      "merchant": {
          "apiKey": this.apiKey,
          "apiLogin": this.apiLogin
      },
      "transaction": {
          "order": {
            "accountId": this.accountId,
            "referenceCode": "PagoCredito"+this.referenceCode, // 
            "description": strProd, // item list//////
            "language": "es",
            "signature": Md5.hashStr(this.apiKey+"~"+this.merchantId+"~"+"PagoCredito"+this.referenceCode+"~"+tx_value+"~USD"),
            "notifyUrl": this.notifyUrl,
            "additionalValues": {
                "TX_VALUE": {
                  "value": tx_value,
                  "currency": "USD"
            },
                "TX_TAX": {
                  "value": 0,
                  "currency": "USD"
            },
                "TX_TAX_RETURN_BASE": {
                  "value": 0,
                  "currency": "USD"
            }
            },
            /* "buyer": {
                "merchantBuyerId": "1",
                "fullName":this.userData.name,//USer Data
                "emailAddress": this.userData.email,
                "contactPhone": this.userData.phone,
                "dniNumber": this.model.dni,
                "shippingAddress": {
                "street1": this.model.street1,
                "street2": this.model.street2,
                "city": this.model.city,
                "state": this.model.state,
                "country": this.model.country,
                "postalCode": this.model.postalCode,
                "phone": this.userData.phone
              }
            }, */
            "shippingAddress": {
                "street1": this.model.street1,
                "street2": this.model.street2,
                "city": this.model.city,
                "state": this.model.state,
                "country": this.model.country,
                "postalCode": this.model.postalCode,
                "phone": this.model.phone
            }
          },
          "payer": {
            "merchantPayerId": "1",
            "fullName": this.model.firstName+" "+this.model.lastName ,
            "emailAddress": this.model.email,
            "contactPhone": this.model.phone,
            "dniNumber": this.model.dni,
            "dniType": this.model.dniType
          },
          "creditCard": {
            "number": this.model.creditCardNumber,
            "securityCode": this.model.creditCardSecCode,
            "expirationDate": this.model.creditCardExpYear+"/"+this.model.creditCardExpMonth,
            "name": this.model.creditCardName
          },
          "type": "AUTHORIZATION_AND_CAPTURE",
          "paymentMethod": this.model.payMethod,
          "paymentCountry": "CO",
          "deviceSessionId": this.getDeviceSessionId(),
          "ipAddress": this.getIp(),
          "cookie": Md5.hashStr(document.cookie),
          "userAgent": window.navigator.userAgent
      },
      "test": !this.production // not production is testing
    };



    // set headers
    let headers = new Headers();
    headers.append("Content-Type","application/json");
    headers.append("Accept","application/json");
    let options:RequestOptionsArgs = {
      headers: headers
    };
    
    //make de request
   this.http.post(this.url,body,options).subscribe(
      res =>{
        //handle response
        this.setLoading(false);
        let body = res.json();
        console.log(body);
        alert(body.code);// TODO: handle the code and tell to user the next step
      }
    );  
    console.log(body);



  }

}
