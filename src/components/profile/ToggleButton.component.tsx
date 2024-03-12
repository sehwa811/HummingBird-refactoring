"use client";

type toggleButtonProps = {
  title: string;
  isActive: boolean;
  onClick(e: React.MouseEvent): void;
};

export default function ToggleButton({
  title,
  isActive,
  onClick,
}: toggleButtonProps) {
  return (
    <button
      className={`text-sm py-1.5 px-2.5 rounded-[100px] ${
        isActive ? "bg-[#AB74FF] text-[white]" : "bg-none text-[#A5A5A5]"
      }`}
      onClick={onClick}
    >
      {title}
    </button>
  );
}
