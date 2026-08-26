import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Box, Chip, Paper, Stack, Typography } from "@mui/material";
import { DataGridPro, type GridColDef } from "@mui/x-data-grid-pro";
// The pro package re-exports the community pickers wholesale, so DateCalendar
// and DatePicker come from the same entry point as DateRangePicker.
import {
  DateCalendar,
  DatePicker,
  DateRangePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers-pro";
import { AdapterDateFns } from "@mui/x-date-pickers-pro/AdapterDateFns";
import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView";
import { TreeItem } from "@mui/x-tree-view/TreeItem";
import { Stacked } from "./StorySection";

/**
 * The MUI X components the theme restyles: `MuiDataGrid`, `MuiPickersDay` and
 * `MuiTreeItem`.
 *
 * **Note:** DataGrid Pro and the Pro pickers render a "MUI X Missing license
 * key" watermark in development. That is expected here and is not a theme bug.
 */
const meta: Meta = {
  title: "MUI/MUI X",
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj<typeof meta>;

const columns: GridColDef[] = [
  { field: "name", headerName: "Name", flex: 1, minWidth: 160 },
  { field: "model", headerName: "Model", width: 140 },
  {
    field: "status",
    headerName: "Status",
    width: 130,
    renderCell: (params) => (
      <Chip
        size="small"
        label={String(params.value)}
        color={params.value === "Published" ? "success" : "warning"}
      />
    ),
  },
  { field: "version", headerName: "Version", type: "number", width: 100 },
  { field: "updated", headerName: "Updated", width: 140 },
];

const rows = [
  { id: 1, name: "Homepage", model: "page", status: "Published", version: 12, updated: "2 hours ago" },
  { id: 2, name: "About us", model: "page", status: "Draft", version: 3, updated: "Yesterday" },
  { id: 3, name: "Pricing", model: "page", status: "Published", version: 8, updated: "3 days ago" },
  { id: 4, name: "Blog index", model: "listing", status: "Published", version: 21, updated: "Last week" },
  { id: 5, name: "Contact", model: "page", status: "Draft", version: 1, updated: "Last week" },
  { id: 6, name: "Careers", model: "page", status: "Published", version: 5, updated: "2 weeks ago" },
];

export const DataGrid: Story = {
  render: () => (
    <Stacked
      title="DataGridPro"
      description="Header, cell, row-hover and footer styling all come from the MuiDataGrid overrides."
    >
      <Box sx={{ height: 420, width: "100%", maxWidth: 900 }}>
        <DataGridPro
          rows={rows}
          columns={columns}
          checkboxSelection
          disableRowSelectionOnClick
          initialState={{ pagination: { paginationModel: { pageSize: 5 } } }}
          pageSizeOptions={[5, 10]}
          pagination
        />
      </Box>
    </Stacked>
  ),
};

const PickerDemo = () => {
  const [value, setValue] = useState<Date | null>(new Date(2026, 7, 26));

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack direction="row" spacing={4} sx={{ flexWrap: "wrap", rowGap: 4 }}>
        <Stack spacing={1}>
          <Typography variant="body2" color="text.secondary">
            DateCalendar — shows MuiPickersDay directly
          </Typography>
          <Paper variant="outlined">
            <DateCalendar value={value} onChange={setValue} />
          </Paper>
        </Stack>

        <Stack spacing={2} sx={{ minWidth: 260 }}>
          <Typography variant="body2" color="text.secondary">
            In a popover
          </Typography>
          <DatePicker label="Date" value={value} onChange={setValue} />
          <DateRangePicker localeText={{ start: "From", end: "To" }} />
        </Stack>
      </Stack>
    </LocalizationProvider>
  );
};

export const Pickers: Story = {
  name: "Date Pickers",
  render: () => (
    <Stacked
      title="PickersDay"
      description="Selected, today and disabled day states are themed via MuiPickersDay."
    >
      <PickerDemo />
    </Stacked>
  ),
};

export const Tree: Story = {
  name: "TreeView",
  render: () => (
    <Stacked title="SimpleTreeView" description="Item spacing and selection come from MuiTreeItem.">
      <Paper variant="outlined" sx={{ p: 2, maxWidth: 360 }}>
        <SimpleTreeView defaultExpandedItems={["content", "pages"]}>
          <TreeItem itemId="content" label="Content">
            <TreeItem itemId="pages" label="Pages">
              <TreeItem itemId="home" label="Homepage" />
              <TreeItem itemId="about" label="About us" />
              <TreeItem itemId="pricing" label="Pricing" />
            </TreeItem>
            <TreeItem itemId="listings" label="Listings">
              <TreeItem itemId="blog" label="Blog index" />
            </TreeItem>
          </TreeItem>
          <TreeItem itemId="media" label="Media">
            <TreeItem itemId="images" label="Images" />
            <TreeItem itemId="files" label="Files" />
          </TreeItem>
          <TreeItem itemId="code" label="Code" />
        </SimpleTreeView>
      </Paper>
    </Stacked>
  ),
};
