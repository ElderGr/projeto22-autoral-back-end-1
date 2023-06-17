import prisma from "@/config/prisma";

async function findCategoryByName(name:string) {
    return await prisma.products_category.findFirst({
        where:{
            name
        }
    })
}

const productsCategoryRepository = {
    findCategoryByName
}

export default productsCategoryRepository