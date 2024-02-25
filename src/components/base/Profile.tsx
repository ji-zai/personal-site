import Image from "next/image";

export const Profile = (props: { width?: number }) => (
  <Image
    src="/images/profile.png"
    alt="profile"
    width={`${props.width || 45}`}
    height={`${props.width || 45}`}
    style={{ borderRadius: "50%" }}
  />
);
