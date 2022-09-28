import React from "react";
import { View, Text, TouchableOpacityProps } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { ButtonIconTypeStyleProps, Container, Icon } from "./styles";

type Props = TouchableOpacityProps & {
  type?: ButtonIconTypeStyleProps;
  icon: keyof typeof MaterialIcons.glyphMap;
};

export default function ButtonIcon({ icon, type = "PRIMARY" }: Props) {
  return (
    <Container>
      <Icon name={icon} type={type} />
    </Container>
  );
}
