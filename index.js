const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

app.get('/', async (req, res) => {
  try {
    const response = await axios.get('https://api.thecatapi.com/v1/breeds', {
      headers: {
        'x-api-key': 'YOUR_API_KEY_HERE'
      }
    });

    const breeds = response.data.filter(breed => {
      return breed.child_friendly >= 4 && breed.stranger_friendly >= 4 && breed.dog_friendly >= 4;
    }).sort((a, b) => b.child_friendly + b.stranger_friendly + b.dog_friendly - a.child_friendly - a.stranger_friendly - a.dog_friendly).slice(0, 5);

    res.send(breeds);
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred');
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
 });
// In this code, we're creating an Express app, defining a route for the root path, and making a request to the Cat API to get a list of all cat breeds. We're then filtering the breeds based on their child-friendliness, stranger-friendliness, and dog-friendliness, sorting them based on how well they score in those categories, and returning the top 5 results.

// Note that you'll need to replace YOUR_API_KEY_HERE with an actual API key from thecatapi.com. You can sign up for a free API key on their website.

// Start the server:
// Copy code
// node index.js
// Now, you should be able to visit http://localhost:3000 in your web browser or using a tool like Postman and see the top 5 cat breeds that are child-friendly, stranger-friendly, and dog-friendly.





