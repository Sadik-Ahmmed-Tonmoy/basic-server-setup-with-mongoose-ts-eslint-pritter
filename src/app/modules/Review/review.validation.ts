import { z } from "zod";


const createReviewValidationSchema = z.object({
    body: z.object({
        product: z.string().nonempty(),
        user: z.string().nonempty(),
        rating: z.number().min(1).max(5),
        comment: z.string().optional().default(''),
        isDeleted: z.boolean().optional(),
    })
})


const updateReviewValidationSchema = z.object({
    body: z.object({
        product: z.string().nonempty(),
        user: z.string().nonempty(),
        rating: z.number().min(1).max(5),
        comment: z.string().optional().default(''),
        isDeleted: z.boolean().optional(),
    })
})

export const reviewValidation = {
    createReviewValidationSchema,
    updateReviewValidationSchema
}