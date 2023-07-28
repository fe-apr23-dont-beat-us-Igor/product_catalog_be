import express from "express";

const PORT = 5000;

const App = express();

App.use((request, response) => {
  response.send('App answer')
})

App.listen(PORT, () => {
  console.log(`API is ready on http://localhost:${PORT}`);
  })