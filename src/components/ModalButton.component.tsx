type normalButtonProps = {
  title: string;
  type?: string;
  completeHandler?(): void;
};

export default function ModalButton({
  title,
  type,
  completeHandler,
}: normalButtonProps) {
  return (
    <button
      onClick={completeHandler}
      className={`${
        type === "cancel"
          ? "bg-[#F6F6F6] text-[#A5A5A5]"
          : "bg-[#AB74FF] text-white"
      } w-full h-9 text-base py-[15px] flex items-center justify-center bg-[#AB74FF] rounded-[100px]`}
    >
      {title}
    </button>
  );
}
