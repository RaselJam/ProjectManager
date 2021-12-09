import ticketModel from '../models/Ticket.model.js'
import taskModel from '../models/Task.model.js'
import { removeCommentsByFilter } from './comment.controller.js';


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
 *It will try t remove all sub Task and Comments related to  each ticket too
 * @param {project Id} projectId
 * @returns an array result of all promisses
 */
export const removeThisProjectTickets = async (projectId) => {
  let tickets = await ticketModel.find({ project: projectId })
  return Promise.all(tickets.map(tikect => removeTikcet(tikect._id)))
}
export const removeTikcet = (id) => {
  return Promise.all([
    ticketModel.findOneAndDelete(id),
    removeTasksByFilter({ ticket: id }),
    removeCommentsByFilter({ ticket: id })
  ])
}
/**
 *It checks a given tikcetId's tasks, if all tasks are done,asigenTrueto IsDoneKey of Ticket
 It will return true/false if the whole tikcet is done ot not
 */
export const checkTasksStatusAndUpdateTicket = async (ticketId) => {
  try {
    console.log("Doing the Tikcet if all tasks are done")
    let tasks = await taskModel.find({ ticket: ticketId })
    const isDone = tasks.every(t => t.isDone)
    await ticketModel.findByIdAndUpdate(ticketId, { isDone: isDone }, { new: true })
    return isDone;
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

export const removeTasksByFilter = (filter) => {
  return taskModel.deleteMany(filter);
}
//ok:
export const doTask = (subTaskId) => {
  return taskModel.findOneAndUpdate({ _id: subTaskId }, { isDone: true }, { new: true })
}
//TODO Test me
export const unDoTask = (subTaskId) => {
  return taskModel.findOneAndUpdate({ _id: subTaskId }, { isDone: false }, { new: true })
}

export const getTikcetTasks = (ticketId) => {
  return taskModel.find({ ticket: ticketId });
}
