import type { PageServerLoad, Actions } from "./$types";
import { prisma } from "$lib/server/prisma";
import { error, fail } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ params }) => {
    
    const getArticle = async () => {
        const article = await prisma.article.findUnique({
            where: {
                id: Number(params.articleId)
            }
        })
        if (!article) {
            throw error(404, "Article not found")
        }
        return article
    }

    return {
        article: getArticle()
    }
};

export const actions: Actions = {
    updateArticle: async ({ request, params}) => {
        const { kurs, email, name } = Object.fromEntries(await request.formData()) as { 
            kurs: string, 
            email: string, 
            name: string 
        }

        try {
            await prisma.article.update({
                where: {
                    id: Number(params.articleId)
                },
                data: {
                    kurs,
                    email,
                    name
                }
            })
        } catch (err) {
            console.log(err)
            return fail(500)
        }

        return {
            status: 200
        }
    } 
}