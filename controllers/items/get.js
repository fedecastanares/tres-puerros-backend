const itemModel = require('../../models/item')

module.exports = async (request, response) => {
    try { 
        
        const items = await itemModel.find({}, '-__v');

        response.json({
            items
        });
    } catch (error) {
        console.error(error);
    }
}