const itemModel = require('../../models/item')

module.exports = async (request, response) => {
    try { 
        const item = await itemModel.findOneAndUpdate({name: request.body.name}, request.body);
        response.json({item});
    } catch (error) {
        console.error(error);
    }
}