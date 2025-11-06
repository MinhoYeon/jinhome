import { User, Review, Order } from '../types/user';

// 간단한 메모리 기반 저장소 (실제 프로덕션에서는 데이터베이스 사용)
export const db = {
  users: [] as User[],
  reviews: [] as Review[],
  orders: [] as Order[],
};

// 초기 관리자 계정
const adminUser: User = {
  id: 'admin-1',
  name: 'Admin',
  email: 'admin@movinganimal.com',
  password: '$2a$10$X7XqPvYQZYQxYXqPvYQZYOXqPvYQZYQxYXqPvYQZYQxYXqPvYQZYO', // "admin123"
  role: 'admin',
  createdAt: new Date().toISOString(),
  purchases: [],
};

// 샘플 리뷰 데이터
const sampleReviews: Review[] = [
  {
    id: 'review-1',
    characterId: 'bouncy-rabbit',
    userId: 'user-sample',
    userName: '김민수',
    rating: 5,
    comment: '정말 귀엽고 애니메이션이 부드러워요! 프로젝트에 딱 맞게 사용했습니다.',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'review-2',
    characterId: 'bouncy-rabbit',
    userId: 'user-sample2',
    userName: '이지은',
    rating: 4,
    comment: '좋아요! 다만 색상 커스터마이징이 좀 더 쉬웠으면 좋겠어요.',
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'review-3',
    characterId: 'waving-cat',
    userId: 'user-sample3',
    userName: '박준호',
    rating: 5,
    comment: '복을 부르는 고양이 느낌이 정말 좋네요! 웹사이트에 배치했더니 반응이 좋습니다.',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

// 초기화
db.users.push(adminUser);
db.reviews.push(...sampleReviews);

export default db;
