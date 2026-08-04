import crypto from "crypto";
import axios from "axios";
export const generateEsewaSignature = (
    amount: number,
    transactionUuid: string
) => {
  const message = `total_amount=${amount},transaction_uuid=${transactionUuid},product_code=${process.env.ESEWA_MERCHANT_CODE}`;
    return crypto
        .createHmac("sha256", process.env.ESEWA_SECRET_KEY!)//यसले एउटा HMAC object बनाउँछ।
        .update(message)//"यो message लाई hash गर।"
        .digest("base64");//"अब final hash निकाल।"
};

export const createEsewaPayment = (
    amount: number,
    transactionUuid: string
) => {
    return {
        amount,
        tax_amount: 0,
        total_amount: amount,
        transaction_uuid: transactionUuid,
        product_code: process.env.ESEWA_MERCHANT_CODE,
        product_service_charge: 0,
        product_delivery_charge: 0,
        success_url: `${process.env.FRONTEND_URL}/payment/success`,
        failure_url: `${process.env.FRONTEND_URL}/payment/failure`,
        signature: generateEsewaSignature(amount, transactionUuid),
    };
};
export const verifyEsewaPayment = async (
    transactionUuid: string
) => {
    try {
        const response = await axios.get(
            `${process.env.ESEWA_BASE_URL}/transaction/status`,
            {
                params: {
                    product_code: process.env.ESEWA_MERCHANT_CODE,
                    transaction_uuid: transactionUuid,
                },
            }
        );

        return response.data;
    } catch (error: any) {
        throw new Error(
            error.response?.data?.message ||
            error.message ||
            "Failed to verify eSewa payment"
        );
    }
};
/*
Hash generate गर्छ
HMAC generate गर्छ
UUID generate गर्छ
Encryption
Decryption
Random bytes generate गर्छ
जस्ता security सम्बन्धी काम गर्छ।
*/

/*
HMAC =Hash Message Authentication Code
Message
+
Secret Key
बाट एउटा unique signature बनाउँछ।
 */