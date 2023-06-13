import { prisma } from "./index";

export const createMediaFile = (mediaFile) => {
    return prisma.mediaFile.create({
        data: mediaFile
    })
}