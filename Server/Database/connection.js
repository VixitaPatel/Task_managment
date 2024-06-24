const mongoose = require('mongoose');
const connectDB = async () => {
    try {
        const con = await mongoose.connect("mongodb+srv://vixitabhalodiya:9reIE2MK5dNUrX9T@cluster0.komdgte.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
            useNewUrlParser: true,
            useUnifiedTopology : true,
            // useFindAndModify : false,
            // // useCreateIndex : true,
        })
        console.log(`MongoDB Connected : ${con.connection.host}`);
    }
    catch (err) {
        console.log("errorrrr");
        console.error('MongoDB Connection Error:', err);
        // process.exit(1);
    }
}
module.exports = connectDB
