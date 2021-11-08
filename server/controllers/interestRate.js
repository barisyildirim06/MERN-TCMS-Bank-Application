const { InterestRate } = require("../models/InterestRate");

module.exports = {
    async interestRateCreate(req, res) {
        if (!req.user.isAdmin) return res.status(400).json({ success: false, message: "You don't have access" })
        //save all the data we got from the client into the DB 
        const interestRate = new InterestRate(req.body)

        await interestRate.save(async (err) => {
            if (err) return res.status(400).json({ success: false, err })
            const interest = await InterestRate.findOne({ _id: interestRate?._id}).exec()
            return res.status(200).json({ success: true, message: "New Interest Rate is created", interest })
        })

    },
    interestRateList(req, res) {
        if (!req.user.isAdmin) return res.status(400).json({ success: false, message: "You don't have access" })
        const sevenDaysUnix = new Date().setDate((new Date()).getDate() - 7);
        InterestRate.find({ createdAt : { $gte : sevenDaysUnix } })
            .then(interestRates => {
                return res.json(interestRates)
            })
            .catch(err => res.status(400).json('Error: ' + err));
    },
    interestRateUpdate(req, res) {
        if (!req.user.isAdmin) return res.status(400).json({ success: false, message: "You don't have access" })
        InterestRate.findOneAndUpdate({ currency: req.body.currency }, { rate: req.body.rate }, () => {
            return res.status(200).json({ success: true, message: "Interest Rate is updated" })
        })
    }
}
