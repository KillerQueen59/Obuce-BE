const mongoose = require('mongoose')

module.exports = async function () {
    try {
        await mongoose.connect(process.env.MONGOOSE_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
    } catch (err) {
        throw new Error(err)
    }
}
