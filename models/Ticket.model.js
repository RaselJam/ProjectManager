import mongoose from 'mongoose';
const ticketSchema = mongoose.Schema({
  number: {
    type: String,
    unique: true
  },

  description: String,
  project: { type: mongoose.SchemaTypes.ObjectId, ref: "Project" },
  // subTasks: { type: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Task" }], default: [] },
  isDone: { type: Boolean, default: false },
  creator: { type: mongoose.SchemaTypes.ObjectId, ref: "User", required: true, },
  developer: { type: mongoose.SchemaTypes.ObjectId, ref: "User", default: null },
  Predecessor: { type: mongoose.SchemaTypes.ObjectId, ref: "Ticket", default: undefined }
})
var Ticket = mongoose.model('Ticket', ticketSchema);

export default Ticket;