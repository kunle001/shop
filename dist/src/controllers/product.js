"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const product_1 = require("../models/product");
const response_1 = require("../utils/response");
const common_1 = require("@kunleticket/common");
const apiFeatures_1 = require("../utils/apiFeatures");
class ProductController {
    constructor() {
        this._productExist = async (id) => {
            let product = await product_1.Product.findById(id);
            if (!product) {
                throw new common_1.NotFoundError("no product with this id");
            }
            ;
            return product;
        };
        this.createProduct = async (req, res) => {
            const { name, price, description, category } = req.body;
            let product = product_1.Product.build({
                name,
                price,
                description,
                category
            });
            product = await product.save();
            (0, response_1.Respond)(201, product, res);
        };
        this.updateProduct = async (req, res) => {
            let product = await this._productExist(req.params.id);
            product.set({
                ...req.body
            });
            product = await product.save();
            (0, response_1.Respond)(200, product, res);
        };
        this.deleteProduct = async (req, res) => {
            let product = await this._productExist(req.params.id);
            await product.deleteOne();
            (0, response_1.Respond)(200, "product deleted", res);
        };
        this.getAllProducts = async (req, res) => {
            const apiFeatures = new apiFeatures_1.APIFeatures(product_1.Product.find(), req.query)
                .filter()
                .sort()
                .limitFields()
                .paginate();
            // Get the final query
            const query = apiFeatures.query;
            // Execute the query
            const products = await query;
            (0, response_1.Respond)(200, products, res);
        };
        this.getOneProduct = async (req, res) => {
            let product = await this._productExist(req.params.id);
            (0, response_1.Respond)(200, product, res);
        };
    }
}
exports.ProductController = ProductController;
//# sourceMappingURL=product.js.map