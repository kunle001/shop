import mongoose, { Model, Document } from "mongoose";

// params for creating a product
interface ProductAttrs {
  name: string;
  price: number;
  description: string;
  category: string;
}

// interface of what a product document returns 
export interface ProductDoc extends Document {
  name: string;
  price: number;
  description: string;
  category: string;
  createdAt: string;
  updatedAt: string;
}

interface ProductModel extends Model<ProductDoc> {
  // the build method will allow controlling type/fields when creating
  // a new product record,
  build(attrs: ProductAttrs): ProductDoc;
}

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        // unnecessary field, doc version
        delete ret.__v;
      },
    },
  }
);

// Add an index on the createdAt field for sorting in ascending order
productSchema.index({ createdAt: 1 });

// setting up the build method that takes in only required parameters
productSchema.statics.build = (attrs: ProductAttrs) => {
  return new Product(attrs);
};

const Product = mongoose.model<ProductDoc, ProductModel>('Product', productSchema);

export { Product };
