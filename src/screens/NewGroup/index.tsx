import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Alert } from "react-native";

import { AppError } from "@utils/AppError";
import { Button } from "@components/Button";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { Input } from "@components/Input";

import { Container, Content, Icon } from "./styles";
import { groupCreate } from "@storage/group/groupCreate";

export function NewGroup() {
  const [group, setGroup] = React.useState("");

  const navigation = useNavigation();

  async function handleNew() {
    try {
      if (!group.trim().length) {
        return Alert.alert("Novo grupo", "Informe o nome da turma");
      }

      await groupCreate(group);
      setGroup("");
      navigation.navigate("players", { group });
    } catch (error) {
      if (error instanceof AppError) {
        return Alert.alert("Novo grupo", error.message);
      }
      Alert.alert("Novo grupo", "Não foi possível criar o grupo");
      console.log(error);
    }
  }

  return (
    <Container>
      <Header showBackButton />

      <Content>
        <Icon />

        <Highlight
          title="Nova turma"
          subtitle="Crie uma turma para as pessoas"
        />

        <Input
          placeholder="Nome da turma"
          onChangeText={setGroup}
          value={group}
        />

        <Button title="Criar" style={{ marginTop: 20 }} onPress={handleNew} />
      </Content>
    </Container>
  );
}
