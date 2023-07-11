const mongoose = require('mongoose');

PostSchema = mongoose.Schema({
    postText :{
        type:String,
    },
    createdBy :{
        type:mongoose.Schema.ObjectId,
        ref:"User"

    },
  

    photos:[{
        filename :{
            type:String,
        },
        filePath:{
            type:String
        }
        
    }],likes:[{
        type:mongoose.Schema.ObjectId,
        ref:"User"

    
    }],
    comment :[{
        commentText:{
            type:String,

        },
        commentedBy:{
            type:mongoose.Schema.ObjectId,
            ref:"User"
        }

    }],

})
module.exports =  mongoose.model('Post',PostSchema);