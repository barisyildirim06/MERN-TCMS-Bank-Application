const { InterestRate } = require("../models/InterestRate");

module.exports = {
    interestRateCreate(req, res) {

        //save all the data we got from the client into the DB 
        const interestRate = new InterestRate(req.body)

        interestRate.save((err) => {
            if (err) return res.status(400).json({ success: false, err })
            return res.status(200).json({ success: true })
        })

    },
    interestRateList(req, res){
        if (!req.user.isAdmin) return res.status(400).json({ success: false, message: "You don't have access" })
        InterestRate.find()
        .then(interestRates => res.json(interestRates))
        .catch(err => res.status(400).json('Error: ' + err));
    } ,
    interestRateUpdate(req,res) {
        if (!req.user.isAdmin) return res.status(400).json({ success: false, message: "You don't have access" })
        InterestRate.findOneAndUpdate({ currency: req.body.currency }, { rate: req.body.rate }, () => {
            return res.status(200).json({ success: true, message: "Interest Rate is updated" })
        })
    }
}
