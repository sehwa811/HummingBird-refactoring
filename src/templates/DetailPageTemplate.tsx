import HeaderHeartArtist from "../components/header/HeaderHeartArtist";

interface IHeaderHeartBtn {
  artistId: string;
  isHearted: boolean;
  isAlarmed: boolean;
  children: React.ReactNode;
}

export default function DetailPageTemplate({
  children,
  artistId,
  isHearted,
  isAlarmed
}: IHeaderHeartBtn) {
  return (
    <div>
      <HeaderHeartArtist artistId={artistId} isHearted={isHearted} isAlarmed={isAlarmed} />
      {children}
    </div>
  );
}
