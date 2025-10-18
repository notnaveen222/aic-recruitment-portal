import mongoose from "mongoose";

const applicantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    registrationNumber: {
      type: String,
      required: [true, "Registration Number is required"],
      trim: true,
      unique: true,
    },
    phone: {
      type: String,
      required: [true, "Phone number (WhatsApp no.) is required"],
      trim: true,
      validate: {
        validator: function (v: string) {
          return /^[6-9]\d{9}$/.test(v);
        },
        message: "Please enter a valid 10-digit Indian phone number",
      },
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      validate: {
        validator: function (v: string) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        },
        message: "Please enter a valid email address",
      },
    },
    firstPreference: {
      type: String,
      required: [true, "First Preference is required"],
      enum: {
        values: [
          "Operations",
          "Technical",
          "Creative",
          "Visual Media",
          "Outreach",
        ],
        message: "{VALUE} is not a valid department",
      },
    },
    firstPreferenceReason: {
      type: String,
      required: [true, "Reason for first preference is required"],
      trim: true,
      minlength: [50, "Please provide at least 50 characters for your reason"],
    },
    secondPreference: {
      type: String,
      required: [true, "Second Preference is required"],
      enum: {
        values: [
          "Operations",
          "Technical",
          "Creative",
          "Visual Media",
          "Outreach",
        ],
        message: "{VALUE} is not a valid department",
      },
      validate: {
        validator: function (
          this: mongoose.Document & { firstPreference?: string },
          value: string
        ) {
          return value !== this.firstPreference;
        },
        message: "Second preference must be different from first preference",
      },
    },
    secondPreferenceReason: {
      type: String,
      required: [true, "Reason for second preference is required"],
      trim: true,
      minlength: [50, "Please provide at least 50 characters for your reason"],
    },
    whyJoinClub: {
      type: String,
      required: [true, "Please tell us why you wish to join our club"],
      trim: true,
      minlength: [30, "Please provide at least 30 characters"],
    },
    previousExperience: {
      type: String,
      default: "",
      trim: true,
    },
    workLink: {
      type: String,
      default: "",
      trim: true,
      validate: {
        validator: function (
          this: mongoose.Document & {
            firstPreference?: string;
            secondPreference?: string;
          },
          v: string
        ) {
          if (!v || v.length === 0) {
            if (
              this.firstPreference === "Technical" ||
              this.firstPreference === "Creative" ||
              this.secondPreference === "Technical" ||
              this.secondPreference === "Creative"
            ) {
              return false;
            }
            return true;
          }

          // URL format validation
          try {
            const url = new URL(v);
            if (!["http:", "https:"].includes(url.protocol)) {
              return false;
            }
            return true;
          } catch {
            return false;
          }
        },
        message:
          "GitHub or website link is mandatory for Technical and Creative departments and must be a valid URL (http:// or https://).",
      },
    },
    status: {
      type: String,
      enum: ["pending", "shortlisted", "rejected", "selected"],
      default: "pending",
    },
    assignedDepartment: {
      type: String,
      enum: [
        "Operations",
        "Technical",
        "Creative",
        "Visual Media",
        "Outreach",
        "none",
      ],
      default: "none",
    },
    shortlistedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    shortlistedAt: {
      type: Date,
      default: null,
    },
    notes: {
      type: String,
      default: "",
      trim: true,
    },
    emailSent: {
      type: Boolean,
      default: false,
    },
    emailSentAt: {
      type: Date,
      default: null,
    },
    interviewScheduled: {
      type: Boolean,
      default: false,
    },
    interviewDetails: {
      date: {
        type: String,
        default: "",
      },
      time: {
        type: String,
        default: "",
      },
      venue: {
        type: String,
        default: "",
      },
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
applicantSchema.index({ email: 1, registrationNumber: 1 });
applicantSchema.index({ status: 1, firstPreference: 1 });
applicantSchema.index({ status: 1, secondPreference: 1 });
applicantSchema.index({ firstPreference: 1, secondPreference: 1 });

// Pre-save check for workLink requirement
applicantSchema.pre("save", function (next) {
  const doc = this as mongoose.Document & {
    firstPreference?: string;
    secondPreference?: string;
    workLink?: string;
  };
  if (
    (doc.firstPreference === "Technical" ||
      doc.firstPreference === "Creative" ||
      doc.secondPreference === "Technical" ||
      doc.secondPreference === "Creative") &&
    (!doc.workLink || doc.workLink.length === 0)
  ) {
    return next(
      new Error(
        "GitHub or website link is mandatory for Technical and Creative departments"
      )
    );
  }
  next();
});

export default mongoose.models.Applicant ||
  mongoose.model("Applicant", applicantSchema);
