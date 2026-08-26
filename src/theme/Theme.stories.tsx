import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Box,
  Divider,
  Paper,
  Stack,
  Typography,
  useTheme,
  type Theme,
} from "@mui/material";

/**
 * A living reference for the exported `theme` and `darkTheme`. Use the Theme
 * control in the toolbar to switch between them — everything on this page
 * reads from whichever theme is active.
 */
const meta = {
  title: "Theme",
  parameters: { layout: "fullscreen" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const isColor = (value: unknown): value is string =>
  typeof value === "string" &&
  /^(#|rgb|hsl)/.test(value.trim());

const Swatch = ({ name, value }: { name: string; value: string }) => (
  <Stack spacing={0.5} sx={{ minWidth: 92 }}>
    <Box
      sx={{
        height: 48,
        borderRadius: 1,
        bgcolor: value,
        border: 1,
        borderColor: "divider",
      }}
    />
    <Typography variant="caption" sx={{ fontWeight: 600 }}>
      {name}
    </Typography>
    <Typography variant="caption" color="text.secondary">
      {value}
    </Typography>
  </Stack>
);

const PaletteGroup = ({
  name,
  group,
}: {
  name: string;
  group: Record<string, unknown>;
}) => {
  const swatches = Object.entries(group).filter(([, v]) => isColor(v));
  if (swatches.length === 0) return null;

  return (
    <Stack spacing={1}>
      <Typography variant="h6">{name}</Typography>
      <Stack direction="row" spacing={1.5} sx={{ flexWrap: "wrap", rowGap: 1.5 }}>
        {swatches.map(([key, value]) => (
          <Swatch key={key} name={key} value={value as string} />
        ))}
      </Stack>
    </Stack>
  );
};

/** Every colour group on the palette, including the Zesty brand scales. */
export const Palette: Story = {
  render: () => {
    const theme = useTheme<Theme>();
    const groups = Object.entries(theme.palette).filter(
      ([, value]) => value && typeof value === "object"
    ) as Array<[string, Record<string, unknown>]>;

    return (
      <Stack spacing={4} divider={<Divider flexItem />}>
        {groups.map(([name, group]) => (
          <PaletteGroup key={name} name={name} group={group} />
        ))}
      </Stack>
    );
  },
};

const VARIANTS = [
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "subtitle1",
  "subtitle2",
  "body1",
  "body2",
  "body3",
  "button",
  "caption",
  "overline",
] as const;

/** The type scale, including the custom `body3` variant this library adds. */
export const Typographies: Story = {
  name: "Typography",
  render: () => {
    const theme = useTheme<Theme>();

    return (
      <Stack spacing={3} divider={<Divider flexItem />}>
        {VARIANTS.map((variant) => {
          const style = (theme.typography as Record<string, any>)[variant] ?? {};
          return (
            <Stack key={variant} spacing={0.5}>
              <Typography variant="caption" color="text.secondary">
                {variant} — {style.fontSize ?? "inherit"} / {style.lineHeight ?? "inherit"}
              </Typography>
              <Typography variant={variant}>
                The quick brown fox jumps over the lazy dog
              </Typography>
            </Stack>
          );
        })}
      </Stack>
    );
  },
};

/** Border radii, elevations and spacing as configured in `theme/index.tsx`. */
export const Shape: Story = {
  render: () => {
    const theme = useTheme<Theme>();

    return (
      <Stack spacing={4}>
        <Stack spacing={1}>
          <Typography variant="h6">Border radius</Typography>
          <Typography variant="body2" color="text.secondary">
            theme.shape.borderRadius = {String(theme.shape.borderRadius)}
          </Typography>
        </Stack>

        <Stack spacing={1}>
          <Typography variant="h6">Elevation</Typography>
          <Stack direction="row" spacing={2} sx={{ flexWrap: "wrap", rowGap: 2 }}>
            {[0, 1, 2, 3, 4, 6, 8, 12, 16, 24].map((elevation) => (
              <Paper
                key={elevation}
                elevation={elevation}
                sx={{
                  width: 88,
                  height: 64,
                  display: "grid",
                  placeItems: "center",
                }}
              >
                <Typography variant="caption">{elevation}</Typography>
              </Paper>
            ))}
          </Stack>
        </Stack>

        <Stack spacing={1}>
          <Typography variant="h6">Spacing</Typography>
          <Stack spacing={1}>
            {[1, 2, 3, 4, 6, 8].map((step) => (
              <Stack key={step} direction="row" spacing={2} alignItems="center">
                <Typography variant="caption" sx={{ width: 64 }}>
                  {step} ({theme.spacing(step)})
                </Typography>
                <Box sx={{ height: 12, width: theme.spacing(step), bgcolor: "primary.main", borderRadius: 0.5 }} />
              </Stack>
            ))}
          </Stack>
        </Stack>
      </Stack>
    );
  },
};

/** The whole theme object, for when you need to look up an exact token. */
export const Raw: Story = {
  render: () => {
    const theme = useTheme<Theme>();

    return (
      <Box
        component="pre"
        sx={{
          m: 0,
          p: 2,
          borderRadius: 1,
          border: 1,
          borderColor: "divider",
          bgcolor: "background.paper",
          fontSize: 12,
          lineHeight: 1.6,
          overflow: "auto",
          maxHeight: "80vh",
        }}
      >
        {JSON.stringify(
          theme,
          (_key, value) => (typeof value === "function" ? "[Function]" : value),
          2
        )}
      </Box>
    );
  },
};
