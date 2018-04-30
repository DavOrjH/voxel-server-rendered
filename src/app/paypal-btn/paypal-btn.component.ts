import { Component, OnInit, ElementRef, AfterViewInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";

declare var paypal:any;
@Component({
  selector: 'app-paypal-btn',
  templateUrl: './paypal-btn.component.html',
  styleUrls: ['./paypal-btn.component.css']
})
export class PaypalBtnComponent implements OnInit,AfterViewInit {

  constructor(private http:HttpClient, private elementRef:ElementRef) { }

  ngOnInit() {
    
  }


  ngAfterViewInit() {
  var p = document.createElement("script");
  p.type = "text/javascript";
  p.src="https://www.paypalobjects.com/api/checkout.js";
  this.elementRef.nativeElement.appendChild(p);
    setTimeout(this.buttonPayPal,3000);
}

buttonPayPal():void{
  // Render the PayPal button

    paypal.Button.render({

        // Set your environment

        env: 'sandbox', // sandbox | production

        // Specify the style of the button

        style: {
            label: 'pay',
            size:  'responsive', // small | medium | large | responsive
            shape: 'pill',   // pill | rect
            color: 'silver'   // gold | blue | silver | black
        },

        // PayPal Client IDs - replace with your own
        // Create a PayPal app: https://developer.paypal.com/developer/applications/create

        client: {
            sandbox:    'AZnqSwn-m4aZgfc5GCIk7xifDevuruXeDnLpmyV9S8zKkkbR13jmvFBfSR4eRhBJCyWDN4hexwmO4iVi',
            production: 'ARB6r4GQOdcgUso-pEjkSAC0zBTihA_Frq0madUuBx2DeZkXFL2OMRJ0RL3weKU5Ay80XH6nOXc-HynX'
        },

        // Wait for the PayPal button to be clicked

        payment: function(data, actions) {
            return actions.payment.create({
                payment: {
                    transactions: [
                        {
                            amount: { total: '4.0', currency: 'USD' }//,
                            //items
                        }
                    ]
                }
            });
        },

        // Wait for the payment to be authorized by the customer

        onAuthorize: function(data, actions) {
            return actions.payment.execute().then(function() {
                window.alert('Payment Complete!');
                console.log(data);
            });
        }

    }, '#paypal-button-container');
}



  doBuyRequest(){
    let body ={
        cmd :"_s-xclick",
      hosted_button_id :"2K9LBEV8CKRZA"
    };
    this.http.post("https://www.sandbox.paypal.com/cgi-bin/webscr",body).subscribe((res:Response) =>{
      console.log(res.headers.get('X-Custom-Header'));
    // And access the body directly, which is typed as MyJsonData as requested.
      console.log(res.body);
    });
  }
}

