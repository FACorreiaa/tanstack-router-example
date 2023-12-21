import { lazyRouteComponent, Route } from "@tanstack/react-router";
import { z } from "zod";

import { sensorsQuery, stationsQuery } from "~/api/sensor";

import { operationsRoute } from "../operationsRoute";
import Sensors from "./+component";
import TableSensors from "./Table";

const searchSchema = z.object({
  station: z.string().optional(),
  sensor: z.string().optional(),
  state: z.enum(["service", "healthy"]).optional(),
});

export type Search = z.infer<typeof searchSchema>;

export const operationsSensorsIndexRoute = new Route({
  getParentRoute: () => operationsRoute,
  path: "sensors",
  validateSearch: searchSchema,
  component: Sensors,
  loaderContext({ search }) {
    return {
      sensorsFilters: {
        station: search.station,
        short_uid: search.sensor,
        in_service: search.state !== "service" ? undefined : true,
        is_healthy: search.state !== "healthy" ? undefined : true,
      },
    };
  },
  beforeLoad({ context }) {
    return {
      stationsQuery: stationsQuery(),
      sensorsQuery: sensorsQuery({
        ...context.sensorsFilters,
        order: ["in_service.desc", "is_healthy.desc", "updated.desc"],
      }),
    };
  },
  async loader({ context }) {
    await Promise.all([
      context.queryClient.ensureQueryData(context.stationsQuery),
      context.queryClient.ensureQueryData(context.sensorsQuery),
    ]);
  },
}).update({
  component: lazyRouteComponent(() => import("./+component")),
});

export const routeOptions = { from: operationsSensorsIndexRoute.id };
