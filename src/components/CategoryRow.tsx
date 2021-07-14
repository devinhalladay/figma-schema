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
  setOpenPanel: any;
}

export default function CategoryRow({
  panel,
  setOpenPanel,
}: ICategoryRow) {
  return (
    <Container onClick={() => setOpenPanel(panel)}>
      <VerticalSpace space="medium" />
      <div className={styles.row}>
        <div className={styles.inlineCenter}>
          <div className={styles.box}></div>
          <Stack space="extraSmall">
            <Text bold>{panel.name}</Text>
            <Text muted>{panel.summary}</Text>
          </Stack>
        </div>
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path d="M14 11L19 16L14 21" stroke="#B2B2B2" />
        </svg>
      </div>
    </Container>
  );
}
