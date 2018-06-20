// Accessing the Service that we just created

var sessionService = require('../services/sessions.service')

// Saving the context of this module inside the _the variable

_this = this


// Async Controller function to get the To do List

exports.getSession = async function(req, res, next){

        var id = req.params.id;
        console.log(id);


    try {

        var session = await sessionService.getSession(id);

        return res.status(200).json({
            status: 200,
            data: session,
            message: "Succesfully sessions Recieved"

        });


    } catch (e)

    {

        return res.status(400).json({
            status: 400,
            message: e.message
        });



    }


}

exports.getSessions = async function(req, res, next) {

    // Check the existence of the query parameters, If the exists doesn't exists assign a default value

    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10

    try {

        var sessions = await sessionService.getSessions({}, page, limit)

        // Return the sessions list with the appropriate HTTP Status Code and Message.

        return res.status(200).json({
            status: 200,
            data: sessions,
            message: "Succesfully sessions Recieved"
        });

    } catch (e) {

        //Return an Error Response Message with Code and the Error Message.

        return res.status(400).json({
            status: 400,
            message: e.message
        });

    }
}

exports.createSession = async function(req, res, next) {


    console.log(req.body);

    var session1 = {

        description: req.body.description,
        plannedDate: req.body.plannedDate,
        executionDate :req.body.executionDate,
        Status: req.body.Status,
        attendees : req.body.attendees,
        plannedDate: req.body.plannedDate,
        round: req.body.round,
        deleted: false,
        executed: false,

        

    }

    try {

        // Calling the Service function with the new object from the Request Body

        var createdSession = await sessionService.createSession(session1)
        return res.status(201).json({
            status: 201,
            data: createdSession,
            message: "Succesfully Created session"
        })
    } catch (e) {

        //Return an Error Response Message with Code and the Error Message.

        return res.status(400).json({
            status: 400,
            message: "session Creation was Unsuccesfull "+e
        })
    }
}

exports.updateSession = async function(req, res, next) {

    // Id is necessary for the update

    if (!req.body._id) {
        return res.status(400).json({
            status: 400.,
            message: "Id must be present"
        })
    }

    var id = req.body._id;

    console.log(req.body)

    var session = {
        id,
        plannedDate : req.body.plannedDate ? req.body.plannedDate : null, 
        doneDate : req.body.doneDate ? req.body.doneDate : null, 
        part: [{
            numbOfExercices: req.body.numbOfExercices ? req.body.plannedDate : null,
            drillsDuration: req.body.drillsDuration ? req.body.drillsDuration : null,
            restDuration: req.body.restDuration ? req.body.restDuration : null,
            repeatNumber: req.body.repeatNumber ? req.body.repeatNumber : null,
            exercises: req.body.exercises ? req.body.exercises : null,
        }]

    }

    try {
        var updatedSession = await sessionService.updatesession(session)
        return res.status(200).json({
            status: 200,
            data: updatedSession,
            message: "Succesfully Updated Session"
        })
    } catch (e) {
        return res.status(400).json({
            status: 400.,
            message: e.message
        })
    }
}

exports.removeSession = async function(req, res, next) {

    var id = req.params.id;

    try {
        var deleted = await sessionService.deleteSession(id)
        return res.status(204).json({
            status: 204,
            message: "Succesfully session Deleted"
        })
    } catch (e) {
        return res.status(400).json({
            status: 400,
            message: e.message
        })
    }

}