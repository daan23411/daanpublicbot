const mongoose = require('mongoose')
const { MongoPath } = require('./config.json')

module.exports = async () => {
    await mongoose.connect(MongoPath, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })
    return mongoose
}