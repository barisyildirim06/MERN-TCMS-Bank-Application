const { InterestRate } = require("../models/InterestRate");

module.exports = {
    interestrateCreate(req, res) {

        //save all the data we got from the client into the DB 
        const interestrate = new InterestRate(req.body)

        interestrate.save((err) => {
            if (err) return res.status(400).json({ success: false, err })
            return res.status(200).json({ success: true })
        })

    },
    interestrateList(req, res){
        if (!req.user.isAdmin) return res.status(400).json({ success: false, message: "You don't have access" })
        InterestRate.find()
        .then(interestrates => res.json(interestrates))
        .catch(err => res.status(400).json('Error: ' + err));
    } 
}
