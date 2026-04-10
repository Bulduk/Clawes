'use client';
import Link from 'next/link';
import { Home, Trophy, Plus, Flame, User } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function BottomNav() {
  const pathname = usePathname();
  
  return (
    <div className="fixed bottom-0 w-full bg-white/80 backdrop-blur-md border-t border-slate-200 flex justify-around items-center p-3 z-50 pb-safe">
      <NavItem href="/" icon={<Home className="w-6 h-6" />} label="Home" active={pathname === '/'} />
      <NavItem href="/market" icon={<Trophy className="w-6 h-6" />} label="Market" active={pathname === '/market'} />
      
      <Link href="/create" className="relative -top-5 flex flex-col items-center justify-center w-14 h-14 bg-blue-600 rounded-full shadow-lg shadow-blue-500/30 text-white hover:scale-105 transition-transform">
        <Plus className="w-8 h-8" />
      </Link>

      <NavItem href="/pulse" icon={<Flame className="w-6 h-6" />} label="Pulse" active={pathname === '/pulse'} />
      <NavItem href="/profile" icon={<User className="w-6 h-6" />} label="Profile" active={pathname === '/profile'} />
    </div>
  );
}

function NavItem({ href, icon, label, active }: { href: string, icon: React.ReactNode, label: string, active: boolean }) {
  return (
    <Link href={href} className={`flex flex-col items-center transition-colors ${active ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}>
      {icon}
      <span className="text-[10px] mt-1 font-medium">{label}</span>
    </Link>
  );
}
