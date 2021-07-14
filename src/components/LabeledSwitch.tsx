import { Text, Toggle } from "@create-figma-plugin/ui";
import { Fragment, h } from "preact";
import styles from "../styles.module.css";

export default function LabeledSwitch({
  title,
  handleChange,
  subtitle,
  value,
}) {
  return (
    <div className={styles.inlineCenter}>
      <Toggle onChange={handleChange} value={value} />
      <span
        style={{
          marginRight: 8,
        }}></span>
      <Text>{title}</Text>
      <span
        style={{
          marginRight: 8,
        }}></span>
      <Text muted>{subtitle}</Text>
    </div>
  );
}
