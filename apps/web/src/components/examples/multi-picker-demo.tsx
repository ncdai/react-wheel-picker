import type { WheelPickerOption } from "@/components/wheel-picker";
import { WheelPicker, WheelPickerWrapper } from "@/components/wheel-picker";

const createArray = (length: number, add = 0): WheelPickerOption[] =>
  Array.from({ length }, (_, i) => {
    const value = i + add;
    return {
      label: value.toString().padStart(2, "0"),
      value: value.toString(),
    };
  });

const hourOptions = createArray(12, 1);
const minuteOptions = createArray(60);
const meridiemOptions: WheelPickerOption[] = [
  { label: "AM", value: "AM" },
  { label: "PM", value: "PM" },
];

export function MultiPickerDemo() {
  return (
    <div className="mx-auto w-64">
      <WheelPickerWrapper>
        <WheelPicker options={hourOptions} defaultValue="9" infinite />
        <WheelPicker options={minuteOptions} defaultValue="41" infinite />
        <WheelPicker options={meridiemOptions} defaultValue="AM" />
      </WheelPickerWrapper>
    </div>
  );
}
