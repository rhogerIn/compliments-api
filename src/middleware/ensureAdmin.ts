import { Request, Response, NextFunction } from "express"
import { getCustomRepository } from "typeorm"
import { UsersRepositories } from "../repositories/UserRepositories"

export async function ensureAdmin(
    req: Request, 
    res: Response, 
    next: NextFunction
) {
    const { user_id } = req
    console.log(user_id)

    const userRepositores = getCustomRepository(UsersRepositories)
    const { admin } = await userRepositores.findOne(user_id)
    
    if (admin) {
        return next()
    }

    return res.status(401).json({
        error: "Unauthorized"
    })
}