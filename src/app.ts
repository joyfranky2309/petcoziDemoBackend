import express, { Application } from 'express';
const app: Application = express();
const PORT = 4000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send("Hello I'm a server");
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});