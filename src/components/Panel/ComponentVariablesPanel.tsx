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

  // .filter((panel) => {
  //   return panel.isVariableOption !== true;
  // });

  const typeOptions: Array<CustomDropdownOption> = Object.entries(
    Panels
  ).map(([key, value]) => {
    return {
      operation: value.event,
      value: value.name,
    };
  });

  const [selectedLayers, setSelectedLayers] = useState([]);

  const [selectionState, setSelectionState] = useState({});

  function handleDropdownChange(
    e: JSX.TargetedEvent<HTMLInputElement>,
    node: SceneNode | Node
  ) {
    let selected = typeOptions.find(
      (option) => option.value === e.currentTarget.value
    );

    setSelectionState({
      ...selectionState,
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
      setSelectionState({
        ...selectionState,
        [node.id]: { ...typeOptions[0], ...node },
      });

      console.log(selectionState);
    } else {
      let temp = { ...selectionState };
      delete temp[node.id];
      setSelectionState(temp);
    }
  }

  onmessage = (event) => {
    setCurrentSelection(event.data.pluginMessage.nodes);
  };

  function dispatchAllEvents() {
    Object.values(selectionState).forEach((selection) => {
      console.log(selection);

      emit(selection.operation, selection);
    });
  }

  const [showOptions, setShowOptions] = useState(false);

  function handleShowOptions(
    event: JSX.TargetedEvent<HTMLInputElement>
  ) {
    setShowOptions(event.currentTarget.checked);
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
                  value={node.id in selectionState}>
                  <Text>{node.name}</Text>
                </Checkbox>
                <VerticalSpace space="small" />
                {node.id in selectionState && (
                  <>
                    <div className={styles.inlineCenter}>
                      <div className={styles.extend}>
                        <Dropdown
                          onChange={(e) =>
                            handleDropdownChange(e, node)
                          }
                          options={typeOptions}
                          value={selectionState[node.id].value}
                        />
                      </div>

                      <HorizontalSpace space="extraSmall" />

                      <IconButton
                        value={showOptions}
                        onChange={() => {
                          setOpenPanels([
                            ...openPanels,
                            Object.values(Panels).find((panel) => {
                              return (
                                panel.event ===
                                selectionState[node.id].operation
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
