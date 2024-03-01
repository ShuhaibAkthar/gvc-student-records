import React, { useState, useEffect } from 'react';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Link, useParams } from 'react-router-dom';

const schema = yup.object().shape({
    name: yup.string().required('Name is required'),
    regNo: yup.string().required('Registration number is required'),
    fatherName: yup.string().required('Father\'s name is required'),
    motherName: yup.string().required('Mother\'s name is required'),
    address: yup.string().required('Address is required'),
    relationshipWithGuardian: yup.string().required('Relationship with guardian is required'),
    admissionYear: yup.number().required('Admission year is required'),
    dateOfBirth: yup.date().required('Date of birth is required'),
    bloodGroup: yup.string(),
    email: yup.string().email('Invalid email format'),
    contactNumber: yup.number().required('Contact number is required'),
    whatsappNumber: yup.number(),
    parentContactNumber: yup.number().required('Parent contact number is required'),
    previousSchool: yup.string().required('Previous school is required'),
    sslcMarks: yup.number(),
    plusTwo: yup.string(),
    stream: yup.string(),
    // extracurricularActivities: yup.array().of(yup.string()),
    ncc: yup.boolean(),
    scout: yup.boolean(),
    // club: yup.array().of(yup.string()),
});

function EditStudent() {


    const [loading, setLoading] = useState(false);

    //* get the id from the url
    const { id } = useParams();

    const [semestersData, setSemestersData] = useState([
        { semesterNumber: 1, subjects: [] },
        { semesterNumber: 2, subjects: [] },
        { semesterNumber: 3, subjects: [] },
        { semesterNumber: 4, subjects: [] },
        { semesterNumber: 5, subjects: [] },
        { semesterNumber: 6, subjects: [] }
    ]);

    const [subjectData, setSubjectData] = useState({
        name: '',
        attendance: 0,
        seminar: 0,
        assignment: 0,
        internal: 0,
        total: 0,
        exam: false,
    });

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentSemester, setCurrentSemester] = useState(null);

    const openModal = (semesterNumber) => {
        setCurrentSemester(semesterNumber);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setCurrentSemester(null);
        setIsModalOpen(false);
    };

    const addSubject = () => {
        setSemestersData((prevData) => {
            const newData = [...prevData];
            newData[currentSemester - 1].subjects.push(subjectData);
            return newData;
        });

        setSubjectData({
            name: '',
            attendance: 0,
            seminar: 0,
            assignment: 0,
            internal: 0,
            total: 0,
            exam: false,
        });

        closeModal();
    };

    const removeSubject = (semesterNumber, index) => {
        setSemestersData((prevData) => {
            const newData = [...prevData];
            newData[semesterNumber - 1].subjects.splice(index, 1);
            return newData;
        });
    };

    const { handleSubmit, control, register, formState: { errors }, setValue } = useForm({
        resolver: yupResolver(schema),
    });

    useEffect(() => {
        const { ipcRenderer } = window.electron;
        ipcRenderer.on("success-res", (event, data) => {
            //* use the data to set the form values
            data = JSON.parse(data);
            console.log(data);
            //* use loop to set the form values
            for (const key in data) {
                if (data.hasOwnProperty(key)) {
                    if (key === 'extracurricularActivities' || key === 'club') {
                        data[key].forEach((value, index) => {
                            setValue(key, value, { shouldValidate: true });
                        });
                    } else if (key == 'semesters') {
                        console.log(data[key]);
                        setSemestersData(data[key]);
                    }
                    else {
                        const value = data[key];
                        setValue(key, value);
                    }
                }
            }
        });

        ipcRenderer.on("error-res", (event, errorMessage) => {
            console.error("Error fetching students:", errorMessage);
            // Handle the error as needed
        });

        return () => {
            ipcRenderer.removeAllListeners("success-res");
            ipcRenderer.removeAllListeners("error-res");
        }

    }, []);

    useEffect(() => {

        const fetchStudents = async () => {
            console.log("hello iam here");
            try {


                await api.getStudent(id);

            } catch (error) {
                console.error("Error fetching students:", error);
            }
        };

        fetchStudents();

    }, []);


    const onSubmit = async (data) => {
        // Handle form submission logic here
        console.log(data);
        try {

            //* into studentData append the data and semestersData
            const studentData = {
                ...data,
                semesters: semestersData
            }

            const sendData = {
                id,
                studentData
            }

            await api.updateStudent(sendData);

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <h1>EditStudent</h1>

            <form onSubmit={handleSubmit(onSubmit)}>

                <div>
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" {...register('name')} />
                    <p>{errors.name?.message}</p>
                </div>
                <div>
                    <label htmlFor="regNo">Registration Number:</label>
                    <input type="text" id="regNo" {...register('regNo')} />
                    <p>{errors.regNo?.message}</p>
                </div>
                <div>
                    <label htmlFor="fatherName">Father's Name:</label>
                    <input type="text" id="fatherName" {...register('fatherName')} />
                    <p>{errors.fatherName?.message}</p>
                </div>
                <div>
                    <label htmlFor="motherName">Mother's Name:</label>
                    <input type="text" id="motherName" {...register('motherName')} />
                    <p>{errors.motherName?.message}</p>
                </div>
                <div>
                    <label htmlFor="address">Address:</label>
                    <input type="text" id="address" {...register('address')} />
                    <p>{errors.address?.message}</p>
                </div>
                <div>
                    <label htmlFor="relationshipWithGuardian">Relationship with Guardian:</label>
                    <input type="text" id="relationshipWithGuardian" {...register('relationshipWithGuardian')} />
                    <p>{errors.relationshipWithGuardian?.message}</p>
                </div>
                <div>
                    <label htmlFor="admissionYear">Admission Year:</label>
                    <input type="number" id="admissionYear" {...register('admissionYear')} />
                    <p>{errors.admissionYear?.message}</p>
                </div>
                <div>
                    <label htmlFor="dateOfBirth">Date of Birth:</label>
                    <input type="date" id="dateOfBirth" {...register('dateOfBirth')} />
                    <p>{errors.dateOfBirth?.message}</p>
                </div>
                <div>
                    <label htmlFor="bloodGroup">Blood Group:</label>
                    <input type="text" id="bloodGroup" {...register('bloodGroup')} />
                    <p>{errors.bloodGroup?.message}</p>
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" {...register('email')} />
                    <p>{errors.email?.message}</p>
                </div>
                <div>
                    <label htmlFor="contactNumber">Contact Number:</label>
                    <input type="number" id="contactNumber" {...register('contactNumber')} />
                    <p>{errors.contactNumber?.message}</p>
                </div>
                <div>
                    <label htmlFor="whatsappNumber">Whatsapp Number:</label>
                    <input type="number" id="whatsappNumber" {...register('whatsappNumber')} />
                    <p>{errors.whatsappNumber?.message}</p>
                </div>
                <div>
                    <label htmlFor="parentContactNumber">Parent Contact Number:</label>
                    <input type="number" id="parentContactNumber" {...register('parentContactNumber')} />
                    <p>{errors.parentContactNumber?.message}</p>
                </div>
                <div>
                    <label htmlFor="previousSchool">Previous School:</label>
                    <input type="text" id="previousSchool" {...register('previousSchool')} />
                    <p>{errors.previousSchool?.message}</p>
                </div>
                <div>
                    <label htmlFor="sslcMarks">SSLC Marks:</label>
                    <input type="number" id="sslcMarks" {...register('sslcMarks')} />
                    <p>{errors.sslcMarks?.message}</p>
                </div>
                <div>
                    <label htmlFor="plusTwo">Plus Two:</label>
                    <input type="text" id="plusTwo" {...register('plusTwo')} />
                    <p>{errors.plusTwo?.message}</p>
                </div>
                <div>
                    <label htmlFor="stream">Stream:</label>
                    <input type="text" id="stream" {...register('stream')} />
                    <p>{errors.stream?.message}</p>
                </div>
                <div>
                    <label htmlFor="extracurricularActivities">Extracurricular Activities:</label>
                    <input type="text" id="extracurricularActivities" {...register('extracurricularActivities')} />
                    <p>{errors.extracurricularActivities?.message}</p>
                </div>
                <div>
                    <label>
                        NCC:
                        <input type="checkbox" {...register('ncc')} />
                    </label>
                </div>
                <div>
                    <label>
                        Scout:
                        <input type="checkbox" {...register('scout')} />
                    </label>
                </div>
                <div>
                    <label htmlFor="club">Club:</label>
                    <input type="text" id="club" {...register('club')} />
                    <p>{errors.club?.message}</p>
                </div>
                {/* <div>
                    <label htmlFor="photo">Photo:</label>
                    <input type="text" id="photo" {...register('photo')} />
                    <p>{errors.photo?.message}</p>
                </div> */}

                {/* semester form*/}
                {semestersData.map((semester, index) => (
                    <div key={index}>
                        <h3>Semester {semester.semesterNumber}</h3>
                        <div>
                            {semester.subjects.map((subject, subjectIndex) => (
                                <div key={subjectIndex}>
                                    <br />
                                    <h4>Subject {subjectIndex + 1}</h4>
                                    <label>Subject Name: {subject.name}</label>
                                    <br />

                                    <label>Attendance: {subject.attendance}</label>
                                    <br />

                                    <label>Seminar: {subject.seminar}</label>
                                    <br />

                                    <label>Assignment: {subject.assignment}</label>
                                    <br />

                                    <label>Internal: {subject.internal}</label>
                                    <br />

                                    <label>Total: {subject.total}</label>
                                    <br />

                                    <label>Exam: {subject.exam ? 'Yes' : 'No'}</label>

                                    <button type="button" onClick={() => removeSubject(semester.semesterNumber, subjectIndex)}>
                                        Remove Subject
                                    </button>
                                </div>
                            ))}

                            <button type="button" onClick={() => openModal(semester.semesterNumber)}>
                                Add Subject
                            </button>
                        </div>
                    </div>
                ))}

                <button type="submit">Submit</button>
            </form>

            <div>
                {isModalOpen && (
                    <div className="modal">
                        <div className="modal-content">
                            <h2>Add Subject for Semester {currentSemester}</h2>
                            <label>Name:</label>
                            <input
                                type="text"
                                value={subjectData.name}
                                onChange={(e) => setSubjectData({ ...subjectData, name: e.target.value })}
                            />
                            <br />
                            <label>Attendance:</label>
                            <input
                                type="number"
                                value={subjectData.attendance}
                                onChange={(e) => setSubjectData({ ...subjectData, attendance: e.target.value })}
                            />
                            <br />
                            <label>Seminar:</label>
                            <input
                                type="number"
                                value={subjectData.seminar}
                                onChange={(e) => setSubjectData({ ...subjectData, seminar: e.target.value })}
                            />
                            <br />
                            <label>Assignment:</label>
                            <input
                                type="number"
                                value={subjectData.assignment}
                                onChange={(e) => setSubjectData({ ...subjectData, assignment: e.target.value })}
                            />
                            <br />
                            <label>Internal:</label>
                            <input
                                type="number"
                                value={subjectData.internal}
                                onChange={(e) => setSubjectData({ ...subjectData, internal: e.target.value })}
                            />
                            <br />
                            <label>Total:</label>
                            <input
                                type="number"
                                value={subjectData.total}
                                onChange={(e) => setSubjectData({ ...subjectData, total: e.target.value })}
                            />
                            <br />
                            <label>Exam:</label>
                            <input
                                type="checkbox"
                                value={subjectData.exam}
                                onChange={(e) => setSubjectData({ ...subjectData, exam: e.target.checked })}
                            />



                            <br />
                            <button type="button" onClick={addSubject}>
                                Add Subject
                            </button>

                            <button type="button" onClick={closeModal}>
                                Close
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default EditStudent