const boxesModel = require('../../models/box')
const itemsModel = require('../../models/item')

module.exports = async (request, response) => {
    try { 
        const boxes = await boxesModel.updateOne({_id: request.body.boxId}, {$pull: {items: {_id: request.body.itemId}}});

        response.json({
            boxes,
            ok: true
        });
    } catch (error) {
        console.error(error);
    }
}