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
  isSuper: { type: Boolean, default: false },
  img: { type: String, default: 'https://thumbs.dreamstime.com/b/default-avatar-profile-flat-icon-vector-contact-symbol-illustration-184752213.jpg' }
}, { timestamps: true })
var User = mongoose.model('User', userSchema);

export default User;