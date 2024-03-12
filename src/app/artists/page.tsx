import SearchArtists from "@/src/components/artists-list/SearchArtists";
import PrevBtnTemplate from "@/src/templates/PrevBtnTemplate";

export default function Artists() {
  return (
    <PrevBtnTemplate>
      <div className="flex flex-col p-5 gap-5">
        <div>
          <p className="text-2xl font-semibold pr-2.5 pl-2.5">
            전체 아티스트를<br></br>확인해보세요
          </p>
        </div>
       <SearchArtists />
      </div>
    </PrevBtnTemplate>
  );
}