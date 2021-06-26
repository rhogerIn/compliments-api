import { getCustomRepository } from "typeorm"
import { classToPlain } from "class-transformer"

import { TagsRepositories } from "../../repositories/TagsRepositories"

class TagServices {
    async createTag(name: string) {
        const tagsRepositories = getCustomRepository(TagsRepositories)

        if (!name) {
            throw new Error("Incorrect name")
        }

        const tagExists = await tagsRepositories.findOne({
            name
        })

        if (tagExists) {
            throw new Error("Tag already exists")
        }

        const tag = tagsRepositories.create({
            name,
        })
        
        await tagsRepositories.save(tag)
        
        return tag
    }

    async listTag() {
        const tagsRepositories = getCustomRepository(TagsRepositories)

        const tags = await tagsRepositories.find();

        return classToPlain(tags)
    }
}

export { TagServices }