import {
  render,
  Container,
  Text,
  VerticalSpace,
  Button,
  Textbox,
  Stack,
  Inline,
  Divider,
  IconButton,
  IconNavigateBack32,
  IconArrowLeftCircle32,
  Dropdown,
  Toggle,
  SegmentedControlOption,
  SegmentedControl,
  DropdownOption,
  TextboxNumeric,
} from "@create-figma-plugin/ui";
import { emit, on } from "@create-figma-plugin/utilities";
import { h, JSX, Fragment, createContext } from "preact";
import { useEffect, useState } from "preact/hooks";
import styles from "./styles.module.css";
import { Panels, PanelData } from "./constants";
import { panel } from "./styles.css";

interface PanelContextProps {
  panel: PanelData | null;
}

const PanelContext = createContext<Partial<PanelContextProps>>({
  panel: null,
});

function Panel({ show, setOpenPanel, panel, eventArgs, children }) {
  const [render, setRender] = useState(show);

  useEffect(() => {
    if (show) setRender(true);
  }, [show]);

  const onAnimationEnd = () => {
    if (!show) setRender(false);
  };

  return (
    render && (
      <div
        className={
          show
            ? `${styles.panelExitActive} ${styles.panel}`
            : `${styles.panelEnterActive} ${styles.panel}`
        }
        onAnimationEnd={onAnimationEnd}>
        <div className={styles.container}>
          <PanelNavbar setOpenPanel={setOpenPanel} />
          <div className={styles.main}>{children}</div>
          <Divider />
          <Container space="small">
            <VerticalSpace space="extraSmall" />
            <div className={styles.flexAlignRight}>
              <Button onClick={() => emit(panel.event, eventArgs)}>
                Generate
              </Button>
            </div>
            <VerticalSpace space="extraSmall" />
          </Container>
        </div>
      </div>
    )
  );
}

function HorizontalSpace({ space = "small", ...rest }) {
  return <div className={styles[space]} {...rest}></div>;
}

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

function LabeledSwitch({ title, handleChange, subtitle }) {
  return (
    <div className={styles.inlineCenter}>
      <Toggle onChange={handleChange} value={true} />
      <span
        style={{
          marginRight: 8,
        }}></span>
      <Text>{title}</Text>
      <span
        style={{
          marginRight: 8,
        }}></span>
      <Text muted>{subtitle}</Text>
    </div>
  );
}

function PanelNavbar({ setOpenPanel }) {
  return (
    <>
      <Container>
        <VerticalSpace space="small" />
        <button
          className={styles.panelHeader}
          onClick={() => setOpenPanel(null)}>
          <svg
            className={styles.backIcon}
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0)">
              <path
                d="M1.7072 4L4.3536 6.6464L3.6465 7.3535L-0.207031 3.5L3.6465 -0.353577L4.3536 0.353504L1.7072 3H5.5001C9.0762 3 12.0001 5.9238 12.0001 9.5V11H11.0001V9.5C11.0001 6.4761 8.5239 4 5.5001 4H1.7072Z"
                fill="#333333"
              />
            </g>
            <defs>
              <clipPath id="clip0">
                <rect width="12" height="12" fill="white" />
              </clipPath>
            </defs>
          </svg>
          <Text>Back</Text>
        </button>
        <VerticalSpace space="small" />
      </Container>
      <Divider />
      <VerticalSpace space="medium" />
    </>
  );
}

function LabeledInputGroup({ title, children }) {
  return (
    <>
      <Text bold>{title}</Text>
      <VerticalSpace space="small" />
      {children}
      <VerticalSpace space="medium" />
    </>
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
    { value: "Neutral" },
    { value: "Male" },
    { value: "Female" },
  ];

  const [value, setValue] = useState("Neutral");

  function handleChange(event: JSX.TargetedEvent<HTMLInputElement>) {
    const newValue = event.currentTarget.value;
    console.log(newValue);
    setValue(newValue);
  }

  const lnOptions: Array<SegmentedControlOption> = [
    { value: "Full" },
    { value: "Initial" },
  ];

  return (
    <Panel
      show={show}
      setOpenPanel={setOpenPanel}
      panel={Panels.NAMES}>
      <CategoryTitle panel={Panels.NAMES} />

      <VerticalSpace space="medium" />
      <Divider />

      <div className={styles.main}>
        <VerticalSpace space="medium" />
        <Container>
          <LabeledInputGroup title="Name type">
            <Dropdown
              onChange={handleChange}
              options={options}
              value={value}
            />
          </LabeledInputGroup>

          <Text bold>Options</Text>
          <VerticalSpace space="small" />

          <LabeledSwitch
            title="First name"
            subtitle="eg. Kennedy"
            handleChange={handleChange}
          />

          <VerticalSpace space="small" />

          <LabeledSwitch
            title="Middle initial"
            subtitle="eg. G."
            handleChange={handleChange}
          />

          <VerticalSpace space="small" />

          <LabeledSwitch
            title="Last name"
            subtitle="eg. Morocco"
            handleChange={handleChange}
          />

          <VerticalSpace space="extraSmall" />
          <SegmentedControl
            onChange={handleChange}
            options={lnOptions}
            value={"Full"}
          />
        </Container>
      </div>
    </Panel>
  );
}

function Plugin(props: { greeting: string }) {
  const [show, setShow] = useState(false);

  const [showNameOptions, setShowNameOptions] = useState(false);

  const [openPanel, setOpenPanel] = useState<null | PanelData>(null);

  function handleClick() {
    emit("SUBMIT", props);
  }

  function handleInput(event: JSX.TargetedEvent<HTMLInputElement>) {
    const newValue = event.currentTarget.value;
    console.log(newValue);
    // setValue(newValue);
  }

  function renderRow(panel: PanelData) {
    return (
      <Container onClick={() => setOpenPanel(panel)}>
        <VerticalSpace space="medium" />
        <div className={styles.row}>
          <div className={styles.inlineCenter}>
            <div className={styles.box}></div>
            <Stack space="extraSmall">
              <Text bold>{panel.name}</Text>
              <Text muted>{panel.summary}</Text>
            </Stack>
          </div>
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M14 11L19 16L14 21" stroke="#B2B2B2" />
          </svg>
        </div>
      </Container>
    );
  }

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

          {renderRow(Panels.NAMES)}
          {renderRow(Panels.TIMES)}
        </div>

        {/* <Textbox onInput={handleInput} value={value} /> */}
        {/* <VerticalSpace space="medium" /> */}
      </div>
    </PanelContext.Provider>
  );
}

export default render(Plugin);
