'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import CharacterCard from '../components/CharacterCard';
import { characters } from '../data/characters';
import { AnimalCategory } from '../types/character';

export default function MarketplacePage() {
  const [selectedCategory, setSelectedCategory] = useState<AnimalCategory | 'all'>('all');
  const [sortBy, setSortBy] = useState<'popular' | 'newest' | 'price-low' | 'price-high'>('popular');
  const [searchQuery, setSearchQuery] = useState('');

  const categories: { value: AnimalCategory | 'all'; label: string; emoji: string }[] = [
    { value: 'all', label: '전체', emoji: '🎨' },
    { value: 'rabbit', label: '토끼', emoji: '🐰' },
    { value: 'cat', label: '고양이', emoji: '🐱' },
    { value: 'dog', label: '강아지', emoji: '🐶' },
    { value: 'bird', label: '새', emoji: '🐦' },
    { value: 'bear', label: '곰', emoji: '🐻' },
    { value: 'fox', label: '여우', emoji: '🦊' },
  ];

  const filteredAndSortedCharacters = useMemo(() => {
    let filtered = selectedCategory === 'all'
      ? characters
      : characters.filter((c) => c.category === selectedCategory);

    // 검색 필터 적용
    if (searchQuery) {
      filtered = filtered.filter((c) =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'popular':
          return b.downloads - a.downloads;
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        default:
          return 0;
      }
    });

    return sorted;
  }, [selectedCategory, sortBy, searchQuery]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 dark:from-gray-900 dark:via-purple-900 dark:to-gray-900 pt-16">
      {/* Hero Section */}
      <motion.section
        className="py-12 px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              캐릭터 마켓플레이스
            </h1>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-6">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="캐릭터 이름, 설명, 태그로 검색..."
                  className="w-full px-6 py-4 pl-12 border-2 border-gray-300 dark:border-gray-600 rounded-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent shadow-lg"
                />
                <svg
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            <p className="text-xl text-gray-600 dark:text-gray-300">
              {filteredAndSortedCharacters.length}개의 프리미엄 애니메이션 캐릭터
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-col lg:flex-row gap-6 mb-8">
            {/* Category Filter */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                카테고리
              </label>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <motion.button
                    key={category.value}
                    onClick={() => setSelectedCategory(category.value)}
                    className={`px-4 py-2 rounded-full font-medium transition-all ${
                      selectedCategory === category.value
                        ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg'
                        : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:shadow-md'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="mr-1">{category.emoji}</span>
                    {category.label}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Sort Filter */}
            <div className="lg:w-64">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                정렬
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="popular">인기순</option>
                <option value="newest">최신순</option>
                <option value="price-low">가격 낮은순</option>
                <option value="price-high">가격 높은순</option>
              </select>
            </div>
          </div>

          {/* Character Grid */}
          {filteredAndSortedCharacters.length > 0 ? (
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              layout
            >
              {filteredAndSortedCharacters.map((character, index) => (
                <CharacterCard key={character.id} character={character} index={index} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              className="text-center py-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="text-6xl mb-4">😢</div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                캐릭터를 찾을 수 없습니다
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                다른 카테고리를 선택해보세요
              </p>
            </motion.div>
          )}
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        className="py-20 px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="max-w-4xl mx-auto text-center bg-gradient-to-r from-pink-500 via-purple-600 to-blue-600 rounded-3xl p-12 shadow-2xl">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            원하는 캐릭터를 찾지 못하셨나요?
          </h2>
          <p className="text-lg text-white/90 mb-6">
            커스텀 제작 서비스를 이용해보세요
          </p>
          <motion.button
            className="px-8 py-4 bg-white text-purple-600 font-bold rounded-full text-lg shadow-xl hover:shadow-2xl transition-shadow"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            커스텀 제작 문의하기
          </motion.button>
        </div>
      </motion.section>
    </div>
  );
}
