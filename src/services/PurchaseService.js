import { AppDataSource } from "../config/dbconnect.js";

import { removeCoins, addReward } from "./WalletService.js";

export const buyWithCoins = async (userId, productId) => {
  const productRepository = AppDataSource.getRepository("Product");

  const progressRepository = AppDataSource.getRepository("UserProgress");

  const purchaseRepository = AppDataSource.getRepository("Purchase");

  const product = await productRepository.findOne({
    where: {
      id: productId,
    },
  });

  if (!product) {
    throw new Error("Produto não encontrado");
  }

  if (!product.coinPrice) {
    throw new Error("Produto indisponível para moedas");
  }

  const progress = await progressRepository.findOne({
    where: {
      user: {
        id: userId,
      },
    },

    relations: ["user"],
  });

  if (!progress) {
    throw new Error("Progressão não encontrada");
  }

  removeCoins(progress, product.coinPrice);

  addReward(progress, product);

  await progressRepository.save(progress);

  const purchase = purchaseRepository.create({
    userId,
    productId,
    coinPricePaid: product.coinPrice,

    rewardAmount: product.rewardAmount,
  });

  await purchaseRepository.save(purchase);

  return purchase;
};
