import Faculty from ('../Models/Faculty')
import mongoType from mongoose.Types;
import express from express;
const router = express.router();

//Post Faculty API
router.post('/faculty', (req, res) =>{
    let facultyObj = new Faculty ({
        faculty_number : req.body.faculty_number,
        faculty_name: req.body.faculty_name,
        department: req.body.department,

        date_of_birth: req.body.date_of_birth,
        joining_date: req.body.joining_date,

        mobile_number: req.body.mobile_number,
        aadhaar_number: req.body.aadhaar_number,

        email: req.body.email,
        password: req.body.password,
    })

    facultyObj.save((req,res) => {
        if(err){
            console.log("There is an error saving the file");
            res.status(400).send('Internal Error' + err)
        }else{
            res.send(doc);
        }
    })
})

module.exports = router;