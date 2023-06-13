import { userTransformer } from "../../transformers/user"

export default defineEventHandler(async (event) => {
    console.log(event.context.auth)
    return {
        user: userTransformer(event.context.auth?.user)
    }
})