import express from "express";


var router = express.Router();

router.get("/", function(req, res, next){
    res.send('I R Samklang!');
});

export default router;
