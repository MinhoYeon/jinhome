'use client';

import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { characters } from '../../data/characters';
import AnimatedRabbit from '../../components/AnimatedRabbit';
import CharacterCard from '../../components/CharacterCard';
import { useCart } from '../../contexts/CartContext';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { addToCart } = useCart();
  const [showAdded, setShowAdded] = useState(false);
  const character = characters.find((c) => c.id === params.id);

  const handleAddToCart = () => {
    if (character) {
      addToCart(character);
      setShowAdded(true);
      setTimeout(() => setShowAdded(false), 2000);
    }
  };

  const handleBuyNow = () => {
    if (character) {
      addToCart(character);
      router.push('/checkout');
    }
  };

  if (!character) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 dark:from-gray-900 dark:via-purple-900 dark:to-gray-900 pt-16 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😢</div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            캐릭터를 찾을 수 없습니다
          </h1>
          <motion.button
            onClick={() => router.push('/marketplace')}
            className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full font-semibold"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            마켓플레이스로 돌아가기
          </motion.button>
        </div>
      </div>
    );
  }

  const discount = character.originalPrice
    ? Math.round(((character.originalPrice - character.price) / character.originalPrice) * 100)
    : 0;

  const relatedCharacters = characters
    .filter((c) => c.category === character.category && c.id !== character.id)
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 dark:from-gray-900 dark:via-purple-900 dark:to-gray-900 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <motion.button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 mb-8"
          whileHover={{ x: -5 }}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          뒤로 가기
        </motion.button>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Left - Preview */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="sticky top-24">
              <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 lg:p-12">
                <div className="relative aspect-square bg-gradient-to-br from-pink-50 to-purple-50 dark:from-gray-700 dark:to-purple-900 rounded-2xl flex items-center justify-center overflow-hidden">
                  {character.previewComponent === 'AnimatedRabbit' && (
                    <div className="scale-125">
                      <AnimatedRabbit />
                    </div>
                  )}
                  {character.previewComponent !== 'AnimatedRabbit' && (
                    <div className="text-[200px]">{getCategoryEmoji(character.category)}</div>
                  )}

                  {discount > 0 && (
                    <div className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-full text-lg font-bold">
                      -{discount}%
                    </div>
                  )}
                </div>

                {/* Color Palette */}
                <div className="mt-6">
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    컬러 팔레트
                  </h3>
                  <div className="flex gap-3">
                    {character.colors.map((color, index) => (
                      <div
                        key={index}
                        className="w-12 h-12 rounded-full shadow-lg border-2 border-white dark:border-gray-700"
                        style={{ backgroundColor: color }}
                        title={color}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right - Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Tags */}
            <div className="flex gap-2 mb-4 flex-wrap">
              {character.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full text-sm font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              {character.name}
            </h1>

            {/* Rating and Downloads */}
            <div className="flex items-center gap-6 mb-6">
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={i < Math.floor(character.rating) ? 'text-yellow-500' : 'text-gray-300'}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {character.rating}
                </span>
              </div>
              <div className="text-gray-600 dark:text-gray-400">
                {character.downloads.toLocaleString()} 다운로드
              </div>
            </div>

            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              {character.description}
            </p>

            {/* Features */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                주요 기능
              </h2>
              <ul className="space-y-3">
                {character.features.map((feature, index) => (
                  <motion.li
                    key={index}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    <span className="text-purple-500 text-xl">✓</span>
                    <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Specs */}
            <div className="grid grid-cols-2 gap-4 mb-8 p-6 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl">
              <div>
                <div className="text-sm text-gray-500 dark:text-gray-400">카테고리</div>
                <div className="font-semibold text-gray-900 dark:text-white capitalize">
                  {getCategoryName(character.category)}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-500 dark:text-gray-400">애니메이션</div>
                <div className="font-semibold text-gray-900 dark:text-white capitalize">
                  {getAnimationName(character.animationType)}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-500 dark:text-gray-400">포맷</div>
                <div className="font-semibold text-gray-900 dark:text-white uppercase">
                  {character.format}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-500 dark:text-gray-400">출시일</div>
                <div className="font-semibold text-gray-900 dark:text-white">
                  {new Date(character.createdAt).toLocaleDateString('ko-KR')}
                </div>
              </div>
            </div>

            {/* Price and Purchase */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
              <div className="flex items-end justify-between mb-6">
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">가격</div>
                  {character.originalPrice && (
                    <div className="text-lg text-gray-400 line-through">
                      ₩{character.originalPrice.toLocaleString()}
                    </div>
                  )}
                  <div className="text-4xl font-bold text-gray-900 dark:text-white">
                    ₩{character.price.toLocaleString()}
                  </div>
                </div>
                {discount > 0 && (
                  <div className="text-red-500 text-2xl font-bold">
                    {discount}% 할인
                  </div>
                )}
              </div>

              <div className="flex gap-3">
                <motion.button
                  onClick={handleBuyNow}
                  className="flex-1 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-shadow"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  지금 구매하기
                </motion.button>
                <motion.button
                  onClick={handleAddToCart}
                  className={`px-6 py-4 rounded-xl font-bold transition-colors ${
                    showAdded
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  title={showAdded ? '장바구니에 추가됨!' : '장바구니에 담기'}
                >
                  {showAdded ? (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  )}
                </motion.button>
              </div>

              <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-4">
                구매 후 즉시 다운로드 가능 · 환불 가능
              </p>
            </div>
          </motion.div>
        </div>

        {/* Related Products */}
        {relatedCharacters.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
              비슷한 캐릭터
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedCharacters.map((char, index) => (
                <CharacterCard key={char.id} character={char} index={index} />
              ))}
            </div>
          </motion.section>
        )}
      </div>
    </div>
  );
}

function getCategoryEmoji(category: string): string {
  const emojis: Record<string, string> = {
    rabbit: '🐰',
    cat: '🐱',
    dog: '🐶',
    bird: '🐦',
    bear: '🐻',
    fox: '🦊'
  };
  return emojis[category] || '🐾';
}

function getCategoryName(category: string): string {
  const names: Record<string, string> = {
    rabbit: '토끼',
    cat: '고양이',
    dog: '강아지',
    bird: '새',
    bear: '곰',
    fox: '여우'
  };
  return names[category] || category;
}

function getAnimationName(animation: string): string {
  const names: Record<string, string> = {
    bounce: '통통 튀기',
    wave: '손 흔들기',
    spin: '회전',
    walk: '걷기',
    dance: '춤추기',
    fly: '날기'
  };
  return names[animation] || animation;
}
