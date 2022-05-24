const express = require("express");
const router = express.Router();
const { getStudents, getAStudent, createStudent, updateStudent } = require("../../controllers/studentController");


router.get("/", getStudents);

router.post("/", createStudent);

router.put("/:id", updateStudent);

router.get("/:id", getAStudent);


module.exports = router;