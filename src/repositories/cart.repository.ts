import prisma from "@/config/prisma";

async function createCartItem(product_id:number, user_id: number, quantity?: number) {
    return await prisma.cart_item.create(
        {
            data: {
                product_id,
                user_id,
                quantity
            }
        }
    )
}

async function getCartitems(user_id: number){
    return await prisma.cart_item.findMany({
        where: {
            user_id
        }
    })
}

async function findCartItemByUserIdAndProductId(user_id:number, product_id:number) {
    return await prisma.cart_item.findFirst({
        where:{
            user_id,
            product_id
        },
        include: {
            product: true
        }
    })
}

async function findCartItemById(cart_item_id:number) {
    return await prisma.cart_item.findFirst({
        where: {
            id: cart_item_id
        }
    })
}

async function updateCartItemQuantity(cart_item_id:number, new_quantity:number) {
    return await prisma.cart_item.update({
        where: {
            id: cart_item_id,
        },
        data: {
            quantity: new_quantity
        }
    })
}

async function deleteCartItem(cart_item_id:number) {
    return await prisma.cart_item.delete({
        where: {
            id: cart_item_id
        }
    })
}

const cartRepository = {
    createCartItem,
    getCartitems,
    updateCartItemQuantity,
    deleteCartItem,
    findCartItemById,
    findCartItemByUserIdAndProductId
}

export default cartRepository