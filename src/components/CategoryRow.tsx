import {
  Container,
  Stack,
  Text,
  VerticalSpace,
} from "@create-figma-plugin/ui";
import { Fragment, h } from "preact";
import { useContext } from "preact/hooks";
import { PanelContext } from "src/ui";
import { PanelData } from "../constants";
import styles from "../styles.module.css";
import CategoryTitle from "./CategoryTitle";

interface ICategoryRow {
  panel: PanelData;
}

export default function CategoryRow({ panel }: ICategoryRow) {
  const { openPanels, setOpenPanels } = useContext(PanelContext);

  return (
    <div className={styles.row}>
      <Container
        onClick={() => {
          setOpenPanels([...openPanels, panel]);
          console.log(openPanels);
        }}>
        <div className={styles.rowContents}>
          <CategoryTitle panel={panel} />
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
    </div>
  );
}
