import axios from "axios";

export const createFonePayment = async (
    amount: number,
    transactionId: string
) => {
    if (amount <= 0) {
        throw new Error("Invalid payment amount");
    }
    if (!transactionId) {
        throw new Error("Transaction ID is required");
    }
    try {
        const response = await axios.post(
            `${process.env.FONEPAY_BASE_URL}/v1/payment`,
            {
                amount,
                merchantCode: process.env.FONEPAY_MERCHANT_CODE,
                transactionId,
                returnUrl: `${process.env.FRONTEND_URL}/payment/success`,
            },
            {
                timeout: 15000,
                auth: {
                    username: process.env.FONEPAY_USERNAME!,
                    password: process.env.FONEPAY_PASSWORD!,
                },
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        if (!response.data) {
            throw new Error("Empty response from Fonepay");
        }

        return response.data;
    } catch (error: any) {
        throw new Error(
            error.response?.data?.message ||
            error.response?.data?.detail ||
            error.message ||
            "Fonepay payment failed"
        );
    }
}

export const verifyFonePayment = async (
    transactionId: string
) => {
    try {
        const response = await axios.post(
            `${process.env.FONEPAY_BASE_URL}/v1/payment/verify`,
            {
                merchantCode: process.env.FONEPAY_MERCHANT_CODE,
                transactionId,
            },
            {
                auth: {
                    username: process.env.FONEPAY_USERNAME!,
                    password: process.env.FONEPAY_PASSWORD!,
                },
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        return response.data;
    } catch (error: any) {
        throw new Error(
            error.response?.data?.message ||
            error.message ||
            "Fonepay verification failed"
        );
    }
};