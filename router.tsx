import type { QueryClient } from "@tanstack/react-query";
import { Router, RouterContext } from "@tanstack/react-router";

import queryClient from "~/app/queryClient";

import { cellCommRoute } from "./analytics.cells.$id.comm/+route";
import { cellGeoRoute } from "./analytics.cells.$id.geo/+route";
import { cellSigRoute } from "./analytics.cells.$id.sig/+route";
import { cellIdRoute } from "./analytics.cells.$id/+route";
import { cellsIndexRoute } from "./analytics.cells/+route";
import { incidentsIndexRoute } from "./analytics.incidents/+route";
import { sensorNeighboursRoute } from "./analytics.sensors.$id.neighbours/+route";
import { sensorSi2Route } from "./analytics.sensors.$id.si2/+route";
import { sensorSigRoute } from "./analytics.sensors.$id.sig/+route";
import { sensorIdRoute } from "./analytics.sensors.$id/+route";
import { sensorsIndexRoute } from "./analytics.sensors/+route";
import { transmissionAlrtRoute } from "./analytics.transmissions.$id.alrt/+route";
import { transmissionBcchRoute } from "./analytics.transmissions.$id.bcch/+route";
import { transmissionCommRoute } from "./analytics.transmissions.$id.comm/+route";
import { transmissionDetRoute } from "./analytics.transmissions.$id.det/+route";
import { transmissionGeoRoute } from "./analytics.transmissions.$id.geo/+route";
import { transmissionIncdRoute } from "./analytics.transmissions.$id.incd/+route";
import { transmissionIpRoute } from "./analytics.transmissions.$id.ip/+route";
import { transmissionLogRoute } from "./analytics.transmissions.$id.log/+route";
import { transmissionPchRoute } from "./analytics.transmissions.$id.pch/+route";
import { transmissionRrcRoute } from "./analytics.transmissions.$id.rrc/+route";
import { transmissionRxRoute } from "./analytics.transmissions.$id.rx/+route";
import { transmissionIdRoute } from "./analytics.transmissions.$id/+route";
import { transmissions2gIndexRoute } from "./analytics.transmissions.2g/+route";
import { transmissions3gIndexRoute } from "./analytics.transmissions.3g/+route";
import { transmissions4gIndexRoute } from "./analytics.transmissions.4g/+route";
import { transmissions5gIndexRoute } from "./analytics.transmissions.5g/+route";
import { analyticsRoute } from "./analyticsRoute";
import { operationsSensorsIdRoute } from "./operations.sensors.$id/+route";
import { operationsSensorsIndexRoute } from "./operations.sensors/+route";
import { operationsRoute } from "./operationsRoute";
import { reportsCyberIdRoute } from "./reports.cyber.$id/+route";
import { reportsCyberIndexRoute } from "./reports.cyber/+route";
import { reportsRoute } from "./reportsRoute";

type OverwatchContext = {
  queryClient: QueryClient;
};

const routerContext = new RouterContext<OverwatchContext>();
export const rootRoute = routerContext.createRootRoute();

const routeTree = rootRoute.addChildren([
  reportsRoute.addChildren([reportsCyberIndexRoute, reportsCyberIdRoute]),
  analyticsRoute.addChildren([
    cellsIndexRoute,
    cellIdRoute.addChildren([cellSigRoute, cellGeoRoute, cellCommRoute]),
    incidentsIndexRoute,
    transmissions2gIndexRoute,
    transmissions3gIndexRoute,
    transmissions4gIndexRoute,
    transmissions5gIndexRoute,
    transmissionIdRoute.addChildren([
      transmissionAlrtRoute,
      transmissionBcchRoute,
      transmissionCommRoute,
      transmissionDetRoute,
      transmissionGeoRoute,
      transmissionIncdRoute,
      transmissionIpRoute,
      transmissionLogRoute,
      transmissionPchRoute,
      transmissionRrcRoute,
      transmissionRxRoute,
    ]),
    sensorsIndexRoute,
    sensorIdRoute.addChildren([
      sensorSigRoute,
      sensorSi2Route,
      sensorNeighboursRoute,
    ]),
  ]),
  operationsRoute.addChildren([
    operationsSensorsIndexRoute,
    operationsSensorsIdRoute,
  ]),
]);

const router = new Router({
  routeTree,
  reloadOnWindowFocus: false,
  context: {
    queryClient,
  },
  defaultPendingComponent: () => {
    return <div className="p-2">Loading...</div>;
  },
  defaultErrorComponent: (props) => {
    console.error(props.error);
    return <div className="p-2">Error: {props.info?.componentStack}</div>;
  },
});

export default router;

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
