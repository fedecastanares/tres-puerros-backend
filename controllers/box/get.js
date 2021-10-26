const boxesModel = require('../../models/box')

module.exports = async (request, response) => {
    try { 
        
        const boxes = await boxesModel.find({}, '-__v');

        response.json({
            boxes
        });
    } catch (error) {
        console.error(error);
    }
}