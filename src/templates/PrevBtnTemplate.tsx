import HeaderPrevBtn from "../components/header/HeaderPrevBtn";

export default function PrevBtnTemplate({ children }: { children: React.ReactNode }) {
    return (
      <div>
        <HeaderPrevBtn/>
        {children}
      </div>
    );
  }
