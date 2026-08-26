import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Avatar,
  Chip,
  Divider,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { Delete, Folder, InsertDriveFile, Settings } from "@mui/icons-material";
import { Section, Stacked } from "./StorySection";

/**
 * Covers `MuiChip`, `MuiDivider`, `MuiLink`, `MuiTooltip`, `MuiListItem`,
 * `MuiListItemButton` and `MuiListItemText`.
 */
const meta: Meta = {
  title: "MUI/Data Display",
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj<typeof meta>;

const COLORS = ["default", "primary", "secondary", "success", "error", "warning", "info"] as const;

export const Chips: Story = {
  render: () => (
    <>
      <Section title="Filled">
        {COLORS.map((color) => (
          <Chip key={color} label={color} color={color} />
        ))}
      </Section>

      <Section title="Outlined">
        {COLORS.map((color) => (
          <Chip key={color} label={color} color={color} variant="outlined" />
        ))}
      </Section>

      <Section title="Sizes and content">
        <Chip label="Small" size="small" color="primary" />
        <Chip label="Medium" color="primary" />
        <Chip label="With avatar" avatar={<Avatar>Z</Avatar>} />
        <Chip label="With icon" icon={<Settings />} color="primary" />
        <Chip label="Deletable" onDelete={() => {}} color="primary" />
        <Chip label="Custom delete" onDelete={() => {}} deleteIcon={<Delete />} />
        <Chip label="Clickable" onClick={() => {}} />
        <Chip label="Disabled" disabled />
      </Section>
    </>
  ),
};

export const Dividers: Story = {
  render: () => (
    <>
      <Stacked title="Horizontal">
        <Paper variant="outlined" sx={{ p: 2 }}>
          <Typography variant="body2">Above</Typography>
          <Divider sx={{ my: 2 }} />
          <Typography variant="body2">Below</Typography>
          <Divider sx={{ my: 2 }}>With text</Divider>
          <Typography variant="body2">After a labelled divider</Typography>
        </Paper>
      </Stacked>

      <Section title="Vertical">
        <Stack
          direction="row"
          spacing={2}
          sx={{ height: 48 }}
          divider={<Divider orientation="vertical" flexItem />}
        >
          <Typography variant="body2">One</Typography>
          <Typography variant="body2">Two</Typography>
          <Typography variant="body2">Three</Typography>
        </Stack>
      </Section>
    </>
  ),
};

export const Links: Story = {
  render: () => (
    <>
      <Section title="Underline behaviour">
        {(["always", "hover", "none"] as const).map((underline) => (
          <Link key={underline} href="#" underline={underline}>
            underline=&ldquo;{underline}&rdquo;
          </Link>
        ))}
      </Section>

      <Section title="Colors">
        <Link href="#">Default</Link>
        <Link href="#" color="secondary">
          Secondary
        </Link>
        <Link href="#" color="error">
          Error
        </Link>
      </Section>

      <Stacked title="Inline in body copy">
        <Typography variant="body1">
          Links inherit the surrounding type scale, so a <Link href="#">link in body1</Link> sits
          on the same baseline as its paragraph.
        </Typography>
        <Typography variant="body2">
          The same <Link href="#">link in body2</Link>, one step down.
        </Typography>
      </Stacked>
    </>
  ),
};

export const Tooltips: Story = {
  render: () => (
    <Section title="Placement" description="MuiTooltip is restyled to the brand palette.">
      {(["top", "bottom", "left", "right"] as const).map((placement) => (
        <Tooltip key={placement} title={`Tooltip on ${placement}`} placement={placement} arrow>
          <Chip label={placement} onClick={() => {}} />
        </Tooltip>
      ))}
      <Tooltip title="No arrow">
        <Chip label="no arrow" onClick={() => {}} />
      </Tooltip>
      <Tooltip title="Always open" open placement="bottom">
        <Chip label="open" />
      </Tooltip>
    </Section>
  ),
};

export const Lists: Story = {
  render: () => (
    <Stack direction="row" spacing={4} sx={{ flexWrap: "wrap", rowGap: 4 }}>
      <Paper variant="outlined" sx={{ width: 280 }}>
        <List>
          <ListItem>
            <ListItemText primary="Plain ListItem" secondary="with secondary text" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Primary only" />
          </ListItem>
          <ListItem
            secondaryAction={
              <Chip size="small" label="12" />
            }
          >
            <ListItemText primary="With secondaryAction" />
          </ListItem>
        </List>
      </Paper>

      <Paper variant="outlined" sx={{ width: 280 }}>
        <List>
          <ListItemButton selected>
            <ListItemIcon>
              <Folder />
            </ListItemIcon>
            <ListItemText primary="Selected" secondary="ListItemButton" />
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <InsertDriveFile />
            </ListItemIcon>
            <ListItemText primary="Default" />
          </ListItemButton>
          <ListItemButton disabled>
            <ListItemIcon>
              <Settings />
            </ListItemIcon>
            <ListItemText primary="Disabled" />
          </ListItemButton>
        </List>
      </Paper>
    </Stack>
  ),
};
