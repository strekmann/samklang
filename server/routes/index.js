import express from "express";


var router = express.Router();

router.get("/", function(req, res, next){
    var data = {};
    res.renderReact('index', data);
});

export default router;
