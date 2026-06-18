import Image from "next/image";

const Logo = () => {
  return (
    <Image
      priority
      width={1000}
      height={1000}
      src="/images/logo.png"
      alt="Junaid Tariq - logo"
      className="h-[48px] w-[170px] object-contain"
    />
  );
};

export default Logo;
