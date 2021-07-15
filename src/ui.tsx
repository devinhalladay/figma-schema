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
  TextboxMultiline,
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
            <h3>{panel.name}</h3>
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

function CustomListPanel({ show, setOpenPanel, icon }) {
  const [options, setOptions] = useState({ value: "" });

  return (
    <Panel
      show={show}
      setOpenPanel={setOpenPanel}
      panel={Panels.CUSTOM_LIST}
      eventArgs={options}>
      <CategoryTitle
        panel={Panels.CUSTOM_LIST}
        icon={
          <svg
            width="24"
            height="24"
            viewBox="0 0 192 192"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M54 30C6 30 54 96 6 96C54 96 6 162 54 162"
              stroke="black"
              stroke-width="12"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M138 30C186 30 138 96 186 96C138 96 186 162 138 162"
              stroke="black"
              stroke-width="12"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <line
              x1="59"
              y1="64"
              x2="132"
              y2="64"
              stroke="black"
              stroke-width="12"
              stroke-linecap="round"
            />
            <line
              x1="59"
              y1="96"
              x2="132"
              y2="96"
              stroke="black"
              stroke-width="12"
              stroke-linecap="round"
            />
            <line
              x1="59"
              y1="128"
              x2="132"
              y2="128"
              stroke="black"
              stroke-width="12"
              stroke-linecap="round"
            />
          </svg>
        }
      />

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

      <CustomListPanel
        show={openPanel === Panels.CUSTOM_LIST}
        setOpenPanel={setOpenPanel}
        icon={
          <svg
            width="192"
            height="192"
            viewBox="0 0 192 192"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M54 30C6 30 54 96 6 96C54 96 6 162 54 162"
              stroke="black"
              stroke-width="12"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M138 30C186 30 138 96 186 96C138 96 186 162 138 162"
              stroke="black"
              stroke-width="12"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <line
              x1="59"
              y1="64"
              x2="132"
              y2="64"
              stroke="black"
              stroke-width="12"
              stroke-linecap="round"
            />
            <line
              x1="59"
              y1="96"
              x2="132"
              y2="96"
              stroke="black"
              stroke-width="12"
              stroke-linecap="round"
            />
            <line
              x1="59"
              y1="128"
              x2="132"
              y2="128"
              stroke="black"
              stroke-width="12"
              stroke-linecap="round"
            />
          </svg>
        }
      />

      <div className={styles.container}>
        <div className={styles.main}>
          <Container space="small">
            <VerticalSpace space="small" />
            <div
              style={{
                backgroundColor: "#dbecfc",
                padding: "16px 12px",
                borderRadius: 6,
                background: "#E1F3FF",
                display: "flex",
              }}>
              <div
                style={{
                  paddingRight: 12,
                }}>
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <rect width="26" height="26" />
                  <path
                    d="M10.3429 16.167L11.8866 18.5408C12.0755 18.7033 12.2921 18.8164 12.5155 18.8753C12.845 18.96 13.1906 18.9224 13.4832 18.7316C13.497 18.7222 13.5109 18.7128 13.527 18.7033C13.8058 18.5055 13.9878 18.197 14.0546 17.8555C14.1214 17.5117 14.0684 17.1396 13.8703 16.824C13.8588 16.8075 13.8496 16.7911 13.838 16.7746L11.8267 13.8284C11.5847 13.4728 11.2414 13.2326 10.8774 13.1384C10.5479 13.0512 10.2023 13.0913 9.90974 13.282C9.89592 13.2915 9.88209 13.3009 9.86597 13.3103C9.58718 13.5081 9.40517 13.819 9.33835 14.1581C9.27154 14.502 9.32453 14.874 9.52267 15.1896C9.53419 15.2061 9.54341 15.2226 9.55493 15.2391L9.64018 15.3663C9.89131 15.5735 10.1286 15.8396 10.3429 16.167ZM13.7689 3.37675C13.7459 3.38381 13.7205 3.38852 13.6975 3.39323C13.3404 3.48744 13.0524 3.73236 12.8681 4.055C12.6676 4.4059 12.5916 4.84394 12.6883 5.28433L14.5661 13.9768C14.8725 13.7319 15.2204 13.5552 15.6144 13.4516C16.1397 13.3127 16.7295 13.3174 17.3908 13.4752C17.112 12.2058 16.8401 10.9246 16.5706 9.64351C16.2042 7.91255 15.8379 6.1816 15.4969 4.66496C15.4877 4.63669 15.4831 4.60843 15.4762 4.58017C15.3725 4.16098 15.126 3.81714 14.808 3.60048C14.5016 3.39088 14.1352 3.30139 13.7689 3.37675ZM21.8858 1.53746C21.9273 1.53746 21.9688 1.54217 22.008 1.54924C22.7521 1.64344 23.3927 2.04615 23.8304 2.62785C24.2613 3.20012 24.494 3.94431 24.4317 4.7309C24.4317 4.77093 24.4271 4.80861 24.4202 4.84629L23.4756 14.5726H23.4779C23.4756 14.5867 23.4756 14.5985 23.4733 14.6126C23.6092 14.721 23.7359 14.8411 23.8534 14.973C24.3442 15.5193 24.6621 16.247 24.8004 17.0831C25.0031 18.3124 25.0584 19.7725 24.934 21.1926C24.8188 22.5044 24.5539 23.7902 24.1138 24.8476C23.0609 27.3769 21.1923 29.1055 19.0335 29.9227C18.0267 30.3043 16.9599 30.488 15.8863 30.462C14.808 30.4361 13.7228 30.203 12.6837 29.7508C10.6309 28.8559 8.75314 27.1108 7.47213 24.4332C6.84775 23.1261 6.75098 22.3113 6.48833 20.9383C6.44685 20.7145 6.51597 20.4955 6.65652 20.3401L5.80635 19.033C5.10824 17.9591 5.22344 16.8476 5.75796 16.021C5.96302 15.7054 6.23028 15.4345 6.53671 15.2273C6.84544 15.0177 7.19565 14.8693 7.56429 14.8034C7.72096 14.7751 7.87763 14.761 8.0366 14.7634C8.00204 14.4737 8.01356 14.184 8.06886 13.9014C8.19788 13.2373 8.56652 12.6273 9.12869 12.227C9.15634 12.2058 9.18629 12.1869 9.21624 12.1658C9.8291 11.7678 10.5341 11.6806 11.1954 11.8525C11.8474 12.0221 12.4556 12.446 12.8819 13.0701L13.0386 13.2985L11.3705 5.57636C11.1977 4.78271 11.3359 3.98906 11.6999 3.3532C12.0709 2.70321 12.6745 2.21336 13.4302 2.03438C13.4464 2.02967 13.4648 2.02731 13.4809 2.02496C14.2182 1.86717 14.9555 2.04144 15.5568 2.45122C16.1581 2.86335 16.6212 3.51334 16.7987 4.30463H16.801C16.8033 4.31876 16.8056 4.33525 16.8102 4.34938C17.1811 6.00026 17.5359 7.67469 17.8907 9.34677C18.0036 9.88608 18.1188 10.423 18.2317 10.9553L18.8815 4.27873C18.8815 4.23869 18.8861 4.20101 18.893 4.16333C18.9851 3.38146 19.3561 2.6985 19.8883 2.22514C20.4297 1.74706 21.1371 1.47859 21.8858 1.53746ZM22.7614 3.47331C22.5379 3.17657 22.2199 2.97168 21.8536 2.92223C21.8398 2.92223 21.8259 2.91987 21.8121 2.91987V2.91516C21.4274 2.87513 21.0587 3.01407 20.7753 3.26606C20.4873 3.52276 20.2869 3.8925 20.2339 4.32112C20.2339 4.33525 20.2316 4.35174 20.2316 4.36587H20.227L19.3422 13.4587L22.1992 13.7483L23.0793 4.7097C23.0793 4.69086 23.0816 4.67438 23.0816 4.65554H23.0839C23.1277 4.21043 23.001 3.78888 22.7614 3.47331ZM12.7367 20.2412C12.8082 20.6203 12.7989 21.0066 12.7183 21.374C12.5708 22.0475 12.1838 22.6598 11.6032 23.0555C11.594 23.0602 11.564 23.0814 11.5133 23.112L11.5156 23.1143C11.5041 23.1214 11.4949 23.1261 11.4857 23.1308C10.8636 23.5053 10.154 23.5689 9.49502 23.3804C9.0734 23.2603 8.6702 23.0343 8.32691 22.721C9.1333 25.2362 10.5733 27.3369 13.2137 28.4862C14.0938 28.87 15.0085 29.0679 15.9116 29.0891C16.8194 29.1103 17.7179 28.9572 18.5635 28.6345C20.3883 27.9422 21.9711 26.4703 22.872 24.3083C23.2567 23.3852 23.4894 22.2453 23.5931 21.0749C23.706 19.7725 23.6576 18.4372 23.471 17.3092C23.3742 16.7298 23.1715 16.2447 22.8627 15.9008C22.5909 15.597 22.2222 15.3945 21.766 15.3309C20.7546 15.192 18.9252 15.2249 16.3033 15.272C16.0199 15.2768 15.7296 15.2815 15.4278 15.2885C15.2711 15.8184 15.2527 16.28 15.3356 16.6733C15.414 17.043 15.5845 17.3586 15.8218 17.6153C16.0729 17.8885 16.3955 18.1028 16.7572 18.2559C17.4161 18.5314 18.1926 18.6021 18.9022 18.4537C19.2547 18.3572 19.621 18.562 19.727 18.9224C19.833 19.2874 19.6302 19.6736 19.2731 19.7843L19.0796 19.1225L19.2731 19.7843C16.612 20.5991 16.6028 20.9406 16.566 22.2288C16.5636 22.316 16.5613 22.4055 16.559 22.4596C16.5475 22.8411 16.2365 23.1379 15.8632 23.1261C15.4923 23.1143 15.1997 22.7964 15.2112 22.4149C15.2135 22.3136 15.2158 22.25 15.2181 22.1888C15.255 20.8558 15.2734 20.1517 16.2342 19.5253C15.8125 19.3486 15.4255 19.1084 15.0914 18.8117C14.9025 19.1932 14.6237 19.53 14.2689 19.7843C14.2389 19.8055 14.2113 19.8243 14.1813 19.8455C13.7297 20.1376 13.2321 20.2624 12.7367 20.2412ZM10.8935 19.4051C10.753 19.2662 10.624 19.1131 10.5088 18.9436L8.71858 16.3224C8.40985 16.1152 8.08499 16.0563 7.78547 16.1104C7.59424 16.1458 7.41222 16.2211 7.24864 16.3318C7.08506 16.4425 6.94221 16.5862 6.83392 16.7534C6.56436 17.1679 6.51367 17.7378 6.88231 18.3053L8.87525 21.3716C9.11717 21.7461 9.46507 22.0028 9.83601 22.1064C10.1678 22.2006 10.518 22.1723 10.8221 21.991C10.829 21.9863 10.8336 21.9816 10.8406 21.9792V21.9816C10.8452 21.9792 10.8521 21.9745 10.8843 21.9509C11.1792 21.7508 11.3774 21.4352 11.4511 21.0866C11.5271 20.7357 11.4788 20.3495 11.2806 20.0151C11.2645 19.9892 11.2553 19.9704 11.2484 19.9633L10.8935 19.4051Z"
                    fill="#333333"
                    stroke="#333333"
                    stroke-width="0"
                  />
                </svg>
              </div>
              <div>
                <h3 style={{ marginBottom: "2px" }}>
                  <strong>Welcome to Schema!</strong>
                </h3>
                <p style={{ margin: 0 }}>
                  Schema is the most powerful placeholder text
                  generator for Figma. Fine-tune parameteres to
                  generate sequential dates and times, full user
                  profiles, or connect to APIs.
                </p>
              </div>
            </div>
            <VerticalSpace space="small" />
            <h3 style={{ marginBottom: "2px" }}>Categories</h3>
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
            icon={
              <svg
                width="24"
                height="24"
                viewBox="0 0 192 192"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M54 30C6 30 54 96 6 96C54 96 6 162 54 162"
                  stroke="black"
                  stroke-width="12"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M138 30C186 30 138 96 186 96C138 96 186 162 138 162"
                  stroke="black"
                  stroke-width="12"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <line
                  x1="59"
                  y1="64"
                  x2="132"
                  y2="64"
                  stroke="black"
                  stroke-width="12"
                  stroke-linecap="round"
                />
                <line
                  x1="59"
                  y1="96"
                  x2="132"
                  y2="96"
                  stroke="black"
                  stroke-width="12"
                  stroke-linecap="round"
                />
                <line
                  x1="59"
                  y1="128"
                  x2="132"
                  y2="128"
                  stroke="black"
                  stroke-width="12"
                  stroke-linecap="round"
                />
              </svg>
            }
          />

          <CategoryRow
            panel={Panels.ORGANIZATIONS}
            setOpenPanel={setOpenPanel}
            icon={<></>}
          />

          <CategoryRow
            panel={Panels.NUMBERS}
            setOpenPanel={setOpenPanel}
            icon={<></>}
          />

          <CategoryRow
            panel={Panels.API}
            setOpenPanel={setOpenPanel}
            icon={<></>}
          />

          <CategoryRow
            panel={Panels.CONTACT_INFORMATION}
            setOpenPanel={setOpenPanel}
            icon={<></>}
          />

          <CategoryRow
            panel={Panels.TRENDING_TOPICS}
            setOpenPanel={setOpenPanel}
            icon={<></>}
          />

          <VerticalSpace space="medium" />
        </div>
      </div>
    </PanelContext.Provider>
  );
}

export default render(Plugin);
