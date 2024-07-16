import React from 'react'
import { usePathname } from 'next/navigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface Props {
  children: string
  href: string
  className: string
  icon: string
  tabIndex: number
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
        tabIndex={tabIndex}
        data-testid={testId}
      >
        {children}
      </span>
    </span>
  )
}

export default NavBarItem
