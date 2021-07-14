import {
  Container,
  Divider,
  Dropdown,
  DropdownOption,
  render,
  SegmentedControl,
  SegmentedControlOption,
  Stack,
  Text,
  TextboxNumeric,
  Toggle,
  VerticalSpace,
} from "@create-figma-plugin/ui";
import { emit } from "@create-figma-plugin/utilities";
import { createContext, Fragment, h, JSX } from "preact";
import { useState } from "preact/hooks";
import HorizontalSpace from "./components/HorizontalSpace";
import LabeledInputGroup from "./components/LabeledInputGroup";
import LabeledSwitch from "./components/LabeledSwitch";
import Panel from "./components/Panel";
import { PanelData, Panels } from "./constants";
import styles from "./styles.module.css";
import CategoryRow from "./components/CategoryRow";

interface PanelContextProps {
  panel: PanelData | null;
}

const PanelContext = createContext<Partial<PanelContextProps>>({
  panel: null,
});

function TimesPanel({ show, setOpenPanel }) {
  const [showStartTime, setShowStartTime] = useState(true);
  const [startTime, setStartTime] = useState({
    time: {
      hour: "10",
      minute: "00",
    },
    amPm: "AM",
  });

  const [interval, setInterval] = useState("30 mins");

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
              title="Start time"
              subtitle=""
              handleChange={() => setShowStartTime}
            />
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
          </LabeledInputGroup>

          <LabeledInputGroup title="Interval">
            <TextboxNumeric
              onInput={handleIntervalChange}
              value={interval}
              suffix=" mins"
              minimum={0}
            />
          </LabeledInputGroup>
        </Container>
      </div>
    </Panel>
  );
}

function CategoryTitle({ panel }) {
  return (
    <Container>
      <div className={styles.row}>
        <div className={styles.inlineCenter}>
          <div className={styles.box}></div>
          <Stack space="extraSmall">
            <Text bold>{panel.name}</Text>
            <Text muted>{panel.summary}</Text>
          </Stack>
        </div>
      </div>
    </Container>
  );
}

function NamePanel({ show, setOpenPanel }) {
  const options: Array<DropdownOption> = [
    { value: "Any" },
    { value: "Male" },
    { value: "Female" },
  ];

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
      <CategoryTitle panel={Panels.NAMES} />

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
            handleChange={(e: JSX.TargetedEvent<HTMLInputElement>) =>
              setNameOptions({
                ...nameOptions,
                lastName: e.currentTarget.checked,
              })
            }
            value={nameOptions.lastName}
          />

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
        </Container>
      </div>
    </Panel>
  );
}

function Plugin(props: { greeting: string }) {
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

      <div className={styles.container}>
        <div className={styles.main}>
          <Container
            space="small"
            style={{
              backgroundColor: "#dbecfc",
            }}>
            <Stack space="small">
              <VerticalSpace space="small" />
              <Text bold>Welcome to Schema!</Text>
              <Text>
                Schema is a Figma plugin that lets you generate all
                kinds of placeholder text, like dynamic dates and
                times, user names, numbers, and more.
              </Text>
            </Stack>
            <VerticalSpace space="extraLarge" />
          </Container>

          <CategoryRow
            panel={Panels.NAMES}
            setOpenPanel={setOpenPanel}
          />

          <CategoryRow
            panel={Panels.TIMES}
            setOpenPanel={setOpenPanel}
          />
        </div>
      </div>
    </PanelContext.Provider>
  );
}

export default render(Plugin);
