const express = require('express');
const router = express.Router();
const { requireAuth } = require('../../utils/auth');
const { Op } = require("sequelize");
const { Spot, Review, Image, User, Booking } = require('../../db/models');



/* Middlewares */
// to check is the review valide
const validateBooking = async (req, _res, next) => {
    const booking = await Booking.findByPk(req.params.id);

    if (!booking) {
        const err = new Error("Booking couldn't be found");
        err.status = 404;
        next(err);
    };
    next();
};
// to check if manipulate by booking owner
const verifyBookingOwner = async (req, _res, next) => {
    const requestuserId = req.user.id;
    const booking = await Booking.findByPk(req.params.id);
    
    if (requestuserId !== booking.userId)  {
        const err = new Error('Forbidden');
        err.status = 403;
        next(err);
    };
    next();
};
// to check if the booking is past
const pastBooking = async (req, _res, next) => {
    const booking = await Booking.findByPk(req.params.id);
    const today = new Date().toISOString().slice(0, 10)
    const err = new Error();
    err.status = 400;
    if (booking.endDate < today) {
        err.message = "Past bookings can't be modified";        
        next(err);
    };
    if(booking.startDate < today) {
        err.message = "Bookings that have been started can't be deleted";        
        next(err);
    }
    next();
};
// to check if authorized user to delete a booking
const authorizedDelete = async (req, _res, next) => {
    const requestuserId = req.user.id;
    const booking = await Booking.findByPk(req.params.id);
    const spot = await Spot.findByPk(booking.spotId);
    
    if ((requestuserId !== booking.userId) && (requestuserId !== spot.ownerId)) {
        const err = new Error('Forbidden');
        err.status = 403;
        next(err);
    };
    next();
};
// validate booking request
const validateCreateBooking = (req, _res, next) => {
    const { startDate, endDate } = req.body;
    const err = new Error('Validation Error');
    err.status = 400;
    err.errors = {};
    const today = new Date().toISOString().slice(0, 10)
    if (!startDate || !endDate) {
        err.errors.startDate = "Start date is required";
        err.errors.endDate = "End date is required";
        next(err);
    }
    if (startDate < today) {
        err.errors.startDate = "Past bookings can't be modified";
        next(err);
    };
    if (startDate > endDate) {
        err.errors.endDate = "endDate cannot come before startDate";
        next(err);
    }
    next();
};
// check booking date
const validBookingDate = async (req, _res, next) => {
    const { startDate, endDate } = req.body;
    const booking = await Booking.findByPk(req.params.id)
    const allbookings = await Booking.findAll({
        where: {
            spotId: booking.spotId,
            id: {[Op.notIn]: [req.params.id]}
        }
    });      
    
    const err = new Error("Sorry, this spot is already booked for the specified dates");
    err.status = 403;
    err.errors = {};
    
    for(let booking of allbookings) {
        if ((booking.startDate < endDate && booking.endDate > startDate) || (booking.startDate == startDate || booking.endDate == startDate) ) {
            err.errors = {
                "startDate": "Start date conflicts with an existing booking",
                "endDate": "End date conflicts with an existing booking"
            };
            next(err);
        }               
    }
    next();
};


/* PUT method route */
// Edit a Booking
router.put('/:id',
    requireAuth,
    validateBooking,
    verifyBookingOwner,
    pastBooking,
    validateCreateBooking,
    validBookingDate,

    async (req, res) => {
        const updateBooking = await Booking.findByPk(req.params.id);
        const { startDate, endDate } = req.body;
        updateBooking.startDate = startDate;
        updateBooking.endDate = endDate;

        await updateBooking.save();

        res.json(updateBooking);
    });


/* DELETE method route */
// Delete a Booking
router.delete('/:id',
    requireAuth,
    validateBooking,
    authorizedDelete,
    pastBooking,
    async (req, res) => {
        const booking = await Booking.findByPk(req.params.id);
        await booking.destroy();
        res.json({
            "message": "Successfully deleted",
            "statusCode": 200
        });
    });


module.exports = router;