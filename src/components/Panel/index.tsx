import {
  Container,
  Divider,
  VerticalSpace,
} from "@create-figma-plugin/ui";
import { Fragment, h } from "preact";
import { useEffect, useState } from "preact/hooks";
import styles from "../../styles.module.css";
import CategoryTitle from "../CategoryTitle";
import PanelFooter from "./components/Footer";
import PanelNavbar from "./components/NavBar";

export default function Panel({
  show,
  setOpenPanel,
  panel,
  eventArgs,
  children,
}) {
  const [render, setRender] = useState(show);

  useEffect(() => {
    if (show) setRender(true);
  }, [show]);

  const onAnimationEnd = () => {
    if (!show) setRender(false);
  };

  return (
    render && (
      <div
        className={
          show
            ? `${styles.panelExitActive} ${styles.panel}`
            : `${styles.panelEnterActive} ${styles.panel}`
        }
        onAnimationEnd={onAnimationEnd}>
        <div className={styles.container}>
          <PanelNavbar setOpenPanel={setOpenPanel} />
          <div className={styles.main}>
            <Container>
              <CategoryTitle panel={panel} />
            </Container>
            <VerticalSpace space="small" />
            <Divider />
            <VerticalSpace space="medium" />
            {children}
          </div>
          <PanelFooter panel={panel} eventArgs={eventArgs} />
        </div>
      </div>
    )
  );
}
