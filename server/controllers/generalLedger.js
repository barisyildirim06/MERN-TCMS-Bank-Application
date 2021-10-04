const { GeneralLedger } = require("../models/GeneralLedger");

module.exports = {
    generalLedgerCreate(req, res) {

        //save all the data we got from the client into the DB 
        const generalLedger = new GeneralLedger(req.body)

        generalLedger.save((err) => {
            if (err) return res.status(400).json({ success: false, err })
            return res.status(200).json({ success: true })
        })

    },
    generalLedgerIndex(req,res,next) {
        GeneralLedger.find()
         .then(products => res.json(products))
         .catch(err => res.status(400).json('Error: ' + err));
     },


    //?id=${productId}&type=single
    //id=12121212,121212,1212121   type=array 
    ProductById(req, res) {

        let type = req.query.type
        let productIds = req.query.id

        if (type === "array") {
            let ids = req.query.id.split(',');
            productIds = [];
            productIds = ids.map(item => {
                return item
            })
        }

        Product.find({ '_id': { $in: productIds } })
        .populate('writer')
        .exec((err, product) => {
            if (err) return res.status(400).send(err)
            return res.status(200).send(product)
        })
    }


}
