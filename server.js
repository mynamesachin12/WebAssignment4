<<<<<<< HEAD
/*********************************************************************************
* WEB700 – Assignment 05
* I declare that this assignment is my own work in accordance with Seneca Academic Policy. No part
* of this assignment has been copied manually or electronically from any other source
* (including 3rd party web sites) or distributed to other students.
*
* Name: Sachin Sapkota Student ID:113877229  Date: 27 Jul 2023
*
* Online (Cyclic) Link: https://aware-seal-wear.cyclic.app
*
********************************************************************************/

const express = require("express");
const path = require("path");
const collegeData = require("./modules/collegeData");
const app = express();
const HTTP_PORT = process.env.PORT || 8080;
var exphbs = require("express-handlebars");

app.engine(
  ".hbs",
  exphbs.engine({
    extname: ".hbs",
    helpers: {
      navLink: function (url, options) {
        return (
          "<li" +
          (url == app.locals.activeRoute
            ? ' class="nav-item active" '
            : ' class="nav-item" ') +
          '><a class="nav-link" href="' +
          url +
          '">' +
          options.fn(this) +
          "</a></li>"
        );
      },
      equal: function (lvalue, rvalue, options) {
        if (arguments.length < 3)
          throw new Error("Handlebars Helper equal needs 2 parameters");
        if (lvalue != rvalue) {
          return options.inverse(this);
        } else {
          return options.fn(this);
        }
      },
    },
  })
);

app.set("view engine", ".hbs");

const publicPath = path.join(__dirname, "public");
app.use(express.static(publicPath));
=======
/********************************************************************************* *
 * WEB700 – Assignment 05 *
 * I declare that this assignment is my own work in accordance with Seneca Academic Policy.
 * No part of this assignment has been copied manually or electronically from any other source.
 * (including 3rd party web sites) or distributed to other students.
 *  Name: Sachin Sapkota Student ID: 113877229 Date: 2023/07/10 *
 * Online (Cyclic) Link: 
 * ********************************************************************************/

var HTTP_PORT = process.env.PORT || 8080;
var express = require("express");
var exphbs = require("express-handlebars");
var app = express();
const path = require("path");
const collegeData = require("./modules/collegeData");
>>>>>>> df2e9c10d883e31fbe353fc09e318e7e6f471611

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

<<<<<<< HEAD
app.use(function (req, res, next) {
  let route = req.path.substring(1);
  app.locals.activeRoute =
    "/" +
    (isNaN(route.split("/")[1])
      ? route.replace(/\/(?!.*)/, "")
      : route.replace(/\/(.*)/, ""));
  next();
});

// setup a 'route' to listen on the default url path
app.get("/students", (req, res) => {
  const { course } = req.query;
  collegeData
    .getAllStudents()
    .then((students) => {
      if (course) {
        let filtered = students.filter((val) => val.course === Number(course));
        if (filtered.length > 0) {
          res.render("students", { students: filtered });
        } else {
          res.render("students", { message: "no results" });
        }
      } else {
        res.render("students", { students });
      }
    })
    .catch((err) => {
      res.render("students", { message: "no results" });
    });
});
app.get("/student/:num", (req, res) => {
  const { num } = req.params;
  collegeData
    .getStudentByNum(Number(num))
    .then((student) => {
      res.render("student", { student });
    })
    .catch((err) => {
      res.render("student", { message: "no results" });
    });
});
app.post("/student/update", (req, res) => {
  collegeData
    .updateStudent(req.body)
    .then(() => {
      res.redirect("/students");
    })
    .catch((err) => {
      res.status(500).send({ message: "no results" });
    });
});
app.get("/tas", (req, res) => {
  collegeData
    .getTAs()
    .then((tas) => {
      res.status(200).json(tas);
    })
    .catch((err) => {
      res.status(500).send({ message: "no results" });
    });
});
app.get("/", (req, res) => {
  res.render("home");
});
app.get("/about", (req, res) => {
  res.render("about");
});
app.get("/htmlDemo", (req, res) => {
  res.render("htmlDemo");
});
app.get("/students/add", (req, res) => {
  res.render("addStudent");
});

app.post("/students/add", (req, res) => {
  collegeData
    .addStudent(req.body)
    .then(() => {
      res.redirect("/students");
    })
    .catch((err) => {
      res.status(500).send({ message: "no results" });
    });
});

app.get("/courses", (req, res) => {
  collegeData
    .getCourses()
    .then((courses) => {
      res.render("courses", { courses: courses });
    })
    .catch((err) => {
      res.render("courses", { message: "no results" });
    });
});

app.get("/course/:num", (req, res) => {
  const { num } = req.params;
  collegeData
    .getCourseById(Number(num))
    .then((course) => {
      res.render("course", { course: course });
    })
    .catch((err) => {
      res.render("course", { message: "no results" });
    });
});
// 404 Error Handler
app.use((req, res, next) => {
  const filePath = path.join(__dirname, "views", "404.html");
  res.status(404).sendFile(filePath);
});
// setup http server to listen on HTTP_PORT
collegeData
  .initialize()
  .then(() => {
    app.listen(HTTP_PORT, () => {
      console.log("server listening on port: " + HTTP_PORT);
=======
app.engine(
  ".hbs",
  exphbs.engine({
    defaultLayout: "main",
    helpers: {
      navLink: function (url, options) {
        return (
          "<li" +
          (url == app.locals.activeRoute
            ? ' class="nav-item active" '
            : ' class="nav-item" ') +
          '><a class="nav-link" href="' +
          url +
          '">' +
          options.fn(this) +
          "</a></li>"
        );
      },
      equal: function (lvalue, rvalue, options) {
        if (arguments.length < 3)
          throw new Error("Handlebars Helper equal needs 2 parameters");
        if (lvalue != rvalue) {
          return options.inverse(this);
        } else {
          return options.fn(this);
        }
      },
    },
  })
);
app.set("view engine", ".hbs");

app.use(function (req, res, next) {
  let route = req.path.substring(1);
  app.locals.activeRoute =
    "/" +
    (isNaN(route.split("/")[1])
      ? route.replace(/\/(?!.*)/, "")
      : route.replace(/\/(.*)/, ""));
  next();
});

collegeData
  .initialize()
  .then(() => {
    app.get("/students", (req, res) => {
      collegeData
        .getAllStudents()
        .then((students) => {
          if (req.query.course) {
            return collegeData.getStudentByCourse(parseInt(req.query.course));
          } else {
            return students;
          }
        })
        .then((result) => {
          if (result.length > 0) {
            res.render("students", { students: result });
          } else {
            res.json({ message: "no results" });
          }
        })
        .catch(() => {
          res.status(404).json({ message: "no results" });
        });
    });

    app.get("/courses", (req, res) => {
      collegeData
        .getCourses()
        .then((result) => {
          res.render("courses", { courses: result });
        })
        .catch(() => {
          res.render("courses", { message: "no results" });
        });
    });

   app.get("/student/:num", (req, res) => {
     const studentNum = parseInt(req.params.num);
      collegeData
       .getStudentByNum(studentNum)
       .then((result) => {
          // res.json(result);
         res.render("student", { student: result });
       })
       .catch(() => {
        res.render("students", { message: "no results" });
       });
  });


    app.get("/", (req, res) => {
      res.render("home");
    });

    app.get("/about", (req, res) => {
      res.render("about");
    });

    app.get("/htmlDemo", (req, res) => {
      res.render("htmlDemo");
    });

    // new added routes
    app.get("/students/add", (req, res) => {
      res.render("addStudent");
    });

    app.post("/students/add", (req, res) => {
      const studentData = req.body;

      collegeData
        .addStudent(studentData)
        .then(() => {
          res.redirect("/students");
        })

        // don't know if this is necessary so, please remove it if not
        .catch((error) => {
          console.error(error);
          res.status(500).send("Error Adding Student");
        });
    });

    app.get("/course/:id", (req, res) => {
      const courseId = parseInt(req.params.id);
      collegeData
        .getCourseById(courseId)
        .then((result) => {
          res.render("course", { course: result });
        })
        .catch(() => {
          res.render("course", { message: "no results" });
        });
    });

    app.post("/student/update", (req, res) => {
      console.log(req.body);
     res.redirect("/students");
    });
/////
    app.post("/student/update", (req, res) => {
      collegeData
        .updateStudent(req.body)
        .then(() => {
          console.log("Student data updated successfully!");
          res.redirect("/students");
        })
        .catch(error => {
          console.error("Error updating student data:", error.message);
          res.redirect("/students");
        });
    });
//////
    app.use((req, res) => {
      res.status(404).send("Page Not Found");
    });

    app.listen(HTTP_PORT, () => {
      console.log("Server listening on port: " + HTTP_PORT);
>>>>>>> df2e9c10d883e31fbe353fc09e318e7e6f471611
    });
  })
  .catch((err) => {
    console.error(err);
  });
