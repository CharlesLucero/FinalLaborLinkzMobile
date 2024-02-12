const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    image:{
        type: String,
    },
    firstName:{
        type: String,
        required: [true, 'please add firstname'],
        trim: true,
    },
    lastName:{
        type: String,
        required: [true, 'please add lastName'],
        trim: true,
    },
    contactNumber:{
        type: String,
        required: [true, 'please add contactNumber'],
        trim: true,
    },
    gender:{
        type: String,
        required: [true, 'please add gender'],
        trim: true,
    },
    location:{
        type: String,
        required: [true, 'please add location'],
        trim: true,
    },
    email:{
        type: String,
        required: [true, 'please add email'],
        trim: true,
        unique: true,
    },
    password:{
        type: String,
        required: [true, 'please add password'],
        trim: true,
    },
    role:{
        type: String,
        default: 'user'
    },
    profileImage:{
        type: String,
        required: true
    },
    friendRequests:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ],
    friends:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ],
    sentFriendRequests:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ]

    

},{timestamps: true}
);

module.exports = mongoose.model('User', userSchema)