import type { WheelPickerOption } from "@/components/wheel-picker";
import { WheelPicker, WheelPickerWrapper } from "@/components/wheel-picker";

const options: WheelPickerOption[] = [
  {
    label: "Vite",
    value: "vite",
  },
  {
    label: "Laravel",
    value: "laravel",
  },
  {
    label: "React Router",
    value: "react-router",
  },
  {
    label: "Next.js",
    value: "nextjs",
  },
  {
    label: "Astro",
    value: "astro",
  },
  {
    label: "TanStack Start",
    value: "tanstack-start",
  },
  {
    label: "TanStack Router",
    value: "tanstack-router",
  },
  {
    label: "Gatsby",
    value: "gatsby",
  },
];

export function SimplePickerDemo() {
  return (
    <WheelPickerWrapper className="mx-auto max-w-64">
      <WheelPicker options={options} defaultValue="nextjs" />
    </WheelPickerWrapper>
  );
}
