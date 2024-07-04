import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

export default function App() {
  return (
    <Stack spacing={2} direction="row">
      <Button
        variant="text"
        onClick={() => {
          alert("clicked"); 
        }}
      >
        Text
      </Button>
      <Button variant="contained">Contained</Button>
      <Button variant="outlined">Outlined</Button>
    </Stack>
  );
}
