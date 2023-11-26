import express from "express"
import { ProductController } from "../controllers/product"
import { requireAuth, restrictAccess, validateRequest } from "@kunleticket/common"
import { validateBody } from "../middlewares/validations"


const router = express.Router()
const productController = new ProductController()

router.route("/").get(
  productController.getAllProducts
)

router.route("/:id").get(
  productController.getOneProduct
)

// Restrict access to Admin only
router.use(requireAuth)
router.use(restrictAccess)

router.route("/").post(
  validateBody(["name", "price", "category", "description"]),
  validateRequest,
  productController.createProduct
)

router.route("/:id").patch(
  productController.updateProduct
)

router.route("/:id").delete(
  productController.deleteProduct
)

export { router as productRouter }