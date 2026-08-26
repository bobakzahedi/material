import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Alert,
  AlertTitle,
  Backdrop,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  TextField,
} from "@mui/material";
import { Section, Stacked } from "./StorySection";

/**
 * Covers `MuiAlert`, `MuiBackdrop`, `MuiDialog`, `MuiDialogTitle`,
 * `MuiDialogContent`, `MuiDialogContentText` and `MuiDialogActions`.
 */
const meta: Meta = {
  title: "MUI/Feedback",
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj<typeof meta>;

const SEVERITIES = ["error", "warning", "info", "success"] as const;

export const Alerts: Story = {
  render: () => (
    <>
      <Stacked title="Standard">
        {SEVERITIES.map((severity) => (
          <Alert key={severity} severity={severity}>
            This is a {severity} alert.
          </Alert>
        ))}
      </Stacked>

      <Stacked title="Filled">
        {SEVERITIES.map((severity) => (
          <Alert key={severity} severity={severity} variant="filled">
            This is a filled {severity} alert.
          </Alert>
        ))}
      </Stacked>

      <Stacked title="Outlined">
        {SEVERITIES.map((severity) => (
          <Alert key={severity} severity={severity} variant="outlined">
            This is an outlined {severity} alert.
          </Alert>
        ))}
      </Stacked>

      <Stacked title="With title and action">
        <Alert severity="warning" onClose={() => {}}>
          <AlertTitle>Heads up</AlertTitle>
          An alert with an AlertTitle and a close affordance.
        </Alert>
        <Alert
          severity="info"
          action={
            <Button color="inherit" size="small">
              Undo
            </Button>
          }
        >
          An alert with a custom action.
        </Alert>
      </Stacked>
    </>
  ),
};

const DialogDemo = ({
  label,
  maxWidth,
  withForm = false,
}: {
  label: string;
  maxWidth?: "xs" | "sm" | "md";
  withForm?: boolean;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)}>
        {label}
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth={maxWidth} fullWidth={!!maxWidth}>
        <DialogTitle>Dialog title</DialogTitle>
        <DialogContent>
          <DialogContentText>
            DialogContentText carries the body copy. The theme sets the spacing and type
            treatment for each of these four sub-components independently.
          </DialogContentText>
          {withForm && (
            <Stack spacing={2} sx={{ mt: 2 }}>
              <TextField label="Name" fullWidth />
              <TextField label="Email" fullWidth />
            </Stack>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => setOpen(false)}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export const Dialogs: Story = {
  render: () => (
    <Section title="Dialog" description="Open one to inspect the title / content / actions spacing.">
      <DialogDemo label="Default" />
      <DialogDemo label="Small (xs)" maxWidth="xs" />
      <DialogDemo label="Medium (md)" maxWidth="md" />
      <DialogDemo label="With a form" maxWidth="sm" withForm />
    </Section>
  ),
};

const BackdropDemo = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Show backdrop
      </Button>
      <Backdrop
        open={open}
        onClick={() => setOpen(false)}
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export const Backdrops: Story = {
  name: "Backdrop",
  render: () => (
    <Section title="Backdrop" description="Click anywhere on the overlay to dismiss it.">
      <BackdropDemo />
    </Section>
  ),
};
