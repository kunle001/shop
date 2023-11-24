import { Response } from "express"

export const Respond = (status: number, data: any, res: Response): Response => {
  return res.status(status).json({
    status: true,
    data
  })
}