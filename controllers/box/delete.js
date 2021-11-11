const boxesModel = require('../../models/box')

module.exports = async (req, res) => {
    try { 
        const response = await boxesModel.findOneAndRemove({_id: req.params.id});
        res.send(true);
    } catch (error) {
        console.error(error);
    }
}