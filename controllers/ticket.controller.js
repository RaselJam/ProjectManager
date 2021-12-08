import ticketModel from '../models/Ticket.model.js'
import taskModel from '../models/Task.model.js'


export const getAllticket = () => {
  return ticketModel.find();
}

export const getThisProjectTickets = (projectId) => {
  return ticketModel.find({ project: projectId }).populate('developer').populate('creator')
}
export const getallUserTickets = (userId) => {
  return ticketModel.find({ developer: userId })
}

export const getCreatorTickets = (creatorrId) => {
  return ticketModel.find({ creator: creatorrId })
}

export const getTicketById = (tikectId) => {
  return ticketModel.findById(tikectId);

}
///
//Creating :
export const createTicket = (ticket) => {
  console.log("creating Tikcet", ticket)
  return ticketModel.create(ticket)
}

export const takeThisTikcet = (userId, ticketId) => {
  console.log("taking ticket by user and ticket: ", userId, ticketId)
  return ticketModel.findOneAndUpdate({ _id: ticketId }, { developer: userId }, { new: true })
}

export const updateTicket = (ticketId, ticket) => {
  return ticketModel.findByIdAndUpdate(ticketId, ticket);
}
/**
 *It checks a given tikcetId's tasks, if all tasks are done,asigenTrueto IsDoneKey of Ticket
 */
export const checkTasksStatusAndUpdateTicket = async (ticketId) => {
  try {
    let isDone = await taskModel.find({ ticket: ticketId }).every(elm => elm.isDone)
    console.log("Checking if it`s Done : ", isDone)
    return ticketModel.findByIdAndUpdate(ticketId, { isDone: isDone }, { new: true })
  } catch (error) {
    throw error;
  }
}
//Task part :
export const addTask = (task) => {
  const ticketId = task.ticket
  return Promise.all([
    taskModel.create(task),
    ticketModel.findOneAndUpdate({ _id: ticketId }, { isDone: false }, { new: true })
  ]);
}

export const removeTask = (taskId) => {
  return taskModel.findByIdAndDelete(taskId)
}
//TODO testme
export const doTask = (subTaskId) => {
  return taskModel.findOneAndUpdate({ _id: subTaskId }, { isDone: true }, { new: true })
}
export const unDoTask = (subTaskId) => {
  return taskModel.findOneAndUpdate({ _id: subTaskId }, { isDone: false }, { new: true })
}

