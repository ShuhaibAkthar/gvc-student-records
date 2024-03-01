import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

function ViewStudent() {

    //* get id from url
    const { id } = useParams();

    const [student, setStudent] = useState();

    useEffect(() => {
        const { ipcRenderer } = window.electron;
        ipcRenderer.on("success-res", (event, data) => {
            //* use the data to set the form values
            data = JSON.parse(data);
            console.log(data);
            setStudent(data);
        });

        ipcRenderer.on("error-res", (event, errorMessage) => {
            console.error("Error fetching students:", errorMessage);
            // Handle the error as needed
        });

        ipcRenderer.send("get-student", id);

        return () => {
            ipcRenderer.removeAllListeners("success-res");
            ipcRenderer.removeAllListeners("error-res");
        }

    }, []);

    useEffect(() => {

        const fetchStudents = async () => {
            try {
                await api.getStudent(id);
            } catch (error) {
                console.error("Error fetching students:", error);
            }
        };
        fetchStudents();
    }, []);


    if (!student) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{student.name}'s Profile</h1>
            <p><strong>Registration Number:</strong> {student.regNo}</p>
            <p><strong>Father's Name:</strong> {student.fatherName}</p>
            <p><strong>Mother's Name:</strong> {student.motherName}</p>
            {/* Add other student details as needed */}

            <h2>Semester Details</h2>
            <table>
                <thead>
                    <tr>
                        <th>Semester Number</th>
                        <th>Subjects</th>
                    </tr>
                </thead>
                <tbody>
                    {student.semesters.map((semester) => (
                        <tr key={semester.semesterNumber}>
                            <td>{semester.semesterNumber}</td>
                            <td>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Subject Name</th>
                                            <th>Attendance</th>
                                            <th>Seminar</th>
                                            <th>Assignment</th>
                                            <th>Internal</th>
                                            <th>Total</th>
                                            <th>Exam</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {semester.subjects.map((subject, index) => (
                                            <tr key={index}>
                                                <td>{subject.name}</td>
                                                <td>{subject.attendance}</td>
                                                <td>{subject.seminar}</td>
                                                <td>{subject.assignment}</td>
                                                <td>{subject.internal}</td>
                                                <td>{subject.total}</td>
                                                <td>{subject.exam ? 'Yes' : 'No'}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}


export default ViewStudent