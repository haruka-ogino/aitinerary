import React from 'react'
import Link from 'next/link'

import NavBarItem from './NavBarItem'
import { FontAwesomeIconProps } from '@fortawesome/react-fontawesome'

interface Props {
  children: string
  href: string
  className: string
  icon: FontAwesomeIconProps['icon']
  tabIndex: number
  testId: string
}

const PageLink = ({
  children,
  href,
  className,
  icon,
  tabIndex,
  testId,
}: Props) => {
  return (
    <Link legacyBehavior href={href}>
      <a>
        <NavBarItem
          href={href}
          className={className}
          icon={icon}
          tabIndex={tabIndex}
          testId={testId}
        >
          {children}
        </NavBarItem>
      </a>
    </Link>
  )
}

export default PageLink
