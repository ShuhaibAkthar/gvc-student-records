import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Navbar from "../../Components/Navbar/Navbar.jsx";
import "./Createstudent.css";
import { Link } from "react-router-dom";

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
    <body>
      <div class="nav-div">
        <Navbar />
      </div>
      <div class="container">
      
        <div>
          <h1 class="main-head">Create Student</h1>
          {isLoading && <p>Creating student...</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}
          <form onSubmit={handleSubmit(handleStudentCreation)}>
            <div class="divtype1">
              <label htmlFor="name">Name</label>
              <input
                class="inputtext"
                type="text"
                id="name"
                {...register("name", { required: true })}
              />
              {errors.name && (
                <p style={{ color: "red" }}>{errors.name.message}</p>
              )}
            </div>

            <div class="div-photo">
              <div class="photo">
                <img src=""></img>
              </div>
            </div>

            <div class="divtype1">
              <label htmlFor="fatherName">Father's Name</label>
              <input
                class="inputtext"
                type="text"
                id="fatherName"
                {...register("fatherName", { required: true })}
              />
              {errors.fatherName && (
                <p style={{ color: "red" }}>{errors.fatherName.message}</p>
              )}
            </div>

            <div class="divtype1">
              <label htmlFor="motherName">Mother's Name</label>
              <input
                class="inputtext"
                type="text"
                id="motherName"
                {...register("motherName", { required: true })}
              />
              {errors.motherName && (
                <p style={{ color: "red" }}>{errors.motherName.message}</p>
              )}
            </div>

            <div class="divtype2">
              <label htmlFor="regNo">Registration Number</label>
              <input
                class="inputtext"
                type="text"
                id="regNo"
                {...register("regNo", { required: true })}
              />
              {errors.regNo && (
                <p style={{ color: "red" }}>{errors.regNo.message}</p>
              )}
            </div>

            <div class="divtype1">
              <label htmlFor="address">Address</label>
              <textarea
                class="inputtext"
                id="address"
                {...register("address", { required: true })}
              />
              {errors.address && (
                <p style={{ color: "red" }}>{errors.address.message}</p>
              )}
            </div>
            <div class="divtype2">
              <label htmlFor="admissionYear">Admission Year</label>
              <input
                class="inputtext"
                type="number"
                id="admissionYear"
                {...register("admissionYear", { required: true })}
              />
              {errors.admissionYear && (
                <p style={{ color: "red" }}>{errors.admissionYear.message}</p>
              )}
            </div>

            <div class="divtype1">
              <label htmlFor="relationshipWithGuardian">
                Relationship with Guardian
              </label>
              <input
                class="inputtext"
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

            <div class="divtype2">
              <label for="">Class NO:</label>
              <br />
              <input class="inputtext" type="text" />
            </div>

            <div class="divtype1">
              <label htmlFor="dateOfBirth">Date of Birth</label>
              <input
                class="inputtext"
                type="date"
                id="dateOfBirth"
                {...register("dateOfBirth", { required: true })}
              />
              {errors.dateOfBirth && (
                <p style={{ color: "red" }}>{errors.dateOfBirth.message}</p>
              )}
            </div>

            <div class="divtype1">
              <label htmlFor="contactNumber">Contact Number</label>
              <input
                class="inputtext"
                type="number"
                id="contactNumber"
                {...register("contactNumber", { required: true })}
              />
              {errors.contactNumber && (
                <p style={{ color: "red" }}>{errors.contactNumber.message}</p>
              )}
            </div>

            <div class="divtype1">
              <label htmlFor="parentContactNumber">Parent Contact Number</label>
              <input
                class="inputtext"
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

            <div class="divtype1">
              <br />
              <label for="">Mother Number</label>
              <br />
              <input class="inputtext" type="number" />
            </div>

            <div class="divtype1">
              <br />
              <label for=""></label>Blood Grp:
              <br />
              <select id="bloodgrp" name="bloodgrp">
                <option value="au">O +</option>
                <option value="ca">O -</option>
                <option value="usa">A +</option>
                <option value="usa">A -</option>
                <option value="usa">B +</option>
                <option value="usa">B -</option>
                <option value="usa">AB +</option>
                <option value="usa">AB -</option>
              </select>
            </div>

            <div class="divtype1">
              <br />
              <label for=""></label>Email ID:
              <br />
              <input class="inputtext" type="text" />
            </div>

            <div class="divtype1">
              <label htmlFor="previousSchool">Last studied Institution</label>
              <input
                class="inputtext"
                type="text"
                id="previousSchool"
                {...register("previousSchool", { required: true })}
              />
              {errors.previousSchool && (
                <p style={{ color: "red" }}>{errors.previousSchool.message}</p>
              )}
            </div>

            <div class="divtype1">
              <label>Mark Obtained(%)</label> <br />
              <label for=""></label>SSLC
              <br />
              <input class="inputtext" type="text" />
            </div>

            <div class="divtype2">
              <br />
              <label for=""></label>Plus Two
              <br />
              <input class="inputtext" type="text" />
            </div>

            <div class="divtype1">
              <br />
              <label for=""></label>Stream
              <br />
              <select id="bloodgrp" name="bloodgrp">
                <option value="au">Stateboard</option>
                <option value="ca">CBSE</option>
                <option value="usa">Vocational</option>
                <option value="usa">ISC</option>
                <option value="usa">NIOS</option>
              </select>
            </div>

            <div class="divtype1">
              <br />
              <label for="">Using Collage bus?</label>
              <br />
              <select id="bus" name="bus">
                <option value="au">Yes</option>
                <option value="ca">No</option>
              </select>
            </div>

            <div class="divtype2">
              <br />
              <label htmlFor="">Bus No:</label>
              <input class="inputtext" type="text" />
            </div>

            <div class="divtype1">
              <label htmlFor="">Social Media ID's:</label>
              <br />
              <label htmlFor="">Facebook:</label>
              <input class="inputtext" type="text" />
            </div>

            <div class="divtype2">
              <br />
              <label htmlFor="">Instagram</label>
              <input class="inputtext" type="text" />
            </div>

            <div class="divtype1">
              <label htmlFor="">Extracurricular/Achievments:</label>
              <br />
              <label htmlFor="">Sports</label>
              <input class="inputtext" type="text" />
            </div>
            <div class="divtype2">
              <br />
              <label htmlFor="">Arts</label>
              <input class="inputtext" type="text" />
            </div>
            <div class="divtype1">
              <label htmlFor="">Achievments</label>
              <input class="inputtext" type="text" />
            </div>

            <div class="divtype1">
              <label htmlFor="">Participation</label>
              <select id="participation" name="participation">
                <option value="au">NSS</option>
                <option value="ca">NCC</option>
                <option value="usa">SCOUT&GUIDE</option>
              </select>
            </div>

            <div class="divtype2">
              <label htmlFor="">Clubs</label>
              <input class="inputtext" type="text" />
            </div>

            <div class="divtype1">
              <button class="submitbtn" type="submit">
                Create Student
              </button>
            </div>
          </form>
        </div>
      </div>
    </body>
  );
}

export default CreateStudent;
