import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import { addDummyData } from './dbDummyData';
import { User } from './models/user';
import { UserType } from './/models/userType';

const PORT = 4000;

const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/job_fair');

const connection = mongoose.connection;
connection.on('open', () => {
  console.log('mongo open');
  addDummyData();
})
connection.on('error', (err) => {
  console.log(err);
})

const router = express.Router();

export interface ApiResponse {
  status: string;
  message: string;
  data: any;
}

function handleError(err: Error, res: express.Response) {
  if (err) {
    const body: ApiResponse = {
      status: 'error',
      message: 'unhandled error',
      data: null,
    }
    console.log(err);
    res.json(body);
    return true;
  }
  return false;
}

router.route('/login').post((req, res) => {
  const body: ApiResponse = {
    status: 'error',
    message: '',
    data: null,
  };
  User.findOne({ username: req.body.username }, (err, user) => {
    if (handleError(err, res)) { return; }
    if (user == null) {
      body.status = 'error';
      body.message = 'Unknown username';
    } else {
      if (user['password'] !== req.body.password) {
        body.status = 'error';
        body.message = 'Wrong password';
      } else {
        UserType.findById( user['type'], (err, userType) => {
          if (handleError(err, res)) { return; }
          body.status = userType['name'];
          body.message = '';
          body.data = user;
          res.json(body);
        });
        return;
      }
    }
  
    res.json(body);
  });
});

app.use('/', router);
app.listen(PORT, () => console.log('Express running on port ' + PORT));
