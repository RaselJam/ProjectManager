import commentModel from '../models/Comment.model.js';



export const createComment = (comment) => {
  return commentModel.create(comment)
}

export const updateComment = (comment) => {
  const id = comment._id;
  //removing _id property to avoid accidental changing it
  delete comment._id;
  return commentModel.findByIdAndUpdate(id, comment, { new: true })
}


//Reading :
export const getCommentsByTicket = (ticketId) => {
  return commentModel.find({ ticket: ticketId })
}

export const getCommentsByUser = (userId) => {
  return commentModel.find({ user: userId }).populate('user')
}

export const getCommentById = (id) => {
  return commentModel.findById(id);
}

//Deleting :
export const removeComment = (id) => {
  return commentModel.findByIdAndDelete(id);
}
export const removeCommentsByFilter = (filter) => {
  return commentModel.deleteMany(filter);
}