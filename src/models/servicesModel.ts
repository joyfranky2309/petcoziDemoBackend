import mongoose, { Schema, Document } from "mongoose";

// Define an interface for the Service document
export interface IService extends Document {
  name: string;
  description: string;
  category: "Grooming" | "Boarding" | "Vet";
  price: number;
  rating: number;
  availability: boolean;
  images: { url: string; alt?: string }[];
  promotions?: {
    discountPercentage: number;
    description: string;
    startDate: Date;
    endDate: Date;
  };
  operatingHours: {
    open: string;
    close: string;
  };
  reviews: {
    userId: mongoose.Types.ObjectId;
    comment: string;
    rating: number;
    createdAt: Date;
  }[];
  shopName: string;
  shopNumber: string;
  shopLocation: {
    address: string;
    city: string;
    state: string;
    zipCode: string;
    type: "Point";
    coordinates: [number, number]; // [longitude, latitude]
  };
  breeds: string[];
  tags: string[];
  cancellationPolicy?: {
    freeUntil: number;
    fee: number;
  };
}

// Create the schema
const ServiceSchema: Schema<IService> = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, enum: ["Grooming", "Boarding", "Vet"], required: true },
    price: { type: Number, required: true },
    rating: { type: Number, default: 0 },
    availability: { type: Boolean, default: true },
    images: [
      {
        url: { type: String, required: true },
        alt: { type: String },
      },
    ],
    promotions: {
      discountPercentage: { type: Number },
      description: { type: String },
      startDate: { type: Date },
      endDate: { type: Date },
    },
    operatingHours: {
      open: { type: String, required: true },
      close: { type: String, required: true },
    },
    reviews: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        comment: { type: String },
        rating: { type: Number, required: true, min: 1, max: 5 },
        createdAt: { type: Date, default: Date.now },
      },
    ],
    shopName: { type: String, required: true },
    shopNumber: { type: String, required: true },
    shopLocation: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zipCode: { type: String, required: true },
      type: { type: String, enum: ["Point"], required: true },
      coordinates: { type: [Number], required: true }, // [longitude, latitude]
    },
    breeds: { type: [String], required: true },
    tags: { type: [String], default: [] },
    cancellationPolicy: {
      freeUntil: { type: Number },
      fee: { type: Number },
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt timestamps
);

// Create and export the model
const Service = mongoose.model<IService>("Service", ServiceSchema);
export default Service;
