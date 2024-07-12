import * as React from "react";
import { LineChart } from "@mui/x-charts/LineChart";

export function Chart() {
  return (
    <LineChart
      xAxis={[{ data: [1, 2, 3, 4, 5, 6] }]}
      series={[
        {
          label: "temp",
          data: [2, 5.5, 2, 1.5, 5],
        },
        {
          label: "hum",
          data: [1, 4.5, 3, 1, 4],
        },
      ]}
      height={150}
    />
  );
}
