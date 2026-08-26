import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Autocomplete,
  Button,
  ButtonGroup,
  Checkbox,
  Fab,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Radio,
  RadioGroup,
  Select,
  Slider,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { Add, Edit, FormatBold, FormatItalic, FormatUnderlined, Search } from "@mui/icons-material";
import { Section, Stacked } from "./StorySection";

/**
 * Every input component the Zesty theme restyles, in one place. These are
 * plain MUI components — nothing is wrapped. If a `styleOverrides` block in
 * `theme/index.tsx` changes, it shows up here.
 *
 * Covers `MuiButton`, `MuiButtonGroup`, `MuiIconButton`, `MuiFab`,
 * `MuiCheckbox`, `MuiSlider`, `MuiSelect`, `MuiToggleButton(Group)`,
 * `MuiAutocomplete`, `MuiInputBase`, `MuiOutlinedInput`, `MuiInputLabel`,
 * `MuiInputAdornment`, `MuiFormLabel` and `MuiFormHelperText`.
 */
const meta: Meta = {
  title: "MUI/Inputs",
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj<typeof meta>;

const COLORS = ["primary", "secondary", "success", "error", "warning", "info"] as const;

export const Buttons: Story = {
  render: () => (
    <>
      <Section title="Variants">
        <Button variant="contained">Contained</Button>
        <Button variant="outlined">Outlined</Button>
        <Button variant="text">Text</Button>
      </Section>

      <Section
        title="Sizes"
        description="Includes xsmall, which this library adds to MUI's set via module augmentation."
      >
        {(["xsmall", "small", "medium", "large"] as const).map((size) => (
          <Button key={size} variant="contained" size={size}>
            {size}
          </Button>
        ))}
      </Section>

      <Section title="Colors">
        {COLORS.map((color) => (
          <Button key={color} variant="contained" color={color}>
            {color}
          </Button>
        ))}
      </Section>

      <Section title="States">
        <Button variant="contained" disabled>
          Disabled
        </Button>
        <Button variant="outlined" disabled>
          Disabled
        </Button>
        <Button variant="contained" startIcon={<Add />}>
          With icon
        </Button>
        <Button variant="contained" fullWidth sx={{ maxWidth: 240 }}>
          Full width
        </Button>
      </Section>

      <Section title="ButtonGroup">
        <ButtonGroup variant="contained">
          <Button>One</Button>
          <Button>Two</Button>
          <Button>Three</Button>
        </ButtonGroup>
        <ButtonGroup variant="outlined" orientation="vertical">
          <Button>One</Button>
          <Button>Two</Button>
        </ButtonGroup>
      </Section>
    </>
  ),
};

export const IconButtons: Story = {
  name: "IconButton & Fab",
  render: () => (
    <>
      <Section title="IconButton sizes">
        {(["small", "medium", "large"] as const).map((size) => (
          <IconButton key={size} size={size} color="primary">
            <Edit fontSize="inherit" />
          </IconButton>
        ))}
      </Section>

      <Section title="IconButton colors">
        {COLORS.map((color) => (
          <IconButton key={color} color={color}>
            <Edit />
          </IconButton>
        ))}
      </Section>

      <Section title="Fab">
        <Fab color="primary" size="small">
          <Add />
        </Fab>
        <Fab color="primary" size="medium">
          <Add />
        </Fab>
        <Fab color="secondary">
          <Add />
        </Fab>
        <Fab variant="extended" color="primary">
          <Add sx={{ mr: 1 }} />
          Extended
        </Fab>
      </Section>
    </>
  ),
};

export const TextFields: Story = {
  name: "TextField & OutlinedInput",
  render: () => (
    <>
      <Stacked
        title="TextField"
        description="Exercises MuiInputBase, MuiOutlinedInput, MuiInputLabel, MuiFormHelperText."
      >
        <TextField label="Default" placeholder="Placeholder" />
        <TextField label="Small" size="small" placeholder="Placeholder" />
        <TextField label="With helper text" helperText="Helper text" />
        <TextField label="Error" error helperText="Something went wrong" />
        <TextField label="Disabled" disabled placeholder="Disabled" />
        <TextField label="Required" required />
        <TextField label="Multiline" multiline rows={3} />
      </Stacked>

      <Stacked title="InputAdornment">
        <TextField
          label="Search"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Search fontSize="small" />
                </InputAdornment>
              ),
            },
          }}
        />
        <TextField
          label="Amount"
          slotProps={{
            input: {
              startAdornment: <InputAdornment position="start">$</InputAdornment>,
              endAdornment: <InputAdornment position="end">USD</InputAdornment>,
            },
          }}
        />
      </Stacked>

      <Stacked title="OutlinedInput (standalone)">
        <FormControl>
          <InputLabel htmlFor="outlined-standalone">Label</InputLabel>
          <OutlinedInput id="outlined-standalone" label="Label" placeholder="Placeholder" />
          <FormHelperText>Helper text from FormHelperText</FormHelperText>
        </FormControl>
      </Stacked>
    </>
  ),
};

const SelectDemo = () => {
  const [value, setValue] = useState("one");
  return (
    <FormControl sx={{ minWidth: 220 }}>
      <InputLabel id="select-demo-label">Label</InputLabel>
      <Select
        labelId="select-demo-label"
        label="Label"
        value={value}
        onChange={(e) => setValue(String(e.target.value))}
      >
        <MenuItem value="one">Option one</MenuItem>
        <MenuItem value="two">Option two</MenuItem>
        <MenuItem value="three">Option three</MenuItem>
        <MenuItem value="four" disabled>
          Disabled option
        </MenuItem>
      </Select>
      <FormHelperText>MuiSelect + MuiMenuItem</FormHelperText>
    </FormControl>
  );
};

export const Selects: Story = {
  name: "Select & Autocomplete",
  render: () => (
    <>
      <Section title="Select">
        <SelectDemo />
        <FormControl size="small" sx={{ minWidth: 220 }}>
          <InputLabel id="select-small-label">Small</InputLabel>
          <Select labelId="select-small-label" label="Small" value="one">
            <MenuItem value="one">Option one</MenuItem>
          </Select>
        </FormControl>
      </Section>

      <Section title="Autocomplete">
        <Autocomplete
          sx={{ width: 260 }}
          options={["Alpha", "Bravo", "Charlie", "Delta", "Echo"]}
          renderInput={(params) => <TextField {...params} label="Single" />}
        />
        <Autocomplete
          multiple
          sx={{ width: 320 }}
          defaultValue={["Alpha", "Bravo"]}
          options={["Alpha", "Bravo", "Charlie", "Delta", "Echo"]}
          renderInput={(params) => <TextField {...params} label="Multiple (chips)" />}
        />
      </Section>
    </>
  ),
};

const ToggleDemo = () => {
  const [formats, setFormats] = useState<string[]>(["bold"]);
  const [alignment, setAlignment] = useState("left");

  return (
    <Stack spacing={3}>
      <ToggleButtonGroup
        value={formats}
        onChange={(_e, next: string[]) => setFormats(next)}
      >
        <ToggleButton value="bold">
          <FormatBold />
        </ToggleButton>
        <ToggleButton value="italic">
          <FormatItalic />
        </ToggleButton>
        <ToggleButton value="underlined">
          <FormatUnderlined />
        </ToggleButton>
      </ToggleButtonGroup>

      <ToggleButtonGroup
        exclusive
        size="small"
        value={alignment}
        onChange={(_e, next: string | null) => next && setAlignment(next)}
      >
        <ToggleButton value="left">Left</ToggleButton>
        <ToggleButton value="center">Center</ToggleButton>
        <ToggleButton value="right">Right</ToggleButton>
      </ToggleButtonGroup>
    </Stack>
  );
};

export const Selection: Story = {
  name: "Checkbox, Radio & Toggle",
  render: () => (
    <>
      <Section title="Checkbox">
        <FormControlLabel control={<Checkbox defaultChecked />} label="Checked" />
        <FormControlLabel control={<Checkbox />} label="Unchecked" />
        <FormControlLabel control={<Checkbox indeterminate />} label="Indeterminate" />
        <FormControlLabel control={<Checkbox disabled />} label="Disabled" />
        <FormControlLabel control={<Checkbox size="small" defaultChecked />} label="Small" />
        <FormControlLabel
          control={<Checkbox defaultChecked color="success" />}
          label="Success"
        />
      </Section>

      <Section title="Radio">
        <FormControl>
          <FormLabel id="radio-demo">FormLabel</FormLabel>
          <RadioGroup row aria-labelledby="radio-demo" defaultValue="a">
            <FormControlLabel value="a" control={<Radio />} label="A" />
            <FormControlLabel value="b" control={<Radio />} label="B" />
            <FormControlLabel value="c" control={<Radio />} label="C" disabled />
          </RadioGroup>
          <FormHelperText>MuiFormLabel + MuiFormHelperText</FormHelperText>
        </FormControl>
      </Section>

      <Stacked title="ToggleButtonGroup">
        <ToggleDemo />
      </Stacked>
    </>
  ),
};

export const Sliders: Story = {
  render: () => (
    <Stack spacing={5} sx={{ maxWidth: 420, pt: 2 }}>
      <Stack spacing={1}>
        <Typography variant="body2" color="text.secondary">
          Default
        </Typography>
        <Slider defaultValue={40} />
      </Stack>
      <Stack spacing={1}>
        <Typography variant="body2" color="text.secondary">
          Range, with marks and always-visible label
        </Typography>
        <Slider
          defaultValue={[20, 70]}
          valueLabelDisplay="on"
          marks={[
            { value: 0, label: "0" },
            { value: 50, label: "50" },
            { value: 100, label: "100" },
          ]}
        />
      </Stack>
      <Stack spacing={1}>
        <Typography variant="body2" color="text.secondary">
          Small / disabled
        </Typography>
        <Slider size="small" defaultValue={30} />
        <Slider defaultValue={30} disabled />
      </Stack>
    </Stack>
  ),
};
