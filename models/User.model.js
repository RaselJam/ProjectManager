import mongoose from 'mongoose';
const userSchema = mongoose.Schema({
  userName: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minLength: 5
  },
  isSuper: { type: Boolean, default: false }

}, { timestamps: true })
var User = mongoose.model('User', userSchema);

export default User;