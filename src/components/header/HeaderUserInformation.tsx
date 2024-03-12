import Link from "next/link";
import { useUser } from "@/src/hooks/useUser";

type User = {
  userId: number;
  nickname: string;
  profile_image: string;
};

export default function HeaderUserInformation() {
  const { data: user, isLoading, isError } = useUser();

  if (isLoading || isError) return (
    <img
      src="/svg/DefalutImage.svg"
      onClick={() => window.location.href = "/login"}
      className="rounded-full w-10 h-10 mr-2 cursor-pointer"
      alt="Defalut Profile"
    />
  );

  return (
    <Link href={user ? "/profile" : "/login"}>
      <img
        src={user.data.profile_image ? user.data.profile_image : "/svg/DefalutImage.svg"}
        alt="User Profile"
        className="rounded-full w-10 h-10"
      />
    </Link>
  );
}
