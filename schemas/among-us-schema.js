const mongoose = require('mongoose')

const reqString = {
    type: String,
    Required: true
}

const amongUsSchema = mongoose.Schema({
    _id: reqString,
    categoryId: reqString
})

module.exports = mongoose.model('among-us', amongUsSchema)