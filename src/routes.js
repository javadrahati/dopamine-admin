import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

const FoodCategories = React.lazy(() => import('./views/food/FoodCategories'))
const FoodList = React.lazy(() => import('./views/food/Foods'))
const Recipes = React.lazy(() => import('./views/food/Recipes'))
const Workouts = React.lazy(() => import('./views/workout/Workouts'))
const BlogList = React.lazy(() => import('./views/blog/Blogs'))
const Trainers = React.lazy(() => import('./views/staff/Trainers'))
const Counselors = React.lazy(() => import('./views/staff/Counselors'))
const VoucherPlans = React.lazy(() => import('./views/voucher/VoucherPlans'))
const Vouchers = React.lazy(() => import('./views/staff/Counselors'))
const PostDietProgram = React.lazy(() => import('./views/program/PostDietProgramView'))


const routes = [
  { path: '/', exact: true, name: 'Dashboard' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/food', name: 'Food', element: FoodList },
  { path: '/recipe', name: 'Recipe', element: Recipes },
  { path: '/foodCategory', name: 'FoodCategory', element: FoodCategories },
  { path: '/blog', name: 'Blog', element: BlogList },
  { path: '/staff/staff', name: 'Trainers', element: Trainers },
  { path: '/staff/counselor', name: 'Counselors', element: Counselors },
  { path: '/workout', name: 'Workouts', element: Workouts },
  { path: '/voucherPlan', name: 'VoucherPlan', element: VoucherPlans },
  { path: '/voucher', name: 'Vouchers', element: Vouchers },
  { path: '/new-diet-program', name: 'PostDietProgram', element: PostDietProgram },
]

export default routes
