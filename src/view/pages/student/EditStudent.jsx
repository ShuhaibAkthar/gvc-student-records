import React, { useEffect } from 'react';
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

    //* get the id from the url
    const { id } = useParams();

    const { handleSubmit, control, register, formState: { errors }, setValue } = useForm({
        resolver: yupResolver(schema),
    });

    useEffect(() => {

        const fetchStudents = async () => {
            try {
                const { ipcRenderer } = window.electron;

                await api.getStudent(id);

                ipcRenderer.on("success-res", (event, data) => {
                    //* use the data to set the form values
                    data = JSON.parse(data);
                    console.log(data);
                    //* use loop to set the form values
                    for (const key in data) {
                        if (data.hasOwnProperty(key)) {
                            const value = data[key];
                            setValue(key, value);
                        }
                    }
                });

                ipcRenderer.on("error-res", (event, errorMessage) => {
                    console.error("Error fetching students:", errorMessage);
                    // Handle the error as needed
                });
            } catch (error) {
                console.error("Error fetching students:", error);
            }
        };

        fetchStudents();
    }, []);



    const { fields: semesters, appendSemester, removeSemester } = useFieldArray({
        control,
        name: 'semesters',
    });

    const { fields: subjectsFields, appendSubject, removeSubject } = useFieldArray({
        control,
        name: 'subjects',
    });

    const addSemester = () => {
        appendSemester({ semesterNumber: semesters.length + 1, subjects: [] });
    };

    const removeSemesterAtIndex = (index) => {
        removeSemester(index);
    };

    const addSubject = (semesterIndex) => {
        appendSubject({ name: '', attendance: '', seminar: '', assignment: '', internal: '', total: '', exam: '' });
    };

    const removeSubjectAtIndex = (semesterIndex, subjectIndex) => {
        removeSubject(subjectIndex);
    };

    const onSubmit = async (data) => {
        // Handle form submission logic here
        console.log(data);
        try {

            const sendData = {
                id,
                studentData: data
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


                <button type="submit">Submit</button>
            </form>

            <div>
                <Link to={`/student/edit/semester/${id}`}>
                    Edit Semester
                </Link>
            </div>
        </div>
    )
}

export default EditStudent