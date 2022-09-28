import React from "react";
import {
  Alert,
  BackHandler,
  FlatList,
  Keyboard,
  TextInput,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import { AppError } from "@utils/AppError";
import { playerAddByGroup } from "@storage/player/playerAddByGroup";
import { PlayerStorageDTO } from "@storage/player/PlayerStorageDTO";
import { playerGetByGroupAndTeam } from "@storage/player/playerGetByGroupAndTeam";

import { Header } from "@components/Header";
import { Input } from "@components/Input";
import { Filter } from "@components/Filter";
import { Button } from "@components/Button";
import { ButtonIcon } from "@components/ButtonIcon";
import { ListEmpty } from "@components/ListEmpty";
import { Highlight } from "@components/Highlight";
import { PlayerCard } from "@components/PlayerCard";

import { Container, Form, HeaderList, NumberOfPlayers } from "./styles";
import { playerRemoveByGroup } from "@storage/player/playerRemoveByGroup";
import { groupRemoveByName } from "@storage/group/groupRemoveByName";

type RouteParams = {
  group: string;
};

export function Players() {
  const [newPlayerName, setNewPlayerName] = React.useState("");
  const [team, setTeam] = React.useState("Time A");
  const [players, setPlayers] = React.useState<PlayerStorageDTO[]>([]);

  const navigation = useNavigation();
  const route = useRoute();
  const { group } = route.params as RouteParams;

  const newPlayerNameInputRef = React.useRef<TextInput>(null);

  async function handleAddPlayer() {
    if (newPlayerName.trim().length === 0) {
      return Alert.alert("Novo player", "Digite o nome do jogador");
    }

    const newPlayer = {
      name: newPlayerName,
      team,
    };

    try {
      await playerAddByGroup(newPlayer, group);

      newPlayerNameInputRef.current?.blur();

      setNewPlayerName("");
      fetchPlayersByTeam();
    } catch (error) {
      if (error instanceof AppError) {
        return Alert.alert("Novo player", error.message);
      }

      Alert.alert("Novo player", "Não foi possível adicionar o jogador");
      console.log(error);
    }
  }

  async function handlePlayerRemove(playerName: string) {
    try {
      await playerRemoveByGroup(playerName, group);
      await fetchPlayersByTeam();
    } catch (error) {
      console.log(error);

      Alert.alert("Remover jogador", "Não foi possível remover o jogador");
    }
  }

  async function GroupRemove() {
    try {
      await groupRemoveByName(group);
      navigation.navigate("groups");
    } catch (error) {
      Alert.alert("Remover grupo", "Não foi possível remover o grupo");
    }
  }

  function handleGroupRemove() {
    Alert.alert("Remover", "Desejar remover o grupo ?", [
      {
        text: "Não",
        style: "cancel",
      },
      {
        text: "Sim",
        onPress: () => GroupRemove(),
      },
    ]);
  }

  async function fetchPlayersByTeam() {
    try {
      const players = await playerGetByGroupAndTeam(group, team);

      setPlayers(players);
    } catch (error) {
      Alert.alert("Players", "Não foi possível carregar os jogadores");
      console.log(error);
    }
  }

  const backAction = () => {
    navigation.navigate("groups");

    return true;
  };

  React.useEffect(() => {
    fetchPlayersByTeam();

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [team]);

  return (
    <Container>
      <Header showBackButton />

      <Highlight title={group} subtitle="Adicione a galera e separe os times" />

      <Form>
        <Input
          inputRef={newPlayerNameInputRef}
          placeholder="Nome da pessoa"
          autoCorrect={false}
          value={newPlayerName}
          onChangeText={setNewPlayerName}
          onSubmitEditing={handleAddPlayer}
          returnKeyType="done"
        />
        <ButtonIcon icon="add" onPress={handleAddPlayer} />
      </Form>
      <HeaderList>
        <FlatList
          data={["Time A", "Time B"]}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <Filter
              title={item}
              isActived={item === team}
              onPress={() => setTeam(item)}
            />
          )}
          horizontal
        />
        <NumberOfPlayers>{players.length}</NumberOfPlayers>
      </HeaderList>

      <FlatList
        data={players}
        keyExtractor={(item) => item.name}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          { paddingBottom: 100 },
          !players.length && { flex: 1 },
        ]}
        renderItem={({ item }) => (
          <PlayerCard
            name={item.name}
            onRemove={() => handlePlayerRemove(item.name)}
          />
        )}
        ListEmptyComponent={() => (
          <ListEmpty message="Não há pessoas neste time" />
        )}
      />

      <Button
        title="Remover turma"
        type="SECONDARY"
        onPress={handleGroupRemove}
      />
    </Container>
  );
}
