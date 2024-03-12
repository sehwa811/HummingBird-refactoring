import HeaderHeartBtn from "@/src/components/header/HeaderHeartArtist";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {/* <HeaderHeartBtn /> */}
      {children}
    </div>
  );
}
