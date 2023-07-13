/*********************************************************************************
* WEB700 – Assignment 04
* I declare that this assignment is my own work in accordance with Seneca Academic Policy. No part
* of this assignment has been copied manually or electronically from any other source
* (including 3rd party web sites) or distributed to other students.


* Name: Sachin Sapkota Student ID:113877229 Date: 12 July 2023
* Online (Cyclic) Link: https://github.com/namesachin12/WEB700.git
********************************************************************************/
var express = require("express");
const path = require('path');
const collegeData = require("./modules/collegeData");
var app = express();
var HTTP_PORT = 8080;
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));


app.get("/students", (req, res) => {
    const { course} = req.query;
    collegeData.getAllStudents().then(students => {
        if(course) {
            let filStudents = students.filter(val => val.course === Number(course));
            if (filStudents.length > 0) {
                res.status(200).json(filStudents);
            } else {
                res.status(200).send({message:"no results"});
            }
        } else {
            res.status(200).json(students);
        }
    }).catch(err => {
        res.status(500).send({message:"no results"});
    })
});
app.get("/student/:num", (req, res) => {
    const { num} = req.params;
    collegeData.getStudentByNum(Number(num)).then(student => {
        res.status(200).json(student);
    }).catch(err => {
        res.status(500).send({message:"no results"});
    })
});
app.get("/tas", (req, res) => {
    collegeData.getTAs().then(tas => {
        res.status(200).json(tas);
    }).catch(err => {
        res.status(500).send({message:"no results"});
    })
});
app.get("/", (req, res) => {
    const filePath = path.join(__dirname, 'views', 'home.html');
    res.sendFile(filePath)
});
app.get("/about", (req, res) => {
    const filePath = path.join(__dirname, 'views', 'about.html');
    res.sendFile(filePath)
});
   // new added routes
   app.get("/students/add", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "addStudent.html"));
  });
  
  app.post("/students/add", (req, res) => {
    const studentData = req.body;
  collegeData
      .addStudent(studentData)
      .then(() => {
        res.redirect("/students");
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send("Error Adding Student");
      });
  });
    
app.get("/htmlDemo", (req, res) => {
    const filePath = path.join(__dirname, 'views', 'htmlDemo.html');
    res.sendFile(filePath)
});
app.get("/courses", (req, res) => {
    collegeData.getCourses().then(courses => {
        res.status(200).json(courses);
    }).catch(err => {
        res.status(500).send({message:"no results"});
    })
});

app.use((req, res, next) => {
    const filePath = path.join(__dirname, 'views', '404.html');
    res.status(404).sendFile(filePath);
});

collegeData.initialize().then(() => {
    app.listen(HTTP_PORT, ()=>{console.log("server listening on port: " + HTTP_PORT)});
}).catch(err => {
    console.error(err);
});