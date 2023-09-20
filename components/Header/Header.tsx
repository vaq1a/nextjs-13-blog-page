import { ReactNode } from "react";
import Link from "next/link";

const Header = (): ReactNode => {
  return (
    <header>
      <Link href='/'>
        Home
      </Link>
      <Link href='/blog'>
        Blog
      </Link>
      <Link href='/about'>
        About
      </Link>
    </header>
  )
}


export { Header }