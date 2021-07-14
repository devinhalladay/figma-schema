import {
  Container,
  Divider,
  Dropdown,
  DropdownOption,
  IconSearchLarge32,
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
import { HourglassMedium } from "phosphor-react";

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

function CategoryTitle({ panel, icon }) {
  return (
    <Container>
      <div className={styles.row}>
        <div className={styles.inlineCenter}>
          <div className={styles.box}>{icon}</div>
          <Stack space="extraSmall">
            <Text bold>{panel.name}</Text>
            <Text muted>{panel.summary}</Text>
          </Stack>
        </div>
      </div>
    </Container>
  );
}

function NamePanel({ show, setOpenPanel, icon }) {
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
      <CategoryTitle panel={Panels.NAMES} icon={icon} />

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
        icon={<IconSearchLarge32 />}
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
              <h2>Welcome to Schema!</h2>
              <p>
                <strong>
                  Schema is the most powerful placeholder text
                  generator for Figma.
                </strong>{" "}
                Fine-tune parameteres to generate sequential dates and
                times, full user profiles, or connect to APIs.
              </p>
            </Stack>
            <VerticalSpace space="small" />
          </Container>

          <CategoryRow
            panel={Panels.NAMES}
            setOpenPanel={setOpenPanel}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="#333333"
                viewBox="0 0 256 256">
                <rect width="256" height="256" fill="none"></rect>
                <line
                  x1="152"
                  y1="112"
                  x2="192"
                  y2="112"
                  fill="none"
                  stroke="#333333"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="16"></line>
                <line
                  x1="152"
                  y1="144"
                  x2="192"
                  y2="144"
                  fill="none"
                  stroke="#333333"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="16"></line>
                <circle
                  cx="92.10043"
                  cy="120"
                  r="24"
                  fill="none"
                  stroke="#333333"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="16"></circle>
                <path
                  d="M61.10869,167.99952a32.01032,32.01032,0,0,1,61.98292-.00215"
                  fill="none"
                  stroke="#333333"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="16"></path>
                <rect
                  x="32"
                  y="48.00005"
                  width="192"
                  height="160"
                  rx="8"
                  stroke-width="16"
                  stroke="#333333"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  fill="none"></rect>
              </svg>
            }
          />

          <CategoryRow
            panel={Panels.TIMES}
            setOpenPanel={setOpenPanel}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="#333333"
                viewBox="0 0 256 256">
                <rect width="256" height="256" fill="none"></rect>
                <path
                  d="M128,128,67.2,82.4A8,8,0,0,1,64,76V40a8,8,0,0,1,8-8H184a8,8,0,0,1,8,8V75.6412a8,8,0,0,1-3.17594,6.38188L128,128h0"
                  fill="none"
                  stroke="#333333"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="16"></path>
                <path
                  d="M128,128,67.2,173.6A8,8,0,0,0,64,180v36a8,8,0,0,0,8,8H184a8,8,0,0,0,8-8V180.3588a8,8,0,0,0-3.17594-6.38188L128,128h0"
                  fill="none"
                  stroke="#333333"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="16"></path>
                <line
                  x1="74.66065"
                  y1="87.99548"
                  x2="180.92301"
                  y2="87.99548"
                  fill="none"
                  stroke="#333333"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="16"></line>
                <line
                  x1="128"
                  y1="167.99548"
                  x2="128"
                  y2="128"
                  fill="none"
                  stroke="#333333"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="16"></line>
              </svg>
            }
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
