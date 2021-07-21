import {
  Button,
  Checkbox,
  Container,
  Dropdown,
  DropdownOption,
  IconButton,
  Inline,
  Text,
  VerticalSpace,
} from "@create-figma-plugin/ui";
import { emit } from "@create-figma-plugin/utilities";
import { h, JSX, Fragment } from "preact";
import { useContext, useState } from "preact/hooks";
import { TextLayerData } from "src/@types/Panel";
import { PanelData, Panels } from "../../constants";
import styles from "../../styles.module.css";
import Panel from ".";
import SliderIcon from "../Icons/SliderIcon";
import HorizontalSpace from "../HorizontalSpace";
import { PanelContext } from "src/ui";
import { intersectionWith } from "lodash";

type CustomDropdownOption = DropdownOption & {
  key: string;
  // panel: PanelData;
};

export default function ComponentVariabelsPanel({ show }) {
  const [currentSelection, setCurrentSelection] = useState([]);

  const { openPanels, setOpenPanels } = useContext(PanelContext);

  console.log(Object.values(Panels));

  const typeOptions: Array<CustomDropdownOption> = Object.values(
    Panels
  )
    .filter((panel) => {
      return panel.isVariableOption === true;
    })
    .map((panel) => {
      return { operation: panel.event, value: panel.name };
    });

  const [selectedLayers, setSelectedLayers] = useState({});

  function handleDropdownChange(
    e: JSX.TargetedEvent<HTMLInputElement>,
    node: SceneNode | Node
  ) {
    let selected = typeOptions.find(
      (option) => option.value === e.currentTarget.value
    );

    setSelectedLayers({
      ...selectedLayers,
      [node.id]: {
        ...selected,
        ...node,
      },
    });
  }

  function handleCheckboxChange(
    event: JSX.TargetedEvent<HTMLInputElement>,
    node: SceneNode | Node
  ) {
    if (event.currentTarget.checked) {
      setSelectedLayers({
        ...selectedLayers,
        [node.id]: { ...typeOptions[0], ...node },
      });
    } else {
      let temp = { ...selectedLayers };
      delete temp[node.id];
      setSelectedLayers(temp);
    }
  }

  onmessage = (event) => {
    setCurrentSelection(event.data.pluginMessage.nodes);
  };

  function dispatchAllEvents() {
    Object.values(selectedLayers).forEach((selection) => {
      emit(selection.operation, selection);
    });
  }

  return (
    <Panel
      panel={Panels.COMPONENT_VARIABLES}
      data={selectedLayers}
      show={show}>
      <Container space="small">
        {currentSelection.length > 0 &&
          currentSelection.map((node, i) => {
            return (
              <>
                <Checkbox
                  onChange={(e) => handleCheckboxChange(e, node)}
                  value={node.id in selectedLayers}>
                  <Text>{node.name}</Text>
                </Checkbox>
                <VerticalSpace space="small" />
                {node.id in selectedLayers && (
                  <>
                    <div className={styles.inlineCenter}>
                      <div className={styles.extend}>
                        <Dropdown
                          onChange={(e) =>
                            handleDropdownChange(e, node)
                          }
                          options={typeOptions}
                          value={selectedLayers[node.id].value}
                        />
                      </div>

                      <HorizontalSpace space="extraSmall" />

                      <IconButton
                        value={true}
                        onChange={() => {
                          setOpenPanels([
                            ...openPanels,
                            Object.values(Panels).find((panel) => {
                              return (
                                panel.event ===
                                selectedLayers[node.id].operation
                              );
                            }),
                          ]);
                        }}>
                        <SliderIcon />
                      </IconButton>
                    </div>
                    <VerticalSpace space="small" />
                  </>
                )}
              </>
            );
          })}

        <Button onClick={() => dispatchAllEvents()}>
          Fill selected layers
        </Button>
      </Container>
    </Panel>
  );
}
