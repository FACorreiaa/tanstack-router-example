import { Route } from "@tanstack/react-router";

import Chrome from "~/sections/operations/Chrome";

import OperationSensors from "./operations.sensors/+component";
import { rootRoute } from "./router";

export const operationsRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "operations",
  component: Chrome,
});
