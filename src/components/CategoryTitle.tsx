import {
  Container,
  Stack,
  Text,
  VerticalSpace,
} from "@create-figma-plugin/ui";
import { Fragment, h } from "preact";
import { PanelData } from "../constants";
import styles from "../styles.module.css";

interface ICategoryRow {
  panel: PanelData;
}

export default function CategoryTitle({ panel }: ICategoryRow) {
  return (
    <div className={styles.rowContents}>
      <div className={styles.inlineCenter}>
        <div className={styles.box}>{panel.icon}</div>
        <Stack space="extraSmall">
          <Text bold>{panel.name}</Text>
          <Text muted>{panel.summary}</Text>
        </Stack>
      </div>
    </div>
  );
}
