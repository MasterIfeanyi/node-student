const Student = require("../models/Student");
const User = require("../models/User");

const getStudents = async (req, res) => {
    const result = await Student.find({ user: req.id });
    if (!result) return res.status(200).json({ "message": "No student found" });
    res.status(200).json(result);
}


//create a student
const createStudent = async (req, res) => {
    if (!req?.body) return res.sendStatus(400).json({ "message": "body is required" });
    const { student } = req.body;
    try {
        const newStudentData = await Student.create({
            student,
            user: req.id
        })
        
        // find the user goals to send to the front-end
        const result = await Student.find({ user: req.id });
        if (!result) return res.status(200).json({ "message": "No student found" });
        res.status(201).json(result);
    } catch (err) {
        return res.status(500).json({ "msg": err.message });
    }
}


//update a student
const updateStudent = async (req, res) => {
    if (!req?.body) return res.sendStatus(400).json({ "message": "body is required" });
    const data = {formData: req.body.formData}
    try {
        const student = await Student.findById(req.params.id );
        if (!student) return res.status(400).json({ "msg": "Student not found" });

        // find user that made the request
        const user = await User.findById(req.id);

        // check for user
        if (!user) return res.status(400).json({ "msg": "User not found" });

        // make sure the logged in user matches the student user_id
        if (student.user.toString() !== user.id) return res.status(401).json({ "msg": "User not authorized" }); //unAuthorized
        
        const updatedGoal = await Student.findByIdAndUpdate(req.params.id, { $set: data }, {new: true});

        
        // find the student information to send to the front-end
        const result = await Student.find({ user: req.id })
        if (!result) return res.status(200).json({ "message": "No information found" });
        res.status(200).json(result)
    } catch (err) {
        return res.status(500).json({ "msg": err.message });
    }
}

// get one student
const getAStudent = async (req, res) => {
    if (!req?.params) return res.sendStatus(400).json({ "message": "parameters are required" });
    try {
        const student = await Student.findById(req.params.id);
        if (!student) return res.status(400).json({ "message": "student not found" });

        // find user that made request
        const user = await User.findById(req.id);

        // check for user
        if (!user) return res.status(400).json({ "msg": "User not found" });

        // make sure the logged in user>_id matches the student user(id)
        if (student.user.toString() !== user.id) return res.status(401).json({ "msg": "User not authorized" });

        // find the user goals to send to the front-end
        const result = await Student.findById(req.params.id);
        if (!result) return res.status(200).json({ "message": "No information found" });
        res.status(200).json({ result });
    } catch (err) {
        return res.status(500).json({ "msg": err.message });
    }
}

module.exports = {
    getStudents,
    getAStudent,
    createStudent,
    updateStudent
}