import express from 'express';
import { Request, Response, Application } from 'express';
import puppiesArr from './puppies';
const cors = require('cors')
// import cors from 'cors'

const app: Application = express();
app.use(express.json());
app.use(cors({credentials: true}))

interface PupiesInformation {
  id: string;
  breed: string;
  name: string;
  birthdate: string;
}
const nextId = (puppiesArr: PupiesInformation []) => {
  const highID = puppiesArr.length + 1;
  return highID.toString();
}
app.get('/api/test', (_req: Request, res: Response) => {
  return res.status(200).json({ test: 'is working as it should' });
});

app.get('/api/puppies', (_req: Request, res: Response) => {
  return res.status(200).json(puppiesArr);
});

app.get('/api/puppies/:id', (req: Request, res: Response) => {
  const id= req.params.id;
  const puppy = puppiesArr.find((p) => p.id === id);
  return res.status(200).json(puppy);
});

app.post('/api/puppies', (req: Request, res: Response) => {
  const id = nextId(puppiesArr);

  const puppy: PupiesInformation = req.body;
  const newPuppy = {...puppy, id};
  puppiesArr.push(newPuppy);
  return res.status(201).json(newPuppy);
});

app.put('/api/puppies/:id', (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedPuppy = puppiesArr.find((p) => p.id === id);
  if (updatedPuppy) {
    const { id, breed, name, birthdate } = req.body;
    updatedPuppy.name = name;
    updatedPuppy.id = id;
    updatedPuppy.breed = breed;
    updatedPuppy.birthdate = birthdate;
  }
  return res.status(201).json(updatedPuppy);
});

app.delete('/api/puppies/:id', (req: Request, res: Response) => {
  const id = req.params.id;

  const deletedPuppy = puppiesArr.find((p) => p.id === id);
  if (deletedPuppy) {
    const index = puppiesArr.indexOf(deletedPuppy);
    puppiesArr.splice(index, 1);
  }
  console.log(deletedPuppy, 'deleted puppy');
  return res.status(204).json({ "message": "Puppy is gone" });
});

export default app;
