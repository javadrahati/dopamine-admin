import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cibPlangrid,
  cilBell,
  cilCalculator, cilCalendar,
  cilChartPie, cilCouch,
  cilCursor, cilDollar,
  cilDrop, cilFastfood, cilFork, cilGroup, cilList, cilNewspaper,
  cilNotes,
  cilPencil, cilPlant,
  cilPuzzle, cilRunning,
  cilSpeedometer,
  cilStar, cilTags, cilUserX, cilWrapText,
} from '@coreui/icons'
import {CNav, CNavGroup, CNavItem, CNavTitle} from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'دوپامین',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: 'غذا و فعالیت',
    items: [
      {
        component: CNavItem,
        name: 'مدیریت غذا',
        to: '/food',
        icon: <CIcon icon={cilFastfood} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'مدیریت دسته بندی ها',
        to: '/foodCategory',
        icon: <CIcon icon={cilGroup} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'مدیریت فعالیت‌ها',
        to: '/workout',
        icon: <CIcon icon={cilRunning} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'دستور پخت',
        to: '/recipe',
        icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
      },
    ]
  },
  {
    component: CNavGroup,
    name: 'وبلاگ',
    items: [
      {
        component: CNavItem,
        name: 'مدیریت مطالب',
        to: '/blog',
        icon: <CIcon icon={cilNewspaper} customClassName="nav-icon" />,
      },
    ]
  },
  {
    component: CNavGroup,
    name: 'برنامه دهی',
    items: [
      {
        component: CNavItem,
        name: 'ارسال برنامه',
        to: '/new-diet-program',
        icon: <CIcon icon={cilCalendar} customClassName="nav-icon" />,
      },
    ]
  },
  {
    component: CNavGroup,
    name: 'پرسنل',
    items: [
      {
        component: CNavItem,
        name: 'مربیان',
        to: '/staff/staff',
        icon: <CIcon icon={cilUserX} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'مشاورین',
        to: '/staff/counselor',
        icon: <CIcon icon={cilCouch} customClassName="nav-icon" />,
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'اشتراک',
    items: [
      {
        component: CNavItem,
        name: 'مدیریت پلن ها',
        to: '/voucherPlan',
        icon: <CIcon icon={cilDollar} customClassName="nav-icon" />,
      },
      // {
      //   component: CNavItem,
      //   name: 'اشتراک ها',
      //   to: '/voucher',
      //   icon: <CIcon icon={cilTags} customClassName="nav-icon" />,
      // }
    ]
  }

  // {
  //   component: CNavItem,
  //   name: 'Widgets',
  //   to: '/widgets',
  //   icon: <CIcon icon={cilCalculator} customClassName="nav-icon" />,
  //   badge: {
  //     color: 'info',
  //     text: 'NEW',
  //   },
  // },
]

export default _nav
