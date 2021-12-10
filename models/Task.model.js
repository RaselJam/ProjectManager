import mongoose from 'mongoose';
const taskSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 20

  },
  description: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  isDone: { type: Boolean, default: false },
  ticket: { type: mongoose.SchemaTypes.ObjectId, ref: "Ticket", required: true },
}, { timestamps: true })
var Task = mongoose.model('Task', taskSchema);

export default Task;