const express = require('express');
const router = express.Router();


const { Spot, User } = require('../db/models');
const { requireAuth, requireAuthorization, restoreUser } = require('../utils/auth');

// get all spots of the current user
router.get('/:id/spots',
    restoreUser,
    requireAuth,
    requireAuthorization,
    async (req, res) => {

        const spots = await Spot.findAll({
            where: {
                ownerId: req.params.id
            }
        });
        res.json({ spots });
    });




module.exports = router;