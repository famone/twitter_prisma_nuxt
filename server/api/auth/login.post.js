import { getUserByUsername } from '../../db/users'
import bcrypt from 'bcrypt'
import { generateTokens, sendRefreshToken } from '../../utils/jwt'
import { userTransformer } from '../../transformers/user'
import { createRefreshToken } from '../../db/refreshTokens'
import { sendError } from 'h3'

export default defineEventHandler( async (event) => {
    const body = await readBody(event)

    const {username, password} = body

    if(!username || !password){
        return sendError(event, createError({
            statusCode: 400,
            statusMessage: 'Invalid params'
        }))
    }

    // not registered
    const user = await getUserByUsername(username)

    if(!user){
        return sendError(event, createError({
            statusCode: 400,
            statusMessage: 'Username or password is invalid'
        }))
    }

    // compare passwords

    const doesThePasswordMatch = await bcrypt.compare(password, user.password)

    if (!doesThePasswordMatch) {
        return sendError(event, createError({
            statusCode: 400,
            statusMessage: 'Username or password is invalid'
        }))
    }

    // generate token

    const { accessToken, refreshToken } = generateTokens(user)

    // save in db
    await createRefreshToken({
        token: refreshToken,
        userId: user.id
    })

    // add cookie
    sendRefreshToken(event, refreshToken)


    return {
        access_token: accessToken,
        user: userTransformer(user)
    }
    

})