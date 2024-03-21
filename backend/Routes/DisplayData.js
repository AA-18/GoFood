const express = require("express");
const router = express.Router();

router.get("/foodData",(req,res) => {
    try {
        // console.log(global.food_data);
        res.send([global.food_data,global.food_category]);
    } catch (error) {
        if(error) {
            console.log(error.message);
            res.send("Server error!!!");
        }
    }
});

module.exports = router;