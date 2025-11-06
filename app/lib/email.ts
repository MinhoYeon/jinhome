import { Resend } from 'resend';

// Resend API 키 (환경 변수에서 가져오기)
// 실제 사용 시: export const resend = new Resend(process.env.RESEND_API_KEY);
export const resend = new Resend('re_123456789'); // 데모용

export async function sendOrderConfirmationEmail(
  to: string,
  name: string,
  items: any[],
  total: number,
  orderId: string
) {
  try {
    // Resend를 사용한 실제 이메일 전송
    // 실제 프로덕션에서는 아래 주석을 해제하고 사용
    /*
    const { data, error } = await resend.emails.send({
      from: 'MovingAnimal <onboarding@resend.dev>',
      to: [to],
      subject: '무빙애니멀 - 구매 확인 및 다운로드 링크',
      html: generateEmailHTML(name, items, total, orderId),
    });

    if (error) {
      console.error('Resend 이메일 전송 오류:', error);
      return { success: false, error };
    }

    return { success: true, data };
    */

    // 데모용: 콘솔에 출력
    console.log('📧 Resend 이메일 전송 (데모 모드):');
    console.log('받는 사람:', to);
    console.log('주문 ID:', orderId);
    console.log('내용:', generateEmailHTML(name, items, total, orderId));

    return { success: true, data: { id: 'demo-email-id' } };
  } catch (error) {
    console.error('이메일 전송 오류:', error);
    return { success: false, error };
  }
}

function generateEmailHTML(
  name: string,
  items: any[],
  total: number,
  orderId: string
): string {
  const itemsList = items
    .map((item) => `
      <tr>
        <td style="padding: 12px; border-bottom: 1px solid #e5e7eb;">
          ${item.character.name}
        </td>
        <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: center;">
          ${item.quantity}
        </td>
        <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: right;">
          ₩${(item.character.price * item.quantity).toLocaleString()}
        </td>
      </tr>
    `)
    .join('');

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <title>구매 확인 및 다운로드</title>
      </head>
      <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb;">
        <div style="background: linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%); padding: 40px 20px; text-align: center; border-radius: 12px 12px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 28px;">🐰 무빙애니멀 마켓</h1>
          <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0;">구매해주셔서 감사합니다!</p>
        </div>

        <div style="background-color: white; padding: 40px; border-radius: 0 0 12px 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          <h2 style="color: #111827; margin-top: 0;">안녕하세요, ${name}님!</h2>
          <p style="color: #6b7280; line-height: 1.6;">주문이 성공적으로 완료되었습니다.</p>

          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0; color: #6b7280; font-size: 14px;">주문 번호</p>
            <p style="margin: 5px 0 0 0; color: #111827; font-weight: bold; font-size: 16px;">${orderId}</p>
          </div>

          <h3 style="color: #111827; margin-top: 30px;">주문 내역</h3>
          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <thead>
              <tr style="background-color: #f9fafb;">
                <th style="padding: 12px; text-align: left; border-bottom: 2px solid #e5e7eb;">상품</th>
                <th style="padding: 12px; text-align: center; border-bottom: 2px solid #e5e7eb;">수량</th>
                <th style="padding: 12px; text-align: right; border-bottom: 2px solid #e5e7eb;">금액</th>
              </tr>
            </thead>
            <tbody>
              ${itemsList}
            </tbody>
            <tfoot>
              <tr>
                <td colspan="2" style="padding: 12px; text-align: right; font-weight: bold;">총 결제 금액</td>
                <td style="padding: 12px; text-align: right; font-weight: bold; color: #8b5cf6;">₩${total.toLocaleString()}</td>
              </tr>
            </tfoot>
          </table>

          <div style="background: linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%); padding: 20px; border-radius: 8px; text-align: center; margin: 30px 0;">
            <a href="https://movinganimal.com/downloads/${orderId}"
               style="color: white; text-decoration: none; font-weight: bold; font-size: 16px;">
              📥 다운로드하기
            </a>
          </div>

          <div style="background-color: #eff6ff; border-left: 4px solid #3b82f6; padding: 15px; margin: 20px 0;">
            <p style="margin: 0; color: #1e40af; font-size: 14px;">
              <strong>💡 안내사항</strong><br>
              • 구매일로부터 7일 이내 환불 가능<br>
              • 무제한 다운로드 및 재다운로드 가능<br>
              • 상업적 사용 가능
            </p>
          </div>

          <p style="color: #6b7280; font-size: 14px; line-height: 1.6; margin-top: 30px;">
            문의사항이 있으시면 <a href="mailto:support@movinganimal.com" style="color: #8b5cf6;">support@movinganimal.com</a>으로 연락주세요.
          </p>

          <p style="color: #6b7280; font-size: 14px; margin-top: 30px;">
            감사합니다,<br>
            <strong>무빙애니멀 팀</strong>
          </p>
        </div>
      </body>
    </html>
  `;
}
