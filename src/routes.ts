import { Router } from "express"

import { UserController } from "./controllers/User/UserController"
import { TagController } from "./controllers/Tag/TagController"
import { AuthenticateUserController } from "./controllers/User/AuthenticateUserController"
import { ComplimentsController } from "./controllers/Compliment/ComplimentsController"

import { ensureAdmin } from "./middleware/ensureAdmin"
import { ensureAuthenticated } from "./middleware/ensureAuthenticated"

const router = Router()

const authenticateUserController = new AuthenticateUserController()
const userController = new UserController()
const tagController = new TagController()

const complimentsController = new ComplimentsController()

//Authenticate route
router.post("/login", authenticateUserController.handle)

//User routes
router.get("/user-list", userController.listUsers)
router.post("/user", userController.createUser)
router.put("/update/:id", ensureAuthenticated, userController.updateUserCredentials)

//Tag routes
router.get("/tags", ensureAuthenticated, tagController.listTag)
router.post("/tag", ensureAuthenticated, ensureAdmin, tagController.createTag)

//Compliments routes
router.post("/compliment", ensureAuthenticated, complimentsController.createCompliment)
router.get("/user/compliments/send", ensureAuthenticated, complimentsController.listSend)
router.get("/user/compliments/receive", ensureAuthenticated, complimentsController.listReceived)




export { router }