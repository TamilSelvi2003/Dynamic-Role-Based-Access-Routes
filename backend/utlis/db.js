import mongoose from "mongoose";


const DbCon=async()=>{
    try {
       await mongoose.connect('mongodb+srv://nisha_31:DtGpoQjL6Qsogk7S@cluster0.tfd5b.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
       console.log('mongo db is connected')
    } catch (error) {
        console.log(error)
    }
}


export default DbCon