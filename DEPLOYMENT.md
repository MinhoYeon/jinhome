# 🚀 무빙애니멀 마켓 배포 가이드

프로덕션 환경으로 배포하기 위한 단계별 가이드입니다.

## 📋 배포 전 체크리스트

- [ ] PostgreSQL 데이터베이스 준비
- [ ] PortOne 계정 및 API 키
- [ ] Resend 계정 및 API 키
- [ ] NextAuth Secret 생성
- [ ] 파일 스토리지 (AWS S3 또는 Vercel Blob)
- [ ] 도메인 (선택사항)

---

## Step 1: 데이터베이스 설정 (PostgreSQL + Prisma)

### 1.1 PostgreSQL 데이터베이스 생성

**로컬 개발:**
```bash
# Docker를 사용하는 경우
docker run --name movinganimal-db \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=your_password \
  -e POSTGRES_DB=movinganimal \
  -p 5432:5432 \
  -d postgres:16
```

**클라우드 옵션:**
- **Vercel Postgres** (추천): https://vercel.com/storage/postgres
- **Supabase**: https://supabase.com
- **Railway**: https://railway.app
- **AWS RDS**
- **Google Cloud SQL**

### 1.2 환경 변수 설정

`.env.local` 파일에 데이터베이스 URL을 설정:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"

# 예시 (Vercel Postgres)
DATABASE_URL="postgres://username:password@ep-xxx.us-east-1.aws.neon.tech/neondb"
```

### 1.3 Prisma 마이그레이션 실행

```bash
# Prisma 클라이언트 생성
npm run db:generate

# 데이터베이스 스키마 푸시
npm run db:push

# 초기 데이터 시드
npm run db:seed
```

### 1.4 Prisma Studio로 확인

```bash
npm run db:studio
```

브라우저에서 http://localhost:5555 열기

---

## Step 2: PortOne (결제) 설정

### 2.1 PortOne 계정 생성

1. https://portone.io 방문
2. 회원가입 및 로그인
3. 상점 생성

### 2.2 API 키 발급

관리자 페이지 > 시스템 설정 > 내 식별코드·API Keys

필요한 정보:
- **가맹점 식별코드** (imp_xxxxxxxx)
- **REST API Key**
- **REST API Secret**

### 2.3 환경 변수 설정

`.env.local`에 추가:

```env
PORTONE_IMP_CODE="imp_your_merchant_code"
PORTONE_API_KEY="your_api_key"
PORTONE_API_SECRET="your_api_secret"
```

### 2.4 PG사 설정

PortOne 관리자 > 결제 연동 > PG사 설정
- 사용할 PG사 선택 (토스페이먼츠, 나이스페이, KG이니시스 등)
- 테스트 모드로 시작 권장

### 2.5 실제 결제 코드 적용

`app/lib/portone.ts` 파일에서 주석 처리된 실제 코드 활성화:

```typescript
// 데모 모드 주석 처리하고 실제 코드 활성화
const IMP = window.IMP;
IMP.init(process.env.NEXT_PUBLIC_PORTONE_IMP_CODE);
```

**주의**: 클라이언트 사이드 환경 변수는 `NEXT_PUBLIC_` prefix 필요!

---

## Step 3: Resend (이메일) 설정

### 3.1 Resend 계정 생성

1. https://resend.com 방문
2. 회원가입
3. 이메일 인증

### 3.2 API 키 발급

Dashboard > API Keys > Create API Key

### 3.3 도메인 인증 (선택사항, 프로덕션 필수)

Dashboard > Domains > Add Domain
- DNS 레코드 설정 필요
- 무료 플랜: onboarding@resend.dev 사용 가능

### 3.4 환경 변수 설정

```env
RESEND_API_KEY="re_xxxxxxxxxxxxxxxxxx"
```

### 3.5 이메일 코드 활성화

`app/lib/email.ts`에서 실제 Resend 코드 활성화:

```typescript
// 주석 해제
const { data, error } = await resend.emails.send({
  from: 'MovingAnimal <noreply@yourdomain.com>',
  to: [to],
  subject: '무빙애니멀 - 구매 확인 및 다운로드 링크',
  html: generateEmailHTML(name, items, total, orderId),
});
```

---

## Step 4: NextAuth Secret 생성

### 4.1 Secret 생성

```bash
# 방법 1: OpenSSL
openssl rand -base64 32

# 방법 2: Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

### 4.2 환경 변수 설정

```env
NEXTAUTH_SECRET="generated_secret_here"
NEXTAUTH_URL="https://yourdomain.com"
```

**로컬 개발:**
```env
NEXTAUTH_URL="http://localhost:3000"
```

---

## Step 5: 파일 업로드 시스템 (S3 또는 Vercel Blob)

### Option A: AWS S3

#### 5.1 S3 버킷 생성

1. AWS Console > S3
2. Create bucket
3. 버킷 이름: `movinganimal-assets`
4. Region: `ap-northeast-2` (서울)
5. Public access 설정

#### 5.2 IAM 사용자 생성

1. IAM > Users > Add user
2. Access key 생성
3. S3 권한 부여

#### 5.3 환경 변수 설정

```env
AWS_ACCESS_KEY_ID="your_access_key"
AWS_SECRET_ACCESS_KEY="your_secret_key"
AWS_REGION="ap-northeast-2"
AWS_S3_BUCKET="movinganimal-assets"
```

#### 5.4 패키지 설치

```bash
npm install @aws-sdk/client-s3 @aws-sdk/s3-request-presigner
```

### Option B: Vercel Blob (더 간단)

#### 5.1 Vercel Blob 활성화

1. Vercel Dashboard > Storage > Create Database
2. Blob 선택

#### 5.2 환경 변수 자동 설정

Vercel이 자동으로 설정:
```env
BLOB_READ_WRITE_TOKEN="vercel_blob_xxx"
```

#### 5.3 패키지 설치

```bash
npm install @vercel/blob
```

---

## Step 6: CDN 및 최적화

### 6.1 Vercel 배포 (추천)

```bash
# Vercel CLI 설치
npm install -g vercel

# 배포
vercel

# 프로덕션 배포
vercel --prod
```

### 6.2 환경 변수 설정

Vercel Dashboard > Project > Settings > Environment Variables

모든 `.env.local`의 변수를 추가

### 6.3 이미지 최적화

Next.js가 자동으로 처리:
```tsx
import Image from 'next/image';

<Image
  src="/character.png"
  alt="Character"
  width={200}
  height={200}
/>
```

### 6.4 Cloudflare (선택사항)

도메인 > Cloudflare > DNS 설정
- CDN 자동 활성화
- 캐싱 설정

---

## Step 7: 배포 실행

### 7.1 프로덕션 빌드 테스트

```bash
npm run build
npm start
```

### 7.2 Vercel 배포

```bash
# 첫 배포
vercel

# 프로덕션
vercel --prod
```

### 7.3 환경 변수 확인

Vercel Dashboard에서 모든 환경 변수가 설정되었는지 확인

### 7.4 데이터베이스 마이그레이션

```bash
# Vercel에서 자동 실행되지 않는 경우
npx prisma migrate deploy
```

---

## Step 8: 배포 후 확인사항

### 체크리스트

- [ ] 웹사이트 접속 확인
- [ ] 회원가입/로그인 테스트
- [ ] 장바구니 기능 테스트
- [ ] 테스트 결제 (PortOne 테스트 모드)
- [ ] 이메일 수신 확인
- [ ] 관리자 대시보드 접속
- [ ] 모바일 반응형 확인
- [ ] 다크 모드 확인

### 모니터링

- **Vercel Analytics**: 자동 활성화
- **Vercel Logs**: 에러 로그 확인
- **Sentry** (선택): 에러 추적
  ```bash
  npm install @sentry/nextjs
  ```

---

## 🔒 보안 체크리스트

- [ ] 모든 API 키는 환경 변수로 관리
- [ ] `.env.local`은 `.gitignore`에 포함
- [ ] HTTPS 사용 (Vercel 자동 제공)
- [ ] CORS 설정 확인
- [ ] Rate limiting 구현
- [ ] SQL Injection 방어 (Prisma가 자동 처리)
- [ ] XSS 방어 (React가 자동 처리)

---

## 📊 성능 최적화

### 이미지 최적화
- Next.js Image 컴포넌트 사용
- WebP 포맷 자동 변환

### 코드 스플리팅
```tsx
// 동적 import
const AdminDashboard = dynamic(() => import('./AdminDashboard'));
```

### 캐싱
```typescript
// API 라우트
export const revalidate = 3600; // 1시간
```

---

## 🐛 트러블슈팅

### 데이터베이스 연결 실패
```bash
# 연결 테스트
npx prisma db pull
```

### Prisma 생성 실패
```bash
# 강제 재생성
npx prisma generate --force
```

### 빌드 에러
```bash
# 캐시 삭제
rm -rf .next
npm run build
```

---

## 📞 지원

- **Vercel 문서**: https://vercel.com/docs
- **Prisma 문서**: https://www.prisma.io/docs
- **NextAuth 문서**: https://next-auth.js.org
- **PortOne 문서**: https://portone.gitbook.io
- **Resend 문서**: https://resend.com/docs

---

## 🎉 완료!

모든 단계를 완료하셨다면 이제 프로덕션 환경에서 무빙애니멀 마켓이 실행됩니다!

**다음 단계:**
1. 실제 캐릭터 에셋 업로드
2. 마케팅 및 SEO 최적화
3. 분석 도구 설정 (Google Analytics)
4. 고객 지원 시스템 구축

---

**Made with ❤️ for Production Deployment**
