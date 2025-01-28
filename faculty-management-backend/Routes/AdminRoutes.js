import Faculty from '../Models/FacultyModels.js'
import mongoose from 'mongoose';
import express from 'express';
const router = express.Router();
const mongoType = mongoose.Types;

//Post Faculty API
router.post('/faculty', async (req, res) => {
    try {
        const facultyObj = new Faculty({
            faculty_number: req.body.faculty_number,
            faculty_name: req.body.faculty_name,
            department: req.body.department,
            date_of_birth: req.body.date_of_birth,
            joining_year: req.body.joining_year, // Note: changed from joining_date
            mobile_number: req.body.mobile_number,
            aadhaar_number: req.body.aadhaar_number,
            email: req.body.email,
            password: req.body.password,
        });

        const savedFaculty = await facultyObj.save();
        res.status(201).json(savedFaculty);
    } catch (error) {
        console.error('Error saving faculty:', error);
        res.status(500).json({ message: 'Error saving faculty', error: error.message });
    }
});


//Get all faculties API
router.get('/faculty', async (req,res) =>{
    try {
        const faculties = await Faculty.find(); // No callback, just async/await
        res.status(200).json(faculties);        // Send the result as JSON
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching faculties.' });
      }
})

export default router;