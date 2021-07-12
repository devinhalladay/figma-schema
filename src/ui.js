import { render, Container, Text, VerticalSpace, Button, } from "@create-figma-plugin/ui";
import { emit } from "@create-figma-plugin/utilities";
import { h } from "preact";
function Plugin(props) {
    function handleClick() {
        emit("SUBMIT", props);
    }
    return (h(Container, { space: "medium" },
        h(VerticalSpace, { space: "medium" }),
        h(Text, null, props.greeting),
        h(VerticalSpace, { space: "medium" }),
        h(Button, { onClick: handleClick }, "Submit")));
}
export default render(Plugin);
