import { Container, TextboxMultiline } from "@create-figma-plugin/ui";
import { h } from "preact";
import { useState } from "preact/hooks";
import { Panels } from "src/constants";
import Panel from ".";
import LabeledInputGroup from "../LabeledInputGroup";

export default function CustomListPanel() {
  const [options, setOptions] = useState({ value: "" });

  return (
    <Panel panel={Panels.CUSTOM_LIST} data={options}>
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
