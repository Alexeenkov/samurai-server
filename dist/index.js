"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const PORT = 3003;
const jsonBodyMiddleware = express_1.default.json();
app.use(jsonBodyMiddleware);
const HTTP_STATUSES = {
    CREATED: 201,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
};
const db = {
    samurai: [
        { id: 1, name: 'Chi-Cho', age: 23 },
        { id: 2, name: 'Uagh-jo', age: 34 },
        { id: 3, name: 'Pli-hui', age: 56 },
    ],
};
app.get('/', (req, res) => {
    res.send('Home');
});
app.get('/samurai', (req, res) => {
    res.json(db.samurai);
});
app.get('/samurai/:id', (req, res) => {
    const foundSamurai = db.samurai.find((it) => it.id === +req.params.id);
    if (!foundSamurai) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND);
        return;
    }
    res.json(foundSamurai);
});
app.post('/samurai', (req, res) => {
    if (!req.body.name || !req.body.age) {
        res.sendStatus(HTTP_STATUSES.BAD_REQUEST);
        return;
    }
    const newSamurai = {
        id: new Date().getTime(),
        name: req.body.name,
        age: req.body.age,
    };
    db.samurai.push(newSamurai);
    res.status(HTTP_STATUSES.CREATED).json(newSamurai);
});
app.delete('/samurai/:id', (req, res) => {
    const lengthOld = db.samurai.length;
    db.samurai = db.samurai.filter((it) => it.id !== +req.params.id);
    if (db.samurai.length === lengthOld) {
        res.status(HTTP_STATUSES.NOT_FOUND).json(`Samurai ${req.params.id} does not exist`);
        return;
    }
    res.json(`Samurai ${req.params.id} successfully removed`);
});
app.put('/samurai/:id', (req, res) => {
    if (!req.body.name || !req.body.age) {
        res.sendStatus(HTTP_STATUSES.BAD_REQUEST);
        return;
    }
    const foundSamuraiIndex = db.samurai.findIndex((it) => it.id === +req.params.id);
    if (foundSamuraiIndex < 0) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND);
        return;
    }
    db.samurai[foundSamuraiIndex] = {
        id: +req.params.id,
        name: req.body.name,
        age: req.body.age,
    };
    res.json(db.samurai[foundSamuraiIndex]);
});
app.listen(PORT, () => {
    console.log(`listening port: ${3003}`);
});
