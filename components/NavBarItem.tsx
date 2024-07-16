import React from 'react'
import { usePathname } from 'next/navigation'
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from '@fortawesome/react-fontawesome'

interface Props {
  children: string
  href: string
  className: string
  icon: FontAwesomeIconProps['icon'] | null
  tabIndex: number | null
  testId: string
}

const NavBarItem = ({
  children,
  href,
  className,
  icon,
  tabIndex,
  testId,
}: Props) => {
  const pathname = usePathname()
  const activeClass = 'navbar-item-active'
  const activeClasses = className ? `${className} ${activeClass}` : activeClass

  return (
    <span className="d-inline-flex align-items-center navbar-item">
      {icon && <FontAwesomeIcon icon={icon} className="mr-3" />}
      <span
        className={pathname === href ? activeClasses : className}
        tabIndex={tabIndex ? tabIndex : 0}
        data-testid={testId}
      >
        {children}
      </span>
    </span>
  )
}

export default NavBarItem
