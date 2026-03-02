import { AppDataSource } from '../config/dbconnect.js';
import {UserProgress} from '../models/UserProgress.js';


export  async function RankService() {
    const RankRepository = AppDataSource.getRepository(UserProgress);
        return RankRepository.find({
            order: { xp:"DESC"},
            take: 10,
        });
     }