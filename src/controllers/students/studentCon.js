import Student from "../../models/Student";

const PAGE_SIZE = 10;

export const getStudents = async (event, queryData) => {
    try {
        const { page = 1, query = "", filters = "" } = queryData;

        //? Build search and filter query
        const searchQuery = {};
        if (query) {
            searchQuery.$text = { $search: query }; // Full-text search
        }

        const filterQuery = {};
        if (filters.ncc) {
            filterQuery.ncc = true;
        }
        else if (filters.scout) {
            filterQuery.scout = true;
        }
        else if (filters.club) {
            //* search for students with the specified club
            filterQuery.club = filters.club;
        }

        // Combine search and filter queries
        const combinedQuery = {
            ...searchQuery,
            ...filterQuery,
        };

        // Calculate pagination parameters
        const skip = (page - 1) * PAGE_SIZE;
        const limit = PAGE_SIZE;

        // Get students with search, filter, and pagination
        const students = await Student.find(combinedQuery, null, { skip, limit });

        // Get total student count considering search and filter
        const totalStudents = await Student.countDocuments(combinedQuery);

        // Send response with students and pagination data
        let res = {
            students,
            currentPage: page,
            totalPages: Math.ceil(totalStudents / PAGE_SIZE),
        };
        //* convert res to json format
        res = JSON.stringify(res);

        event.sender.send("success-res", res);
    } catch (error) {
        console.error(error);
        const errorMessage = error.message || "Error fetching students";
        event.sender.send("error-res", errorMessage);
    }
};

export const getStudent = async (event, id) => {
    try {
        // Get the student with the specified id
        const student = await Student.findById(id);
        console.log(id);

        // Send the student to the renderer process
        let res = JSON.stringify(student);
        event.sender.send("success-res", res);
    } catch (error) {
        console.error(error);
        const errorMessage = error.message || "Error fetching student";
        event.sender.send("error-res", errorMessage);
    }
};

export const getStudentSemester = async (event, id) => {
    try {
        // Get the student semester with the specified id
        const student = await Student.findById(id).select('semesters');

        console.log(student);

        // Send the student to the renderer process
        let res = JSON.stringify(student?.semesters);
        event.sender.send("success-res", res);
    } catch (error) {
        console.error(error);
        const errorMessage = error.message || "Error fetching student";
        event.sender.send("error-res", errorMessage);
    }
};

export const updateStudent = async (event, updateData) => {
    try {

        const { id, studentData } = updateData;

        console.log(updateData);

        // Update the student with the specified id
        const updatedStudent = await Student.findByIdAndUpdate(id
            , studentData, { new: true });

        // Send the updated student to the renderer process
        let res = JSON.stringify(updatedStudent);
        event.sender.send("success-res", res);
    } catch (error) {
        console.error(error);
        const errorMessage = error.message || "Error updating student";
        event.sender.send("error-res", errorMessage);
    }
};

export const updateStudentSemester = async (event, updateData) => {
    try {

        const { id, newSemesterData } = updateData;

        //* set the semester data to newSemesterData
        const student = await Student.findById(id);
        student.semesters = newSemesterData;
        student.save();


        // Send the updated student to the renderer process
        let res = JSON.stringify({
            success: true,
        });
        event.sender.send("success-res", res);
    } catch (error) {
        console.error(error);
        const errorMessage = error.message || "Error updating student";
        event.sender.send("error-res", errorMessage);
    }
};

export const createStudent = async (event, studentData) => {
    try {

        console.log("Creating student...");
        //? Create a new student object
        const newStudent = new Student(studentData);

        //? Save the student to the database
        const savedStudent = await newStudent.save();

        //? Extract the name and _id from the saved student
        const { name, _id, } = savedStudent;
        let res = {
            name,
            _id,
        };
        //? convert res to json format
        res = JSON.stringify(res);

        //? Send the response to the renderer process in json format
        event.sender.send('success-res', res);

    } catch (error) {
        console.log(error);
        //? If there is an error, send the error message to the renderer process
        const mes = error.message || 'Error in creating student';
        event.sender.send('error-res', mes);
    }
};

