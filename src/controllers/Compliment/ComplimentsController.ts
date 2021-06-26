import { Request,  Response } from "express"
import { ComplimentsService } from "../../services/Compliment/ComplimentsService"

class ComplimentsController {

    async createCompliment(req: Request, res: Response) {
        const { tag_id, user_receiver, message  } = req.body
        const { user_id } = req
        const complimentService = new ComplimentsService()

        const compliment = await complimentService.createCompliment({
            tag_id, 
            user_sender: user_id, 
            user_receiver, 
            message 
        })

        return res.json(compliment)
    }

    async listReceived(req: Request, res: Response) {
        const { user_id } = req
        const complimentService = new ComplimentsService()

        const compliments = await complimentService.listReceiver(user_id)

        return res.json(compliments)
    }

    async listSend(req: Request, res: Response) {
        const { user_id } = req
        const complimentService = new ComplimentsService()

        const compliments = await complimentService.listSender(user_id)

        return res.json(compliments)
    }
}

export { ComplimentsController }