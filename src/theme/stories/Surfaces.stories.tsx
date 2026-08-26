import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { ExpandMore, MoreVert } from "@mui/icons-material";
import { Stacked } from "./StorySection";

/**
 * Covers `MuiAccordion`, `MuiCardHeader` and `MuiCardContent`.
 */
const meta: Meta = {
  title: "MUI/Surfaces",
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Accordions: Story = {
  render: () => (
    <Stacked title="Accordion" description="The theme overrides MuiAccordion's border and radius.">
      <div>
        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography>Expanded by default</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2" color="text.secondary">
              AccordionDetails holds the panel body. Note how consecutive accordions collapse
              their shared border.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography>Collapsed</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2" color="text.secondary">
              A second panel, to show the seam between them.
            </Typography>
          </AccordionDetails>
          <AccordionActions>
            <Button size="small">Cancel</Button>
            <Button size="small" variant="contained">
              Save
            </Button>
          </AccordionActions>
        </Accordion>

        <Accordion disabled>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography>Disabled</Typography>
          </AccordionSummary>
        </Accordion>
      </div>
    </Stacked>
  ),
};

export const Cards: Story = {
  render: () => (
    <Stack direction="row" spacing={3} sx={{ flexWrap: "wrap", rowGap: 3 }}>
      <Card sx={{ width: 320 }}>
        <CardHeader
          avatar={<Avatar>Z</Avatar>}
          action={
            <IconButton>
              <MoreVert />
            </IconButton>
          }
          title="CardHeader title"
          subheader="With avatar, action and subheader"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            CardContent carries the body. The theme sets padding on both CardHeader and
            CardContent independently, so this story shows them together.
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Action</Button>
          <Button size="small">Another</Button>
        </CardActions>
      </Card>

      <Card sx={{ width: 320 }} variant="outlined">
        <CardHeader title="Outlined variant" subheader="No avatar or action" />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            The same card as an outlined surface.
          </Typography>
        </CardContent>
      </Card>

      <Card sx={{ width: 320 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Content only
          </Typography>
          <Typography variant="body2" color="text.secondary">
            A card with no CardHeader, to check CardContent's padding on its own.
          </Typography>
        </CardContent>
      </Card>
    </Stack>
  ),
};
