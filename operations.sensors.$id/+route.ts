import { lazyRouteComponent, Route } from "@tanstack/react-router";
import { FileRoute, Link, Outlet } from "@tanstack/react-router";
import { z } from "zod";

import { sensorHeaderQuery } from "~/api/sensor";

import { operationsRoute } from "../operationsRoute";
import SensorSettings from "./+component";

export const operationsSensorsIdRoute = new Route({
  getParentRoute: () => operationsRoute,
  path: "sensors/$sensorId",
  component: SensorSettings,
  parseParams(params) {
    return {
      sensorId: z.number().int().parse(Number(params.sensorId)),
    };
  },
  beforeLoad({ params }) {
    return {
      sensorHeaderQuery: sensorHeaderQuery(params.sensorId),
    };
  },
  async loader({ context }) {
    await context.queryClient.ensureQueryData(context.sensorHeaderQuery);
  },
}).update({
  component: lazyRouteComponent(() => import("./+component")),
});

export const routeOptions = { from: operationsSensorsIdRoute.id };
