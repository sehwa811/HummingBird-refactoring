import Link from "next/link";
import "../../styles/MainPage.css";
import { Performance } from "../../types/performance";

type Props = {
  post: Performance;
};

export default function MainPostCard({ post }: Props) {
  return (
    <div>
      <Link href={`/concerts/${post.performance_id}`}>
        <article className="main-post-container">
          <img src={post.photo} alt={post.name} className="main-poster-image" />
          <br />
        </article>
      </Link>
    </div>
  );
}
