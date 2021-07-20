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
}

export const PanelContext = createContext<Partial<PanelContextProps>>(
  {
    openPanels: [],
    setOpenPanels: null,
  }
);

function Plugin() {
  const [openPanels, setOpenPanels] = useState<null | PanelData[]>(
    []
  );

  return (
    <PanelContext.Provider
      value={{
        openPanels: openPanels,
        setOpenPanels: setOpenPanels,
      }}>
      {/* {openPanels.length >= 1 &&
        openPanels.map((panel) => {
          return panel.element;
        })} */}

      {Object.entries(Panels).map(([key, value]) => {
        if (value.isEnabled) {
          // return value.element;

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
