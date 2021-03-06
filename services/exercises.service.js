// Gettign the Newly created Mongoose Model we just created 
var Exercise = require('../models/exercise.model')

// Saving the context of this module inside the _the variable
_this = this

// Async function to get the To do List


exports.getExercise = async function(id){


    try {
        var exercise = await Exercise.findById(id).populate('sports').populate('material').populate('materialType');

        return exercise;

    }

    catch (e) {
        console.log('erreur API get Exericses :'+e)
        throw Error('Error while Paginating exercise')

    }


}




exports.getExercises = async function(query, page, limit) {

    // Options setup for the mongoose paginate

    page = parseInt(page, 10)
    var options = {
        page,
        limit
    }


    // Try Catch the awaited promise to handle the error 

    // try {
    //     var exercises = await Exercise.paginate(query, options)

    //     console.log('retour de mongoose');
    //     console.log(exercises);

    //     // Return the todod list that was retured by the mongoose promise
    //     return exercises;

    // } catch (e) {
    //     console.log(e)

    //     // return a Error message describing the reason 
    //     throw Error('Error while Paginating exercises')
    // }


    try {
        var exercises = await Exercise.find().populate('sports').populate('material').populate('materialType');

        // Return the todod list that was retured by the mongoose promise
        return exercises;

    } catch (e) {
        console.log(e)

        // return a Error message describing the reason 
        throw Error('Error while Paginating exercises')
    }
}

exports.createExercise = async function(exercise) {
    console.log(exercise);

    // Creating a new Mongoose Object by using the new keyword
    var newExercise = new Exercise({

        title: exercise.title,
        description: exercise.description,
        details: exercise.details,
        media: {
            img: exercise.media.img,
            video: exercise.media.video,
            gif: exercise.media.gif,

        },
        material: exercise.material,
        hidden: exercise.hidden,



    })

    try {

        // Saving the exercise 
        var savedExercise = await newExercise.save()

        return savedExercise;
    } catch (e) {

        console.log('erreur mongoose')
        console.log(e)


        // return a Error message describing the reason     
        throw Error("Error while Creating exercise")
    }
}

exports.updateExercise = async function(exercise) {
    var id = exercise._id

    try {
        //Find the old exercise Object by the Id

        var oldExercise = await Exercise.findById(id);
    } catch (e) {
        console.log(e)
        throw Error("Error occured while Finding the Exercise")
    }

    // If no old exercise Object exists return false
    if (!oldExercise) {
        return false;
    }
    console.log('ancienne valeure :')
    console.log(oldExercise)

    //Edit the exercise Object
    oldExercise.title = exercise.title
    oldExercise.description = exercise.description
    oldExercise.title = exercise.title
    oldExercise.description = exercise.description
    oldExercise.details = {cardio : exercise.details.cardio,
        muscu : exercise.details.muscu,
        balance : exercise.details.balance,
        warmup : exercise.details.warmup,
        bodyPart : exercise.details.bodyPart,
        } ,
    oldExercise.media = {
        img: exercise.img,
        video: exercise.video,
        gif: exercise.gif,

    }
    oldExercise.materialType = exercise.material
    oldExercise.hidden = exercise.hidden


    console.log(oldExercise)

    try {
        var savedexercise = await oldExercise.save()
        return savedexercise;
    } catch (e) {
        throw Error("And Error occured while updating the Exercise :"+e);
    }
}

exports.deleteExercise = async function(id) {

    // Delete the exercise
    try {
        var deleted = await Exercise.remove({
            _id: id
        })
        if (deleted.n === 0) {
            throw Error("Exercise Could not be deleted")
        }
        return deleted
    } catch (e) {
        console.log(e);
        throw Error("Error occured while Deleting the Exercise")
    }
}
