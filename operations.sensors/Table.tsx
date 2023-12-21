import { useQuery } from "@tanstack/react-query";
import { useRouteContext } from "@tanstack/react-router";
import {
  createColumnHelper,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  formatDistanceToNow,
  formatDuration,
  intervalToDuration,
} from "date-fns";
import { Row, Tooltip } from "gsmk-web/components";
import { TableHeader, TableRoot, TableRows } from "gsmk-web/table";
import { useMemo } from "react";

import { OverviewSensor } from "~/api/sensor";
import RouterLink from "~/shared/components/RouterLink";
import Time from "~/shared/components/Time";
import { SensorRole } from "~/types/sensor";

import { routeOptions } from "./+route";

//
export default function TableSensors() {
  const context = useRouteContext(routeOptions);
  const query = useQuery(context.sensorsQuery);
  const data = useMemo(() => query.data || [], [query.data]);

  const table = useReactTable({
    data,
    columns: [
      columnSensor,
      columnStation,
      columnLastSeen,
      columnRole,
      columnRat,
      columnImsi,
      columnHealthy,
      columnInService,
    ],
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <TableRoot table={table} disablePagination>
      <TableHeader />
      <TableRows />
    </TableRoot>
  );
}

const helper = createColumnHelper<OverviewSensor>();

function calculateTimeDifference(lastSeenDate: string) {
  const today = new Date();
  const lastSeen = new Date(lastSeenDate);

  const diffInMilliseconds = Math.abs(
    today.getTime() - new Date(lastSeenDate).getTime()
  );

  const duration = intervalToDuration({ start: 0, end: diffInMilliseconds });

  switch (true) {
    case duration.years !== 0:
      return formatDistanceToNow(lastSeen, { addSuffix: true });
    case duration.months !== 0:
      return formatDistanceToNow(lastSeen, { addSuffix: true });
    case duration.days !== 0:
      return formatDuration(duration, {
        format: ["days", "hours", "minutes"],
        zero: true,
        delimiter: ", ",
      });
    case duration.hours !== 0:
      return formatDuration(duration, {
        format: ["hours", "minutes"],
        zero: true,
        delimiter: ", ",
      });
    default:
      return formatDuration(duration, { format: ["minutes"], zero: true });
  }
}

const columnLastSeen = helper.accessor("updated", {
  header: "Last Seen",
  cell: (props) => (
    <Tooltip
      content={calculateTimeDifference(props.getValue())}
      side="top"
      sideOffset={8}
    >
      <div>
        <Time value={props.getValue()} />
      </div>
    </Tooltip>
  ),
});
const columnStation = helper.accessor("station", {
  header: "Station",
});
export const columnSensor = helper.accessor("short_uid", {
  header: "Sensor",
  cell: (props) => {
    const value = props.getValue();
    if (!value) return null;

    return (
      <ColumnSensor sensorId={props.row.original.sensor_id} shortUid={value} />
    );
  },
  meta: {},
});
const columnRole = helper.accessor("role", {
  header: "Role",
  cell(props) {
    switch (props.getValue()) {
      case SensorRole.Scanner:
        return "Scanner";

      case SensorRole.Explorer:
        return "Explorer";

      default:
        return "Unknown role";
    }
  },
});
const columnRat = helper.accessor("rat_capabilities", {
  header: "RAT",
  cell(props) {
    const rats = props.getValue();

    return (
      <Row gap="normal">
        {[2, 3, 4, 5].map((rat) => {
          const active = rats.includes(rat);
          return (
            <span
              key={rat}
              aria-hidden={active}
              style={{ opacity: active ? 1 : 0 }}
            >
              {rat}G
            </span>
          );
        })}
      </Row>
    );
  },
});
const columnImsi = helper.accessor("imsi", {
  header: "IMSI",
});
const columnHealthy = helper.accessor("is_healthy", {
  header: "Healthy",
  cell(props) {
    return <div>{props.getValue()}</div>;
  },
});
const columnInService = helper.accessor("in_service", {
  header: "In Service",
  cell(props) {
    return <div>{props.getValue()}</div>;
  },
});

function ColumnSensor(props: { sensorId: number; shortUid: string }) {
  //const addSidebarItem = useAddSidebarItem();

  return (
    <RouterLink
      to="/operations/sensors/$sensorId"
      params={{ sensorId: props.sensorId }}
      onClick={(event: React.MouseEvent) => {
        console.log("props.sensorId", props.sensorId);
      }}
    >
      {props.shortUid}
    </RouterLink>
  );
}
