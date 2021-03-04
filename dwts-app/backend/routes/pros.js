const router = require('express').Router();
let Pro = require('../models/pro.model');

router.route('/').get((req, res) => {
    Pro.find()
        .then(pros => res.json(pros))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const name = req.body.name;
    const seasonsAsPro = Number(req.body.seasonsAsPro);
    const seasonsOnTroupe = Number(req.body.seasonsOnTroupe);

    const newPro = new Pro({
        name,
        seasonsAsPro,
        seasonsOnTroupe,
    });

    newPro.save()
        .then(() => res.json('Pro added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;