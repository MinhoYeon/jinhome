'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '../contexts/CartContext';
import AnimatedRabbit from '../components/AnimatedRabbit';

export default function CartPage() {
  const router = useRouter();
  const { items, removeFromCart, updateQuantity, getTotal, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 dark:from-gray-900 dark:via-purple-900 dark:to-gray-900 pt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="text-8xl mb-6">🛒</div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              장바구니가 비어있습니다
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              마음에 드는 캐릭터를 찾아보세요!
            </p>
            <Link href="/marketplace">
              <motion.button
                className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold rounded-full text-lg shadow-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                마켓플레이스 가기
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 dark:from-gray-900 dark:via-purple-900 dark:to-gray-900 pt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              장바구니
            </h1>
            <motion.button
              onClick={clearCart}
              className="text-red-500 hover:text-red-600 font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              전체 삭제
            </motion.button>
          </div>
          <p className="text-gray-600 dark:text-gray-300">
            {items.length}개의 상품
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item, index) => (
              <motion.div
                key={item.character.id}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="p-6">
                  <div className="flex gap-6">
                    {/* Preview */}
                    <div className="flex-shrink-0 w-32 h-32 bg-gradient-to-br from-pink-50 to-purple-50 dark:from-gray-700 dark:to-purple-900 rounded-xl flex items-center justify-center">
                      {item.character.previewComponent === 'AnimatedRabbit' ? (
                        <div className="scale-50">
                          <AnimatedRabbit />
                        </div>
                      ) : (
                        <div className="text-6xl">{getCategoryEmoji(item.character.category)}</div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                            {item.character.name}
                          </h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {item.character.category} · {item.character.animationType}
                          </p>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.character.id)}
                          className="text-red-500 hover:text-red-600 p-2"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>

                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                        {item.character.description}
                      </p>

                      <div className="flex items-center justify-between">
                        {/* Quantity Control */}
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => updateQuantity(item.character.id, item.quantity - 1)}
                            className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 flex items-center justify-center"
                            disabled={item.quantity <= 1}
                          >
                            -
                          </button>
                          <span className="w-8 text-center font-semibold text-gray-900 dark:text-white">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.character.id, item.quantity + 1)}
                            className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 flex items-center justify-center"
                          >
                            +
                          </button>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <div className="text-2xl font-bold text-gray-900 dark:text-white">
                            ₩{(item.character.price * item.quantity).toLocaleString()}
                          </div>
                          {item.quantity > 1 && (
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              ₩{item.character.price.toLocaleString()} × {item.quantity}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 sticky top-24"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                주문 요약
              </h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600 dark:text-gray-300">
                  <span>상품 금액</span>
                  <span>₩{getTotal().toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-300">
                  <span>할인</span>
                  <span className="text-red-500">-₩0</span>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
                  <div className="flex justify-between text-xl font-bold text-gray-900 dark:text-white">
                    <span>총 금액</span>
                    <span>₩{getTotal().toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <Link href="/checkout">
                <motion.button
                  className="w-full py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold rounded-xl text-lg shadow-lg hover:shadow-xl transition-shadow mb-3"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  결제하기
                </motion.button>
              </Link>

              <Link href="/marketplace">
                <button className="w-full py-3 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white font-semibold rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
                  쇼핑 계속하기
                </button>
              </Link>

              <div className="mt-6 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
                <div className="flex items-start gap-2">
                  <span className="text-purple-600 dark:text-purple-400">💡</span>
                  <p className="text-sm text-purple-900 dark:text-purple-300">
                    구매 후 즉시 다운로드 가능하며, 7일 이내 환불이 가능합니다.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
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
