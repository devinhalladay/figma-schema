import { Fragment, h } from "preact";
import styles from "../styles.module.css";

export default function HorizontalSpace({
  space = "small",
  ...rest
}) {
  return <div className={styles[space]} {...rest}></div>;
}
