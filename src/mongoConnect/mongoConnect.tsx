import mongoose from 'mongoose';

const dbConnect = async ()=>{
    await mongoose.connect('mongodb+srv://farazayaz:azsxdc1234@cluster0.iewyyzg.mongodb.net/Logistic?retryWrites=true&w=majority')
}

dbConnect().then(()=>console.log("Mongo connected")).catch((err)=>console.log(err))

export default dbConnect