import express from "express"
import { ProductController } from "../controllers/product"


const router = express.Router()
const productController = new ProductController()

router.route("/").get(
  productController.getAllProducts
)

export { router as productRouter }