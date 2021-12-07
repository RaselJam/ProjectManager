import mongoose from 'mongoose';
const taskSchema = mongoose.Schema({
  name: {
    type: String,
  },
  description: String,
  isDone: { type: Boolean, default: false },
  ticket: { type: mongoose.SchemaTypes.ObjectId, ref: "Ticket", required: true },
})
var Task = mongoose.model('Task', taskSchema);

export default Task;