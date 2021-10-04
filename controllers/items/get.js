const itemModel = require('../../models/item')

module.exports = async (request, response) => {
    try { 
        
        const items = await itemModel.find({});

        response.json({
            items
        });
    } catch (error) {
        console.error(error);
    }
}