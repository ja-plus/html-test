import React from "react";
export function main() {
    var a = "world";
    return /*#__PURE__*/ React.createElement("div", null, /*#__PURE__*/ React.createElement(Comp, null), /*#__PURE__*/ React.createElement("span", null, a));
}
function Comp() {
    return /*#__PURE__*/ React.createElement("p", null, "HEllO");
}

