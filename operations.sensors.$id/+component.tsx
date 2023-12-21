import { Outlet } from "@tanstack/react-router";
import { PageHeader } from "gsmk-web/ui";

import ContentLayout from "~/shared/layouts/ContentLayout";

import Header from "./Header";
import Meta from "./Meta";

export function addSensorSettingsPage(id: number) {
  return id;
}

function Test() {
  return <div>oi</div>;
}
function SensorSettings() {
  return (
    <ContentLayout
      header={
        <>
          <Header />
          <Meta />
        </>
      }
      content={<Test />}
    />
  );
}

export default SensorSettings;
