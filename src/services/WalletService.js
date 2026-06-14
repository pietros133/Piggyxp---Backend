export const addCoins = (progress, amount) => {
  progress.coins += amount;

  return progress;
};

export const removeCoins = (progress, amount) => {
  if (progress.coins < amount) {
    throw new Error("Saldo insuficiente");
  }

  progress.coins -= amount;

  return progress;
};

export const addLives = (progress, amount) => {
  progress.lives += amount;

  if (progress.lives > 0) {
    progress.reset_lives_at = null;
  }

  return progress;
};

export const removeLife = (progress) => {
  if (progress.lives <= 0) {
    throw new Error("Sem vidas disponíveis");
  }

  progress.lives -= 1;

  if (progress.lives === 0) {
    const resetDate = new Date();

    resetDate.setHours(resetDate.getHours() + 5);

    progress.reset_lives_at = resetDate;
  }

  return progress;
};

export const validateLivesReset = (progress) => {
  if (progress.lives > 0 || !progress.reset_lives_at) {
    return progress;
  }

  const now = new Date();

  const resetTime = new Date(progress.reset_lives_at);

  if (now >= resetTime) {
    progress.lives = 5;

    progress.reset_lives_at = null;
  }

  return progress;
};

export const addReward = (progress, product) => {
  const totalReward = product.rewardAmount + product.bonusAmount;

  switch (product.type) {
    case "coins":
      addCoins(progress, totalReward);
      break;

    case "lives":
      addLives(progress, totalReward);
      break;

    default:
      throw new Error("Tipo inválido");
  }

  return progress;
};
