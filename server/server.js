const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const fs = require('fs');

const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // 'uploads/' is the directory where uploaded files will be stored


require('dotenv').config();

const { typeDefs, resolvers } = require('./schemas');

const { authMiddleware } = require('./utils/auth');

const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());


// Serve up static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

app.post('/image-upload', upload.single('image'), (req, res) => {

  // req.file contains information about the uploaded file
  const filename = req.file.filename;
  const destination = req.file.destination;
  let type = '';

  //photo type png vs jpeg
  if (req.file.mimetype != 'image/jpeg' && req.file.mimetype != 'image/png' && req.file.mimetype != 'image/jpg') {
    res.status(400).send('Uplaod must be an image.');
  }

  if (req.file.mimetype == 'image/jpeg') {
    type = 'jpeg';
  }
  else if (req.file.mimetype == 'image/png') {
    type = 'png';
  }
  else {
    type = 'jpg';
  }

  let path = `${destination}/${filename}.${type}`;

  // move the file from the temporary location to its new location
  fs.rename(req.file.path, path, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error uploading file');
    } else {
      res.send('File uploaded successfully');
    }
  });

});

const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  server.applyMiddleware({ app });

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(
        `Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`
      );
    });
  });
};

startApolloServer(typeDefs, resolvers);
