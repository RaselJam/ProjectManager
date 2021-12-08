import commentModel from '../models/Comment.model.js';



export const addComment = (comment) => {
  return commentModel.create(comment)
}

export const updateComment = (comment) => {
  const id = comment._id;
  //removing _id property to avoid accidental changing it
  delete comment._id;
  return commentModel.findByIdAndUpdate(id, comment, { new: true })
}
export const removeComment = (id) => {
  return commentModel.findByIdAndDelete(id);
}

//Reading :
export const getTicketComments = (ticketId) => {
  return commentModel.find({ ticket: ticketId }).populate('Ticket');
}

export const getCommentByUser = (userId) => {
  return commentModel.find({ user: userId })
}