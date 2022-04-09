import React from "react";

const text =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum vel tincidunt orci. Integer quis erat nulla. Praesent accumsan tempor lacus in porttitor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed ac erat pulvinar, condimentum justo ac, hendrerit justo. Nulla iaculis tempus bibendum. Fusce a quam eu ipsum sagittis auctor ac nec felis. Duis pretium egestas sem, non suscipit nulla maximus rhoncus. Ut sed blandit nisi. Vestibulum scelerisque libero ut ex egestas convallis.";

const items = new Array(10).fill(1).map((_, i) => i);

function UserDashboard() {
  return (
    <div>
      {items.map((item) => (
        <p key={item}>{text}</p>
      ))}
    </div>
  );
}

export default UserDashboard;
