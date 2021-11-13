const { InterestRate } = require("../models/InterestRate");
const { User } = require("../models/User");
const { GeneralLedger } = require("../models/GeneralLedger");

module.exports = {
    async interestRateCreate(req, res) {
        if (!req.user.isAdmin) return res.status(400).json({ success: false, message: "You don't have access" })
        //save all the data we got from the client into the DB 
        const interestRate = new InterestRate(req.body)

        await interestRate.save(async (err) => {
            if (err) return res.status(400).json({ success: false, err })
            const interest = await InterestRate.findOne({ _id: interestRate?._id }).exec()
            return res.status(200).json({ success: true, message: "New Interest Rate is created", interest })
        })

    },
    interestRateList(req, res) {
        if (!req.user.isAdmin) return res.status(400).json({ success: false, message: "You don't have access" })
        const sevenDaysUnix = new Date().setDate((new Date()).getDate() - 7);
        InterestRate.find({ createdAt: { $gte: sevenDaysUnix } })
            .then(interestRates => {
                return res.json(interestRates)
            })
            .catch(err => res.status(400).json('Error: ' + err));
    },
    async interestRateUpdate(req, res) {
        if (!req.user.isAdmin) return res.status(400).json({ success: false, message: "You don't have access" })
        const { confirmAmount, currency, rate } = req.body;
        await InterestRate.findOneAndUpdate({ currency: currency }, { rate: rate })
        await InterestRate.findOneAndUpdate({ currency: 'lastWeek' + currency }, { rate: rate, confirmAmount: confirmAmount })
        const users = await User.find();
        const totalAmount = await users.reduce((a, b) => ({ availableBalance: a.availableBalance + b.availableBalance })).availableBalance;

        users.forEach(async user => {
            const { _id, availableBalance } = user;
            const calculatedReturn = confirmAmount * (availableBalance / totalAmount)
            await User.findByIdAndUpdate({ _id: _id }, { availableBalance: Number(availableBalance) + Number(calculatedReturn) })
            const general = { currency, transactionNotes: _id, transactionDate: new Date().toISOString().split('T')[0], amount: calculatedReturn, transactionType: 'ACCRUED INTEREST' }
            const generalLedger = new GeneralLedger(general)
            await generalLedger.save((err) => {
                if (err) return res.status(400).json({ success: false, err })
            })
        })
        return res.status(200).json({ success: true, message: "Interest Rate is updated" });
    }
}
