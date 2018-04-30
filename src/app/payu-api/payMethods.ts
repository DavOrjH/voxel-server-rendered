/**
 * let body={
      "test": false,
      "language": "en",
      "command": "GET_PAYMENT_METHODS",
      "merchant": {
          "apiLogin": this.apiLogin,
          "apiKey": this.apiKey
      }
    };

    // set headers
    let headers = new Headers();
    headers.append("Content-Type","application/json");
    headers.append("Accept","application/json");
    let options:RequestOptionsArgs = {
      headers: headers
    };

    this.http.post(this.url,body,options).subscribe(
      res =>{
        //handle response
        let resp = res.json();
        if(resp.error){
          alert(resp.error);
        }else{
          this.payMethods=resp.paymentMethods;
        }
        
      }
    ); 
 * 
 */
export const payMethods=[
    {
      val:"PAGOFACIL",
      description:"Pago facil - Argentina"
    },
    {
      val:"CABAL",
      description:"Cabal - Argentina"
    },
    {
      val:"NARANJA",
      description:" Naranja - Argentina"
    },
    {
      val:"SHOPPING",
      description:" Shopping -  Argentina"
    },
    {
      val:"COBRO_EXPRESS",
      description:" Cobro Express - Argentina"
    },
    {
      val:"CENCOSUD",
      description:"Cencosud - Argentina"
    },
    {
      val:"ARGENCARD",
      description:"Argencard - Argentina"
    },
    {
      val:"BAPRO",
      description:"Banco Provincia - Argentina"
    },
    {
      val:"RIPSA",
      description:"Ripsa - Argentina"
    },
    {
      val:"MASTERCARD",
      description:"MASTERCARD"
    },
    {
      val:"VISA",
      description:"VISA"
    },
    {
      val:"RAPIPAGO",
      description:"Rapipago - Argentina"
    },
    {
      val:"AMEX",
      description: "AMERICAN EXPRESS"
    },
    {
      val:"DINERS",
      description:"DINERS"
    },
    {
      val:"ELO",
      description:"ELO - Brasil"
    },
    {
      val:"BOLETO_BANCARIO",
      description:"BOLETO BANCARIO - Brasil"
    },
    {
      val:"HIPERCARD",
      description:"Hipercard - Brasil"
    },
    {
      val:"MULTICAJA",
      description:"Multicaja - Chile"
    },
    {
      val:"BALOTO",
      description:"Baloto - Colombia"
    },
    {
      val:"EFECTY",
      description:"Efecty - Colombia"
    },
    {
      val:"CODENSA",
      description:"Codensa - Colombia"
    },
    {
      val:"OTHERS_CASH",
      description:"Other cash - Colombia"
    },
    { 
      val:"OXXO",
      description:"OXXO - México"
    },
    {
      val:"SEVEN_ELEVEN",
      description:"Seven Eleven- México"
    },
    {
      val:"BCP",
      description:"BCP - Perú"
    },
    {
      val:"PAGOEFECTIVO",
      description:"Pago Efectivo - Perú"
    }
    
  ];