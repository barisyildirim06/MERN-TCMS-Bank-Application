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
        // if (!req.user.isAdmin) return res.status(400).json({ success: false, message: "You don't have access" })
        // const sevenDaysUnix = new Date().setDate((new Date()).getDate() - 7);
        // { createdAt: { $gte: sevenDaysUnix } }
        InterestRate.find()
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
        let totalAmount = 0
        if (currency === 'NZD') totalAmount = await users.reduce((a, b) => ({ availableBalanceNZD: a.availableBalanceNZD + b.availableBalanceNZD })).availableBalanceNZD;
        if (currency === 'USD') totalAmount = await users.reduce((a, b) => ({ availableBalanceUSD: a.availableBalanceUSD + b.availableBalanceUSD })).availableBalanceUSD;
        if (currency === 'AUD') totalAmount = await users.reduce((a, b) => ({ availableBalanceAUD: a.availableBalanceAUD + b.availableBalanceAUD })).availableBalanceAUD;

        users.forEach(async user => {
            const { _id, availableBalanceNZD, availableBalanceUSD, availableBalanceAUD } = user;

            if (currency === 'NZD') await User.findByIdAndUpdate({ _id: _id }, { availableBalanceNZD: availableBalanceNZD + confirmAmount * (availableBalanceNZD / totalAmount) })
            if (currency === 'USD') await User.findByIdAndUpdate({ _id: _id }, { availableBalanceUSD: availableBalanceUSD + confirmAmount * (availableBalanceUSD / totalAmount) })
            if (currency === 'AUD') await User.findByIdAndUpdate({ _id: _id }, { availableBalanceAUD: availableBalanceAUD + confirmAmount * (availableBalanceAUD / totalAmount) })
            let general = {}
            if (currency === 'NZD') general = { currency, transactionNotes: _id, transactionDate: new Date().toISOString().split('T')[0], amount: confirmAmount * (availableBalanceNZD / totalAmount), transactionType: 'ACCRUED INTEREST' }
            if (currency === 'USD') general = { currency, transactionNotes: _id, transactionDate: new Date().toISOString().split('T')[0], amount: confirmAmount * (availableBalanceUSD / totalAmount), transactionType: 'ACCRUED INTEREST' }
            if (currency === 'AUD') general = { currency, transactionNotes: _id, transactionDate: new Date().toISOString().split('T')[0], amount: confirmAmount * (availableBalanceAUD / totalAmount), transactionType: 'ACCRUED INTEREST' }
            
            const generalLedger = new GeneralLedger(general)
            await generalLedger.save((err) => {
                if (err) return res.status(400).json({ success: false, err })
            })
        })
        return res.status(200).json({ success: true, message: "Interest Rate is updated" });
    }
}
