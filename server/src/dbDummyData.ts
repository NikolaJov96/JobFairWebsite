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
      new DeadlineDate({
        studentStart: new Date(),
        studentEnd: new Date(),
        companyStart: new Date(),
        companyEnd: new Date(),
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
          username: 'student',
          password: 'qweQWE123#',
          email: 'student@mail.com',
          type: id[0]._id,
          stu: {
            firstName: 'Johin',
            lastName: 'Smith',
            phone: 123456789,
            year: 4,
            graduated: false,
            applications: [],
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
            username: 'company',
            password: 'asdASD123#',
            email: 'company@mail.com',
            type: userId[0]._id,
            stu: null,
            com: {
              name: 'The best company',
              city: 'Atlatida',
              director: 'Poseidon',
              taxNumber: '20.000mi',
              employees: 1,
              website: 'www.thebestcompany.com',
              industry: industryId[0]._id,
              field: 'Swimming equipment',
              concourses: [],
            }, 
            adm: null, 
          }).save();
        });
      });
      UserType.find({ name: 'admin' }, '_id', (err, id) => {
        if (err) { console.log(err); return; }
        new User({
          username: 'admin',
          password: 'zxcZXC123#',
          email: 'admin@mail.com',
          type: id[0]._id,
          stu: null,
          com: null, 
          adm: {
            firstName: 'Robin',
            lastName: 'Hood',
            phone: 987654321,
          }, 
        }).save();
      });
    };
  })
}
