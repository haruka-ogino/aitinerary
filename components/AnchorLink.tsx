import React from 'react'

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

const AnchorLink = ({
  children,
  href,
  className,
  icon,
  tabIndex,
  testId,
}: Props) => {
  return (
    <a href={href}>
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
  )
}

export default AnchorLink
