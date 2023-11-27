"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRouter = void 0;
const express_1 = __importDefault(require("express"));
const product_1 = require("../controllers/product");
const common_1 = require("@kunleticket/common");
const validations_1 = require("../middlewares/validations");
const router = express_1.default.Router();
exports.productRouter = router;
const productController = new product_1.ProductController();
router.route("/").get(productController.getAllProducts);
router.route("/:id").get(productController.getOneProduct);
// Restrict access to Admin only
router.use(common_1.requireAuth);
router.use(common_1.restrictAccess);
router.route("/").post((0, validations_1.validateBody)(["name", "price", "category", "description"]), common_1.validateRequest, productController.createProduct);
router.route("/:id").patch(productController.updateProduct);
router.route("/:id").delete(productController.deleteProduct);
//# sourceMappingURL=product.js.map