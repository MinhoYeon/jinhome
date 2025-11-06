import { NextResponse } from 'next/server';
import { requestPayment, verifyPayment } from '../../lib/portone';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { amount, orderId, orderName, customerName, customerEmail, customerPhone, paymentMethod } = body;

    // 필수 필드 검증
    if (!amount || !orderId || !orderName || !customerName || !customerEmail || !customerPhone || !paymentMethod) {
      return NextResponse.json(
        { error: '필수 정보가 누락되었습니다.' },
        { status: 400 }
      );
    }

    // PortOne 결제 요청
    const paymentResult = await requestPayment({
      amount,
      orderId,
      orderName,
      customerName,
      customerEmail,
      customerPhone,
      paymentMethod,
    });

    if (!paymentResult.success) {
      return NextResponse.json(
        { error: paymentResult.error || '결제에 실패했습니다.' },
        { status: 400 }
      );
    }

    // 결제 검증 (서버사이드)
    const isValid = await verifyPayment(paymentResult.imp_uid!, amount);

    if (!isValid) {
      return NextResponse.json(
        { error: '결제 검증에 실패했습니다.' },
        { status: 400 }
      );
    }

    // 성공 응답
    return NextResponse.json({
      success: true,
      imp_uid: paymentResult.imp_uid,
      merchant_uid: paymentResult.merchant_uid,
    });
  } catch (error) {
    console.error('결제 처리 오류:', error);
    return NextResponse.json(
      { error: '결제 처리 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
