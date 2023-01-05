const { Schema, model } = require('mongoose');

const projectSchema = new Schema({
  projectTitle: {
    type: String,
    required: 'You need to give this project a name!',
    minlength: 1,
    maxlength: 100,
  },
  organizationName: {
    type: String,
    required: 'You need to give the organization name!',
    minlength: 1,
    maxlength: 100,
  },
  projectCategory: {
    type: String,
    required: true,
  },
  projectDescription: {
    type: String,
    required: 'You need to give a description!',
    minlength: 1,
    maxlength: 500,
  },
  projectGoal: {
    type: Number,
    required: 'You need to provide an amount!',
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  createdBy: {
    type: String,
    required: true,
  },
});

const Project = model('Project', projectSchema);

module.exports = Project;
