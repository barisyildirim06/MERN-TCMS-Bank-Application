const { Subscriber } = require("../models/Subscriber");

module.exports = {
    subscriberCreate(req, res) {

        //save all the data we got from the client into the DB 
        const subscriber = new Subscriber(req.body)

        subscriber.save((err) => {
            if (err) return res.status(400).json({ success: false, err })
            return res.status(200).json({ success: true })
        })

    },
    subscriberList(req, res){
        if (!req.user.isAdmin) return res.status(400).json({ success: false, message: "You don't have access" })
        Subscriber.find()
        .then(subscribers => res.json(subscribers))
        .catch(err => res.status(400).json('Error: ' + err));
    } 
}
