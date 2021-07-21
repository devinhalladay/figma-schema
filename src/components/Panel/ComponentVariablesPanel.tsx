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
  panel: PanelData;
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
      key: key,
      value: value.name,
      panel: value,
    };
  });

  const [selectedLayers, setSelectedLayers] = useState([]);

  function handleChange(
    event: JSX.TargetedEvent<HTMLInputElement>,
    node: SceneNode | Node
  ) {
    if (event.currentTarget.checked) {
      if (selectedLayers.some((layer) => layer.id === node.id)) {
        let nodeIndex = selectedLayers.indexOf(node);
        let nodesCopy = [...selectedLayers];
        let nodeCopy = {
          ...nodesCopy[nodeIndex],
        };

        nodeCopy.operation = typeOptions.find(
          (option) => option.value === event.currentTarget.value
        );

        nodesCopy[nodeIndex] = nodeCopy;

        setSelectedLayers(nodesCopy);
      } else {
        let nodeCopy = {
          ...node,
        };

        nodeCopy.operation = typeOptions[0].panel.event; //works

        setSelectedLayers(selectedLayers.concat(nodeCopy));
      }
    } else if (selectedLayers.some((layer) => layer.id === node.id)) {
      setSelectedLayers(
        selectedLayers.filter(function (item) {
          return item.id !== node.id;
        })
      );
    }

    return;
  }

  onmessage = (event) => {
    setCurrentSelection(event.data.pluginMessage.nodes);
  };

  function dispatchAllEvents() {
    selectedLayers.forEach((node: TextLayerData) => {,
      if (node.operation) {
        emit(node.operation.event, node);
      }
    });
  }

  const [showOptions, setShowOptions] = useState(false);

  const [selectedOptions, setSelectedOptions] = useState([]);

  function handleShowOptions(
    event: JSX.TargetedEvent<HTMLInputElement>
  ) {
    setShowOptions(event.currentTarget.checked);
    // setOpenPanels([...openPanels, ])
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
                  onChange={(e) => handleChange(e, node)}
                  value={selectedLayers.some(
                    (layer) => layer.id === node.id
                  )}>
                  <Text>{node.name}</Text>
                </Checkbox>
                <VerticalSpace space="small" />
                {selectedLayers.some(
                  (layer) => layer.id === node.id
                ) && (
                  <>
                    <div className={styles.inlineCenter}>
                      <div className={styles.extend}>
                        <Dropdown
                          onChange={(
                            e: JSX.TargetedEvent<HTMLInputElement>
                          ) => {
                            let nodeIndex = selectedLayers.findIndex(
                              (layer) => layer.id === node.id
                            );
                            let nodesCopy = [...selectedLayers];
                            let nodeCopy = {
                              ...nodesCopy[nodeIndex],
                            };

                            // rn i am copying the node to add an operation key
                            // can i not do that?
                            // i am doing this because i am passing these nodes to
                            // dispatch() function, which passes the operation to emit()
                            // can i get the operation elsewhere?
                            // the dropdown consists of a value (Panel.name), key (Panel.event)
                            // and a panel (Panel)
                            // I need to pass the key into the emit function
                            // When I select a dropdown option I want to update some state
                            // to reflect the new value
                            // Each Node (in selectedLayers and currentSelection) has an ID
                            // can I use that somehow?
                            // maybe selectedLayers needs to be an object
                            // each key is a node.id
                            // each value is an object
                            // 'id-22': {
                            //   operation: operation,
                            //   ...node
                            // }
                            // then to get the value of the dropdown I can
                            // find the selectedLayer with Object.key matching node.id
                            // find the dropdownOption with option.key matching layer.operation
                            // get its option.name

                            // Set operation to the corresponding panel event
                            nodeCopy.operation = typeOptions.find(
                              (option) =>
                                option.value === e.currentTarget.value
                            ).panel.event;
                            //working

                            nodesCopy[nodeIndex] = nodeCopy;

                            setSelectedLayers(nodesCopy);

                            setSelectedOptions({
                              ...selectedOptions,
                              [e.currentTarget.name]:
                                e.currentTarget.value,
                            });

                            console.log(selectedOptions);

                            // console.log("option");

                            // console.log(
                            //   selectedLayers.some((layer) => {
                            //     return (
                            //       layer.operation ===
                            //       Panels.NAMES.event
                            //     );
                            //   })
                            // );

                            // console.log(
                            //   // selectedLayers.find(
                            //   //   (layer) =>
                            //   //     layer.operation ===
                            //   // )

                            //   // typeOptions.some(
                            //   //   (option) =>
                            //   //     selectedLayers.find(
                            //   //       (layer) =>
                            //   //         layer.operation === option.key
                            //   //     ) > 1
                            //   // )

                            //   // value =
                            //   // typeOption.value WHERE
                            //   // current index selectedLayer.operation === typeOption.value

                            //   // typeOptions.find(
                            //   //   (option) =>
                            //   //     selectedLayers.filter(
                            //   //       (layer) =>
                            //   //         layer.operation === option.key
                            //   //     ).name === node.name
                            //   // )

                            //   // var kiran = [];
                            //   // var array1 = [{ key1: 'value1' }, { key1: 'value2' }];
                            //   // var array2 = [{ key2: 'value0' }, { key2: 'value2' }];

                            //   // typeOptions.map(function (option) {
                            //   //   selectedLayers.map(function (layer) {
                            //   //     if (
                            //   //       option.key === layer.operation
                            //   //     ) {
                            //   //       return option.value;
                            //   //     }
                            //   //   });
                            //   // })

                            //   // intersectionWith(
                            //   //   [typeOptions, selectedLayers],
                            //   //   (option, layer) => {
                            //   //     // console.log({ option, layer });
                            //   //     console.log(option.key);

                            //   //     return (
                            //   //       option.key === layer.operation
                            //   //     );
                            //   //   }
                            //   // )

                            //   // Get
                            //   typeOptions.filter((option) => {
                            //     // console.log(selectedLayers);
                            //     // has layer.operation

                            //     // console.log(option);
                            //     // has option.key

                            //     return selectedLayers.some(
                            //       (layer) => {
                            //         return (
                            //           option.key === layer.operation
                            //         );
                            //       }
                            //     );
                            //   })

                            //   // console.log(kiran);
                            // );
                          }}
                          options={typeOptions}
                          value={
                            "Names"
                            // typeOptions.find(
                            //   (option) =>
                            //     option.panel.event === node.operation
                            // )?.value || typeOptions[0].value

                            // typeOptions.filter((option) => {
                            //   return selectedLayers.find((layer) => {
                            //     return option.key === layer.operation;
                            //   });
                            // })[0]?.value || typeOptions[0].value

                            // typeOptions.find(
                            //   (option) =>
                            //     selectedLayers.filter(
                            //       (layer) =>
                            //         layer.operation === option.key
                            //     ).name === node.name
                            // )?.value || typeOptions[0].value

                            // Problem is that currentSelection and selectedLayers are
                            // different. I need to find the typeOption where
                            // option.panel.event === layer.operation in selectedLayers
                            // rather than what I am currently doing which is
                            // comparing to currentSelection
                          }
                        />
                      </div>
                      <HorizontalSpace space="extraSmall" />
                      <IconButton
                        value={showOptions}
                        onChange={handleShowOptions}>
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
