import { AppDataSource } from '../config/dbconnect.js';
import {UserProgress} from '../models/UserProgress.js';
import {User} from '../models/User.js'


export  async function RankService() {
    const rankRepository = AppDataSource.getRepository(UserProgress);

        const result = await rankRepository.find({
            relations: ["user"],
            order: {xp: "DESC",
                nivel: "DESC"
            },
            take: 10,
        });
        return result.map((item, index) => ({
            position: index + 1,
            id: item.user.id,
            name: item.user.name,
            img: item.user.user_img,
            xp: item.xp,
            nivel: item.nivel,
        }));
     }
