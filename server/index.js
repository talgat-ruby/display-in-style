import express from 'express';

const app = express();
const PORT = 3000;

app.use(express.static(`${__dirname}/../src`));

app.listen(PORT, () => console.log('App is running'));