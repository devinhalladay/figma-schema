import {
  Container,
  Dropdown,
  DropdownOption,
  SegmentedControl,
  SegmentedControlOption,
  Text,
  VerticalSpace,
} from "@create-figma-plugin/ui";
import { h, JSX, Fragment } from "preact";
import { useState } from "preact/hooks";
import { Panels } from "src/constants";
import Panel from ".";
import LabeledInputGroup from "../LabeledInputGroup";
import LabeledSwitch from "../LabeledSwitch";

export default function NamePanel() {
  const options: Array<DropdownOption> = [
    { value: "Any" },
    { value: "Male" },
    { value: "Female" },
  ];

  const [showLastNameOptions, setShowLastNameOptions] = useState(
    false
  );

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
    <Panel panel={Panels.NAMES} data={nameOptions}>
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
          handleChange={(e: JSX.TargetedEvent<HTMLInputElement>) => {
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
    </Panel>
  );
}
