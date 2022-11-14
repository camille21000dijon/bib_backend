
const express = require('express')
const router = express.Router();


router.get('/', (req, res) => {
    res.json({musiques:'Liste des films'})
 //   console.log(req)
})


module.exports = router;

