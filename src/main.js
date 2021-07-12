import { on, showUI } from '@create-figma-plugin/utilities';
export default function () {
    var options = { width: 240, height: 120 };
    var data = { greeting: 'Hello, World!' };
    function handleSubmit(data) {
        console.log(data); //=> { greeting: 'Hello, World!' }
    }
    on('SUBMIT', handleSubmit);
    showUI(options, data);
}
