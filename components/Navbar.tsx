import Link from 'next/link';
import React from 'react';

const Navbar = () => {
  return (
    <nav>
      <div className="flex justify-between">
        <div>
          <Link href={'/'}>Logo</Link>
        </div>
        <ul className="flex">
          <li className="ml-[24px] hover:underline">
            <Link href="/players">Players</Link>
          </li>
          <li className="ml-[24px] hover:underline">
            <Link href="/events">Events</Link>
          </li>
          <li className="ml-[24px] hover:underline">
            <Link href="/coaches">Coaches</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
