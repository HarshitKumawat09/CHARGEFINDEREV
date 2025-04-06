const { body, query, param } = require('express-validator');

exports.validateBooking = [
  body('station')
    .notEmpty().withMessage('Station ID is required')
    .isMongoId().withMessage('Invalid station ID format'),
    
  body('user')
    .notEmpty().withMessage('User ID is required'),
    
  body('startTime')
    .notEmpty().withMessage('Start time is required')
    .isISO8601().withMessage('Invalid date format')
    .custom((value, { req }) => {
      if (new Date(value) <= new Date()) {
        throw new Error('Start time must be in the future');
      }
      return true;
    }),
    
  body('endTime')
    .notEmpty().withMessage('End time is required')
    .isISO8601().withMessage('Invalid date format')
    .custom((value, { req }) => {
      if (new Date(value) <= new Date(req.body.startTime)) {
        throw new Error('End time must be after start time');
      }
      return true;
    })
];

exports.validateBookingParams = [
  param('stationId')
    .isMongoId().withMessage('Invalid station ID format'),
    
  query('date')
    .notEmpty().withMessage('Date parameter is required')
    .isISO8601().withMessage('Invalid date format')
];