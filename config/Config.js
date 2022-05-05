const mongoose = require('mongoose')

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URI, {
                useUnifiedTopology : true, 
                useNewUrlParser : true,
            }
        )
    } catch(error) {
        console.error(error.message)
        process.exit(1)
    }
}

module.exports = connectDb
