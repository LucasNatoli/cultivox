import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import CalendarIcon from "@mui/icons-material/CalendarMonth";
import HomeIcon from "@mui/icons-material/Home";
import SpaIcon from "@mui/icons-material/Spa";

export function FeaturesMenu() {
  return (
    <List>
      <ListItem key="Home" disablePadding>
        <ListItemButton>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItemButton>
      </ListItem>

      <ListItem key="Carpas" disablePadding>
        <ListItemButton>
          <ListItemIcon>
            <SpaIcon />
          </ListItemIcon>
          <ListItemText primary="Carpas" />
        </ListItemButton>
      </ListItem>

      <ListItem key="Calendario" disablePadding>
        <ListItemButton>
          <ListItemIcon>
            <CalendarIcon />
          </ListItemIcon>
          <ListItemText primary="Calendario" />
        </ListItemButton>
      </ListItem>
    </List>
  );
}
