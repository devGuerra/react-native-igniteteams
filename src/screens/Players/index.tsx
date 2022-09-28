import React from "react";

import ButtonIcon from "@components/ButtonIcon";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";

import { Container, Form } from "./styles";
import Input from "@components/Input";
import { Filter } from "@components/Filter";

export function Players() {
  return (
    <Container>
      <Header showBackButton />

      <Highlight
        title="Nome da Turma"
        subtitle="Adicione a galera e separe os times"
      />
      <Form>
        <Input placeholder="Nome da pessoa" autoCorrect={false} />
        <ButtonIcon icon="add" />
      </Form>
      <Filter title="Time A" isActived />
    </Container>
  );
}
