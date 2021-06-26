import { getCustomRepository } from "typeorm"
import { ComplimentsRepositories } from "../../repositories/ComplimentsRepositories"
import { UsersRepositories } from "../../repositories/UserRepositories"

interface IComplimentsRequest {
    tag_id: string;
    user_sender: string;
    user_receiver: string;
    message: string;
}
class ComplimentsService {
    async createCompliment ({ 
        tag_id, 
        user_sender, 
        user_receiver, 
        message 
    } : IComplimentsRequest) {
        const complimentsRepositories = getCustomRepository(ComplimentsRepositories)
        const userRepositories = getCustomRepository(UsersRepositories)

        if (user_sender === user_receiver) {
            throw new Error("Incorrect User Receiver")
        }
        
        const userReceiverExists = await userRepositories.findOne(user_receiver)
        if (!userReceiverExists) {
            throw new Error("User receiver not exists")
        }

        const compliment = complimentsRepositories.create({
            tag_id,
            user_receiver,
            user_sender,
            message
        })

        await complimentsRepositories.save(compliment)

        return compliment
        
    }

    async listReceiver(user_id: string) {
        const complimentsRepositories = getCustomRepository(ComplimentsRepositories)

        const compliments = await complimentsRepositories.find({
            where: {
                user_receiver: user_id
            },
            relations: ["userSender", "userReceiver", "tag"],
        })

        return compliments
    }

    async listSender(user_id: string) {
        const complimentsRepositories = getCustomRepository(ComplimentsRepositories)

        const compliments = await complimentsRepositories.find({
            where: {
                user_sender: user_id
            }
        })

        return compliments
    }
}

export { ComplimentsService }