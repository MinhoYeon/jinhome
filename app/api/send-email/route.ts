import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { to, name, items, total } = body;

    // 실제 프로덕션에서는 Resend, SendGrid, Nodemailer 등을 사용
    // 여기서는 시뮬레이션만 합니다
    console.log('📧 이메일 전송 시뮬레이션:');
    console.log('받는 사람:', to);
    console.log('이름:', name);
    console.log('주문 상품:', items.map((item: any) => `${item.character.name} x ${item.quantity}`).join(', '));
    console.log('총 금액:', total);

    // 이메일 템플릿 생성
    const emailContent = generateEmailTemplate(name, items, total);

    console.log('\n이메일 내용:');
    console.log(emailContent);

    // 성공 응답
    return NextResponse.json({
      success: true,
      message: '이메일이 성공적으로 전송되었습니다.',
    });

  } catch (error) {
    console.error('이메일 전송 오류:', error);
    return NextResponse.json(
      { success: false, message: '이메일 전송에 실패했습니다.' },
      { status: 500 }
    );
  }
}

function generateEmailTemplate(name: string, items: any[], total: number): string {
  const itemsList = items
    .map((item) => `- ${item.character.name} x ${item.quantity} (₩${(item.character.price * item.quantity).toLocaleString()})`)
    .join('\n');

  return `
안녕하세요, ${name}님!

무빙애니멀 마켓에서 구매해주셔서 감사합니다.

━━━━━━━━━━━━━━━━━━━━━━━━━━
주문 내역
━━━━━━━━━━━━━━━━━━━━━━━━━━

${itemsList}

━━━━━━━━━━━━━━━━━━━━━━━━━━
총 결제 금액: ₩${total.toLocaleString()}
━━━━━━━━━━━━━━━━━━━━━━━━━━

구매하신 캐릭터는 아래 링크에서 다운로드하실 수 있습니다:
👉 https://movinganimal.com/downloads/your-purchase-id

💡 유용한 정보:
- 구매일로부터 7일 이내 환불 가능
- 무제한 다운로드 및 재다운로드 가능
- 상업적 사용 가능

문의사항이 있으시면 언제든지 연락주세요!
support@movinganimal.com

감사합니다.
무빙애니멀 팀 드림
  `;
}
