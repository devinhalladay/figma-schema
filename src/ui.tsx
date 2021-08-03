import { render, VerticalSpace } from "@create-figma-plugin/ui";
import { cloneElement, createContext, Fragment, h } from "preact";
import { useState } from "preact/hooks";
import CategoryRow from "./components/CategoryRow";
import OnboardingCard from "./components/OnboardingCard";
import { PanelData, Panels } from "./constants";
import styles from "./styles.module.css";

interface PanelContextProps {
  openPanels: PanelData[] | Array<any>;
  setOpenPanels: any;
  zIndexTracker: number[];
  setZIndexTracker: any;
}

export const PanelContext = createContext<Partial<PanelContextProps>>(
  {
    openPanels: [],
    setOpenPanels: null,
    setZIndexTracker: null,
    zIndexTracker: [],
  }
);

function Plugin() {
  const [openPanels, setOpenPanels] = useState<null | PanelData[]>(
    []
  );

  const [zIndexTracker, setZIndexTracker] = useState<Array<number>>(
    []
  );

  return (
    <PanelContext.Provider
      value={{
        openPanels: openPanels,
        setOpenPanels: setOpenPanels,
        zIndexTracker: zIndexTracker,
        setZIndexTracker: setZIndexTracker,
      }}>
      {/* {openPanels.length >= 1 &&
        openPanels.map((panel) => {
          return panel.element;
        })} */}

      {Object.entries(Panels).map(([key, value]) => {
        if (value.isEnabled) {
          // openPanels?.map(p, i => )
          // zIndexTracker.push(openPanels.length + 101);

          return cloneElement(value.element, {
            show: openPanels.includes(value),
          });
        }

        return;
      })}

      <div className={styles.container}>
        <div className={styles.main}>
          <OnboardingCard />

          {Object.entries(Panels).map(([key, value]) => {
            if (value.isEnabled) {
              return <CategoryRow panel={value} key={key} />;
            }

            return;
          })}

          <VerticalSpace space="medium" />
        </div>
      </div>
    </PanelContext.Provider>
  );
}

export default render(Plugin);
