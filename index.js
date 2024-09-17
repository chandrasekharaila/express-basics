const express = require("express")
const bodyParser = require("body-parser")
const app = express()
const port = 3000

app.use(bodyParser.json())


//internalMemoryArrayofObjects
let students = [{ id: 1, name: "tarun", marks : { maths: 100,physics: 200, chemistry:300}},
                { id: 2, name: "tarun2", marks : { maths: 101,physics: 201, chemistry:301}}
]

//get marks with query param
app.get("/marks", (req, res) => {
    let studentId = parseInt(req.query.id)
    let student = students.find((stu) => stu.id === studentId)

    if (student) {
        res.send(student)
    } else {
        res.status(404).send({error: "student not found"})
    }

})

//get marks with path param
app.get("/marks/:id", (req, res) => {
    let studentId = parseInt(req.params.id)
    let student = students.find((stu) => stu.id === studentId)
    if (student) {
        res.send(student)
    } else {
        res.status(404).send({error: "student not found"})
    }
})

//add marks to a student using post with body param
app.post("/addmarks", (req,res) => {
    const studentId = parseInt(req.body.id);
    const subject = req.body.sub;
    const marks = parseInt(req.body.marks)

    let student = students.filter((st) => st.id === studentId)[0];
    if (student) {
        student.marks[subject] = marks
        res.send(student)
    } else {
        res.status(404).send({error : "no student found"})
    }

})

//update marks using the put request with body param
app.put("/addMarks", (req, res) => {
    const studentId = parseInt(req.body.id);
    const subject = req.body.sub;
    const marks = parseInt(req.body.marks);

    let student = students.find((st) => st.id === studentId);

    if (student) {
        // Check if the subject exists in the student's marks
        if (student.marks[subject]) {
            student.marks[subject] = marks;  
            res.send(student);
        } else {
            res.status(404).send({ error: "Subject not found" });
        }
    } else {
        res.status(404).send({ error: "No student found" });
    }
});

app.delete("/deleteMarks/:id/:sub", (req, res) => {
    const studentId = parseInt(req.params.id);
    const subject = req.params.sub

    let student = students.find((st) => st.id === studentId)
    if (student) { 
        if (student.marks[subject]) {
            delete student.marks[subject]
            res.send(student)
        } else {
            res.status(404).send({error : "subject not found"})
        }
    }
    else {
        res.status(404).send({error: "no student found"})
    }
}) 

app.listen(port, () => {
    console.log(`server is running at ${port}`)
})