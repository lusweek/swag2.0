import type { Actions, PageServerLoad } from "./$types";
import { fail } from "@sveltejs/kit";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

async function main() {
    const post = await prisma.article.create({
        data: {
            course: "test",
            name: "test",
            birth: "test",
            email: "test",
            adress: "test",
            postNr: "test",
            message: "test",
            phoneNr: "test",
        }
    })
    console.log(post);
}

main()

export const actions: Actions  = {
    createArticle: async ({ request }) => {
        const { course, name, birth, email, adress, postNr, message, phoneNr } = Object.fromEntries(await request.formData()) as {
            course : string,
            name   : string,
            birth  : string,
            email  : string,
            adress : string,
            postNr : string,
            phoneNr: string,
            message: string,
        }

        try {
            await prisma.article.create({
                data: {
                    course,
                    name,
                    birth,
                    email,
                    adress,
                    postNr,
                    phoneNr,
                    message,
                }
            })
        }   catch (err) {
            console.error(err)
            return fail(500, { message: "could not create article."})
        }
    
        return {
            status: 201
        }
    },

    deleteArticle: async ({ url }) => {
        const id = url.searchParams.get("id")
        if (!id) {
            return fail(400, { message: "Invalid request"})
        }

        try {
            await prisma.article.delete({
                where: {
                    // id: Number(id)
                    id: id
                }
            })
        } catch (err) {
            console.log(err)
            return fail(500, { message: "Something went wrong when deleating your article"})
        }

        return {
            status: 200
        }
    }
};