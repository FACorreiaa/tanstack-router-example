import { Outlet } from "@tanstack/react-router";

import Header from "./Header";

export default function Chrome() {
  return (
    <div
      style={{
        display: "grid",
        height: "100vh",
        gridTemplateAreas: "'header' 'content'",
        gridTemplateRows: "auto 1fr",
        gridTemplateColumns: "1fr",
      }}
    >
      <div
        style={{ gridArea: "header", borderBottom: "1px solid var(--gray-a5)" }}
      >
        <Header />
      </div>

      <div
        style={{
          gridArea: "content",
          overflow: "hidden",
        }}
      >
        <Outlet />
      </div>
    </div>
  );
}
