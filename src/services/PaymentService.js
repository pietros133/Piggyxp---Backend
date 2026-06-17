import { AppDataSource } from "../config/dbconnect.js";

import { createPreference } from "./MercadoPagoService.js";

export const createPayment = async (user, productId) => {
  const productRepository = AppDataSource.getRepository("Product");

  const paymentRepository = AppDataSource.getRepository("Payment");

  const product = await productRepository.findOne({
    where: {
      id: productId,
    },
  });

  if (!product) {
    throw new Error("Produto não encontrado");
  }

  if (!product.priceBrl) {
    throw new Error("Produto indisponível para pagamento");
  }

  const preference = await createPreference(product, user);

  const payment = paymentRepository.create({
    userId: user.id,

    productId: product.id,

    amountBrl: product.priceBrl,

    coinsCredited: product.rewardAmount + product.bonusAmount,

    mpPreferenceId: preference.id,

    status: "pending",
  });

  await paymentRepository.save(payment);

  return {
    payment,
    initPoint: preference.init_point,
  };
};
