export interface IUserProfile {
  image: string;
  nickName: string;
}

export default function ProfileImage({ image, nickName }: IUserProfile) {
  return (
    <div className="flex flex-col items-center justify-items-center gap-5 py-10">
      <div className="w-[120px] h-[120px] rounded-[100px] flex items-center justify-center">
        {image ? (
          <img className="object-contain rounded-[100px]" src={image} />
        ) : (
          <img className="object-contain rounded-[100px]" src="/svg/DefalutImage.svg" alt="camera" />
        )}
      </div>
      <p className="w-fit">{nickName}</p>
    </div>
  );
}
