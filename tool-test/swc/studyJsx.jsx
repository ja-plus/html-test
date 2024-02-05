import React from 'react';
export function main() {
  let a = 'world';
  return (
    <div>
      <Comp></Comp>
      <span>{a}</span>
    </div>
  );
}
function Comp() {
  return <p>HEllO</p>;
}
