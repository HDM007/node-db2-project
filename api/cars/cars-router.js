// DO YOUR MAGIC
const router = require('express').Router();
const { getAll, create } = require('./cars-model');
const { checkCarId, checkCarPayload, checkVinNumberValid, checkVinNumberUnique } = require('./cars-middleware');

router.get('/', (req, res, next) => {
    getAll()
    .then(cars => {
            res.status(200).json(cars);
        })
        .catch(err => {
            next(err);
        });
});

router.get('/:id', checkCarId, (req, res) => {
    res.status(200).json(req.car);
})

router.post('/', checkCarPayload, checkVinNumberValid, checkVinNumberUnique, (req, res, next) => {
    create(req.body)
        .then(newCar => {
            res.status(201).json(newCar);
        })
        .catch(err => {
            next(err);
        });
});


//es-lint disable needs to be pasted below

router.use((err, req, res, next) => { // eslint-disable-line
    res.status(500).json({
        message: 'Something went wrong inside car router.',
        errMessage: err.message,
    });
});

module.exports = router;