import mongoose, { Model, Document } from "mongoose";
import { Password } from "../utils/password";

// params for creating/signing up a user
interface UserAttrs {
  email: string
  name: string
  password: string
}

interface UserDoc extends Document {
  email: string
  password: string
  name?: string
  role: "admin" | "user"
  createdAt: string
  updatedAt: string
}

interface UserModel extends Model<UserDoc> {
  // the build method will allow controlling type/fields when creating
  // a new user record, 
  build(attrs: UserAttrs): UserDoc;
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  name: String,
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user"
  }
}, {
  timestamps: true,
  toJSON: {
    transform(doc, ret) {
      // hidding password for security
      delete ret.password;
      // unnecessary field, doc version
      delete ret.__v
    }
  }
});


// Hash password before saving it to the DB
userSchema.pre('save', async function (done) {
  if (this.isModified('password')) {
    const hashed = await Password.toHash(this.get('password'));
    this.set('password', hashed)
  };
  done();
});

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs)
};

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User }