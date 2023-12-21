import { Link, Outlet, RootRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import React from "react";

import MapProvider from "~/shared/components/map/MapProvider";
import TwoPaneLayout from "~/shared/layouts/TwoPaneLayout";

import SensorSettings from "../operations.sensors.$id/+component";
import Header from "./Header";
import Map from "./Map";
import Table from "./Table";

export default function OperationSensors() {
  return (
    <MapProvider>
      <TwoPaneLayout header={<Header />} left={<Table />} right={<Outlet />} />
    </MapProvider>
  );
}
