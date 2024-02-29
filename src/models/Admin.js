import { Schema, model } from 'mongoose';

const AdminSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    subject: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true, // Ensure unique email addresses
    },
    contactNumber: {
        type: Number,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});

const Admin = model('Admin', AdminSchema);

export default Admin;
