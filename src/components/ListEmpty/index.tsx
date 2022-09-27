import { View, Text } from "react-native";
import React from "react";
import { Container, Message } from "./styles";

type Props = {
  message: string;
};

export function ListEmpty({ message }: Props) {
  return (
    <Container>
      <Message>{message}</Message>
    </Container>
  );
}
