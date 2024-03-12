import Link from "next/link";
import '../../styles/MainPage.css'
import { Performance } from "../../types/performance";
import DateLabel from "@/src/components/artist-detail/DateLabel.component";

type Props = {
  post: Performance;
};

export default function PostCard({ post }: Props) {
  return (
    <Link href={`/concerts/${post.performance_id}`}>
      <article className='flex flex-col' style={{ margin: '1vh', cursor: 'pointer' }}>
        <img src={post.photo} alt={post.name} className="poster-image"
             style={{ borderRadius: '10px', objectFit: 'cover', height: '280px', padding: '1px' }}
        />
        <div className="w-full px-2.5">
          <p className="text-sm line-clamp-2 overflow-ellipsis mt-1.5">{post.name}</p>
          <p className="text-sm line-clamp-1 overflow-ellipsis text-[#A5A5A5]">{post.artist_name}</p>
          <div className="flex items-center justify-start gap-1.5">
            <DateLabel label="공연" />
            <p className="text-sm text-[#A5A5A5]">{post.date.split(' ')[0].replace(/-/g, '.')}</p>
          </div>
        </div>
      </article>
    </Link>
  );
}
