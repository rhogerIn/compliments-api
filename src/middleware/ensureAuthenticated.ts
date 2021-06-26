import { Request, Response, NextFunction, response } from "express"
import { verify } from "jsonwebtoken"

interface IPayload {
    sub: string;
}

export function ensureAuthenticated(
    req: Request, 
    res: Response, 
    next: NextFunction
) {

    //Receive token
    const authToken = req.headers.authorization
    
    //Validate token was correct
    if (!authToken) {
        return res.status(401).end()
    }

    const [, token] = authToken.split(" ")
    

    try {
        //Validate if token was true
        const { sub } = verify(token, "170e46bf5e0cafab00cac3a650910837") as IPayload
        req.user_id = sub
        
        return next()
    } catch(err) {
        return res.status(401).end
    }

    // Get user info
    
}