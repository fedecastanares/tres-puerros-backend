const boxesModel = require('../../models/box')
const itemsModel = require('../../models/item')

module.exports = async (request, response) => {
    try { 
        const { name } = await itemsModel.findOne({_id: request.body.order.item._id}, 'name');
        const BoxID = request.body.order.boxID;
        const item = {...request.body.order.item, name};
        const boxes = await boxesModel.updateOne({_id: BoxID}, {$push: {items: item}});

        console.log();
        response.json({
            item,
            ok: true
        });
    } catch (error) {
        console.error(error);
    }
}