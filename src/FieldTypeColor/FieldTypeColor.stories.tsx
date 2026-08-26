import { useState, type ChangeEvent } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import FieldTypeColor, { type FieldTypeColorProps } from "./";

/** Colour picker field — pairs a swatch trigger with a text value. */
const meta = {
  title: "Field Types/FieldTypeColor",
  component: FieldTypeColor,
  parameters: { layout: "padded" },
} satisfies Meta<typeof FieldTypeColor>;

export default meta;
type Story = StoryObj<typeof meta>;

const Controlled = (args: FieldTypeColorProps) => {
  const [value, setValue] = useState("");

  return (
    <FieldTypeColor
      {...args}
      value={value}
      onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
    />
  );
};

export const Default: Story = {
  render: (args) => <Controlled {...args} />,
  args: {
    placeholder: "Placeholder Text...",
    label: "Color label",
    helperText: "Color helper text",
  },
};
