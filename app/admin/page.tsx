'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import db from '../lib/db';
import { characters } from '../data/characters';

export default function AdminPage() {
  const router = useRouter();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalOrders: 0,
    totalRevenue: 0,
    totalReviews: 0,
  });

  useEffect(() => {
    // 통계 계산
    const totalRevenue = db.orders
      .filter((o) => o.status === 'completed')
      .reduce((sum, o) => sum + o.total, 0);

    setStats({
      totalUsers: db.users.length,
      totalOrders: db.orders.length,
      totalRevenue,
      totalReviews: db.reviews.length,
    });
  }, []);

  const statCards = [
    { label: '총 사용자', value: stats.totalUsers, icon: '👥', color: 'from-blue-500 to-cyan-500' },
    { label: '총 주문', value: stats.totalOrders, icon: '📦', color: 'from-purple-500 to-pink-500' },
    { label: '총 매출', value: `₩${stats.totalRevenue.toLocaleString()}`, icon: '💰', color: 'from-green-500 to-emerald-500' },
    { label: '총 리뷰', value: stats.totalReviews, icon: '⭐', color: 'from-orange-500 to-red-500' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 dark:from-gray-900 dark:via-purple-900 dark:to-gray-900 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              관리자 대시보드
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              무빙애니멀 마켓 관리 시스템
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {statCards.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className={`h-2 bg-gradient-to-r ${stat.color}`} />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-4xl">{stat.icon}</div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-gray-900 dark:text-white">
                        {stat.value}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {stat.label}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Products */}
          <div className="grid lg:grid-cols-2 gap-8">
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                등록된 캐릭터
              </h2>
              <div className="space-y-3">
                {characters.slice(0, 5).map((char) => (
                  <div key={char.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-white">
                        {char.name}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {char.downloads} 다운로드 · ₩{char.price.toLocaleString()}
                      </div>
                    </div>
                    <div className="text-yellow-500">
                      ★ {char.rating}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Recent Reviews */}
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                최근 리뷰
              </h2>
              <div className="space-y-3">
                {db.reviews.slice(-5).reverse().map((review) => (
                  <div key={review.id} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-semibold text-gray-900 dark:text-white">
                        {review.userName}
                      </div>
                      <div className="text-yellow-500">
                        {'★'.repeat(review.rating)}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                      {review.comment}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
