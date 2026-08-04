import axios from "axios";

export const initiateKhaltiPayment = async (
    amount: number,
    purchaseOrderID: string,
    customerName: string,
    customerEmail: string,
    customerPhone: string
) => {
    if (amount <= 0) {
        throw new Error("Invalid payment amount");
    }
    try {
        const response = await axios.post(
            `${process.env.KHALTI_BASE_URL}/epayment/initiate/`, {
            amount: amount * 100,
            purchase_order_id: purchaseOrderID,
            purchase_order_name: "Sports Gaming Network Payment",
            customer_info: {
                name: customerName,
                email: customerEmail,
                phone: customerPhone
            },
            return_url: `${process.env.FRONTEND_URL}/payment/success`,
            website_url: process.env.FRONTEND_URL,
        },
            {
                headers: {
                    Authorization:
                        `Key ${process.env.KHALTI_SECRET_KEY}`,
                        "Content-Type":"application/json"
                }
            }
        );
        return response.data;
    } catch (error: any) {
        throw new Error(
            error.response?.data?.detail || error.message
        );
    }
}

export const verifyKhaltiPayment = async (pidx: string) => {
    try {
        const response = await axios.post(
            `${process.env.KHALTI_BASE_URL}/epayment/lookup/`,
            { pidx },
            {
                headers: {
                    Authorization:
                        `Key ${process.env.KHALTI_SECRET_KEY}`
                }
            }

        );
        return response.data;
    } catch (error: any) {
        throw new Error(
            error.response?.data?.detail ||
            error.response?.data?.message ||
             error.message || "Khalti payment failed"
        );

    }
}