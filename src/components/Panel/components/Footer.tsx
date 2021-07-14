import {
  Button,
  Container,
  Divider,
  Text,
  VerticalSpace,
} from "@create-figma-plugin/ui";
import { emit } from "@create-figma-plugin/utilities";
import { Fragment, h } from "preact";
import styles from "../../../styles.module.css";

export default function PanelFooter({ panel, eventArgs }) {
  return (
    <>
      <Divider />
      <Container space="small">
        <VerticalSpace space="extraSmall" />
        <div className={styles.flexAlignRight}>
          <Button onClick={() => emit(panel.event, eventArgs)}>
            Generate
          </Button>
        </div>
        <VerticalSpace space="extraSmall" />
      </Container>
    </>
  );
}
