const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const options = {
  bufferTimeoutMS: 30000, // Increase the timeout to 30 seconds
};

UserSchema = mongoose.Schema({
    userName:{
        type: 'string',
        unique: true,
        required: true
    },
    email:{
        type: 'string',
        unique: true,
        required: true
    },
    date:{
        type:Date,
        default: Date.now()


    },
    password:{
        type:'string',
        required: true


    },
    about:{
      type:'string',
      trim:true,
      
    },
    
      photo: {
        filename: {
          type: String,
          
        },
        filePath: {
          type: String,
      
        },
      },
      followers:[{type:mongoose.Schema.ObjectId,ref:"User"}],
      following:[{type:mongoose.Schema.ObjectId,ref:"User"}]


    
})
UserSchema.pre('save', async function(next) {
    try {
      if (!this.isModified('password')) {
        return next();
      }
  
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(this.password, salt);
      this.password = hashedPassword;
  
      return next();
    } catch (error) {
      return next(error);
    }
  });
  UserSchema.methods.comparePassword =  async function (maybePassword)
  {
  
    try{
   
    
         const a  =  await bcrypt.compare(maybePassword,this.password);
       
         return a; 
         
    }
    catch(error) {
        throw(error);
    }

  }
module.exports =  mongoose.model('User',UserSchema);