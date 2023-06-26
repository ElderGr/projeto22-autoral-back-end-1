import { PrismaClient, products_category } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();
const products_categories: Pick<products_category, "name">[] = [
  { name: "keycap" },
  { name: "circuit board" },
  { name: "case" },
  { name: "switch" },
  { name: "mounting plate" },
  { name: "foam" },
];

const images = [
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTm5aHYF4eh3itFZ-vQ5CKh5B0nwbY9mZPCVA&usqp=CAU",
  "https://www.pcbonline.com/file/2021-05-13/keyboard-pcb.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUKo6MdVXJjS9b5q0pgbJ64dBwpZ2PRlb3ahkhNmP44CjQH-RqiBglI6bLKXgS3ziIuBk&usqp=CAU",
  "https://cdn-shop.adafruit.com/970x728/4952-00.jpg",
  "https://images.squarespace-cdn.com/content/v1/5b6be8b4f8370a0921fef083/1579687389433-BLW46MA6327WK0PCEFMA/PLATE?format=1000w",
  "https://m.media-amazon.com/images/I/612tGaV+jFL._AC_UY218_.jpg",
];

async function main() {
  await prisma.product.deleteMany({});
  await prisma.products_category.deleteMany({});
  await prisma.cart_item.deleteMany({});
  const category_id_arr: number[] = [];
  for (let i = 0; i < products_categories.length; i++) {
    const { id } = await prisma.products_category.create({
      data: {
        name: products_categories[i].name,
        description: "",
      },
    });
    category_id_arr.push(id);
  }
  for (let i = 0; i < images.length; i++) {
    for (let j = 0; j < 10; j++) {
      await prisma.product.create({
        data: {
          category_id: category_id_arr[i],
          name: products_categories[i].name + " " + faker.lorem.word(5),
          description: faker.lorem.paragraph(1),
          quantity: 100,
          price: Number(faker.finance.amount({ max: 100 })),
          main_image: images[i],
        },
      });
    }
  }
}

main()
  .then(async () => {
    console.log(await prisma.products_category.findMany());
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
