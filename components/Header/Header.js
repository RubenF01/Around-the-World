import Link from "next/link";

const Header = () => {
  return (
    <div className="flex justify-between px-16 py-6 shadow-md">
      <Link href="/">
        <h1 className="font-bold cursor-pointer">Around the world!</h1>
      </Link>
    </div>
  );
};

export default Header;
