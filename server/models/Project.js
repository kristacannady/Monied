const { Schema, model } = require("mongoose");

const projectSchema = new Schema({
  // TODO - update from user schema base model to Project model schema in project proposal
  projectTitle: {
    type: String,
    required: "You need to give this project a name!",
    minlength: 1,
    maxlength: 100,
  },
  organizationName: {
    type: String,
    required: "You need to give the organization's name!",
    minlength: 1,
    maxlength: 100,
  },
  projectCategory: {
    type: String,
    required: true,
  },
  projectDescription: {
    type: String,
    required: "You need to give a description!",
    minlength: 1,
    maxlength: 500,
  },
  projectGoal: {
    type: Int,
    required: "You need to provide an amount!",
  },
});

const Project = model("Project", projectSchema);

module.exports = Project;
