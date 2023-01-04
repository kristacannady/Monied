const { Schema, model } = require("mongoose");

const projectSchema = new Schema({
  // TODO - update from user schema base model to Project model schema in project proposal
  // firstName: {
  //   type: String,
  //   required: true,
  //   trim: true
  // },
  // lastName: {
  //   type: String,
  //   required: true,
  //   trim: true
  // },
  // email: {
  //   type: String,
  //   required: true,
  //   unique: true
  // },
  // password: {
  //   type: String,
  //   required: true,
  //   minlength: 7
  // },
});

const Project = model("Project", projectSchema);

module.exports = Project;
