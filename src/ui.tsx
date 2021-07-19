import { render, VerticalSpace } from "@create-figma-plugin/ui";
import { createContext, Fragment, h } from "preact";
import { useState } from "preact/hooks";
import CategoryRow from "./components/CategoryRow";
import OnboardingCard from "./components/OnboardingCard";
import { PanelData, Panels } from "./constants";
import styles from "./styles.module.css";

interface PanelContextProps {
  openPanels: PanelData[] | null;
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
        return value.element;
      })}

      <div className={styles.container}>
        <div className={styles.main}>
          <OnboardingCard />

          {Object.entries(Panels).map(([key, value]) => {
            return <CategoryRow panel={value} key={key} />;
          })}

          <VerticalSpace space="medium" />
        </div>
      </div>
    </PanelContext.Provider>
  );
}

export default render(Plugin);
