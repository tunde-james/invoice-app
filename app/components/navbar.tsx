import Image from "next/image";
import Link from "next/link";
import { ThemeSwitch } from ".";
import { auth } from "@/app/auth/auth-options";

function Navbar() {
  return (
    <nav className="flex items-center justify-center bg-gun-powder text-white dark:bg-steel-gray lg:bottom-0 lg:left-0 lg:top-0 lg:flex-col lg:rounded-r-[20px]">
      <Link href="/" className="mr-auto lg:mb-auto lg:ml-0">
        <Image
          src="/images/logo.png"
          alt="website logo"
          width={72}
          height={72}
          className="bg-cover object-cover md:h-20 md:w-20 lg:h-[103px] lg:w-[103px]"
        />
      </Link>

      <div className="pr-[21px] lg:pb-[21px] lg:pr-0">
        <ThemeSwitch />
      </div>

      <div className="flex items-center justify-center self-stretch border-l border-mulled-wine px-6 lg:border-l-0 lg:border-t lg:px-0 lg:py-6">
        <AuthStatus />
      </div>
    </nav>
  );
}

async function AuthStatus() {
  const session = await auth();

  console.log(session);

  if (!session) {
    return (
      <Link href="/api/auth/signin" className="nav-link">
        Login
      </Link>
    );
  }

  return (
    <ul className="flex items-center lg:flex-col">
      <li>
        <Image
          src={session!.user!.image!}
          alt={session!.user!.name!}
          width={32}
          height={32}
          referrerPolicy="no-referrer"
          className="cursor-pointer rounded-full lg:h-10 lg:w-10"
        />
      </li>
      <li className="cursor-pointer pl-2 text-wild-blue-yonder lg:pl-0 lg:pt-2">
        <Link href="/api/auth/signout">
          Logout
        </Link>
      </li>
    </ul>
  );
}

export default Navbar;
