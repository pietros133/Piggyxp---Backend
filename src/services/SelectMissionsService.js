import { AppDataSource } from "../config/dbconnect.js";
import { UserMission } from "../models/UserMissions.js";

export async function selectMissionsService(userId) {
  const userMissionRepo = AppDataSource.getRepository(UserMission);
  const now = new Date();

  let userMissions = await userMissionRepo.find({
    where: {
      user: { id: userId },
    },
    relations: ["mission"],
  });

  if (!userMissions.length) {
    throw new Error("Missões não encontradas");
  }

  const expired = userMissions.filter(
    (m) => m.selected && m.reset_at && new Date(m.reset_at) <= now
  );

  for (const mission of expired) {
    const freq = mission.mission.frequency;

    const replacement = await userMissionRepo
      .createQueryBuilder("um")
      .innerJoinAndSelect("um.mission", "mission")
      .where("um.user = :userId", { userId })
      .andWhere("mission.frequency = :freq", { freq })
      .andWhere("um.selected = false")
      .orderBy("RAND()")
      .limit(1)
      .getOne();

    const newReset = new Date();

    if (freq === "daily") newReset.setDate(newReset.getDate() + 1);
    if (freq === "weekly") newReset.setDate(newReset.getDate() + 7);
    if (freq === "monthly") newReset.setMonth(newReset.getMonth() + 1);

    // desativa antiga
    await userMissionRepo.update(
      { id: mission.id },
      {
        selected: false,
        progress: 0,
        completed: false,
      }
    );

    // ativa nova
    if (replacement) {
      await userMissionRepo.update(
        { id: replacement.id },
        {
          selected: true,
          progress: 0,
          completed: false,
          reset_at: newReset,
        }
      );
    }
  }

  userMissions = await userMissionRepo.find({
    where: {
      user: { id: userId },
    },
    relations: ["mission"],
  });

  const selectedCount = userMissions.filter((m) => m.selected).length;

  if (selectedCount === 0) {
    const frequencies = ["daily", "weekly", "monthly"];

    for (const freq of frequencies) {
      const pool = await userMissionRepo
        .createQueryBuilder("um")
        .innerJoin("um.mission", "mission")
        .where("um.user = :userId", { userId })
        .andWhere("mission.frequency = :freq", { freq })
        .andWhere("um.selected = false")
        .orderBy("RAND()")
        .limit(3)
        .getMany();

      for (const m of pool) {
        const reset = new Date();

        if (freq === "daily") reset.setDate(reset.getDate() + 1);
        if (freq === "weekly") reset.setDate(reset.getDate() + 7);
        if (freq === "monthly") reset.setMonth(reset.getMonth() + 1);

        await userMissionRepo.update(
          { id: m.id },
          {
            selected: true,
            progress: 0,
            completed: false,
            reset_at: reset,
          }
        );
      }
    }
  }

  return {
    message: "Missões atualizadas com rotação",
  };
}