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
} from "@create-figma-plugin/ui";
import { emit, on } from "@create-figma-plugin/utilities";
import { h, JSX, Fragment } from "preact";
import { useEffect, useState } from "preact/hooks";
import styles from "./styles.module.css";

function Panel({ show, children }) {
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
        {children}
      </div>
    )
  );
}

function Plugin(props: { greeting: string }) {
  const [show, setShow] = useState(false);

  function handleClick() {
    emit("SUBMIT", props);
  }

  function handleRowClick(emitter: string) {
    setShow(true);
    // emit(emitter, props);
  }

  function handleInput(event: JSX.TargetedEvent<HTMLInputElement>) {
    const newValue = event.currentTarget.value;
    console.log(newValue);
    setValue(newValue);
  }

  const [value, setValue] = useState("Neutral");
  const options: Array<DropdownOption> = [
    { value: "Neutral" },
    { value: "Male" },
    { value: "Female" },
  ];

  function handleChange(event: JSX.TargetedEvent<HTMLInputElement>) {
    const newValue = event.currentTarget.value;
    console.log(newValue);
    setValue(newValue);
  }

  function renderRow(
    name: string,
    description: string,
    emitter: string
  ) {
    return (
      <Container onClick={() => handleRowClick(emitter)}>
        <VerticalSpace space="medium" />
        <div className={styles.row}>
          <div className={styles.inlineCenter}>
            <div className={styles.box}></div>
            <Stack space="extraSmall">
              <Text bold>{name}</Text>
              <Text muted>{description}</Text>
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

  const lnOptions: Array<SegmentedControlOption> = [
    { value: "Full" },
    { value: "Initial" },
  ];

  return (
    <>
      <Panel show={show}>
        <div className={styles.container}>
          <Container>
            <VerticalSpace space="small" />
            <button
              className={styles.panelHeader}
              onClick={() => setShow(false)}>
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

          <Container>
            <VerticalSpace space="medium" />
            <div className={styles.row}>
              <div className={styles.inlineCenter}>
                <div className={styles.box}></div>
                <Stack space="extraSmall">
                  <Text bold>Names</Text>
                  <Text muted>Male, Female, and Neutral</Text>
                </Stack>
              </div>
            </div>
          </Container>

          <VerticalSpace space="small" />
          <Divider />
          <div className={styles.main}>
            <VerticalSpace space="small" />
            <Container>
              <Text bold>Name type</Text>
              <VerticalSpace space="extraSmall" />
              <Dropdown
                onChange={handleChange}
                options={options}
                value={value}
              />
              <VerticalSpace space="medium" />
              <Text bold>Options</Text>
              <VerticalSpace space="small" />
              <div className={styles.inlineCenter}>
                <Toggle onChange={handleChange} value={true} />
                <span
                  style={{
                    marginRight: 8,
                  }}></span>
                <Text>First name</Text>
                <span
                  style={{
                    marginRight: 8,
                  }}></span>
                <Text muted>eg. Kennedy</Text>
              </div>
              <VerticalSpace space="small" />
              <div className={styles.inlineCenter}>
                <Toggle onChange={handleChange} value={false} />
                <span
                  style={{
                    marginRight: 8,
                  }}></span>
                <Text>Middle initial</Text>
                <span
                  style={{
                    marginRight: 8,
                  }}></span>
                <Text muted>eg. G.</Text>
              </div>
              <VerticalSpace space="small" />
              <div className={styles.inlineCenter}>
                <Toggle onChange={handleChange} value={false} />
                <span
                  style={{
                    marginRight: 8,
                  }}></span>
                <Text>Last name</Text>
                <span
                  style={{
                    marginRight: 8,
                  }}></span>
                <Text muted>eg. Morocco.</Text>
              </div>
              <VerticalSpace space="extraSmall" />
              <SegmentedControl
                onChange={handleChange}
                options={lnOptions}
                value={"Full"}
              />
            </Container>
          </div>

          <Divider />
          <Container space="small">
            <VerticalSpace space="extraSmall" />
            <div className={styles.flexAlignRight}>
              <Button onClick={() => emit("GENERATE_RANDOM_NAME")}>
                Generate
              </Button>
            </div>
            <VerticalSpace space="extraSmall" />
          </Container>
        </div>
      </Panel>

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

          {renderRow(
            "Names",
            "Male, Female, and Neutral",
            "GENERATE_RANDOM_NAME"
          )}
          {renderRow(
            "Times",
            "Spaced, Random, and Time Zones",
            "GENERATE_RANDOM_TIME"
          )}
        </div>

        {/* <Textbox onInput={handleInput} value={value} /> */}
        {/* <VerticalSpace space="medium" /> */}
      </div>
    </>
  );
}

export default render(Plugin);
