import Header from "@/src/components/header/Header";

type IMainProps = {
  meta?: React.ReactNode;
  children: React.ReactNode;
};

export default function Main({ meta, children }: IMainProps) {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
}
