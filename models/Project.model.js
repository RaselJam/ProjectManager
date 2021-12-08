import mongoose from 'mongoose';
const projectSchema = mongoose.Schema({
  name: {
    type: String,
  },
  description: String,
  creator: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
  managers: { type: [{ type: mongoose.SchemaTypes.ObjectId, ref: "User" }], default: [] },
  developers: { type: [{ type: mongoose.SchemaTypes.ObjectId, ref: "User" }], default: [] }
},{ timestamps: true })
var Project = mongoose.model('Project', projectSchema);

export default Project;