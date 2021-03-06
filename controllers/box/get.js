const boxesModel = require('../../models/box')
const itemsModel = require('../../models/item')

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