const mongoose = require('mongoose')
// const { MongoPath } = require('./config.json')

const MongoPath = 'mongodb+srv://DoubtBotUser:DoubtBotPass@cluster0.3rjf4.mongodb.net/Data?retryWrites=true&w=majority'

module.exports = async () => {
  await mongoose.connect(MongoPath, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  return mongoose
}