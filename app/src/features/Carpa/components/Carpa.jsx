import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Divider from "@mui/material/Divider";
import Fab from "@mui/material/Fab";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import AddIcon from "@mui/icons-material/Add";
import { TempHumedad } from "../../TempHumedad";

export function Carpa({ name }) {
  const semanas = [
    { etapa: "GERM" },
    { etapa: "GERM" },
    { etapa: "VEGE" },
    { etapa: "VEGE" },
    { etapa: "VEGE" },
    { etapa: "VEGE" },
    { etapa: "VEGE" },
    { etapa: "FLORA" },
    { etapa: "FLORA" },
    { etapa: "FLORA" },
  ];
  const sensores = [
    {
      name: "sensor 1",
      temp: 24,
      hum: 40,
      history: [
        { time: 3000202, temp: 24, hum: 40 },
        { time: 3000203, temp: 24.2, hum: 40 },
        { time: 3000204, temp: 24.1, hum: 40 },
        { time: 3000205, temp: 24.3, hum: 40 },
      ],
    },
    {
      name: "sensor 2",
      temp: 26,
      hum: 41,
      history: [
        { time: 3000202, temp: 24, hum: 40 },
        { time: 3000203, temp: 24.2, hum: 40 },
        { time: 3000204, temp: 24.1, hum: 40 },
        { time: 3000205, temp: 24.3, hum: 40 },
      ],
    },
    {
      name: "sensor 3",
      temp: 28,
      hum: 39,
      history: [
        { time: 3000202, temp: 24, hum: 40 },
        { time: 3000203, temp: 24.2, hum: 40 },
        { time: 3000204, temp: 24.1, hum: 40 },
        { time: 3000205, temp: 24.3, hum: 40 },
      ],
    },
  ];

  return (
    <Card>
      <CardHeader title={name} />
      <CardContent>
        <Grid container spacing={1}>
        <Grid item xs={12}>
            <Divider>
              <Typography variant="h6">Semanas</Typography>
            </Divider>
          </Grid>
          {semanas.map((semana, i) => {
            return (
              <Grid item xs={4} sm={3} md={2} lg={1} key={i}>
                <Card>
                  <CardHeader subheader={semana.etapa} />
                  <CardContent
                    sx={{ display: "flex", justifyContent: "center" }}
                  >
                    <Typography variant="h4">{i + 1}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
          
        </Grid>
        <Grid container spacing={1.5} sx={{mt:2}}>
        <Grid item xs={12}>
            <Divider>
              <Typography variant="h6">Sensores</Typography>
            </Divider>
          </Grid>
          {sensores.map((sensor, i) => {
            return (
              <Grid item xs={12} md={4} key={i}>
                <TempHumedad
                  name={sensor.name}
                  temp={sensor.temp}
                  hum={sensor.hum}
                />
              </Grid>
            );
          })}
        </Grid>
      </CardContent>
      <CardActions xs={12} sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Fab color="primary">
          <AddIcon />
        </Fab>
      </CardActions>
    </Card>
  );
}
