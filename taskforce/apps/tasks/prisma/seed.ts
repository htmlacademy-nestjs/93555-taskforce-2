import { PrismaClient } from '@prisma/client-tasks';

const prisma = new PrismaClient();

async function fillDb() {
  await prisma.category.upsert({
    where: { id: 1 },
    update: {},
    create: {
      title: 'Разработа на JavaScript',
      tasks: {
        create: [
          {
            title: 'Написать скрипт калькулятора',
            description:
              'Написать простой калькулятор в ООП стиле',
            status: 'CREATED',
            price: 5000,
            image: '',
            address: 'Москва, Россия',
            tags: {
              create: [
                {
                  title: 'Зеленый',
                }, {
                  title: 'Оранжевый',
                },
              ],
            },
            userId: '1',
            comments: {
              create: [
                {
                  text: 'Добавить бы небольшую документацию по запуску',
                  userId: '11',
                }, {
                  text: 'Спасибо!',
                  userId: '11',
                }
              ]
            }
          },
        ],
      },
    },
  });

  await prisma.category.upsert({
    where: { id: 2 },
    update: {},
    create: {
      title: 'Верстка',
      tasks: {
        create: [
          {
            title: 'Лендинг для школы танцев',
            description:
              'Сверстать по макету лендинг для школы танцев',
            status: 'CREATED',
            price: 3000,
            image: '',
            address: 'Орел, Россия',
            tags: {
              create: [
                {
                  title: 'Синий',
                }, {
                  title: 'Желтый',
                },
              ],
            },
            userId: '1',
            comments: {
              create: [
                {
                  text: 'Вау! Отличная работа',
                  userId: '14',
                }, {
                  text: 'Спасибо!',
                  userId: '14',
                }
              ]
            }
          },
        ],
      },
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
