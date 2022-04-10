const mongoose = require('mongoose');

const connectDB = async () => {
    try{
        await mongoose.connect('mongodb+srv://admin:admin@cluster0.mwsuz.mongodb.net/hmDB?retryWrites=true&w=majority', {
            useUnifiedTopology: true,
        });
        
    } catch (err){
        console.error(err);
    }
}

module.exports = connectDB;