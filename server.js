const express = require('express');
const PORT = process.env.PORT || 3006;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Test Route
app.get('/', (req, res) => {
    res.json({
      message: 'Hello World'
    });
  });
  

//Start Express
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
  