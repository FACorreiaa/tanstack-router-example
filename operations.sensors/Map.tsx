import { A } from "@mobily/ts-belt";
import { useQuery } from "@tanstack/react-query";
import { useRouteContext } from "@tanstack/react-router";
import type { Feature } from "ol";
import { Fill, RegularShape, Stroke, Style } from "ol/style";
import { useMemo } from "react";

import { useVectorLayer } from "~/shared/components/map/hooks";
import Map from "~/shared/components/map/Map";
import { createFeatureFromLonLat } from "~/shared/components/map/utils";

import { routeOptions } from "./+route";

export default function MapSensors() {
  const context = useRouteContext(routeOptions);
  const query = useQuery(context.stationsQuery);

  const stationFeatures = useMemo(() => {
    if (!query.data) return [];

    const features: Array<Feature> = [];
    A.forEach(query.data, (station) => {
      const feature = createFeatureFromLonLat(
        station.longitude,
        station.latitude
      );
      feature.setId(station.name);
      features.push(feature);
    });

    return features;
  }, [query.data]);

  useVectorLayer({
    features: stationFeatures,
    initialOptions: {
      properties: {
        title: "Stations",
      },
      style: () => [
        new Style({
          image: new RegularShape({
            radius: 10,
            points: 4,
            angle: Math.PI / 4,
            rotation: Math.PI / 4,
            fill: new Fill({ color: "#beceb3" }),
            stroke: new Stroke({ color: "black", width: 2 }),
          }),
        }),
        new Style({
          image: new RegularShape({
            radius: 4,
            points: 4,
            angle: Math.PI / 4,
            rotation: Math.PI / 4,
            fill: new Fill({ color: "black" }),
          }),
        }),
      ],
    },
  });

  return <Map />;
}
