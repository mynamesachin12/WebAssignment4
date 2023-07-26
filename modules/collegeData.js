const myfileSystem = require("fs");

class Data {
  constructor(students, courses) {
    this.students = students;
    this.courses = courses;
  }
}

let myDataCollections = null;

function initialize() {
  return new Promise((resolve, reject) => {
    myfileSystem.readFile(
      "./data/students.json",
      "utf8",
      (err, StudentJson) => {
        if (err) {
          reject("unable to read students.json");
          return;
        }
        myfileSystem.readFile(
          "./data/courses.json",
          "utf8",
          (err, CourseJson) => {
            if (err) {
              reject("unable to read courses.json");
              return;
            }

            const studentData = JSON.parse(StudentJson);
            const courseData = JSON.parse(CourseJson);
            myDataCollections = new Data(studentData, courseData);

            resolve();
          }
        );
      }
    );
  });
}

function getAllStudents() {
  return new Promise((resolve, reject) => {
    if (myDataCollections && myDataCollections.students.length > 0) {
      resolve(myDataCollections.students);
    } else {
      reject("no results returned");
    }
  });
}

function getCourses() {
  return new Promise((resolve, reject) => {
    if (myDataCollections && myDataCollections.courses.length > 0) {
      resolve(myDataCollections.courses);
    } else {
      reject("No results returned");
    }
  });
}

function getStudentByCourse(course) {
  return new Promise((resolve, reject) => {
    if (myDataCollections && myDataCollections.students.length > 0) {
      const sudentsInCourse = myDataCollections.students.filter(
        (student) => student.course === course
      );
      if (sudentsInCourse.length > 0) {
        resolve(sudentsInCourse);
      } else {
        reject("No resluts returned");
      }
    } else {
      reject("No results returned");
    }
  });
}

function getStudentByNum(num) {
  return new Promise((resolve, reject) => {
    if (myDataCollections && myDataCollections.students.length > 0) {
      const student = myDataCollections.students.find(
        (student) => student.studentNum === num
      );
      if (student) {
        resolve(student);
      } else {
        reject("No results returned");
      }
    } else {
      reject("No results returned");
    }
  });
}

function addStudent(studentData) {
  return new Promise((resolve, reject) => {
    if (studentData.TA === undefined) {
      studentData.TA = false;
    } else {
      studentData.TA = true;
    }
    studentData.studentNum = myDataCollections.students.length + 1;

    myDataCollections.students.push(studentData);
    resolve(studentData);
  });
}

function getCourseById(id) {
  return new Promise((resolve, reject) => {
    if (myDataCollections && myDataCollections.courses.length > 0) {
      const course = myDataCollections.courses.find(
        (course) => course.courseId === id
      );
      if (course) {
        resolve(course);
      } else {
        reject("query returned 0 results");
      }
    } else {
      reject("query returned 0 results");
    }
  });
}

let students = []; // Assuming this array contains student data

function updateStudent(studentData) {
  return new Promise((resolve, reject) => {
    // Find the index of the student with a matching studentNum
    const studentIndex = students.findIndex(student => student.studentNum === studentData.studentNum);

    if (studentIndex !== -1) {
      // Update the student's information
      students[studentIndex].email = studentData.email;
      students[studentIndex].addressStreet = studentData.addressStreet;
      students[studentIndex].addressCity = studentData.addressCity;
      students[studentIndex].addressProvince = studentData.addressProvince;
      students[studentIndex].TA = !!studentData.TA;
      students[studentIndex].status = studentData.status;
      students[studentIndex].course = parseInt(studentData.course, 10);

      resolve(); // Resolve the promise without any data
    } else {
      reject(new Error("Student not found")); // Reject the promise with an error if studentNum is not found
    }
  });
}

module.exports = {
  initialize,
  getAllStudents,
  getCourses,
  getStudentByCourse,
  getStudentByNum,
  addStudent,
  getCourseById,
  students,
  updateStudent
};
