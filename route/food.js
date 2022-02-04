const { Router } = require('express')
const controller = require('../controller/food')
const { validateBody, schemas } = require('../validation/food')
const { auth } = require('../middleware')
const { handler } = require('../helper')
const multer = require('multer')
const path = require('path')

const getDiskStorage = (pathFolder = '../uploads') => {
    return multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, path.join(__dirname, pathFolder));
        },
        filename: function (req, file, cb) {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
            cb(
                null,
                file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
            );
        },
    });
}

const imageLimits = {
    fileSize: 8388608,
}

const route = Router()

exports.foodRoute = (app) => {
    app.use('/food', route)

    route.get('/', handler.Catcher(controller.index))
    route.post('/', validateBody(schemas.create), handler.Catcher(controller.create))
    route.post('/setThumbnail/:id', multer({ storage: getDiskStorage('../uploads/thumbnail/food'), limits: imageLimits }).single('thumbnail'), handler.Catcher(controller.setThumbnail))
    route.put('/:id', validateBody(schemas.create), handler.Catcher(controller.update))
    route.delete('/:id', handler.Catcher(controller.delete))

    route.post('/upload',
        // auth(),
        multer({ storage: getDiskStorage('../uploads/foods'), limits: imageLimits }).single('image'), handler.Catcher(controller.detect))
}