<<<<<<< HEAD
const fs = require("fs");
=======
const myfileSystem = require("fs");
>>>>>>> df2e9c10d883e31fbe353fc09e318e7e6f471611

class Data {
  constructor(students, courses) {
    this.students = students;
    this.courses = courses;
  }
}

let myDataCollections = null;

function initialize() {
  return new Promise((resolve, reject) => {
<<<<<<< HEAD
    fs.readFile("./data/students.json", "utf8", (err, rawStudentData) => {
      if (err || !rawStudentData) {
        reject("Unable to read students.json");
        return;
      }

      fs.readFile("./data/courses.json", "utf8", (err, rawCourseData) => {
        debugger;
        if (err || !rawCourseData) {
          reject("Unable to read courses.json");
=======
    myfileSystem.readFile(
      "./data/students.json",
      "utf8",
      (err, StudentJson) => {
        if (err) {
          reject("unable to read students.json");
>>>>>>> df2e9c10d883e31fbe353fc09e318e7e6f471611
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

<<<<<<< HEAD
        const studentData = JSON.parse(rawStudentData);
        const courseData = JSON.parse(rawCourseData);

        dataCollection = new Data(studentData, courseData);
        resolve();
      });
    });
=======
            const studentData = JSON.parse(StudentJson);
            const courseData = JSON.parse(CourseJson);
            myDataCollections = new Data(studentData, courseData);

            resolve();
          }
        );
      }
    );
>>>>>>> df2e9c10d883e31fbe353fc09e318e7e6f471611
  });
}

function getAllStudents() {
  return new Promise((resolve, reject) => {
<<<<<<< HEAD
    if (
      dataCollection &&
      dataCollection.students &&
      dataCollection.students.length > 0
    ) {
      resolve(dataCollection.students);
    } else {
      reject("No students returned");
    }
  });
}

function addStudent(studentData) {
  return new Promise((resolve, reject) => {
    if (dataCollection && dataCollection.students) {
      dataCollection.students = [
        ...dataCollection.students,
        {
          ...studentData,
          studentNum: dataCollection.students.length + 1,
          TA: studentData.TA ? true : false,
          course: Number(studentData.course),
        },
      ];
      resolve();
    }
    reject();
  });
}

function getTAs() {
  return new Promise((resolve, reject) => {
    if (
      dataCollection &&
      dataCollection.students &&
      dataCollection.students.length > 0
    ) {
      const TAs = dataCollection.students.filter(
        (student) => student.TA === true
      );
      resolve(TAs);
    } else {
      reject("No TAs returned");
    }
  });
}

function getCourseById(id) {
  return new Promise((resolve, reject) => {
    if (
      dataCollection &&
      dataCollection.courses &&
      dataCollection.courses.length > 0
    ) {
      resolve(dataCollection.courses.find(val => val.courseId == id));
    } else {
      reject("No courses returned");
=======
    if (myDataCollections && myDataCollections.students.length > 0) {
      resolve(myDataCollections.students);
    } else {
      reject("no results returned");
>>>>>>> df2e9c10d883e31fbe353fc09e318e7e6f471611
    }
  });
}

function getCourses() {
  return new Promise((resolve, reject) => {
<<<<<<< HEAD
    if (
      dataCollection &&
      dataCollection.courses &&
      dataCollection.courses.length > 0
    ) {
      resolve(dataCollection.courses);
    } else {
      reject("No courses returned");
    }
  });
}
function getStudentsByCourse(course) {
  return new Promise((resolve, reject) => {
    if (
      dataCollection &&
      dataCollection.students &&
      dataCollection.students.length > 0
    ) {
      resolve(
        dataCollection.students.filter((student) => student.course === course)
      );
    } else {
      reject("No students returned");
    }
  });
}

function updateStudent(studentData) {
  return new Promise((resolve, reject) => {
    if (
      dataCollection &&
      dataCollection.students &&
      dataCollection.students.length > 0
    ) {
      try {
        let sIndex = dataCollection.students.findIndex(
          (student) => student.studentNum === Number(studentData.studentNum)
        );
        let updatedStudent = {
          ...studentData,
          studentNum: Number(studentData.studentNum),
          TA: studentData.TA ? true: false,
          course:  Number(studentData.course)
        };
        dataCollection.students[sIndex] = updatedStudent;
        resolve();
      } catch(err) {
        reject("student not found");
      }
    } else {
      reject("No students returned");
    }
  });
}
function getStudentByNum(num) {
  return new Promise((resolve, reject) => {
    if (
      dataCollection &&
      dataCollection.students &&
      dataCollection.students.length > 0
    ) {
      let student = dataCollection.students.find(
=======
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
>>>>>>> df2e9c10d883e31fbe353fc09e318e7e6f471611
        (student) => student.studentNum === num
      );
      if (student) {
        resolve(student);
      } else {
<<<<<<< HEAD
        reject("student not found");
      }
    } else {
      reject("No students returned");
    }
  });
}
=======
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

>>>>>>> df2e9c10d883e31fbe353fc09e318e7e6f471611
module.exports = {
  initialize,
  getAllStudents,
  getCourses,
<<<<<<< HEAD
  getStudentByNum,
  addStudent,
  getCourseById,
  updateStudent,
  getStudentsByCourse,
=======
  getStudentByCourse,
  getStudentByNum,
  addStudent,
  getCourseById,
  students,
  updateStudent
>>>>>>> df2e9c10d883e31fbe353fc09e318e7e6f471611
};
