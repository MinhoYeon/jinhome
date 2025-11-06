// PortOne (구 아임포트) 결제 연동
// 실제 사용 시 환경 변수에서 키를 가져옵니다

export interface PortOnePaymentRequest {
  amount: number;
  orderId: string;
  orderName: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  paymentMethod: 'card' | 'kakaopay' | 'naverpay' | 'toss';
}

export interface PortOnePaymentResponse {
  success: boolean;
  imp_uid?: string;
  merchant_uid?: string;
  error?: string;
}

// PortOne 결제 요청
export async function requestPayment(
  paymentData: PortOnePaymentRequest
): Promise<PortOnePaymentResponse> {
  try {
    // 실제 프로덕션에서는 PortOne SDK를 사용
    // npm install @portone/browser-sdk

    /*
    const IMP = window.IMP;
    IMP.init('imp_your_code'); // 실제 가맹점 식별코드

    return new Promise((resolve) => {
      IMP.request_pay(
        {
          pg: getPortOnePG(paymentData.paymentMethod),
          pay_method: 'card',
          merchant_uid: paymentData.orderId,
          name: paymentData.orderName,
          amount: paymentData.amount,
          buyer_email: paymentData.customerEmail,
          buyer_name: paymentData.customerName,
          buyer_tel: paymentData.customerPhone,
        },
        function (rsp: any) {
          if (rsp.success) {
            resolve({
              success: true,
              imp_uid: rsp.imp_uid,
              merchant_uid: rsp.merchant_uid,
            });
          } else {
            resolve({
              success: false,
              error: rsp.error_msg,
            });
          }
        }
      );
    });
    */

    // 데모 모드: 시뮬레이션
    console.log('💳 PortOne 결제 요청 (데모 모드):');
    console.log('금액:', paymentData.amount);
    console.log('주문번호:', paymentData.orderId);
    console.log('결제수단:', paymentData.paymentMethod);
    console.log('구매자:', paymentData.customerName, paymentData.customerEmail);

    // 2초 후 성공 응답
    await new Promise((resolve) => setTimeout(resolve, 2000));

    return {
      success: true,
      imp_uid: `imp_${Date.now()}`,
      merchant_uid: paymentData.orderId,
    };
  } catch (error) {
    console.error('PortOne 결제 오류:', error);
    return {
      success: false,
      error: '결제 처리 중 오류가 발생했습니다.',
    };
  }
}

// PortOne 결제 검증 (서버사이드)
export async function verifyPayment(imp_uid: string, amount: number): Promise<boolean> {
  try {
    // 실제 프로덕션에서는 PortOne REST API로 검증
    /*
    const response = await fetch('https://api.iamport.kr/payments/' + imp_uid, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getPortOneAccessToken()}`,
      },
    });

    const data = await response.json();

    // 결제 금액 검증
    return data.response.amount === amount && data.response.status === 'paid';
    */

    // 데모 모드: 항상 성공
    console.log('✅ PortOne 결제 검증 (데모 모드):', imp_uid, amount);
    return true;
  } catch (error) {
    console.error('결제 검증 오류:', error);
    return false;
  }
}

function getPortOnePG(method: string): string {
  const pgMap: Record<string, string> = {
    card: 'html5_inicis',
    kakaopay: 'kakaopay',
    naverpay: 'naverpay',
    toss: 'tosspay',
  };
  return pgMap[method] || 'html5_inicis';
}

// PortOne 액세스 토큰 발급 (서버사이드 전용)
async function getPortOneAccessToken(): Promise<string> {
  /*
  const response = await fetch('https://api.iamport.kr/users/getToken', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      imp_key: process.env.PORTONE_API_KEY,
      imp_secret: process.env.PORTONE_API_SECRET,
    }),
  });

  const data = await response.json();
  return data.response.access_token;
  */

  return 'demo-access-token';
}
