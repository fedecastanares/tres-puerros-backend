const itemModel = require('../../models/item')

module.exports = async (request, response) => {
    try { 
        const item = await itemModel.findOne({_id: request.params.id}).deleteOne();
        response.json({item});
    } catch (error) {
        console.error(error);
    }
}