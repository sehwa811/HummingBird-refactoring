import HeaderHeartConcert from "../components/header/HeaderHeartConcert";

interface IHeaderHeartBtn {
  performanceId: number;
  isHearted: boolean;
  isAlarmed: boolean;
  children: React.ReactNode;
}

export default function ConcertDetailPageTemplate({
  children,
  performanceId,
  isHearted,
  isAlarmed
}: IHeaderHeartBtn) {
  return (
    <div>
      <HeaderHeartConcert performanceId={performanceId} isAlarmed={isAlarmed} isHearted={isHearted} />
      {children}
    </div>
  );
}
