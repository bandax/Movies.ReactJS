const server = require('./app');

const port = process.env.PORT || 8000;

server.listen(port, () => {
  console.info(`Express listening on port ${port}`); // eslint-disable-line
});
