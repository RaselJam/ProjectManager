import ticketModel from '../models/Ticket.model.js'
import taskmodel from '../models/Task.model.js'

//only super admin will hav access to this:
export const getAllticket = () => {
  return ticketModel.find();
}

export const getThisProjectTickets = (projectId) => {
  return ticketModel.find({ _id: projectId })
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
  return ticketModel.create(ticket)
}

export const takeThisTikcet = (userId, ticketId) => {
  return ticketModel.findOneAndUpdate({ _id: ticketId, developer: userId })
}

export const updateTicket = (ticketId, ticket) => {
  return ticketModel.findByIdAndUpdate(ticketId, ticket);
}

//Task part :
export const addTask = (task) => {
  const ticketId = task.tikcet
  return Promise.all([
    taskmodel.create(task, { new: true }),
    ticketModel.findByIdAndUpdate(ticketId, { isDone: false }, { new: true })
  ]);
}
//TODO testme
export const doTask = (subTaskId) => {
  return taskmodel.findOneAndUpdate({ _id: subTaskId }, { isDone: true }, { new: true })
}
export const unDoTask = (subTaskId) => {
  return taskmodel.findOneAndUpdate({ _id: subTaskId }, { isDone: false }, { new: true })
}

