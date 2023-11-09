const mongoose = require('mongoose');

const userModel =  mongoose.Schema({
      name: {
            type: String,
            required: [true, "name field is required. please fill the name field!"]
        },
        email: {
            type: String,
            required: [true, "email field is required. please fill the email field!"],
            unique: true,
        },
        password :{
            type: String,
            required: [true, "email field is required. please fill the email field!"]
      },
        nameToken: {
            type: [String],
            default: []
        },

        roll_no: String,
        batch: String,
        semester: String,

        gender:{
            type: String,
            enum: ['male','female'],
            default: 'male'
        },

        img_pri: String,
        img_sec: String,
        phoneNumber: Number,

        isVerified:{
            type: Boolean,
            default: false
        },
        VerifiedByAdmin:{
            type: Boolean,
            default: false
        },
        blocked: {
            type: Boolean,
            default: false
        },
        posts:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'posts'
        },

        website: String,
        location: String,
        bio: String,
        currently_pursuing: String,
        DOB: Date,

        type: {
            type: String,
            enum: ['student','alumni','admin','superAdmin']
        },

        roles: {
          manageUsers: {
              type: Boolean,
              default: false
          },
          managaPosts:{
              type: Boolean,
              default: false
          },
          manageRepoets:{
              type: Boolean,
              default: false
          },
        },
        friendRequestSend :[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users' 
        }
      ],
        friendRequestRecieved:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users'
        }
      ],
        friends: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users'
        }
      ],
        pushToken: String,
          
      
        forgotPasswordToken: String,
        forgotPasswordTokenExpiry: Date,
        verifyToken: String,
        verifyTokenExpiry: Date,
    });

const User = mongoose.model('users', userModel);
module.exports = User;