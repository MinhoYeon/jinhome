#!/usr/bin/env node

/**
 * 배포에 필요한 Secret 키들을 생성하는 스크립트
 */

const crypto = require('crypto');

console.log('🔐 Generating secrets for production deployment...\n');

// NextAuth Secret 생성
const nextAuthSecret = crypto.randomBytes(32).toString('base64');
console.log('NEXTAUTH_SECRET:');
console.log(nextAuthSecret);
console.log('');

// 추가 Secret (필요한 경우)
const jwtSecret = crypto.randomBytes(32).toString('hex');
console.log('JWT_SECRET (optional):');
console.log(jwtSecret);
console.log('');

// 환경 변수 템플릿
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('📋 .env.local 파일에 추가할 내용:');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

console.log(`# Generated Secrets
NEXTAUTH_SECRET="${nextAuthSecret}"
NEXTAUTH_URL="http://localhost:3000"

# Database (Replace with your actual database URL)
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"

# Resend (Get your key from https://resend.com/api-keys)
RESEND_API_KEY="re_your_api_key_here"

# PortOne (Get from https://admin.portone.io)
PORTONE_IMP_CODE="imp_your_code"
PORTONE_API_KEY="your_portone_api_key"
PORTONE_API_SECRET="your_portone_api_secret"

# File Storage (Choose one)
# AWS S3
AWS_ACCESS_KEY_ID="your_aws_key"
AWS_SECRET_ACCESS_KEY="your_aws_secret"
AWS_REGION="ap-northeast-2"
AWS_S3_BUCKET="your-bucket-name"

# OR Vercel Blob
BLOB_READ_WRITE_TOKEN="your_vercel_blob_token"
`);

console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
console.log('✅ Secrets generated successfully!');
console.log('📝 Copy the above to your .env.local file');
console.log('🚀 Make sure to replace placeholder values with real ones\n');
