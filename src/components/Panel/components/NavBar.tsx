import {
  Container,
  Divider,
  Text,
  VerticalSpace,
} from "@create-figma-plugin/ui";
import { Fragment, h } from "preact";
import styles from "../../../styles.module.css";

export default function PanelNavbar({ setOpenPanel }) {
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
