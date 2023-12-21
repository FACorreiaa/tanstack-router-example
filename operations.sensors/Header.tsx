import { A } from "@mobily/ts-belt";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { Padding } from "gsmk-web/components";
import {
  ComboboxChanges,
  Filter,
  FilterCombobox,
  FilterToolbar,
  getComboboxSelectionAction,
} from "gsmk-web/filter";
import { PageHeader } from "gsmk-web/ui";
import { useMemo } from "react";

import { sensorsQuery, stationsQuery } from "~/api/sensor";

import { routeOptions } from "./+route";

export default function HeaderSensors() {
  return (
    <>
      <PageHeader title="Sensors" />

      <Padding b="2">
        <FilterToolbar>
          <FilterState />
          <FilterStation />
          <FilterSensor />
        </FilterToolbar>
      </Padding>
    </>
  );
}

function FilterState() {
  const navigate = useNavigate();
  const search = useSearch(routeOptions);

  const selectedItems = useMemo(() => {
    if (!search.state) return [];

    const option = states.find((option) => option.value === search.state);

    return option ? [option] : [];
  }, [search.state]);

  function handleSelect(changes: ComboboxChanges<(typeof states)[number]>) {
    const action = getComboboxSelectionAction(selectedItems, changes);
    switch (action.type) {
      case "SELECT":
        navigate({
          search(prev) {
            return {
              ...prev,
              state: changes.selectedItem?.value as
                | "service"
                | "healthy"
                | undefined,
            };
          },
        });
        break;

      case "UNSELECT":
        navigate({
          search(prev) {
            return {
              ...prev,
              state: undefined,
            };
          },
        });
        break;
    }
  }

  const trigger = useMemo(() => {
    return selectedItems.length === 0
      ? "State: All"
      : selectedItems.map((o) => o.title).join(", ");
  }, [selectedItems]);

  return (
    <Filter
      isActive={A.isNotEmpty(selectedItems)}
      trigger={trigger}
      content={
        <FilterCombobox
          items={states}
          selectedItems={selectedItems}
          onSelect={handleSelect}
        />
      }
    />
  );
}

const states = [
  { title: "In Service", value: "service" },
  { title: "Healthy", value: "healthy" },
];

function FilterStation() {
  const search = useSearch(routeOptions);
  const trigger = search.station || "Station: All";

  return (
    <Filter
      isActive={!!search.station}
      trigger={trigger}
      content={<FilterStationContent />}
    />
  );
}

function FilterStationContent() {
  const navigate = useNavigate();
  const search = useSearch(routeOptions);

  const query = useQuery({
    ...stationsQuery(),
    select: (stations) => {
      return stations.map((station) => ({
        title: station.name,
        value: station.name,
      }));
    },
  });

  const selectedItems = useMemo(() => {
    if (!search.station || !query.data) return [];

    const option = query.data.find((option) => option.value === search.station);

    return option ? [option] : [];
  }, [search.station, query.data]);

  if (!query.data) {
    return null;
  }

  function handleSelect(
    changes: ComboboxChanges<{ title: string; value: string }>
  ) {
    const action = getComboboxSelectionAction(selectedItems, changes);
    switch (action.type) {
      case "SELECT":
        navigate({
          search(prev) {
            return {
              ...prev,
              station: changes.selectedItem?.value,
            };
          },
        });
        break;

      case "UNSELECT":
        navigate({
          search(prev) {
            return {
              ...prev,
              station: undefined,
            };
          },
        });
        break;
    }
  }

  return (
    <FilterCombobox
      items={query.data}
      selectedItems={selectedItems}
      onSelect={handleSelect}
    />
  );
}

function FilterSensor() {
  const search = useSearch(routeOptions);
  const trigger = search.sensor || "Sensor: All";

  return (
    <Filter
      isActive={!!search.sensor}
      trigger={trigger}
      content={<FilterSensorContent />}
    />
  );
}

function FilterSensorContent() {
  const navigate = useNavigate();
  const search = useSearch(routeOptions);
  const query = useQuery({
    ...sensorsQuery(search),
    select: (sensors) => {
      return sensors.map((sensor) => ({
        title: sensor.short_uid,
        value: sensor.short_uid,
      }));
    },
  });

  const selectedItems = useMemo(() => {
    if (!search.sensor || !query.data) return [];
    const option = query.data.find((option) => option.value === search.sensor);

    return option ? [option] : [];
  }, [search.sensor, query.data]);

  if (!query.data) {
    return null;
  }

  function handleSelect(
    changes: ComboboxChanges<{ title: string; value: string }>
  ) {
    const action = getComboboxSelectionAction(selectedItems, changes);
    switch (action.type) {
      case "SELECT":
        navigate({
          search(prev) {
            const test = {
              ...prev,
              sensor: changes.selectedItem?.value,
            };

            return test;
          },
        });
        break;

      case "UNSELECT":
        navigate({
          search(prev) {
            return {
              ...prev,
              sensor: undefined,
            };
          },
        });
        break;
    }
  }

  return (
    <FilterCombobox
      items={query.data}
      selectedItems={selectedItems}
      onSelect={handleSelect}
    />
  );
}
