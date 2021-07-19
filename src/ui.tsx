import {
  Button,
  Checkbox,
  Container,
  Divider,
  Dropdown,
  DropdownOption,
  IconSearchLarge32,
  render,
  SegmentedControl,
  SegmentedControlOption,
  Text,
  TextboxMultiline,
  TextboxNumeric,
  VerticalSpace,
} from "@create-figma-plugin/ui";
import { emit } from "@create-figma-plugin/utilities";
import { createContext, Fragment, h, JSX } from "preact";
import { useState } from "preact/hooks";
import CategoryRow from "./components/CategoryRow";
import CategoryTitle from "./components/CategoryTitle";
import HorizontalSpace from "./components/HorizontalSpace";
import PeaceIcon from "./components/Icons/PeaceIcon";
import VariableIcon from "./components/Icons/VariableIcon";
import LabeledInputGroup from "./components/LabeledInputGroup";
import LabeledSwitch from "./components/LabeledSwitch";
import Panel from "./components/Panel";
import { PanelData, Panels } from "./constants";
import styles from "./styles.module.css";

interface PanelContextProps {
  panel: PanelData | null;
}

const PanelContext = createContext<Partial<PanelContextProps>>({
  panel: null,
});

function TimesPanel({ show, setOpenPanel }) {
  const [startTime, setStartTime] = useState({
    enabled: false,
    time: {
      hour: "10",
      minute: "00",
    },
    amPm: "AM",
  });

  const [interval, setInterval] = useState("30 mins");

  // TODO
  // Change this Time Format option to something like "Timestamp"
  // Timestamps can be in the past or future, and have custom formatting.
  // But might need to also include dates, so not sure if I maybe need to merge
  // the Date and Time categories into a single category.¡

  const [timeFormat, setTimeFormat] = useState("12:00 PM");
  const timeFormatOptions: Array<SegmentedControlOption> = [
    { value: "12:00 PM" },
    { value: "20 minutes ago" },
    { value: "24:00" },
    { value: "2 days from now" },
  ];
  function handleIntervalChange(
    event: JSX.TargetedEvent<HTMLInputElement>
  ) {
    const newValue = event.currentTarget.value;

    setInterval(newValue);
  }

  function handleAmPmChange(
    event: JSX.TargetedEvent<HTMLInputElement>
  ) {
    const newValue = event.currentTarget.value;

    setStartTime({
      ...startTime,
      amPm: newValue,
    });
  }

  const amPmOptions: Array<SegmentedControlOption> = [
    { value: "AM" },
    { value: "PM" },
  ];

  function handleChangeHour(
    event: JSX.TargetedEvent<HTMLInputElement>
  ) {
    const newValue = event.currentTarget.value;

    setStartTime({
      ...startTime,
      time: {
        ...startTime.time,
        hour: newValue,
      },
    });
  }

  function handleChangeMinute(
    event: JSX.TargetedEvent<HTMLInputElement>
  ) {
    const newValue = event.currentTarget.value;

    setStartTime({
      ...startTime,
      time: {
        ...startTime.time,
        minute: newValue,
      },
    });
  }

  return (
    <Panel
      show={show}
      setOpenPanel={setOpenPanel}
      panel={Panels.TIMES}
      eventArgs={{ ...startTime, interval: interval }}>
      <CategoryTitle panel={Panels.TIMES} />

      <div className={styles.main}>
        <VerticalSpace space="medium" />
        <Divider />
        <VerticalSpace space="medium" />

        <Container space="small">
          <LabeledInputGroup title="Constraints">
            <LabeledSwitch
              title="Start time and intervals"
              value={startTime.enabled}
              handleChange={() => {
                setStartTime({
                  ...startTime,
                  enabled: !startTime.enabled,
                });
              }}
            />
            {startTime.enabled && (
              <>
                <VerticalSpace space="small" />
                <div className={styles.inlineCenter}>
                  <TextboxNumeric
                    onInput={handleChangeHour}
                    value={startTime.time.hour}
                  />
                  <HorizontalSpace space="small" />
                  <TextboxNumeric
                    onInput={handleChangeMinute}
                    value={startTime.time.minute}
                  />
                  <HorizontalSpace space="small" />
                  <SegmentedControl
                    onChange={handleAmPmChange}
                    options={amPmOptions}
                    value={startTime.amPm}
                  />
                </div>
                <VerticalSpace space="medium" />
                <LabeledInputGroup title="Interval">
                  <TextboxNumeric
                    onInput={handleIntervalChange}
                    value={interval}
                    suffix=" mins"
                    minimum={0}
                  />
                </LabeledInputGroup>
              </>
            )}
          </LabeledInputGroup>
          <LabeledInputGroup title="Time format">
            <Dropdown
              onChange={(e: JSX.TargetedEvent<HTMLInputElement>) =>
                setTimeFormat("YYYY-MM-DD")
              }
              options={timeFormatOptions}
              value={timeFormatOptions[0].value}
            />
          </LabeledInputGroup>
        </Container>
      </div>
    </Panel>
  );
}

function NamePanel({ show, setOpenPanel }) {
  const options: Array<DropdownOption> = [
    { value: "Any" },
    { value: "Male" },
    { value: "Female" },
  ];

  const [showLastNameOptions, setShowLastNameOptions] = useState(
    false
  );

  const [genderValue, setGenderValue] = useState("Any");
  const [nameOptions, setNameOptions] = useState({
    gender: "Any",
    firstName: true,
    // middleName: false,
    lastName: true,
    lastInitial: "Full",
  });

  const lnOptions: Array<SegmentedControlOption> = [
    { value: "Full" },
    { value: "Initial" },
  ];

  return (
    <Panel
      show={show}
      setOpenPanel={setOpenPanel}
      panel={Panels.NAMES}
      eventArgs={nameOptions}>
      <Container>
        <CategoryTitle panel={Panels.NAMES} />
      </Container>

      <VerticalSpace space="medium" />
      <Divider />

      <div className={styles.main}>
        <VerticalSpace space="medium" />
        <Container>
          <LabeledInputGroup title="Gender association">
            <Dropdown
              onChange={(e: JSX.TargetedEvent<HTMLInputElement>) =>
                setNameOptions({
                  ...nameOptions,
                  gender: e.currentTarget.value,
                })
              }
              options={options}
              value={nameOptions.gender}
            />
          </LabeledInputGroup>

          <Text bold>Options</Text>
          <VerticalSpace space="small" />

          <LabeledSwitch
            title="First name"
            subtitle="eg. Kennedy"
            handleChange={(e: JSX.TargetedEvent<HTMLInputElement>) =>
              setNameOptions({
                ...nameOptions,
                firstName: e.currentTarget.checked,
              })
            }
            value={nameOptions.firstName}
          />

          <VerticalSpace space="small" />

          {/* <LabeledSwitch
            title="Middle initial"
            subtitle="eg. G."
            handleChange={(e: JSX.TargetedEvent<HTMLInputElement>) =>
              setNameOptions({
                ...nameOptions,
                middleName: e.currentTarget.checked,
              })
            }
            value={nameOptions.middleName}
          />

          <VerticalSpace space="small" /> */}

          <LabeledSwitch
            title="Last name"
            subtitle="eg. Morocco"
            handleChange={(
              e: JSX.TargetedEvent<HTMLInputElement>
            ) => {
              setNameOptions({
                ...nameOptions,
                lastName: e.currentTarget.checked,
              });
              setShowLastNameOptions(!showLastNameOptions);
            }}
            value={showLastNameOptions}
          />
          {showLastNameOptions && (
            <>
              <VerticalSpace space="extraSmall" />
              <SegmentedControl
                options={lnOptions}
                value={nameOptions.lastInitial}
                onChange={(e: JSX.TargetedEvent<HTMLInputElement>) =>
                  setNameOptions({
                    ...nameOptions,
                    lastInitial: e.currentTarget.value,
                  })
                }
              />
            </>
          )}
        </Container>
      </div>
    </Panel>
  );
}

function ComponentVariabelsPanel({ show, setOpenPanel, icon }) {
  const [options, setOptions] = useState({
    value: "",
    nodes: [],
  });

  const typeOptions: Array<DropdownOption> = [
    { value: "Names", event: Panels.NAMES.event },
    { value: "Times", event: Panels.TIMES.event },
    { value: "Custom List", event: Panels.CUSTOM_LIST.event },
  ];

  const [selectedLayers, setSelectedLayers] = useState([]);

  function handleChange(
    event: JSX.TargetedEvent<HTMLInputElement>,
    node: SceneNode | Node
  ) {
    if (event.currentTarget.checked) {
      // setSelectedLayers(selectedLayers.concat(node));

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

        console.log(selectedLayers);
      } else {
        let nodeCopy = {
          ...node,
        };

        nodeCopy.operation = typeOptions[0]; //works

        setSelectedLayers(selectedLayers.concat(nodeCopy));

        console.log("selected");
        console.log(selectedLayers);
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
    setOptions({ ...options, nodes: event.data.pluginMessage.nodes });
    console.log(event.data.pluginMessage);

    // console.log(options.nodes);
  };

  function dispatchAllEvents() {
    selectedLayers.forEach((node) => {
      if (node.operation) {
        console.log(node.operation);

        emit(node.operation.event, node);
      }
    });
  }

  return (
    <Panel
      show={show}
      setOpenPanel={setOpenPanel}
      //TODO remove setOpenPanel, hoist to context
      panel={Panels.COMPONENT_VARIABLES}
      //TODO add panelfooter children prop
      eventArgs={options}
      //TODO rename eventArgs
    >
      <Container>
        <CategoryTitle panel={Panels.COMPONENT_VARIABLES} />
      </Container>

      <VerticalSpace space="medium" />
      <Divider />
      <VerticalSpace space="medium" />
      <Container space="small">
        {options.nodes.length > 0 &&
          options.nodes.map((node, i) => {
            console.log(node);

            // {value, event}

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
                        nodeCopy.operation = typeOptions.find(
                          (option) =>
                            option.value === e.currentTarget.value
                        );

                        nodesCopy[nodeIndex] = nodeCopy;

                        setSelectedLayers(nodesCopy);

                        console.log(selectedLayers);
                      }}
                      options={typeOptions}
                      value={
                        selectedLayers.find(
                          (layer) => layer.id === node.id
                        ).operation.value
                      }
                    />
                    <VerticalSpace space="small" />
                  </>
                )}
              </>
            );
          })}

        <Button
          secondary
          onClick={() => emit("GET_TEXT_LAYER_SELECTIONS", options)}>
          {options.nodes.length > 0
            ? "Update selections"
            : "Get selections"}
        </Button>

        <Button onClick={() => dispatchAllEvents()}>
          Fill selected layers
        </Button>
      </Container>
    </Panel>
  );
}

function CustomListPanel({ show, setOpenPanel }) {
  const [options, setOptions] = useState({ value: "" });

  return (
    <Panel
      show={show}
      setOpenPanel={setOpenPanel}
      panel={Panels.CUSTOM_LIST}
      eventArgs={options}>
      <CategoryTitle panel={Panels.CUSTOM_LIST} />

      <VerticalSpace space="medium" />
      <Divider />
      <VerticalSpace space="medium" />
      <Container space="small">
        <LabeledInputGroup title="Enter your list">
          <TextboxMultiline
            value={options.value}
            placeholder="Enter a list, with terms separated by a new line"
            onInput={(e) =>
              setOptions({ ...options, value: e.currentTarget.value })
            }
          />
        </LabeledInputGroup>
      </Container>
    </Panel>
  );
}

function Plugin() {
  const [openPanel, setOpenPanel] = useState<null | PanelData>(null);

  return (
    <PanelContext.Provider
      value={{
        panel: null,
      }}>
      <NamePanel
        show={openPanel === Panels.NAMES}
        setOpenPanel={setOpenPanel}
      />

      <TimesPanel
        show={openPanel === Panels.TIMES}
        setOpenPanel={setOpenPanel}
      />

      <ComponentVariabelsPanel
        show={openPanel === Panels.COMPONENT_VARIABLES}
        setOpenPanel={setOpenPanel}
      />

      <CustomListPanel
        show={openPanel === Panels.CUSTOM_LIST}
        setOpenPanel={setOpenPanel}
      />

      <div className={styles.container}>
        <div className={styles.main}>
          <Container space="small">
            <VerticalSpace space="small" />
            <div
              style={{
                backgroundColor: "#dbecfc",
                padding: 12,
                borderRadius: 6,
                background: "#E1F3FF",
                display: "flex",
              }}>
              <div
                style={{
                  paddingRight: 8,
                }}>
                <PeaceIcon />
              </div>
              <div>
                <h3 style={{ marginBottom: "2px" }}>
                  <strong>Welcome to Schema!</strong>
                </h3>
                <p style={{ margin: 0 }}>
                  Automate tedious tasks, and improve the fidelity of
                  your designs, with true-to-life generative
                  placeholder text.
                </p>
              </div>
            </div>
            <VerticalSpace space="small" />
            <h3 style={{ marginBottom: "2px" }}>Categories</h3>
          </Container>

          <CategoryRow
            panel={Panels.NAMES}
            setOpenPanel={setOpenPanel}
          />

          <CategoryRow
            panel={Panels.TIMES}
            setOpenPanel={setOpenPanel}
          />

          <CategoryRow
            panel={Panels.COMPONENT_VARIABLES}
            setOpenPanel={setOpenPanel}
          />

          <CategoryRow
            panel={Panels.CUSTOM_LIST}
            setOpenPanel={setOpenPanel}
          />

          <CategoryRow
            panel={Panels.ORGANIZATIONS}
            setOpenPanel={setOpenPanel}
          />

          <CategoryRow
            panel={Panels.NUMBERS}
            setOpenPanel={setOpenPanel}
          />

          <CategoryRow
            panel={Panels.API}
            setOpenPanel={setOpenPanel}
          />

          <CategoryRow
            panel={Panels.CONTACT_INFORMATION}
            setOpenPanel={setOpenPanel}
          />

          <CategoryRow
            panel={Panels.TRENDING_TOPICS}
            setOpenPanel={setOpenPanel}
          />

          <VerticalSpace space="medium" />
        </div>
      </div>
    </PanelContext.Provider>
  );
}

export default render(Plugin);
