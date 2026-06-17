import { buyWithCoins } from "../services/PurchaseService.js";

export const purchaseWithCoins = async (req, res) => {
  try {
    const userId = req.user.id;

    const { productId } = req.body;

    const purchase = await buyWithCoins(userId, productId);

    return res.status(200).json({
      success: true,
      data: purchase,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
