import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import { addDummyData } from './dbDummyData';
import { User } from './models/user';
import { UserType } from './/models/userType';
import { Industry } from './models/industry';

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

router.route('/change-pass').post((req, res) => {
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
        if (req.body.newPass1 !== req.body.newPass2) {
          body.status = 'error';
          body.message = 'New passwords not matching';
        } else {
          user['password'] = req.body.newPass2;
          user.save((err) => {
            if (handleError(err, res)) { return; }
              body.status = 'success';
              body.message = 'Password changed';
              res.json(body);
          });
          return;
        }
      }
    }
  
    res.json(body);
  });
});

router.route('/register').post((req, res) => {
  const body: ApiResponse = {
    status: 'error',
    message: '',
    data: null,
  };
  User.findOne({ username: req.body.username }, (err, user) => {
    if (handleError(err, res)) { return; }
    if (user != null) {
      body.status = 'error';
      body.message = 'Username teken';
    } else {
      if (req.body.newPass1 !== req.body.newPass2) {
        body.status = 'error';
        body.message = 'New passwords not matching';
      } else {
        const newUser = {
          username: req.body.username,
          password: req.body.newPass1,
          email: req.body.email,
          type: null,
          stu: null,
          com: null, 
          adm: null, 
        };

        const finalizeFunction = function() {
          new User(newUser).save((err: Error) => {
            if (handleError(err, res)) { return; }
              body.status = 'success';
              body.message = 'Account created';
              body.data = newUser;
              res.json(body);
          });
        }

        switch (req.body.type) {
          case 'student': 
            UserType.findOne({ name: 'student' }, '_id', (err, id) => {
              if (err) { console.log(err); return; }
              newUser.type = id._id,
              newUser.stu = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                phone: req.body.phone,
                year: req.body.year,
                graduated: req.body.graduated,
                applications: [],
              };
              finalizeFunction();
            });
            return;
          case 'company':
            UserType.findOne({ name: 'company' }, '_id', (err, userId) => {
              if (err) { console.log(err); return; }
              Industry.findOne({ name: req.body.industry }, '_id', (err, industryId) => {
                if (err) { console.log(err); return; }
                if (Industry === null) {
                  body.status = 'error';
                  body.message = 'unhandled error';
                } else {
                  newUser.type = userId._id,
                  newUser.com = {
                    name: req.body.companyName,
                    city: req.body.address,
                    director: req.body.director,
                    texNumber: req.body.taxNumber,
                    employees: req.body.employees,
                    website: req.body.website,
                    industry: industryId._id,
                    field: req.body.field,
                    concourses: [],
                  };
                  finalizeFunction();
                }
              });
            });
            return;
          case 'admin':
            UserType.findOne({ name: 'admin' }, '_id', (err, id) => {
              if (err) { console.log(err); return; }
              newUser.type = id._id,
              newUser.adm = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                phone: req.body.phone,
              };
              finalizeFunction();
            });
            return;
          default: 
            body.status = 'error';
            body.message = 'unhandled error';
            res.json(body);
            return;
        }
      }
    }
  
    res.json(body);
  });
});

app.use('/', router);
app.listen(PORT, () => console.log('Express running on port ' + PORT));
