import { AnimalCharacter } from '../types/character';

export const characters: AnimalCharacter[] = [
  {
    id: 'bouncy-rabbit',
    name: '통통이 토끼',
    category: 'rabbit',
    animationType: 'bounce',
    price: 29000,
    originalPrice: 39000,
    description: '귀엽게 통통 뛰는 분홍색 토끼 캐릭터입니다. 깜빡이는 눈과 흔들리는 귀가 매력적이에요.',
    features: [
      '부드러운 바운스 애니메이션',
      '자동 눈 깜빡임',
      '호버 인터랙션',
      '커스터마이징 가능한 색상'
    ],
    format: 'component',
    previewComponent: 'AnimatedRabbit',
    tags: ['인기', '신규', '추천'],
    rating: 4.9,
    downloads: 1234,
    createdAt: '2025-11-01',
    colors: ['#FFB6C1', '#FFC0CB', '#FF69B4']
  },
  {
    id: 'waving-cat',
    name: '손 흔드는 고양이',
    category: 'cat',
    animationType: 'wave',
    price: 35000,
    description: '사랑스럽게 손을 흔드는 주황색 고양이 캐릭터입니다. 복을 부르는 마네키네코 스타일!',
    features: [
      '부드러운 손 흔들기 애니메이션',
      '윙크하는 표정',
      '360도 회전 가능',
      'SVG 포맷 지원'
    ],
    format: 'component',
    previewComponent: 'AnimatedCat',
    tags: ['인기', '행운'],
    rating: 4.8,
    downloads: 2156,
    createdAt: '2025-10-28',
    colors: ['#FFA500', '#FFD700', '#FF8C00']
  },
  {
    id: 'dancing-dog',
    name: '춤추는 강아지',
    category: 'dog',
    animationType: 'dance',
    price: 32000,
    originalPrice: 42000,
    description: '신나게 춤추는 갈색 강아지 캐릭터입니다. 리듬에 맞춰 몸을 흔들어요!',
    features: [
      '리드미컬한 댄스 애니메이션',
      '흔들리는 꼬리',
      '표정 변화',
      '다양한 포즈 변형'
    ],
    format: 'component',
    previewComponent: 'AnimatedDog',
    tags: ['신규', '추천', '재미'],
    rating: 4.7,
    downloads: 892,
    createdAt: '2025-11-05',
    colors: ['#8B4513', '#D2691E', '#CD853F']
  },
  {
    id: 'flying-bird',
    name: '날아가는 새',
    category: 'bird',
    animationType: 'fly',
    price: 27000,
    description: '우아하게 날아다니는 파란색 새 캐릭터입니다. 자연스러운 날갯짓이 아름다워요.',
    features: [
      '부드러운 비행 애니메이션',
      '날갯짓 효과',
      '궤적 커스터마이징',
      '가벼운 파일 크기'
    ],
    format: 'component',
    previewComponent: 'AnimatedBird',
    tags: ['자연', '우아함'],
    rating: 4.6,
    downloads: 1567,
    createdAt: '2025-10-25',
    colors: ['#4169E1', '#87CEEB', '#1E90FF']
  },
  {
    id: 'spinning-bear',
    name: '빙글빙글 곰',
    category: 'bear',
    animationType: 'spin',
    price: 38000,
    description: '귀엽게 빙글빙글 도는 갈색 곰 캐릭터입니다. 어지럽지 않게 천천히 돌아요!',
    features: [
      '부드러운 회전 애니메이션',
      '3D 느낌의 움직임',
      '속도 조절 가능',
      '그림자 효과'
    ],
    format: 'component',
    previewComponent: 'AnimatedBear',
    tags: ['귀여움', '인기'],
    rating: 4.9,
    downloads: 2341,
    createdAt: '2025-10-30',
    colors: ['#8B4513', '#A0522D', '#D2691E']
  },
  {
    id: 'jumping-fox',
    name: '점프하는 여우',
    category: 'fox',
    animationType: 'bounce',
    price: 33000,
    originalPrice: 43000,
    description: '활기차게 점프하는 주황색 여우 캐릭터입니다. 영리한 표정이 매력적이에요.',
    features: [
      '다이나믹한 점프 애니메이션',
      '꼬리 움직임',
      '반짝이는 눈',
      '커스텀 점프 높이'
    ],
    format: 'component',
    previewComponent: 'AnimatedFox',
    tags: ['신규', '역동적'],
    rating: 4.8,
    downloads: 1089,
    createdAt: '2025-11-03',
    colors: ['#FF6347', '#FF8C00', '#FFD700']
  },
  {
    id: 'sleeping-cat',
    name: '잠자는 고양이',
    category: 'cat',
    animationType: 'wave',
    price: 25000,
    description: '평화롭게 잠자는 회색 고양이 캐릭터입니다. 숨쉬는 듯한 움직임이 편안해요.',
    features: [
      '부드러운 호흡 애니메이션',
      '깜박이는 Z 표시',
      '미니멀한 디자인',
      '배경 투명 지원'
    ],
    format: 'component',
    previewComponent: 'AnimatedSleepingCat',
    tags: ['힐링', '미니멀'],
    rating: 4.5,
    downloads: 1876,
    createdAt: '2025-10-20',
    colors: ['#808080', '#A9A9A9', '#C0C0C0']
  },
  {
    id: 'running-rabbit',
    name: '달리는 토끼',
    category: 'rabbit',
    animationType: 'walk',
    price: 31000,
    description: '빠르게 달리는 흰색 토끼 캐릭터입니다. 속도감 있는 움직임이 생동감 넘쳐요!',
    features: [
      '러닝 사이클 애니메이션',
      '속도 조절 가능',
      '먼지 효과',
      '루프 애니메이션'
    ],
    format: 'component',
    previewComponent: 'AnimatedRunningRabbit',
    tags: ['역동적', '스포츠'],
    rating: 4.7,
    downloads: 1432,
    createdAt: '2025-10-22',
    colors: ['#FFFFFF', '#F0F0F0', '#E8E8E8']
  },
  {
    id: 'wise-bird',
    name: '현명한 부엉이',
    category: 'bird',
    animationType: 'wave',
    price: 36000,
    description: '지혜로운 느낌의 갈색 부엉이 캐릭터입니다. 고개를 좌우로 끄덕여요.',
    features: [
      '고개 끄덕임 애니메이션',
      '깜빡이는 큰 눈',
      '날개 펄럭임',
      '밤 테마 최적화'
    ],
    format: 'component',
    previewComponent: 'AnimatedOwl',
    tags: ['지혜', '밤'],
    rating: 4.8,
    downloads: 1654,
    createdAt: '2025-10-18',
    colors: ['#8B4513', '#D2691E', '#F4A460']
  },
  {
    id: 'playful-dog',
    name: '장난치는 강아지',
    category: 'dog',
    animationType: 'spin',
    price: 30000,
    description: '재롱부리는 흰색 강아지 캐릭터입니다. 빙글빙글 돌며 꼬리를 흔들어요!',
    features: [
      '회전 + 꼬리 흔들기',
      '귀여운 표정 변화',
      '인터랙티브 반응',
      '밝은 분위기'
    ],
    format: 'component',
    previewComponent: 'AnimatedPlayfulDog',
    tags: ['귀여움', '재미', '추천'],
    rating: 4.9,
    downloads: 2567,
    createdAt: '2025-10-15',
    colors: ['#FFFAF0', '#FFF8DC', '#F5DEB3']
  }
];
