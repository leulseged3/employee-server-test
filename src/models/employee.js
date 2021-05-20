import mongoose from 'mongoose'

const schema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    name:String,
    date_birth: Date,
    gender:{ 
        type: String, 
        enum : ['m','f']
    },
    salary: Number
})

export const Employee = mongoose.model('Employee',schema)