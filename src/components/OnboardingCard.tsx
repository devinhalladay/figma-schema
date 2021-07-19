import { Container, VerticalSpace } from "@create-figma-plugin/ui";
import { h } from "preact";
import PeaceIcon from "./Icons/PeaceIcon";

export default function OnboardingCard() {
  return (
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
            Automate tedious tasks, and improve the fidelity of your
            designs, with true-to-life generative placeholder text.
          </p>
        </div>
      </div>
      <VerticalSpace space="small" />
      <h3 style={{ marginBottom: "2px" }}>Categories</h3>
    </Container>
  );
}
