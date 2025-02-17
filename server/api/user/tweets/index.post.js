import formidable from 'formidable'
import { createTweet } from '../../../db/tweets'
import { tweetTransformer } from '~/server/transformers/tweet'
import { createMediaFile } from '~/server/db/mediaFiles'
import { uploadToCloudinary } from '~/server/utils/cloudinary'

export default defineEventHandler(async (event) => {

    const form = formidable({})
    
    const response = await new Promise((resolve, reject) => {
        form.parse(event.req, (err, fields, files) => {
            if (err) {
                reject(err)
            }
            resolve({ fields, files })
        })
    })

    const {fields, files} = response

    const userId = event.context?.auth?.user?.id

    const tweetData = {
        text: fields.text,
        authorId: userId
    }

    const replyTo = fields.replyTo

    if(replyTo && replyTo !== 'null'){
        tweetData.replyToId = replyTo
    }

    const tweet = await createTweet(tweetData)

    const filesPromises = Object.keys(files).map(async key => {
        const file = files[key]
        const cloudinaryResource = await uploadToCloudinary(file.filepath)

        return createMediaFile({
            url: cloudinaryResource.secure_url,
            providerPublicId: cloudinaryResource.public_id,
            userId: userId,
            tweetId: tweet.id
        })
    })

    await Promise.all(filesPromises)

    return {
        tweet: tweetTransformer(tweet)
    }
})