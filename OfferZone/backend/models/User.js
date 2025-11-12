const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true,
            maxlength: 100,
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowercase: true,
            trim: true,
            match: [
                /^\S+@\S+\.\S+$/,
                "Please provide a valid email address",
            ],
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: [6, "Password must be at least 6 characters"],
            select: false, // Don't return password by default
        },
        role: {
            type: String,
            enum: ["retailer", "customer", "admin"],
            required: true,
            default: "customer",
        },
        city: {
            type: String,
            trim: true,
            maxlength: 100,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        profile: {
            type: mongoose.Schema.Types.Mixed, // For future extensibility
            default: {},
        },
    },
    { timestamps: true }
);

// Indexes for scalability
userSchema.index({ email: 1 });
userSchema.index({ role: 1 });

module.exports = mongoose.model("User", userSchema);
