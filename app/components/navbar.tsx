import Image from "next/image";
import Link from "next/link";

function Navbar() {
  return (
    <nav className="flex items-center justify-center bg-gun-powder text-white lg:bottom-0 lg:left-0 lg:top-0 lg:flex-col lg:rounded-r-[20px] dark:bg-steel-gray">
      <Link href="/" className="mr-auto lg:mb-auto lg:ml-0">
        <Image
          src="/images/logo.png"
          alt="website logo"
          width={72}
          height={72}
          className="bg-cover object-cover md:h-20 md:w-20 lg:h-[103px] lg:w-[103px]"
        />
      </Link>

      <div className="flex items-center justify-center self-stretch border-l border-mulled-wine px-6 lg:border-l-0 lg:border-t lg:px-0 lg:py-6">
        <Image
          src="/images/avatar.png"
          alt="user avatar"
          width={32}
          height={32}
        />
      </div>
    </nav>
  );
}

export default Navbar;
