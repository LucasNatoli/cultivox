import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Switch from "@mui/material/Switch";

import WifiIcon from "@mui/icons-material/Wifi";

export function ConfigMenu({ switchDarkMode }) {
  return (
    <List>
      <ListItem key="Wifi" disablePadding>
        <ListItemButton>
          <ListItemIcon>
            <WifiIcon />
          </ListItemIcon>
          <ListItemText primary="Wifi" />
        </ListItemButton>
      </ListItem>
      <ListItem key="Mode" disablePadding>
        <ListItemButton>
          <ListItemIcon>
            <Switch onChange={switchDarkMode} />
          </ListItemIcon>
          <ListItemText primary="Dark Mode" />
        </ListItemButton>
      </ListItem>
    </List>
  );
}
