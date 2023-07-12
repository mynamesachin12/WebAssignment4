var filesystem = require('fs');

class Data {
  constructor(students, courses) {
    this.students = students;
    this.courses = courses;
  }
}

let dataCollection = null;

function initialize() {
  return new Promise((resolve, reject) => {
    filesystem.readFile('./data/students.json', 'utf8', (err, studentDataFromFile) => {
      if (err) {
        reject('Unable to read students.json');
        return;
      }

      filesystem.readFile('./data/courses.json', 'utf8', (err, courseDataFromFile) => {
        if (err) {
          reject('Unable to read courses.json');
          return;
        }

        const students = JSON.parse(studentDataFromFile);
        const courses = JSON.parse(courseDataFromFile);
        dataCollection = new Data(students, courses);

        resolve();
      });
    });
  });
}

function getAllStudents() {
  return new Promise((resolve, reject) => {
    if (dataCollection && dataCollection.students.length > 0) {
      resolve(dataCollection.students);
    } else {
      reject('No results returned');
    }
  });
}

function getTAs() {
  return new Promise((resolve, reject) => {
    if (dataCollection && dataCollection.students.length > 0) {
      var tas = dataCollection.students.filter(student => student.TA);
      resolve(tas);
    } else {
      reject('No results returned');
    }
  });
}

function getCourses() {
  return new Promise((resolve, reject) => {
    if (dataCollection && dataCollection.courses.length > 0) {
      resolve(dataCollection.courses);
    } else {
      reject('No results returned');
    }
  });
}
function getStudentsByCourse () {
    return new Promise((resolve, reject) => {
      let result = dataCollection.students.filter(student => student.course === course);
      if (result.length > 0) resolve(result);
      else reject("No results returned");
    });
  }
  
function getStudentByNum() {
    return new Promise((resolve, reject) => {
      let result = dataCollection.students.find(student => student.studentNum === num);
      if (result) resolve(result);
      else reject("No results returned");
    });
  }
  function addStudent(studentData) {
    return new Promise((resolve, reject) => {
      if (studentData.TA === undefined) {
        studentData.TA = false;
      } else {
        studentData.TA = true;
      }
      studentData.studentNum = dataCollection.students.length + 1;
  
      dataCollection.students.push(studentData);
      resolve(studentData);
    });
  }
  
module.exports = {
  initialize,
  getAllStudents,
  getTAs,
  getCourses,
  getStudentsByCourse,
  getStudentByNum,
  addStudent
};