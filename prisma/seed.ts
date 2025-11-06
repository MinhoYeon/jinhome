import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';
import { characters } from '../app/data/characters';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // 1. Create admin user
  console.log('Creating admin user...');
  const adminPassword = await hash('admin123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@movinganimal.com' },
    update: {},
    create: {
      email: 'admin@movinganimal.com',
      name: 'Admin',
      password: adminPassword,
      role: 'admin',
    },
  });
  console.log('✅ Admin user created:', admin.email);

  // 2. Create test user
  console.log('Creating test user...');
  const userPassword = await hash('user123', 10);
  const user = await prisma.user.upsert({
    where: { email: 'user@test.com' },
    update: {},
    create: {
      email: 'user@test.com',
      name: '테스트 유저',
      password: userPassword,
      role: 'user',
    },
  });
  console.log('✅ Test user created:', user.email);

  // 3. Create characters
  console.log('Creating characters...');
  for (const char of characters) {
    await prisma.character.upsert({
      where: { id: char.id },
      update: {},
      create: {
        id: char.id,
        name: char.name,
        category: char.category,
        animationType: char.animationType,
        price: char.price,
        originalPrice: char.originalPrice,
        description: char.description,
        features: char.features,
        format: char.format,
        previewComponent: char.previewComponent,
        tags: char.tags,
        rating: char.rating,
        downloads: char.downloads,
        createdAt: new Date(char.createdAt),
        colors: char.colors,
      },
    });
  }
  console.log(`✅ ${characters.length} characters created`);

  // 4. Create sample reviews
  console.log('Creating sample reviews...');
  const reviews = [
    {
      characterId: 'bouncy-rabbit',
      userId: user.id,
      rating: 5,
      comment: '정말 귀엽고 애니메이션이 부드러워요! 프로젝트에 딱 맞게 사용했습니다.',
    },
    {
      characterId: 'bouncy-rabbit',
      userId: admin.id,
      rating: 4,
      comment: '좋아요! 다만 색상 커스터마이징이 좀 더 쉬웠으면 좋겠어요.',
    },
    {
      characterId: 'waving-cat',
      userId: user.id,
      rating: 5,
      comment: '복을 부르는 고양이 느낌이 정말 좋네요! 웹사이트에 배치했더니 반응이 좋습니다.',
    },
  ];

  for (const review of reviews) {
    await prisma.review.create({
      data: review,
    });
  }
  console.log(`✅ ${reviews.length} reviews created`);

  console.log('🎉 Database seed completed!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
