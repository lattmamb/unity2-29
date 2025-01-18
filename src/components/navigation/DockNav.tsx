import { Link } from "react-router-dom";
import {
  HomeIcon,
  Car,
  Package,
  Megaphone,
  MapPin,
  Zap,
  UserCircle,
  LifeBuoy
} from 'lucide-react';
import { Dock, DockIcon, DockItem, DockLabel } from '@/components/ui/dock';

const navigationItems = [
  {
    title: 'Home',
    icon: HomeIcon,
    href: '/',
  },
  {
    title: 'Fleet',
    icon: Car,
    href: '/fleet',
  },
  {
    title: 'Subscription',
    icon: Package,
    href: '/subscription',
  },
  {
    title: 'Advertising',
    icon: Megaphone,
    href: '/advertising',
  },
  {
    title: 'Locations',
    icon: MapPin,
    href: '/locations',
  },
  {
    title: 'Charging',
    icon: Zap,
    href: '/charging-stations',
  },
  {
    title: 'Profile',
    icon: UserCircle,
    href: '/profile',
  },
  {
    title: 'Support',
    icon: LifeBuoy,
    href: '/support',
  },
];

export function DockNav() {
  return (
    <div className='fixed top-16 left-1/2 max-w-full -translate-x-1/2 z-40'>
      <Dock className='items-start pt-3 bg-background/80 backdrop-blur-sm'>
        {navigationItems.map((item, idx) => (
          <Link to={item.href} key={idx}>
            <DockItem
              className='aspect-square rounded-full bg-background/80 backdrop-blur-sm border border-white/10 hover:bg-white/10'
            >
              <DockLabel>{item.title}</DockLabel>
              <DockIcon>
                <item.icon className='h-full w-full text-foreground' />
              </DockIcon>
            </DockItem>
          </Link>
        ))}
      </Dock>
    </div>
  );
}