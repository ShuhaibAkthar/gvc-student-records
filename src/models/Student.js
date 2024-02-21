import { Schema, model } from 'mongoose';

const studentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  regNo: {
    type: String,
    required: true,
  },
  fatherName: {
    type: String,
    required: true,
  },
  motherName: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  relationshipWithGuardian: {
    type: String,
    required: true,
  },
  admissionYear: {
    type: Number,
    required: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  bloodGroup: {
    type: String
  },
  email: String,
  contactNumber: {
    type: Number,
    required: true,
  },
  whatsappNumber: {
    type: Number,
  },
  parentContactNumber: {
    type: Number,
    required: true,
  },
  previousSchool: {
    type: String,
    required: true,
  },
  sslcMarks: {
    type: Number,
  },
  plusTwo: {
    type: String,
  },
  stream: {
    type: String,
  },
  extracurricularActivities: [String],
  ncc: {
    type: Boolean,
  },
  scout: {
    type: Boolean,
  },
  club: [String],
  photo: {//TODO: check the photo working
    type: String,
  },
  semesters: [
    {
      semesterNumber: {
        type: Number,
        required: true,
      },
      subjects: [
        {
          name: {
            type: String,
            required: true,
          },
          attendance: {
            type: Number,
          },
          seminar: {
            type: Number,
          },
          assignment: {
            type: Number,
          },
          internal: {
            type: Number,
          },
          total: {
            type: Number,
          },
          exam: {
            type: Number,
          },
        },
      ],
    },
  ],
});

export default model('Student', studentSchema);
