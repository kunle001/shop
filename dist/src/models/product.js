"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const productSchema = new mongoose_1.default.Schema({
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
}, {
    timestamps: true,
    toJSON: {
        transform(doc, ret) {
            // unnecessary field, doc version
            delete ret.__v;
        },
    },
});
// setting up the build method that takes in only required parameters
productSchema.statics.build = (attrs) => {
    return new Product(attrs);
};
const Product = mongoose_1.default.model('Product', productSchema);
exports.Product = Product;
//# sourceMappingURL=product.js.map