import { GroupCard } from "@components/GroupCard";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import React from "react";
import * as S from "./style";

export function Groups() {
  return (
    <S.Container>
      <Header />
      <Highlight title="Turmas" subtitle="Jogue com a sua turma" />

      <GroupCard title="Galera do ignite" />
    </S.Container>
  );
}
