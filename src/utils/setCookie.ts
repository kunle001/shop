import jwt from "jsonwebtoken"
import { Response, Request } from "express"


export interface setCookiePayload {
  id: string
  email: string,
  role?: "admin" | "user"
}


//this function saves jwt in a cookie, just to access protected routes

export const setCookies = (payload: setCookiePayload, req: Request, res: Response): string => {
  const userjwt = jwt.sign({
    ...payload,
  }, process.env.JWT_KEY!, {
    expiresIn: Date.now() + 2 * 2 * 60 * 60 * 1000
  });

  // Store it on session
  res.cookie('secretoken', userjwt, {
    expires: new Date(
      Date.now() + 2 * 2 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
    // sameSite: "none"
  });

  return userjwt;
}
