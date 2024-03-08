const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    image:{
        type: String,
        default: 'Profile-Transparent.png'
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
    },
    rating: {
        type: Number,
        default: 0
    },
    ratingPoints: {
        type: Number,
        default: 0
    },
    verified: {
        type: Boolean,
        default: false
    },
    banned: {
        type: Boolean,
        default: false
    },
    archived: {
        type: Boolean,
        default: false
    },
    identification: {
        idType: { type: String, default: null },
        front: { type: String, default: null },
        back: { type: String, default: null },
    },
    region: {
        code: { trim: true, type: String },
        name: { trim: true, type: String },
      },
      province: {
          code: { trim: true, type: String },
          name: { trim: true, type: String },
        },
      city: {
          code: { trim: true, type: String },
          name: { trim: true, type: String },
        },
      barangay: {
          code: { trim: true, type: String },
          name: { trim: true, type: String },
        },
      
      
  
},{timestamps: true}
);

module.exports = mongoose.model('User', userSchema)