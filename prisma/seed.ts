import { PrismaClient, products_category } from "@prisma/client";

const prisma = new PrismaClient();
const products_categories: Pick<products_category, "name">[] = [
  { name: "keycap" },
  { name: "circuit board" },
  { name: "case" },
  { name: "switch" },
  { name: "mounting plate" },
  { name: "foam" },
];
async function main() {
  for (let i = 0; i < products_categories.length; i++) {
    await prisma.products_category.upsert({
      where: {
        name: products_categories[i].name,
      },
      create: {
        name: products_categories[i].name,
        description: "",
      },
      update: {},
    });
  }
}

main()
  .then(async () => {
    console.log(await prisma.products_category.findMany())
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
