const userSeed = require('./userSeed.json');
const projectSeed = require('./projectSeed.json');
const db = require('../config/connection');
const { Project, User } = require('../models');

db.once('open', async () => {
  try {
    await Project.deleteMany({});
    await User.deleteMany({});

    await User.create(userSeed);

    for (let i = 0; i < projectSeed.length; i++) {
      const { _id, projectAuthor } = await Project.create(projectSeed[i]);
      const user = await User.findOneAndUpdate(
        { createdBy: projectAuthor },
        {
          $addToSet: {
            projects: _id,
          },
        }
      );
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
});
