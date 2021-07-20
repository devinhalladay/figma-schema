import { Text, VerticalSpace } from "@create-figma-plugin/ui";
import { Fragment, h } from "preact";

export default function LabeledInputGroup({ title, children }) {
  return (
    <>
      <Text bold>{title}</Text>
      <VerticalSpace space="small" />
      {children}
      <VerticalSpace space="medium" />
    </>
  );
}
