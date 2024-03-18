const mongoose = require('mongoose')

const connectDB = async () =>{
    try {
        await mongoose.connect(process.env.MONGO_URL,{
            useUnifiedTopology: true,
			useNewUrlParser: true,
			useCreateIndex: true,
        }).then(()=>{
            console.log('connect db');
        })
    } catch (error) {
        
    }
}

module.exports = connectDB