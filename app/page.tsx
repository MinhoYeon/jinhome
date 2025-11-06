'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import AnimatedRabbit from './components/AnimatedRabbit';

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 }
    }
  };

  const features = [
    {
      icon: '🎨',
      title: '다양한 캐릭터',
      description: '토끼, 고양이, 강아지 등 수백 가지 귀여운 동물 캐릭터'
    },
    {
      icon: '✨',
      title: '생동감 넘치는 애니메이션',
      description: '모든 캐릭터는 자연스러운 움직임과 표정을 가지고 있어요'
    },
    {
      icon: '💎',
      title: '고품질 에셋',
      description: '프로 디자이너가 제작한 프리미엄 퀄리티의 에셋'
    },
    {
      icon: '🚀',
      title: '즉시 사용 가능',
      description: '구매 후 바로 다운로드하여 프로젝트에 적용하세요'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 dark:from-gray-900 dark:via-purple-900 dark:to-gray-900">
      {/* Hero Section */}
      <motion.section
        className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-20 left-10 text-6xl opacity-20"
            animate={{
              y: [0, -20, 0],
              rotate: [0, 10, 0]
            }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            🐰
          </motion.div>
          <motion.div
            className="absolute bottom-20 right-20 text-5xl opacity-20"
            animate={{
              y: [0, 20, 0],
              rotate: [0, -10, 0]
            }}
            transition={{ duration: 5, repeat: Infinity, delay: 1 }}
          >
            🐱
          </motion.div>
          <motion.div
            className="absolute top-1/2 right-10 text-4xl opacity-20"
            animate={{
              y: [0, -15, 0],
              rotate: [0, 15, 0]
            }}
            transition={{ duration: 3.5, repeat: Infinity, delay: 0.5 }}
          >
            🐶
          </motion.div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            className="text-center lg:text-left space-y-6"
            variants={itemVariants}
          >
            <motion.div
              className="inline-block px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full text-sm font-medium text-purple-600 dark:text-purple-400 shadow-lg"
              whileHover={{ scale: 1.05 }}
            >
              🎉 새로운 캐릭터 출시!
            </motion.div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white leading-tight">
              움직이는
              <br />
              <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
                동물 캐릭터
              </span>
            </h1>

            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-xl">
              당신의 프로젝트를 더욱 생동감 있게 만들어줄
              <br />
              프리미엄 애니메이션 캐릭터 마켓플레이스
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
              <Link href="/marketplace">
                <motion.button
                  className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-full shadow-xl hover:shadow-2xl transition-shadow text-lg w-full sm:w-auto"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  캐릭터 둘러보기 🎨
                </motion.button>
              </Link>
              <motion.button
                className="px-8 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-shadow text-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                소개 영상 보기 ▶️
              </motion.button>
            </div>

            {/* Stats */}
            <motion.div
              className="flex gap-8 justify-center lg:justify-start pt-8"
              variants={itemVariants}
            >
              <div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white">500+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">캐릭터</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white">10K+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">다운로드</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white">4.9★</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">평점</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right - Animated Character */}
          <motion.div
            className="flex justify-center lg:justify-end"
            variants={itemVariants}
          >
            <motion.div
              className="relative"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-purple-600 rounded-full blur-3xl opacity-30 animate-pulse"></div>
              <AnimatedRabbit />
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div className="text-center mb-16" variants={itemVariants}>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              왜 무빙애니멀일까요?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              프로젝트에 생명을 불어넣는 최고의 선택
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow"
                variants={itemVariants}
                whileHover={{ y: -10 }}
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        className="py-20 px-4 sm:px-6 lg:px-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <motion.div
          className="max-w-4xl mx-auto text-center bg-gradient-to-r from-pink-500 via-purple-600 to-blue-600 rounded-3xl p-12 shadow-2xl"
          variants={itemVariants}
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            지금 바로 시작해보세요!
          </h2>
          <p className="text-xl text-white/90 mb-8">
            첫 구매 시 20% 할인 혜택을 드립니다
          </p>
          <Link href="/marketplace">
            <motion.button
              className="px-10 py-5 bg-white text-purple-600 font-bold rounded-full text-xl shadow-xl hover:shadow-2xl transition-shadow"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              무료 캐릭터 받기 🎁
            </motion.button>
          </Link>
        </motion.div>
      </motion.section>

      {/* Footer */}
      <footer className="py-8 px-4 text-center text-gray-600 dark:text-gray-400 border-t border-gray-200 dark:border-gray-800">
        <p>© 2025 무빙애니멀 마켓. All rights reserved.</p>
      </footer>
    </div>

  );
}
