import React from "react";
export function main() {
    let a = "world";
    return /*#__PURE__*/ React.createElement("div", null, Comp(), /*#__PURE__*/ React.createElement("span", null, a));
}
function Comp() {
    return /*#__PURE__*/ React.createElement("p", null, "HEllO");
}

