import type { Meta, StoryObj } from "@storybook/react-vite";
import { Box, Divider, Paper, ScopedCssBaseline, Stack, Typography } from "@mui/material";
import { Stacked } from "./StorySection";

/**
 * Covers `MuiCssBaseline` and `MuiScopedCssBaseline` — the global element
 * resets the theme applies. `CssBaseline` is already mounted by the Storybook
 * preview decorator, so what you see below is it doing its job.
 */
const meta: Meta = {
  title: "MUI/Baseline",
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const GlobalReset: Story = {
  name: "CssBaseline",
  render: () => (
    <>
      <Stacked
        title="Bare HTML elements"
        description="No MUI components here — every style below comes from the MuiCssBaseline overrides and the theme's typography defaults."
      >
        <Paper variant="outlined" sx={{ p: 3 }}>
          <h1>h1 — heading element</h1>
          <h2>h2 — heading element</h2>
          <h3>h3 — heading element</h3>
          <p>
            A paragraph of body copy, with an <a href="#">anchor element</a>, some{" "}
            <strong>bold text</strong> and some <em>emphasised text</em>.
          </p>
          <ul>
            <li>An unordered list item</li>
            <li>A second item</li>
          </ul>
          <blockquote>A blockquote element.</blockquote>
          <pre>
            <code>const code = "a pre &gt; code block";</code>
          </pre>
          <hr />
          <small>Small text</small>
        </Paper>
      </Stacked>

      <Stacked title="Font stack">
        <Typography variant="body2" color="text.secondary">
          The theme sets Mulish as the family. `preview-head.html` loads it from Google Fonts —
          if this renders as a system sans-serif, that stylesheet failed.
        </Typography>
        <Typography sx={{ fontSize: 24 }}>
          Mulish — ABCDEFGHIJKLM abcdefghijklm 0123456789
        </Typography>
        <Stack direction="row" spacing={3} sx={{ flexWrap: "wrap", rowGap: 1 }}>
          {[300, 400, 500, 600, 700, 800].map((weight) => (
            <Typography key={weight} sx={{ fontWeight: weight }}>
              {weight}
            </Typography>
          ))}
        </Stack>
      </Stacked>
    </>
  ),
};

export const Scoped: Story = {
  name: "ScopedCssBaseline",
  render: () => (
    <Stacked
      title="ScopedCssBaseline"
      description="Applies the same reset to a subtree only — used when this library is embedded in a host app that owns the global styles."
    >
      <Stack direction="row" spacing={3} sx={{ alignItems: "flex-start", flexWrap: "wrap", rowGap: 3 }}>
        <Paper variant="outlined" sx={{ flex: "1 1 260px", minWidth: 260 }}>
          <Box sx={{ px: 2, py: 1 }}>
            <Typography variant="caption" color="text.secondary">
              Inside ScopedCssBaseline
            </Typography>
          </Box>
          <Divider />
          <ScopedCssBaseline sx={{ p: 2 }}>
            <h3>A heading</h3>
            <p>Paragraph text, reset by the scoped baseline.</p>
          </ScopedCssBaseline>
        </Paper>

        <Paper variant="outlined" sx={{ flex: "1 1 260px", minWidth: 260 }}>
          <Box sx={{ px: 2, py: 1 }}>
            <Typography variant="caption" color="text.secondary">
              Reference (global baseline only)
            </Typography>
          </Box>
          <Divider />
          <Box sx={{ p: 2 }}>
            <h3>A heading</h3>
            <p>Paragraph text.</p>
          </Box>
        </Paper>
      </Stack>
    </Stacked>
  ),
};
