import Image from "next/image";

const Logo = () => {
  return (
    <Image
      priority
      width={60}
      height={60}
      src="/logo2.png"
      alt="Junaid Tariq - logo"
      className="h-14 w-14 object-contain animate-spin"
    />
  );
};

export default Logo;