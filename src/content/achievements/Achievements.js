export const AllAchievements = [
  {
    name: "Começo da jornada",
    condition: (_, up) => up.xp > 0,
    rewardCoins: 1,
    rewardXp: 1,
  },
  {
    name: "Engatinhando",
    condition: (_, up) => up.xp > 100,
    rewardCoins: 5,
    rewardXp: 3,
  },
  {
    name: "Controlando o dinheiro",
    condition: (_, up) => up.xp > 1_000,
    rewardCoins: 20,
    rewardXp: 10,
  },
  {
    name: "Manipulador da economia",
    condition: (_, up) => up.xp > 10_000,
    rewardCoins: 50,
    rewardXp: 25,
  },
  {
    name: "Primeiro montante",
    condition: (_, up) => up.coins > 100,
    rewardCoins: 2,
    rewardXp: 5,
  },
  {
    name: "Economia mensal",
    condition: (_, up) => up.coins > 1_000,
    rewardCoins: 15,
    rewardXp: 30,
  },
  {
    name: "Planejamento monetário",
    condition: (_, up) => up.coins > 10_000,
    rewardCoins: 60,
    rewardXp: 150,
  },
  {
    name: "Aspirante a banqueiro",
    condition: (_, up) => up.coins > 100_000,
    rewardCoins: 150,
    rewardXp: 400,
  },
  {
    name: "Dando as caras",
    condition: (u) => u.user_img != null,
    rewardCoins: 10,
    rewardXp: 5,
  },
  {
    name: "Encarando novos desafios",
    condition: (u) => u.difficulty === 2,
    rewardCoins: 25,
    rewardXp: 15,
  },
];
