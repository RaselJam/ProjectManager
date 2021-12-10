import mongoose from 'mongoose';
const commentSchema = mongoose.Schema({
  comment: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  user: { type: mongoose.SchemaTypes.ObjectId, ref: "User", required: true },
  ticket: { type: mongoose.SchemaTypes.ObjectId, ref: "Ticket", required: true },

}, { timestamps: true })
var Comment = mongoose.model('Comment', commentSchema);

export default Comment;