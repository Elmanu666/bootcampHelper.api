var express = require('express')

var round = require('./api/round.route')

var router = express.Router()
var user = require('./api/user.route')
var sport = require('./api/sport.route')
var exercises = require('./api/exercises.route')
var sessions = require('./api/sessions.route')
var session = require('./api/session.route')
var files = require('./api/files.route')
var materialType = require('./api/materialType.route')
var material = require('./api/material.route')
var caloriesBurnt = require('./api/caloriesBurnt.route')


router.use('/exercises', exercises);
router.use('/sessions', sessions);
router.use('/session', session);
router.use('/files', files);
router.use('/user', user);
router.use('/materials', material);
router.use('/material', material);
router.use('/users', user);
router.use('/round', round);
router.use('/rounds', round);
router.use('/caloriesBurnt', caloriesBurnt);
router.use('/caloriesBurnts', caloriesBurnt);
router.use('/sport', sport);
router.use('/sports', sport);
router.use('/materialType', materialType);
router.use('/materialTypes', materialType);

module.exports = router;