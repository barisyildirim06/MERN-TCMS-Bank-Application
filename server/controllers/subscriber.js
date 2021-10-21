const { Subscriber } = require("../models/Subscriber");

module.exports = {
    async subscriberCreate(req, res) {
        const previousSubscriber = await Subscriber.find({ email: req.body.email })
        if (previousSubscriber.length) return res.status(200).json({ success: false, message: 'The email is already saved' })

        const subscriber = new Subscriber(req.body)

        subscriber.save((err) => {
            if (err) return res.status(200).json({ success: false, message: 'A problem occurred during your sending process' })
            return res.status(200).json({ success: true, message: 'Your email is successfully saved' })
        })

    },
    subscriberList(req, res){
        if (!req.user.isAdmin) return res.status(400).json({ success: false, message: "You don't have access" })


        Subscriber.find()
        .then(subscribers => {
            const sevenDaysUnix = new Date().setDate((new Date()).getDate() - 7);
            const oneDayUnix = new Date().setDate((new Date()).getDate() - 1);
            const allTimeCount = subscribers.length;
            const sevenDaysCount = subscribers.filter(g => new Date(g.createdAt).valueOf() > sevenDaysUnix).length
            const oneDayCount = subscribers.filter(g => new Date(g.createdAt).valueOf() > oneDayUnix).length
            return res.json({ subscribers, allTimeCount, sevenDaysCount, oneDayCount });
        })
        .catch(err => res.status(400).json('Error: ' + err));
    } 
}
