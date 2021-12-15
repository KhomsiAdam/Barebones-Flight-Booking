// Regular expression for inputs
export function regexInputs(value) {
    return value.match(/[^\w\s(\-).]/gi, "") ? false : true;
}
// Regular expression for emails
export function regexEmail(value) {
    return value.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "") ? true : false;
}