import Image from "next/image";

const Logo = () => {
  return (
    <Image
      priority
      width={1000}
      height={1000}
      src="/logo2.png"
      alt="Junaid Tariq - logo"
      className="h-[65px] w-[180px] object-contain animate-spin"
    />
  );
};

export default Logo;
