import { DeadlineDate } from './models/deadlineDate';
import { UserType } from './models/userType';
import { Industry } from './models/industry';
import { JobType } from './models/jobType';
import { User } from './models/user';

export function addDummyData() {
  UserType.find((err, userTypes) => {
    if (err) { console.log(err); return; }
    if (userTypes.length !== 3) {
      new UserType({ name: 'student' }).save();
      new UserType({ name: 'company' }).save();
      new UserType({ name: 'admin' }).save();
    }
  });
  DeadlineDate.find((err, deadlineDates) => {
    if (err) { console.log(err); return; }
    if (deadlineDates.length !== 1) {
      const now = new Date();
      now.setMonth(now.getMonth() - 2);
      const then = new Date();
      then.setMonth(then.getMonth() + 2);
      new DeadlineDate({
        studentStart: now,
        studentEnd: then,
        companyStart: now,
        companyEnd: then,
      }).save();
    }
  });
  Industry.find((err, industries) => {
    if (err) { console.log(err); return; }
    if (industries.length !== 5) {
      new Industry({ name: 'IT' }).save();
      new Industry({ name: 'Teleco' }).save();
      new Industry({ name: 'Energy' }).save();
      new Industry({ name: 'Architecture' }).save();
      new Industry({ name: 'Mechanical' }).save();
    }
  });
  JobType.find((err, userTypes) => {
    if (err) { console.log(err); return; }
    if (userTypes.length !== 2) {
      new JobType({ name: 'internship' }).save();
      new JobType({ name: 'full-time' }).save();
    }
  });
  User.find((err, users) => {
    if (err) { console.log(err); return; }
    if (users.length === 0) {
      UserType.find({ name: 'student' }, '_id', (err, id) => {
        if (err) { console.log(err); return; }
        new User({
          username: 's1',
          password: 'qweQWE123#',
          email: 's1@mail.com',
          type: id[0]._id,
          imagePath: '',
          stu: {
            firstName: 's1FirstName',
            lastName: 's1LastName',
            phone: 1111111111,
            year: 1,
            graduated: false,
            applications: [],
            cvUploaded: false,
            cv: null,
          },
          com: null, 
          adm: null, 
        }).save();
        new User({
          username: 's2',
          password: 'qweQWE123#',
          email: 's2@mail.com',
          type: id[0]._id,
          imagePath: '',
          stu: {
            firstName: 's2FirstName',
            lastName: 's2LastName',
            phone: 2222222222,
            year: 2,
            graduated: false,
            applications: [],
            cvUploaded: false,
            cv: null,
          },
          com: null, 
          adm: null, 
        }).save();
        new User({
          username: 's3',
          password: 'qweQWE123#',
          email: 's3@mail.com',
          type: id[0]._id,
          imagePath: '',
          stu: {
            firstName: 's3FirstName',
            lastName: 's3LastName',
            phone: 333333333,
            year: 4,
            graduated: true,
            applications: [],
            cvUploaded: false,
            cv: null,
          },
          com: null, 
          adm: null, 
        }).save();
      });
      UserType.find({ name: 'company' }, '_id', (err, userId) => {
        if (err) { console.log(err); return; }
        Industry.find({ name: 'IT' }, '_id', (err, industryId) => {
          if (err) { console.log(err); return; }
          new User({
            username: 'c1',
            password: 'asdASD123#',
            email: 'c1@mail.com',
            type: userId[0]._id,
            imagePath: '',
            stu: null,
            com: {
              name: 'Com1',
              city: 'City1',
              director: 'Dir1',
              taxNumber: '111111',
              employees: 1,
              website: 'www.c1.com',
              industry: industryId[0]._id,
              field: 'c1Field',
              concourses: [],
            }, 
            adm: null, 
          }).save();
        });
        Industry.find({ name: 'Teleco' }, '_id', (err, industryId) => {
          if (err) { console.log(err); return; }
          new User({
            username: 'c2',
            password: 'asdASD123#',
            email: 'c2@mail.com',
            type: userId[0]._id,
            imagePath: '',
            stu: null,
            com: {
              name: 'Com2',
              city: 'City2',
              director: 'Dir2',
              taxNumber: '222222',
              employees: 2,
              website: 'www.c2.com',
              industry: industryId[0]._id,
              field: 'c2Field',
              concourses: [],
            }, 
            adm: null, 
          }).save();
        });
        Industry.find({ name: 'Energy' }, '_id', (err, industryId) => {
          if (err) { console.log(err); return; }
          new User({
            username: 'c3',
            password: 'asdASD123#',
            email: 'c3@mail.com',
            type: userId[0]._id,
            imagePath: '',
            stu: null,
            com: {
              name: 'Com3',
              city: 'City3',
              director: 'Dir3',
              taxNumber: '333333',
              employees: 3,
              website: 'www.c3.com',
              industry: industryId[0]._id,
              field: 'c3Field',
              concourses: [],
            }, 
            adm: null, 
          }).save();
        });
      });
      UserType.find({ name: 'admin' }, '_id', (err, id) => {
        if (err) { console.log(err); return; }
        new User({
          username: 'a',
          password: 'zxcZXC123#',
          email: 'admin@mail.com',
          type: id[0]._id,
          imagePath: '',
          stu: null,
          com: null, 
          adm: {
            firstName: 'adminFirstName',
            lastName: 'adminLastName',
            phone: 9999999999,
          }, 
        }).save();
      });
    };
  })
}
