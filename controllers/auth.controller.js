import UserModel from '../models/User.model.js';

export const signup =  (user) => {
  console.log("signing up:",user)
  const res = UserModel.create(user)
  return res;
}

export const login =  (user) => {
  console.log("loging in ",user)
  const res = UserModel.findOne(user)
  return res;
}