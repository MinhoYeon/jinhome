'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function SuccessPage() {
  const [confetti, setConfetti] = useState(false);

  useEffect(() => {
    setConfetti(true);
    setTimeout(() => setConfetti(false), 3000);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 dark:from-gray-900 dark:via-purple-900 dark:to-gray-900 pt-16 flex items-center justify-center px-4">
      {/* Confetti Animation */}
      {confetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-2xl"
              style={{
                left: `${Math.random() * 100}%`,
                top: '-20px',
              }}
              initial={{ y: -20, opacity: 1, rotate: 0 }}
              animate={{
                y: window.innerHeight + 20,
                opacity: 0,
                rotate: 360,
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                delay: Math.random() * 0.5,
                ease: 'linear',
              }}
            >
              {['🎉', '✨', '🎊', '💖', '🌟'][Math.floor(Math.random() * 5)]}
            </motion.div>
          ))}
        </div>
      )}

      <motion.div
        className="max-w-2xl w-full"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-12 text-center">
          {/* Success Icon */}
          <motion.div
            className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          >
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </motion.div>

          {/* Title */}
          <motion.h1
            className="text-4xl font-bold text-gray-900 dark:text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            결제가 완료되었습니다!
          </motion.h1>

          {/* Description */}
          <motion.p
            className="text-xl text-gray-600 dark:text-gray-300 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            구매해주셔서 감사합니다
          </motion.p>

          {/* Info Box */}
          <motion.div
            className="bg-purple-50 dark:bg-purple-900/20 rounded-2xl p-6 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="space-y-3 text-left">
              <div className="flex items-start gap-3">
                <span className="text-2xl">📧</span>
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white">
                    이메일 발송 완료
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    입력하신 이메일로 구매 확인 및 다운로드 링크가 전송되었습니다.
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-2xl">💾</span>
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white">
                    즉시 다운로드 가능
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    이메일의 링크를 통해 구매하신 캐릭터를 바로 다운로드하실 수 있습니다.
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-2xl">🔄</span>
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white">
                    환불 정책
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    구매일로부터 7일 이내 환불 요청이 가능합니다.
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Actions */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Link href="/marketplace" className="flex-1">
              <motion.button
                className="w-full px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold rounded-xl text-lg shadow-lg hover:shadow-xl transition-shadow"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                더 많은 캐릭터 보기
              </motion.button>
            </Link>
            <Link href="/" className="flex-1">
              <motion.button
                className="w-full px-8 py-4 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white font-bold rounded-xl text-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                홈으로 가기
              </motion.button>
            </Link>
          </motion.div>

          {/* Support */}
          <motion.p
            className="mt-8 text-sm text-gray-500 dark:text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            문의사항이 있으시면{' '}
            <a href="mailto:support@movinganimal.com" className="text-purple-600 dark:text-purple-400 hover:underline">
              support@movinganimal.com
            </a>
            으로 연락주세요
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
}
