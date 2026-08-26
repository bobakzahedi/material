import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Box,
  Breadcrumbs,
  Button,
  Divider,
  Link,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Paper,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import {
  ContentCopy,
  ContentCut,
  ContentPaste,
  Delete,
  Home,
  Print,
  Share,
} from "@mui/icons-material";
import { Section, Stacked } from "./StorySection";

/**
 * Covers `MuiTabs`, `MuiTab`, `MuiBreadcrumbs`, `MuiMenu`, `MuiMenuItem`,
 * `MuiSpeedDial` and `MuiSpeedDialAction`.
 */
const meta: Meta = {
  title: "MUI/Navigation",
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj<typeof meta>;

const TabsDemo = ({
  variant = "standard",
  orientation = "horizontal",
}: {
  variant?: "standard" | "fullWidth" | "scrollable";
  orientation?: "horizontal" | "vertical";
}) => {
  const [value, setValue] = useState(0);
  const count = variant === "scrollable" ? 9 : 3;

  return (
    <Box sx={{ width: "100%", maxWidth: 640 }}>
      <Tabs
        value={value}
        onChange={(_e, next: number) => setValue(next)}
        variant={variant}
        orientation={orientation}
        scrollButtons={variant === "scrollable" ? "auto" : false}
      >
        {Array.from({ length: count }, (_, i) => (
          <Tab key={i} label={`Tab ${i + 1}`} disabled={i === count - 1 && count === 3} />
        ))}
      </Tabs>
      <Divider />
      <Box sx={{ p: 2 }}>
        <Typography variant="body2" color="text.secondary">
          Panel for tab {value + 1}
        </Typography>
      </Box>
    </Box>
  );
};

export const TabsStory: Story = {
  name: "Tabs",
  render: () => (
    <>
      <Stacked title="Standard" description="Third tab is disabled.">
        <TabsDemo />
      </Stacked>
      <Stacked title="Full width">
        <TabsDemo variant="fullWidth" />
      </Stacked>
      <Stacked title="Scrollable">
        <TabsDemo variant="scrollable" />
      </Stacked>
    </>
  ),
};

export const BreadcrumbsStory: Story = {
  name: "Breadcrumbs",
  render: () => (
    <>
      <Stacked title="Default">
        <Breadcrumbs>
          <Link underline="hover" color="inherit" href="#">
            Home
          </Link>
          <Link underline="hover" color="inherit" href="#">
            Content
          </Link>
          <Typography color="text.primary">Article</Typography>
        </Breadcrumbs>
      </Stacked>

      <Stacked title="With icons and a custom separator">
        <Breadcrumbs separator="›">
          <Link
            underline="hover"
            color="inherit"
            href="#"
            sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
          >
            <Home fontSize="small" />
            Home
          </Link>
          <Link underline="hover" color="inherit" href="#">
            Media
          </Link>
          <Typography color="text.primary">Image.png</Typography>
        </Breadcrumbs>
      </Stacked>

      <Stacked title="Collapsed" description="Long trails collapse behind an ellipsis button.">
        <Breadcrumbs maxItems={3}>
          {["Home", "Content", "Models", "Fields", "Settings"].map((crumb) => (
            <Link key={crumb} underline="hover" color="inherit" href="#">
              {crumb}
            </Link>
          ))}
          <Typography color="text.primary">Current</Typography>
        </Breadcrumbs>
      </Stacked>
    </>
  ),
};

const MenuDemo = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  return (
    <>
      <Button variant="contained" onClick={(e) => setAnchorEl(e.currentTarget)}>
        Open menu
      </Button>
      <Menu anchorEl={anchorEl} open={!!anchorEl} onClose={() => setAnchorEl(null)}>
        <MenuItem onClick={() => setAnchorEl(null)}>
          <ListItemIcon>
            <ContentCut fontSize="small" />
          </ListItemIcon>
          <ListItemText>Cut</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => setAnchorEl(null)}>
          <ListItemIcon>
            <ContentCopy fontSize="small" />
          </ListItemIcon>
          <ListItemText>Copy</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => setAnchorEl(null)}>
          <ListItemIcon>
            <ContentPaste fontSize="small" />
          </ListItemIcon>
          <ListItemText>Paste</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem selected onClick={() => setAnchorEl(null)}>
          <ListItemText>Selected item</ListItemText>
        </MenuItem>
        <MenuItem disabled>
          <ListItemIcon>
            <Delete fontSize="small" />
          </ListItemIcon>
          <ListItemText>Disabled</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
};

export const Menus: Story = {
  render: () => (
    <>
      <Section title="Menu" description="MuiMenu paper + MuiMenuItem states.">
        <MenuDemo />
      </Section>

      <Stacked title="MenuItem, inline" description="Rendered outside a popover to inspect states.">
        <Paper variant="outlined" sx={{ maxWidth: 280, py: 1 }}>
          <MenuItem>Default</MenuItem>
          <MenuItem selected>Selected</MenuItem>
          <MenuItem disabled>Disabled</MenuItem>
          <MenuItem dense>Dense</MenuItem>
        </Paper>
      </Stacked>
    </>
  ),
};

export const SpeedDials: Story = {
  name: "SpeedDial",
  render: () => (
    <Stacked
      title="SpeedDial"
      description="Hover the button to reveal the SpeedDialActions."
    >
      <Box sx={{ position: "relative", height: 320, width: 320 }}>
        <SpeedDial
          ariaLabel="Demo SpeedDial"
          icon={<SpeedDialIcon />}
          sx={{ position: "absolute", bottom: 16, right: 16 }}
        >
          <SpeedDialAction icon={<ContentCopy />} tooltipTitle="Copy" />
          <SpeedDialAction icon={<Share />} tooltipTitle="Share" />
          <SpeedDialAction icon={<Print />} tooltipTitle="Print" />
        </SpeedDial>
      </Box>
    </Stacked>
  ),
};
