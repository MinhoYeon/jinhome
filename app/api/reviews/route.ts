import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import db from '../../lib/db';

// GET - 특정 캐릭터의 리뷰 조회
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const characterId = searchParams.get('characterId');

  if (!characterId) {
    return NextResponse.json({ reviews: db.reviews });
  }

  const reviews = db.reviews.filter((r) => r.characterId === characterId);
  return NextResponse.json({ reviews });
}

// POST - 리뷰 작성
export async function POST(request: Request) {
  try {
    const { characterId, userId, userName, rating, comment } = await request.json();

    if (!characterId || !userId || !userName || !rating || !comment) {
      return NextResponse.json(
        { error: '모든 필드를 입력해주세요.' },
        { status: 400 }
      );
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: '평점은 1~5 사이여야 합니다.' },
        { status: 400 }
      );
    }

    const newReview = {
      id: uuidv4(),
      characterId,
      userId,
      userName,
      rating,
      comment,
      createdAt: new Date().toISOString(),
    };

    db.reviews.push(newReview);

    return NextResponse.json({ success: true, review: newReview });
  } catch (error) {
    console.error('리뷰 작성 오류:', error);
    return NextResponse.json(
      { error: '리뷰 작성에 실패했습니다.' },
      { status: 500 }
    );
  }
}
