'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import { AnimalCharacter } from '../types/character';
import AnimatedRabbit from './AnimatedRabbit';
import { useCart } from '../contexts/CartContext';

interface CharacterCardProps {
  character: AnimalCharacter;
  index?: number;
}

export default function CharacterCard({ character, index = 0 }: CharacterCardProps) {
  const { addToCart } = useCart();
  const [showAdded, setShowAdded] = useState(false);

  const discount = character.originalPrice
    ? Math.round(((character.originalPrice - character.price) / character.originalPrice) * 100)
    : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(character);
    setShowAdded(true);
    setTimeout(() => setShowAdded(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
    >
      <Link href={`/product/${character.id}`}>
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow overflow-hidden cursor-pointer h-full">
          {/* Preview Section */}
          <div className="relative h-64 bg-gradient-to-br from-pink-50 to-purple-50 dark:from-gray-700 dark:to-purple-900 flex items-center justify-center overflow-hidden">
            {/* Character Preview */}
            {character.previewComponent === 'AnimatedRabbit' && (
              <div className="scale-75">
                <AnimatedRabbit />
              </div>
            )}
            {character.previewComponent !== 'AnimatedRabbit' && (
              <div className="text-8xl">{getCategoryEmoji(character.category)}</div>
            )}

            {/* Tags */}
            <div className="absolute top-3 left-3 flex gap-2 flex-wrap">
              {character.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full text-xs font-medium text-purple-600 dark:text-purple-400"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Discount Badge */}
            {discount > 0 && (
              <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                -{discount}%
              </div>
            )}
          </div>

          {/* Info Section */}
          <div className="p-5">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                  {character.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {character.category} · {character.animationType}
                </p>
              </div>
            </div>

            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
              {character.description}
            </p>

            {/* Rating and Downloads */}
            <div className="flex items-center gap-4 mb-4 text-sm">
              <div className="flex items-center gap-1">
                <span className="text-yellow-500">★</span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {character.rating}
                </span>
              </div>
              <div className="text-gray-500 dark:text-gray-400">
                {character.downloads.toLocaleString()} 다운로드
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center justify-between">
              <div>
                {character.originalPrice && (
                  <div className="text-sm text-gray-400 line-through">
                    ₩{character.originalPrice.toLocaleString()}
                  </div>
                )}
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  ₩{character.price.toLocaleString()}
                </div>
              </div>
              <motion.button
                className={`px-4 py-2 rounded-full text-sm font-semibold hover:shadow-lg ${
                  showAdded
                    ? 'bg-green-500 text-white'
                    : 'bg-gradient-to-r from-pink-500 to-purple-600 text-white'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAddToCart}
              >
                {showAdded ? '장바구니에 추가됨! ✓' : '장바구니 담기'}
              </motion.button>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
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
