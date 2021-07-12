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
} from "@create-figma-plugin/ui";
import { emit, on } from "@create-figma-plugin/utilities";
import { h, JSX, Fragment } from "preact";
import { useEffect, useState } from "preact/hooks";
import styles from "./styles.module.css";
import "./main.css";
import { CSSTransition } from "react-transition-group";

function TimePanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [classNames, setClassNames] = useState([
    styles.panel,
    styles.panelExitActive,
  ]);

  useEffect(() => {
    if (isOpen) setClassNames("panel panelEnterActive");
  }, []);

  return (
    <div className={classNames.toString()}>
      <Text>Time</Text>
    </div>
  );
}

function Plugin(props: { greeting: string }) {
  function handleClick() {
    emit("SUBMIT", props);
  }

  function handleRowClick(emitter: string) {
    emit(emitter, props);
  }

  const [value, setValue] = useState("");

  function handleInput(event: JSX.TargetedEvent<HTMLInputElement>) {
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
          <div className={styles.box}></div>
          <Stack space="extraSmall">
            <Text bold>{name}</Text>
            <Text muted>{description}</Text>
          </Stack>
        </div>
      </Container>
    );
  }

  return (
    <>
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

          <TimePanel></TimePanel>

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
        <Divider />
        <Container space="small">
          <VerticalSpace space="extraSmall" />
          <Button onClick={handleClick}>Submit</Button>
          <VerticalSpace space="extraSmall" />
        </Container>
      </div>
    </>
  );
}

export default render(Plugin);
