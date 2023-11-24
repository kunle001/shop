import { Request, Response } from "express"
import { Product, ProductDoc } from "../models/product";
import { Respond } from "../utils/response";
import { NotFoundError } from "@kunleticket/common";
import { APIFeatures } from "../utils/apiFeatures";

export class ProductController {

  private _productExist = async (id: string): Promise<ProductDoc> => {
    let product = await Product.findById(id);

    if (!product) {
      throw new NotFoundError("no product with this id")
    };

    return product;
  }

  public createProduct = async (req: Request, res: Response) => {
    const { name, price, description, category } = req.body

    let product = Product.build({
      name,
      price,
      description,
      category
    });

    product = await product.save()

    Respond(201, product, res)
  };

  public updateProduct = async (req: Request, res: Response) => {
    let product = await this._productExist(req.params.id);


    product.set({
      ...req.body
    });

    product = await product.save()
    Respond(200, product, res)

  };

  public deleteProduct = async (req: Request, res: Response) => {
    let product = await this._productExist(req.params.id)
    await product.deleteOne()

    Respond(200, "product deleted", res)
  };

  public getAllProducts = async (req: Request, res: Response) => {
    const apiFeatures = new APIFeatures(Product.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    // Get the final query
    const query = apiFeatures.query;

    // Execute the query
    const products = await query;

    Respond(200, products, res)
  };

  public getOneProduct = async (req: Request, res: Response) => {
    let product = await this._productExist(req.params.id)

    Respond(200, product, res)
  };
}

