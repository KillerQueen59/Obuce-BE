const { Router } = require('express')
const controller = require('../controller/food')
const { validateBody, schemas } = require('../validation/food')
const { auth } = require('../middleware')
const { handler } = require('../helper')
const multer = require('multer')
const path = require('path');

const diskStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../uploads/foods"));
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(
            null,
            file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
        );
    },
});

const imageLimits = {
    fileSize: 8388608,
}

const route = Router()

exports.foodRoute = (app) => {
    app.use('/food', route)

    route.get('/', handler.Catcher(controller.index))
    route.post('/', validateBody(schemas.create), handler.Catcher(controller.create))
    route.put('/:id', validateBody(schemas.create), handler.Catcher(controller.update))
    route.delete('/:id', handler.Catcher(controller.delete))

    route.post('/upload', auth(), multer({ storage: diskStorage, limits: imageLimits }).single('image'), handler.Catcher(controller.detect))
}