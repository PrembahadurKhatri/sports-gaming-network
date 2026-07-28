import { Schema, model, Types } from "mongoose";

export interface IGround {
  owner: Types.ObjectId;

  groundName: string;

  sport:
    | "Football"
    | "Cricket"
    | "Futsal"
    | "Basketball"
    | "Volleyball"
    | "Badminton"
    | "Tennis"
    | "Kabaddi"
    | "Hockey"
    | "Handball";

  location: string;
  address: string;

coordinates: {
  type: "Point";
  coordinates: [number, number]; // [longitude, latitude]
};
  description?: string;

  images: string[];

  pricePerHour: number;

  openingTime: string;
  closingTime: string;

  amenities: string[];

  phone: string;

  indoor: boolean;

  status: "AVAILABLE" | "MAINTENANCE" | "CLOSED"|"ALREADY_BOOKED"|"PACKED";

  rating: number;

  totalReviews: number;
}

const groundSchema = new Schema<IGround>(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "Register",
      required: true,
    },
  


    groundName: {
      type: String,
      required: true,
      trim: true,
    },

    sport: {
      type: String,
      enum: [
        "Football",
        "Cricket",
        "Futsal",
        "Basketball",
        "Volleyball",
        "Badminton",
        "Tennis",
        "Kabaddi",
        "Hockey",
        "Handball",
      ],
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },

coordinates: {
  type: {
    type: String,
    enum: ["Point"],
    default: "Point",
  },
  coordinates: {
    type: [Number], // [longitude, latitude]
    required: true,
  },
},
    description: {
      type: String,
      default: "",
    },

    images: {
      type: [String],
      default: [],
    },

    pricePerHour: {
      type: Number,
      required: true,
    },

    openingTime: {
      type: String,
      required: true,
    },

    closingTime: {
      type: String,
      required: true,
    },

    amenities: {
      type: [String],
      default: [],
    },

    phone: {
      type: String,
      required: true,
    },

    indoor: {
      type: Boolean,
      default: false,
    },

 status: {
  type: String,
  enum: [
    "AVAILABLE",
    "MAINTENANCE",
    "CLOSED",
    "ALREADY_BOOKED",
    "PACKED",
  ],
  default: "AVAILABLE",
},
    rating: {
      type: Number,
      default: 0,
    },

    totalReviews: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

groundSchema.index({ sport: 1 });
groundSchema.index({ location: 1 });
groundSchema.index({ owner: 1 });
groundSchema.index({
  coordinates: "2dsphere",
  });
export default model<IGround>("Ground", groundSchema);