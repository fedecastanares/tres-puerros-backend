const boxesModel = require('../../models/box')

module.exports = async (request, response) => {
    try { 
        
        const boxes = await boxesModel.find({}, '-__v');

        console.log(request.body.boxID);
        response.json({
            boxes
        });
    } catch (error) {
        console.error(error);
    }
}