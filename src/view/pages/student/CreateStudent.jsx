import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object({
    name: yup.string().required("Name is required"),
    regNo: yup.string().required("Reg No is required"),
    fatherName: yup.string().required("Father's Name is required"),
    motherName: yup.string().required("Mother's Name is required"),
    address: yup.string().required("Address is required"),
    relationshipWithGuardian: yup
        .string()
        .required("Relationship with Guardian is required"),
    admissionYear: yup.number().required("Admission Year is required").min(2000),
    dateOfBirth: yup.date().required("Date of Birth is required"),
    contactNumber: yup
        .number()
        .required("Contact Number is required")
        .min(1000000000, "Invalid Contact Number"),
    parentContactNumber: yup
        .number()
        .required("Parent Contact Number is required")
        .min(1000000000, "Invalid Contact Number"),
    previousSchool: yup.string().required("Previous School is required"),
});

function CreateStudent() {

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: yupResolver(schema) });

    useEffect(() => {
        const { ipcRenderer } = window.electron;

        // Listen for success event
        ipcRenderer.on("success-res", (event, res) => {
            setIsLoading(false);
            console.log("Student created successfully:", res);
            // Handle success as needed (e.g., redirect to list)
        });

        // Listen for error event
        ipcRenderer.on("error-res", (event, errorMessage) => {
            setIsLoading(false);
            setError(errorMessage);
            console.error("Error creating student:", errorMessage);
        });

        return () => {
            ipcRenderer.removeAllListeners("success-res");
            ipcRenderer.removeAllListeners("error-res");
        };
    }, []);

    const handleStudentCreation = async (data) => {
        setIsLoading(true);
        try {
            await api.createStudent(data); // Send only required fields
        } catch (error) {
            setError(error.message || "Error creating student");
        } finally {
            setIsLoading(false);
        }
    };

    return (

        <div>
            <h1>Create Student</h1>
            {isLoading && <p>Creating student...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={handleSubmit(handleStudentCreation)}>
                <div>
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        {...register("name", { required: true })}
                    />
                    {errors.name && (
                        <p style={{ color: "red" }}>{errors.name.message}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="regNo">Registration Number</label>
                    <input
                        type="text"
                        id="regNo"
                        {...register("regNo", { required: true })}
                    />
                    {errors.regNo && (
                        <p style={{ color: "red" }}>{errors.regNo.message}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="fatherName">Father's Name</label>
                    <input
                        type="text"
                        id="fatherName"
                        {...register("fatherName", { required: true })}
                    />
                    {errors.fatherName && (
                        <p style={{ color: "red" }}>{errors.fatherName.message}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="motherName">Mother's Name</label>
                    <input
                        type="text"
                        id="motherName"
                        {...register("motherName", { required: true })}
                    />
                    {errors.motherName && (
                        <p style={{ color: "red" }}>{errors.motherName.message}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="address">Address</label>
                    <textarea
                        id="address"
                        {...register("address", { required: true })}
                    />
                    {errors.address && (
                        <p style={{ color: "red" }}>{errors.address.message}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="relationshipWithGuardian">
                        Relationship with Guardian
                    </label>
                    <input
                        type="text"
                        id="relationshipWithGuardian"
                        {...register("relationshipWithGuardian", { required: true })}
                    />
                    {errors.relationshipWithGuardian && (
                        <p style={{ color: "red" }}>
                            {errors.relationshipWithGuardian.message}
                        </p>
                    )}
                </div>

                <div>
                    <label htmlFor="admissionYear">Admission Year</label>
                    <input
                        type="number"
                        id="admissionYear"
                        {...register("admissionYear", { required: true })}
                    />
                    {errors.admissionYear && (
                        <p style={{ color: "red" }}>{errors.admissionYear.message}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="dateOfBirth">Date of Birth</label>
                    <input
                        type="date"
                        id="dateOfBirth"
                        {...register("dateOfBirth", { required: true })}
                    />
                    {errors.dateOfBirth && (
                        <p style={{ color: "red" }}>{errors.dateOfBirth.message}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="contactNumber">Contact Number</label>
                    <input
                        type="number"
                        id="contactNumber"
                        {...register("contactNumber", { required: true })}
                    />
                    {errors.contactNumber && (
                        <p style={{ color: "red" }}>{errors.contactNumber.message}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="parentContactNumber">Parent Contact Number</label>
                    <input
                        type="number"
                        id="parentContactNumber"
                        {...register("parentContactNumber", { required: true })}
                    />
                    {errors.parentContactNumber && (
                        <p style={{ color: "red" }}>
                            {errors.parentContactNumber.message}
                        </p>
                    )}
                </div>

                <div>
                    <label htmlFor="previousSchool">Previous School</label>
                    <input
                        type="text"
                        id="previousSchool"
                        {...register("previousSchool", { required: true })}
                    />
                    {errors.previousSchool && (
                        <p style={{ color: "red" }}>{errors.previousSchool.message}</p>
                    )}
                </div>

                <button type="submit">Create Student</button>
            </form>
        </div>
    );
}

export default CreateStudent