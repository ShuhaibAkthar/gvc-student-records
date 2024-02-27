import React, { useState } from 'react';
import './style.css';

function TestForm() {
    const [data, setData] = useState([
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
        setData((prevData) => {
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
        setData((prevData) => {
            const newData = [...prevData];
            newData[semesterNumber - 1].subjects.splice(index, 1);
            return newData;
        });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(data);
    };

    return (
        <div>
            <h1>Semester Form</h1>
            <form onSubmit={onSubmit}>
                {data.map((semester, index) => (
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
    );
}

export default TestForm;
