import {
  Container,
  Dropdown,
  SegmentedControl,
  SegmentedControlOption,
  TextboxNumeric,
  VerticalSpace,
} from "@create-figma-plugin/ui";
import { h, JSX } from "preact";
import { useState } from "preact/hooks";
import HorizontalSpace from "../HorizontalSpace";
import LabeledInputGroup from "../LabeledInputGroup";
import LabeledSwitch from "../LabeledSwitch";
import { Panels } from "../../constants";
import Panel from ".";
import styles from "../../styles.module.css";
import { TimeData } from "src/@types/Panel";

export default function TimesPanel({ show }) {
  const [startTime, setStartTime] = useState<TimeData>({
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
      panel={Panels.TIMES}
      data={{ ...startTime, interval: interval }}
      show={show}>
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
    </Panel>
  );
}
