import AsycStorage from "@react-native-async-storage/async-storage";

import { AppError } from "@utils/AppError";
import { PLAYER_COLLECTION } from "@storage/storageConfig";
import { PlayerStorageDTO } from "./PlayerStorageDTO";
import { playersGetByGroup } from "./playersGetByGroup";

export async function playerAddByGroup(
  newPlayer: PlayerStorageDTO,
  group: string
) {
  try {
    const storagePlayers = await playersGetByGroup(group);

    const playerExists = storagePlayers.filter(
      (player) => player.name === newPlayer.name
    );

    if (playerExists.length > 0) {
      throw new AppError("Esta pessoa já está cadastrada!");
    }

    const storage = JSON.stringify([...storagePlayers, newPlayer]);

    await AsycStorage.setItem(`${PLAYER_COLLECTION}-${group}`, storage);
  } catch (error) {
    throw error;
  }
}
