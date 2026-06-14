import { createPayment } from "../services/PaymentService.js";

export const createPaymentController = async (req, res) => {
  try {
    const user = req.user;

    const { productId } = req.body;

    const payment = await createPayment(user, productId);

    return res.status(200).json({
      success: true,
      data: payment,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
