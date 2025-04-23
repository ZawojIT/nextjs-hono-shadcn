'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/elements/button'
import { Users, UserPlus, FileText, FilePlus } from 'lucide-react'

export function Navigation() {
  const pathname = usePathname()

  const navItems = [
    {
      href: '/users',
      label: 'Users List',
      icon: <Users />,
    },
    {
      href: '/users/create',
      label: 'Create User',
      icon: <UserPlus />,
    },
    {
      href: '/posts',
      label: 'Posts',
      icon: <FileText />,
    },
    {
      href: '/posts/create',
      label: 'Create Post',
      icon: <FilePlus />,
    },
  ]

  return (
    <nav className="flex flex-wrap justify-center gap-4 border-b p-4">
      {navItems.map((item) => {
        const isActive = pathname === item.href

        return (
          <Button
            key={item.href}
            asChild
            variant={isActive ? 'default' : 'ghost'}
          >
            <Link href={item.href}>
              {item.icon}
              {item.label}
            </Link>
          </Button>
        )
      })}
    </nav>
  )
}
