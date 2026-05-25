import { PrismaClient } from "@prisma/client";
import { CATEGORIES, COLLECTIONS, PRODUCTS } from "../lib/mock-data";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding LUXAFOIR catalogue…");

  for (const c of CATEGORIES) {
    await prisma.category.upsert({
      where: { id: c.id },
      update: { name: c.name, slug: c.slug, image: c.image },
      create: { id: c.id, name: c.name, slug: c.slug, image: c.image },
    });
  }
  console.log(`  ✓ ${CATEGORIES.length} categories`);

  for (const c of COLLECTIONS) {
    await prisma.collection.upsert({
      where: { id: c.id },
      update: { name: c.name, slug: c.slug, description: c.description, image: c.image },
      create: {
        id: c.id,
        name: c.name,
        slug: c.slug,
        description: c.description,
        image: c.image,
        isActive: c.isActive,
      },
    });
  }
  console.log(`  ✓ ${COLLECTIONS.length} collections`);

  for (const p of PRODUCTS) {
    await prisma.product.upsert({
      where: { id: p.id },
      update: {},
      create: {
        id: p.id,
        name: p.name,
        slug: p.slug,
        description: p.description,
        price: p.price,
        comparePrice: p.comparePrice,
        images: p.images,
        categoryId: p.categoryId,
        collectionId: p.collectionId,
        tags: p.tags,
        isFeatured: p.isFeatured,
        isActive: p.isActive,
        variants: {
          create: p.variants.map((v) => ({
            id: v.id,
            size: v.size,
            stock: v.stock,
            sku: v.sku,
          })),
        },
      },
    });
  }
  console.log(`  ✓ ${PRODUCTS.length} products`);
  console.log("✅ Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
