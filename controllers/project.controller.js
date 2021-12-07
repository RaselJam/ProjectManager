import projectModel from '../models/Project.model.js';

//Basic Crud :
export const createProject = (project) => {
  return projectModel.create(project);
}

export const getProjectById = (id) => {
  return projectModel.findOne({ _id: id });
}

export const getProjectByFilter = (filter) => {
  return projectModel.find(filter);
}

export const getAllProject = () => {
  return projectModel.find()
}

export const getCreatorProjects = (userId) => {
  return projectModel.find({ creator: userId })
}

export const getDeveloperProjects = (developerId) => {
  return projectModel.find({ developers: developerId })
}

export const getManagerProjects = (managerId) => {
  return projectModel.find({ managers: managerId })
}

export const updateProject = (id, project) => {
  return projectModel.findByIdAndUpdate(id, project, { new: true })
}
//more specific commands :
export const addDevToProject = (creatorId, projectId, developerId) => {

  return projectModel.findOneAndUpdate(
    { _id: projectId, creator: creatorId },
    { $push: { "developers": developerId } }, { new: true })
}

export const addManagerToProject = (creatorId, projectId, managerId) => {
  return projectModel.findOneAndUpdate({ _id: projectId, creator: creatorId }, { $push: { "managers": managerId } }, { new: true })
}

