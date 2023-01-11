const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://sfhill24:4GqgwW5yUVGxfER6@cluster0.tkuf7s1.mongodb.net/monied_2023?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = mongoose.connection;