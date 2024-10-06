import { Document, Types } from "mongoose";

// Define the TypeScript interface for Property
export interface IProperty {
  _id?: string;
  owner: string; // Reference to the User model
  name: string;
  type: string;
  description?: string;
  location: {
    street?: string;
    city?: string;
    state?: string;
    zipcode?: string;
  };
  beds: number;
  baths: number;
  square_feet: number;
  amenities?: string[];
  rates: {
    nightly?: number;
    weekly?: number;
    monthly?: number;
  };
  seller_info: {
    name?: string;
    email?: string;
    phone?: string;
  };
  images: string[];
  is_featured?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export type PropertyDocument = Omit<IProperty, "owner" | "_id"> &
  Document & {
    owner: Types.ObjectId;
    _id: Types.ObjectId;
  };
