"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const puppies_1 = __importDefault(require("./puppies"));
const cors = require('cors');
// import cors from 'cors'
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(cors({ credentials: true }));
const nextId = (puppiesArr) => {
    const highID = puppiesArr.length + 1;
    return highID.toString();
};
app.get('/api/test', (_req, res) => {
    return res.status(200).json({ test: 'is working as it should' });
});
app.get('/api/puppies', (_req, res) => {
    return res.status(200).json(puppies_1.default);
});
app.get('/api/puppies/:id', (req, res) => {
    const id = req.params.id;
    const puppy = puppies_1.default.find((p) => p.id === id);
    return res.status(200).json(puppy);
});
app.post('/api/puppies', (req, res) => {
    const id = nextId(puppies_1.default);
    const puppy = req.body;
    const newPuppy = { ...puppy, id };
    puppies_1.default.push(newPuppy);
    return res.status(201).json(newPuppy);
});
app.put('/api/puppies/:id', (req, res) => {
    const id = req.params.id;
    const updatedPuppy = puppies_1.default.find((p) => p.id === id);
    if (updatedPuppy) {
        const { id, breed, name, birthdate } = req.body;
        updatedPuppy.name = name;
        updatedPuppy.id = id;
        updatedPuppy.breed = breed;
        updatedPuppy.birthdate = birthdate;
    }
    return res.status(201).json(updatedPuppy);
});
app.delete('/api/puppies/:id', (req, res) => {
    const id = req.params.id;
    const deletedPuppy = puppies_1.default.find((p) => p.id === id);
    if (deletedPuppy) {
        const index = puppies_1.default.indexOf(deletedPuppy);
        puppies_1.default.splice(index, 1);
    }
    console.log(deletedPuppy, 'deleted puppy');
    return res.status(204).json({ "message": "Puppy is gone" });
});
exports.default = app;
//# sourceMappingURL=app.js.map