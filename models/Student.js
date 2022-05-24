const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const studentSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    student: {
        firstName: {
            type: String
        },
        lastName: {
            type: String
        },
        education: {
            type: String
        },
        employment: {
            type: String
        },
        school: {
            type: String
        },
        date: {
            type: Date
        }
    }
}, {
    timestamps: true
})


module.exports = mongoose.model("student", studentSchema)
