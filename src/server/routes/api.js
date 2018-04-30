const express = require('express');
const router = express.Router();

/* GET api listing. */
   router.get('/apiGet', (req, res) => {
       console.log(JSON.stringify(req.body));
  res.send('api dont works');
}); 
  


module.exports = router;
