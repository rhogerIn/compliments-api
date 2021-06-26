import { Request, Response } from "express"
import { TagServices } from "../../services/Tag/TagServices"

class TagController {
    async createTag(request: Request, response: Response) {
        const { name } = request.body
        const TagService = new TagServices()

        const tag = await TagService.createTag(name)

        return response.json(tag)
    }

    async listTag(req: Request, res: Response) {
        const TagService = new TagServices()

        const tagsList = await TagService.listTag()

        return res.json(tagsList)
    }
}

export { TagController }