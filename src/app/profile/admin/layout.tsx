import Header from "@/src/components/header/Header";
import HeaderPrevBtn from "@/src/components/header/HeaderPrevBtn";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {children}
    </div>
  );
}
