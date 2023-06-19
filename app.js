const express = require('express');
const cors = require('cors');
const app = express();
const routes = require("./src/routes");

app.use(express.json());
app.use(cors({ origin: '*' }));
app.use(routes);

app.use('/uploads', express.static('uploads'));

app.listen(3333, () => {
    console.log('Server is running on port 3333');
});
