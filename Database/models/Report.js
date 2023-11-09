const mongoose = required('mongoose');

const reportModel =  mongoose.Schema({
   by:{
     type: mongoose.Schema.Types.ObjectId,
     ref: 'users'
   },
   type:{
     type: String,
     enum: ["post","user","comment"]
   },
   referTo: String,
   reason:{
     type: String
   },
   status:{
     type: String,
     enum:["resolved","dismissed","inprocess"]
   }
});

const Report = mongoose.model('reports', reportModel);
module.exports = Report;