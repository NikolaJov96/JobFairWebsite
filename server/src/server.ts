import path from 'path';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import { addDummyData } from './dbDummyData';
import { User } from './models/user';
import { UserType } from './/models/userType';
import { Industry } from './models/industry';
import { JobType } from './models/jobType';
import { Concourse } from './models/concourse';
import { DeadlineDate } from './models/deadlineDate';

const PORT = 4000;

const app = express();
const multer = require('multer');

const IMGAGE_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg',
}

const imageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = IMGAGE_TYPE_MAP[file.mimetype];
    let error = new Error('ivalid file type');
    if (isValid) {
      error = null;
    }
    cb(error, 'images');
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext = IMGAGE_TYPE_MAP[file.mimetype];
    cb(null, name + '-' + Date.now() + '.' + ext);
  }
});

app.use(cors());
app.use(bodyParser.json());
app.use("/images", express.static(path.join('images')));

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
          user.set('password', req.body.newPass1)
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

router.route('/register').post(multer({ storage: imageStorage }).single('image'), (req: express.Request & { file: any }, res) => {
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
        const url = req.protocol + '://' + req.get('host');
        const newUser = {
          username: req.body.username,
          password: req.body.newPass1,
          email: req.body.email,
          type: null,
          imagePath: url + '/images/' + req.file.filename,
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
                cvUploaded: false,
                cv: null,
              };
              finalizeFunction();
            });
            return;
          case 'company':
            UserType.findOne({ name: 'company' }, '_id', (err, userId) => {
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
                  taxNumber: req.body.taxNumber,
                  employees: req.body.employees,
                  website: req.body.website,
                  industry: req.body.industry,
                  field: req.body.field,
                  concourses: [],
                };
                finalizeFunction();
              }
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

router.route('/companies').get((req, res) => {
  const body: ApiResponse = {
    status: 'error',
    message: '',
    data: null,
  };
  UserType.findOne({ name: 'company' }, '_id', (err, id) => {
    if (handleError(err, res)) { return; }
    User.find({ type: id._id }, (err, companies) => {
      if (handleError(err, res)) { return; }
      body.status = 'success';
      body.message = 'all existing companies';
      body.data = companies;
      res.json(body);
    });
  });
});

router.route('/concourses').get((req, res) => {
  const body: ApiResponse = {
    status: 'error',
    message: '',
    data: null,
  };
  const comId = req.query['comId'];
  const conId = req.query['conId'];
  let query = {};
  if (comId != null) { query['host'] = comId; }
  if (conId != null) { query['_id'] = conId; }
  Concourse.find(query, (err, cons) => {
    if (handleError(err, res)) { return; }
    if (cons.length === 1 && conId != null) {
      const ids = [];
      for (let i = 0; i < cons[0]['applicants'].length; i++) {
        ids.push(cons[0]['applicants'][i].student);
      }
      User.find({ _id: { $in: ids } }, (err, students) => {
        for (let i = 0; i < cons[0]['applicants'].length; i++) {
          cons[0]['applicants'][i].student = students[i];
        }
        body.status = 'success';
        body.message = 'concourse with student objects';
        body.data = cons[0];
        res.json(body);
      });
    } else {
      body.status = 'success';
      body.message = 'all found concourses';
      body.data = cons;
      res.json(body);
    }
  });
});

router.route('/concourses').post((req, res) => {
  const body: ApiResponse = {
    status: 'error',
    message: '',
    data: null,
  };
  User.findById(req.body.host, (err, user) => {
    if (handleError(err, res)) { return; }
    delete req.body._id;
    new Concourse(req.body).save((err: Error, con) => {
      if (handleError(err, res)) { return; }
      user['com'].concourses.push(con._id);
      user.save((err: Error) => {
        if (handleError(err, res)) { return; }
        body.status = 'success';
        body.message = 'Concourse created';
        body.data = con;
        res.json(body);
      })
    });
  });
});

router.route('/industries').get((req, res) => {
  const body: ApiResponse = {
    status: 'error',
    message: '',
    data: null,
  };
  Industry.find((err, industries) => {
    if (handleError(err, res)) { return; }
    body.status = 'success';
    body.message = 'all existing industries'
    body.data = industries;
    res.json(body);
  });
});

router.route('/job-types').get((req, res) => {
  const body: ApiResponse = {
    status: 'error',
    message: '',
    data: null,
  };
  JobType.find((err, jobTypes) => {
    if (handleError(err, res)) { return; }
    body.status = 'success';
    body.message = 'all existing job types'
    body.data = jobTypes;
    res.json(body);
  });
});

router.route('/apply').post((req, res) => {
  const body: ApiResponse = {
    status: 'error',
    message: '',
    data: null,
  };
  Concourse.findById(req.body.conId, (err, con) => {
    if (handleError(err, res)) { return; }
    if (con['applicants'].includes(req.body.studentId)) {
      body.message = 'already applied';
      res.json(body);
    } else {
      const applicant = {
        student: req.body.studentId,
        coverLetterExtension: req.body.coverLetterExtension,
      }
      if (req.body.coverLetterExtension === 'txt') {
        // save to file
      }
      con['applicants'].push(applicant);
      con.save((err) => {
        if (handleError(err, res)) { return; }
        body.status = 'success';
        body.message = 'successfully applied';
        res.json(body);
      })
    }
  });
});

router.route('/conclude').post((req, res) => {
  const body: ApiResponse = {
    status: 'error',
    message: '',
    data: null,
  };
  Concourse.findById(req.body.conId, (err, con) => {
    if (handleError(err, res)) { return; }
    for (let i = 0; i < con['applicants'].length; i++) {
      con['applicants'][i].accepted =  req.body.arr[i] == null ? false : true;
    }
    con.set('concluded', true);
    con.save((err) => {
      if (handleError(err, res)) { return; }
      body.status = 'success';
      body.message = 'concourse concluded';
      res.json(body);
    });
  });
});

router.route('/cv').post((req, res) => {
  const body: ApiResponse = {
    status: 'error',
    message: '',
    data: null,
  };
  DeadlineDate.findOne({}, (err, deadlineDate) => {
    if (handleError(err, res)) { return; }
    const studentStart = deadlineDate.get('studentStart') as Date;
    const studentEnd = deadlineDate.get('studentEnd') as Date;
    const now = new Date();
    if (studentStart < now && now < studentEnd) {
      User.findById(req.body.studentId, (err, student) => {
        if (handleError(err, res)) { return; }
        const stu = student.get('stu');
        stu.cvUploaded = true;
        stu.cv = req.body.cv;
        student.set('stu', stu);
        console.log(student.get('stu.cv'));
        User.updateOne({ _id: student._id }, { stu: stu }, (err) => {
          if (handleError(err, res)) { return; }
          body.status = 'success';
          body.message = 'cv changed';
          res.json(body);
        });
      });
    } else {
      body.status = 'error';
      body.message = 'cv uploading ended on: ' + studentEnd.toString();
      res.json(body);
    }
  });
  
});

app.use('/', router);
app.listen(PORT, () => console.log('Express running on port ' + PORT));
