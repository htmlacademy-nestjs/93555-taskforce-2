import { PrismaClient } from '@prisma/client-feedback';

const prisma = new PrismaClient();

async function fillDb() {
  await prisma.review.upsert({
    where: { id: 1 },
    update: {},
    create: {
      text: 'Отличная работа',
      taskId: 1,
      rating: 5,
      userId: '1'
    },
  });

  console.info('🤘️ Database was filled');
}

fillDb()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (err) => {
    console.error(err);
    await prisma.$disconnect();

    process.exit(1);
  });
