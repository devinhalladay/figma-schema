import {
  Container,
  Divider,
  VerticalSpace,
} from "@create-figma-plugin/ui";
import { Fragment, h } from "preact";
import { useContext, useEffect, useState } from "preact/hooks";
import { PanelContext } from "src/ui";
import styles from "../../styles.module.css";
import CategoryTitle from "../CategoryTitle";
import PanelFooter from "./components/Footer";
import PanelNavbar from "./components/NavBar";

export default function Panel({
  panel,
  data,
  children,
  show,
  // zIndex,
}) {
  const { openPanels, setOpenPanels, zIndexTracker } = useContext(
    PanelContext
  );
  // let show = openPanels.includes(panel);

  const [shouldRender, setRender] = useState(show);

  useEffect(() => {
    if (show) setRender(true);
  }, [show]);

  const onAnimationEnd = () => {
    if (!show) setRender(false);
  };

  return (
    shouldRender && (
      <div
        className={
          show
            ? `${styles.panelExitActive} ${styles.panel}`
            : `${styles.panelEnterActive} ${styles.panel}`
        }
        style={{
          zIndex: zIndexTracker.lastIndexOf(panel) + 100,
        }}
        onAnimationEnd={onAnimationEnd}>
        <div className={styles.container}>
          <PanelNavbar panel={panel} />
          <div className={styles.main}>
            <Container>
              <CategoryTitle panel={panel} />
            </Container>
            <VerticalSpace space="small" />
            <Divider />
            <VerticalSpace space="medium" />
            {children}
          </div>
          <PanelFooter panel={panel} data={data} />
        </div>
      </div>
    )
  );
}
