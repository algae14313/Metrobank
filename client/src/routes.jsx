import { createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home/Home'
import Login from './pages/Home/Login'
import SignUp from './pages/Home/SignUp'
import Security from './pages/OnlineBank/IT/Security'
import APIKeys from './pages/OnlineBank/IT/APIKeys'
import AuditLog from './pages/OnlineBank/IT/AuditLog'
import Developers from './pages/OnlineBank/IT/Developers'
import Employees from './pages/OnlineBank/HR/Employees'
import Customers from './pages/OnlineBank/RB/Customers'
import AddCustomer from './pages/OnlineBank/RB/AddCustomer'
import OpenAccount from './pages/OnlineBank/RB/OpenAccount'
import ManageEmployees from './pages/OnlineBank/HR/ManageEmployees'
import CardDetails from './pages/OnlineBank/CardDetails'
import Deposit from './pages/OnlineBank/RB/Deposit'
import Withdrawal from './pages/OnlineBank/RB/Withdrawal'
import Ledger from './pages/OnlineBank/RB/Ledger'
import Accounts from './pages/OnlineBank/RB/Accounts'
import UserStatement from './pages/Home/UserStatement'
import Error404 from './pages/Handlers/Error404'
import Test__Dashboard from './pages/__tests__/Test__Dashboard'
import Test__Statement from './pages/__tests__/Test__Statement'
import Test__Profile from './pages/__tests__/Test__Profile'
import Test__Api from './pages/__tests__/Test__Api'
import Test__UpdateProfile from './pages/__tests__/Test__UpdateProfile'

const Routes = createBrowserRouter([
  { path: '*', element: <Error404 /> },
  { path: '/metrobank', element: <Home /> },
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <SignUp /> },
  { path: '/security', element: <Security /> },
  { path: '/carddetails', element: <CardDetails /> },
  { path: '/metrobank/myaccount', element: <UserStatement /> },

  // HR DEPARTMENT
  { path: '/employees', element: <Employees /> },
  { path: '/employees/:userId', element: <ManageEmployees /> },
  { path: '/employees/manageemployee', element: <ManageEmployees /> },

  //RB DEPARTMENT
  { path: '/customers', element: <Customers /> },
  { path: '/ledger', element: <Accounts /> },
  { path: '/ledger/:accountid', element: <Ledger /> },
  { path: '/customers/addcustomer', element: <AddCustomer /> },
  { path: '/customers/addcustomer/openaccount', element: <OpenAccount /> },
  { path: '/ledger/deposit/:accountid', element: <Deposit /> },
  { path: '/ledger/withdrawal/:accountid', element: <Withdrawal /> },

  // IT DEPARTMENT
  { path: '/developers', element: <Developers /> },
  // { path: '/apikeys', element: <APIKeys /> },
  { path: '/auditlog', element: <AuditLog /> },


  //TEST
  { path: '/', element: <Test__Dashboard /> },
  { path: '/statement', element: <Test__Statement /> },
  { path: '/profile', element: <Test__Profile /> },
  { path: '/profile/updateprofile', element: <Test__UpdateProfile /> },
  { path: '/apikeys', element: <Test__Api /> },
])

export default Routes