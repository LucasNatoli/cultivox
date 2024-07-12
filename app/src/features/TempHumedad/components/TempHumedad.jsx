import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import { Chart } from "./Chart";
export function TempHumedad({name, temp, hum}) {
  return (
    <Card>
      <CardHeader title={name} subheader="Temp. y Humedad" />
      <CardContent>
        <Typography variant="body2">Temperatura: {temp}º</Typography>
        <Typography variant="body2">Humedad: {hum}%</Typography>
        <Chart />
      </CardContent>
    </Card>
  );
}
