const express = require('express');
const router = express.Router();
/* GET api listing. */
 router.get('/getReq', (req, res) => {
  res.send('api works');
  res.json(req.body.value);
}); 
router.post("/postReq",
    (req,res, next) =>{
        let name = req.body.name;
        let val = req.body.value;
        var database = req.db;
        var key = database.ref('/Testing/').push(); 
        database.ref(key.path).set({
            value: val,
            name: name
        }).catch(
            err =>{
                console.error(err);
            }
        ); 

        res.send("value: "+val+" name: "+name);
    });

/**
 * Handle the response of payU
 */
router.post("/PayU-res",
    (req,res, next) =>{


        /**
         * "{\"response_code_pol\":\"4\",
         * \"phone\":\"\",
         * \"additional_value\":\"0.00\",
         * \"test\":\"0\",
         * \"transaction_date\":\"2017-11-24 13:02:22\",
         * \"cc_number\":\"************0294\",
         * \"cc_holder\":\"APPROVED\",
         * \"error_code_bank\":\"05\",
         * \"billing_country\":\"\",
         * \"bank_referenced_name\":\"\",
         * \"description\":\"Desc:  - Fundamental Rhinoceros Training virtual\",
         * \"administrative_fee_tax\":\"0.00\",
         * \"value\":\"200.00\",
         * \"administrative_fee\":\"0.00\",
         * \"payment_method_type\":\"2\",
         * \"office_phone\":\"\",
         * \"email_buyer\":\"\",
         * \"response_message_pol\":\"PAYMENT_NETWORK_REJECTED\",
         * \"error_message_bank\":\"0\",
         * \"shipping_city\":\"Bogotá\",
         * \"transaction_id\":\"7dea2d1e-1ba3-43cf-ab97-06a244c13722\",
         * \"sign\":\"7e82c5143aab959954386f7600bc72b6\",
         * \"tax\":\"0.00\",
         * \"payment_method\":\"23\",
         * \"billing_address\":\"\",
         * \"payment_method_name\":\"CODENSA\",
         * \"pse_bank\":\"\",
         * \"state_pol\":\"6\",
         * \"date\":\"2017.11.24 01:02:22\",
         * \"nickname_buyer\":\"\",
         * \"reference_pol\":\"843355770\",
         * \"currency\":\"USD\",
         * \"risk\":\"0.0\",
         * \"shipping_address\":\"Calle 10 sur\",
         * \"bank_id\":\"23\",
         * \"payment_request_state\":\"R\",
         * \"customer_number\":\"1\",
         * \"administrative_fee_base\":\"0.00\",
         * \"attempts\":\"1\",
         * \"merchant_id\":\"508029\",
         * \"exchange_rate\":\"3007.50\",
         * \"shipping_country\":\"CO\",
         * \"installments_number\":\"1\",
         * \"franchise\":\"CODENSA\",
         * \"payment_method_id\":\"2\",
         * \"extra1\":\"\",
         * \"extra2\":\"\",
         * \"antifraudMerchantId\":\"\",
         * \"extra3\":\"\",
         * \"nickname_seller\":\"\",
         * \"ip\":\"181.49.79.9\",
         * \"airline_code\":\"\",
         * \"billing_city\":\"\",
         * \"pse_reference1\":\"\",
         * \"reference_sale\":\"PagoCredito4491643e3ad2d3a69b797dd511440084\",
         * \"pse_reference3\":\"\",
         * \"pse_reference2\":\"\"}"
         */
        
        let val = JSON.stringify(req.body);
        let body= req.body;
        var database = req.db;
        var key = database.ref('/Testing/').push(); 
        database.ref(key.path).set({
            val: val,
            transaction_date: body.transaction_date,
            cc_number:body.cc_number,
            cc_holder:body.cc_holder,
            error_code_bank: body.error_code_bank,
            billing_country: body.billing_country,
            bank_referenced_name: body.bank_referenced_name,
            description: body.description,
            administrative_fee_tax: body.administrative_fee_tax,
            value:body.value,
            payment_method_name: body.payment_method_name,
            response_message_pol: body.response_message_pol,
            date: body.date,
            reference_pol: body.reference_pol,
            payment_request_state: body.payment_request_state,
            exchange_rate: body.exchange_rate,
            ip: body.ip,
            reference_sale: body.reference_sale,
        }).catch(
            err =>{
                console.error(err);
            }
        ); 
        //send status 200 (recibido OK)
        res.sendStatus(200);
    });


// handle email request
router.post("/email-req",
    (req,res, next) =>{
        var email = req.email;
        var body = req.body;
        var server = email.server.connect(
            {
                user:    "web.master@voxel3d.net", 
                password:"NURBS804", 
                host:    "smtp.gmail.com", 
                ssl:     true
            }
        );

        var mailOptions = {
            text: body.message + "\n Tel : "+ body.phone+" Nombre: "+body.name +" Mail: " +body.email,
            from: 'web.master@voxel3d.net',
            to: 'web.master@voxel3d.net',
            subject: body.subject,
        
        };

        server.send(mailOptions,function(err, message){
            console.log(err || message);
        });  
    }
);

// handle stl request   
router.post("/stl-req",
    (req,res, next) =>{
        var email = req.email;
        var body = req.body;
        var server = email.server.connect(
            {
                user:    "web.master@voxel3d.net", 
                password:"NURBS804", 
                host:    "smtp.gmail.com", 
                ssl:     true
            }
        );

        var mailOptions = {
        from: 'web.master@voxel3d.net',
        to: 'web.master@voxel3d.net',
        subject: "Cotización impresión STL",
        text: "Hola, me encuentro interesado en una impresión estereolitográfica, estos son los datos de la pieza" + "\n"  + "Tamaño: "  + body.size + "\n" + "Tipo de resina: " + body.resinType + "\n" + "Resolución: " + body.resolution + "\n" + "¿Caucho de alta definición?: " + body.isRubber + "\n" + "¿Fundición para resina casteable?: " + body.isFoundry+ "\n" + "Información adicional: " + "\n" + body.addInfo + "\n" + "Atentamente: " + "\n"  +" Nombre:" +body.name +  "\n" + "Tel : " + body.phone + "\n" + "Ciudad: " + body.city + "\n" + " Mail: " +body.email + "\n" + body.entity + "\n" + "Entidad: " + body.entityName
        };

        server.send(mailOptions,function(err, message){
            console.log(err || message);
        });  
        }
    );

    // handle fff request   

    router.post("/fff-req",
    (req,res, next) =>{
        var email = req.email;
        var body = req.body;
        var server = email.server.connect(
            {
                user:    "web.master@voxel3d.net", 
                password:"NURBS804", 
                host:    "smtp.gmail.com", 
                ssl:     true
            }
        );

        var mailOptions = {
        from: 'web.master@voxel3d.net',
        to: 'web.master@voxel3d.net',
        subject: "Cotización impresión FFF",
        text: "Hola, me encuentro interesado en una impresión de filamento, estos son los datos de la pieza" + "\n"  + "Tamaño: "  + body.size + "\n" + "Tipo de material: " + body.materialType + "\n" + "Resolución: " + body.resolution + "\n" + "Color: " + body.color + "\n" + "Información adicional: " + "\n" + body.addInfo + "\n" + "Atentamente: " + "\n"  +" Nombre:" +body.name +  "\n" + "Tel : " + body.phone + "\n" + "Ciudad: " + body.city + "\n" + " Mail: " +body.email + "\n" + body.entity + "\n" + "Entidad: " + body.entityName 
        };

        server.send(mailOptions,function(err, message){
            console.log(err || message);
        });     
    }
    );

    // handle course request

    router.post("/course-req",
    (req,res, next) =>{
        var email = req.email;
        var body = req.body;
        var server = email.server.connect(
            {
                user:    "web.master@voxel3d.net", 
                password:"NURBS804", 
                host:    "smtp.gmail.com", 
                ssl:     true
            }
        );

        var mailOptions = {
        from: 'web.master@voxel3d.net',
        to: 'web.master@voxel3d.net',
        subject: body.subject,
        text: body.message + "\n"  + " Nombre:" +body.name +  "\n" + "Tel : " + body.phone + "\n" + " Mail: " +body.email + "\n"
        };

        server.send(mailOptions,function(err, message){
            console.log(err || message);
        });     
    }
    );




module.exports = router;
