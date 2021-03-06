import { h } from "preact";

const VariableIcon = () => {
  return (
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
  );
};

export default VariableIcon;
