import { View, Text, TextInputProps } from "react-native";
import React from "react";
import { Container } from "./styles";
import { useTheme } from "styled-components/native";

export default function Input({ ...rest }: TextInputProps) {
  const { COLORS } = useTheme();

  return <Container placeholderTextColor={COLORS.GRAY_300} {...rest} />;
}