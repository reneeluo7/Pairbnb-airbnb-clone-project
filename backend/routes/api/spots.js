const express = require('express');
const router = express.Router();


const { Spot } = require('../../db/models');


// Get details of a Spot from an id
router.get('/:id', async (req, res) => {
    
    const spot = await Spot.findByPk(req.params.id);
    res.json(spot);
});



//get all spots
router.get('/', async (req, res) => {
    
    const spots = await Spot.findAll();
    res.json({spots});
});




module.exports = router;