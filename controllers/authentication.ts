import { Request, Response } from "express";
import { User } from "../models/user";
import { Password } from "../utils/password";
import { BadRequestError } from "@kunleticket/common";
import { Respond } from "../utils/response";
import { setCookies } from "../utils/setCookie";

export class AuthenticationController {

  public Login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    // check if user exists
    const user = await User.findOne({
      email
    });

    //I used my npm package for error handling
    if (!user) throw new BadRequestError("no existing email")
    // check if password is correct
    const isMatch = await Password.compare(user.password, password);

    const payload = {
      id: user.id,
      email: user.email,
      role: user.role
    };

    // setting the json web token
    setCookies(payload, req, res);

    if (!isMatch) {
      throw new BadRequestError("wrong password")
    };

    Respond(200, "logged in successfully", res)
  };

  public Logout = (req: Request, res: Response) => {
    res.cookie('secretoken', "");
  };

  public Signup = async (req: Request, res: Response) => {
    const { email, password, name, confirmPassword } = req.body;

    const existingEmail = await User.findOne({
      email
    });

    if (existingEmail) {
      throw new BadRequestError("email is taken")
    } else if (password != confirmPassword) {
      throw new BadRequestError("confirm your password correctly")
    }

    let user = User.build({
      name,
      email,
      password
    });

    user = await user.save()
    Respond(201, user, res)
  };
}