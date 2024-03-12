export default function DateLabel({ label }: { label: "공연" | "티켓팅" }) {
  return (
    <div
      className={`px-[8px] py-[2px] text-[10px] w-fit rounded-[4px] ${
        label === "공연"
          ? "bg-[#F5EFFF] text-[#AB74FF]"
          : "bg-[#DEF1FF] text-[#43AAF6]"
      }`}
    >
      {label}
    </div>
  );
}
