import React from 'react';

// import react router dom components to routing the app pages
import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom';

// import useDispatch hook from react redux to dispatch our actions from the redux store without connecting our component 
// with connect method
// import useSelector hook to extract clientType and expiration from the redux store state
import { useDispatch, useSelector } from 'react-redux';

// import resetUserDetails action from redux store to reset the global state if jwt token is expired 
import { resetUserDetails } from './store/actions/ReducerActions';

// import Navbar
import NavBar from './share/ui/NavBar';
// import all the pages of the app
import AboutPage from './pages/AboutPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
// Administrator:
import AdminMainPage from './pages/admin/AdminMainPage';
import AddCompany from './pages/admin/companies_management/AddCompany';
import UpdateCompany from './pages/admin/companies_management/UpdateCompany';
import GetOneCompany from './pages/admin/companies_management/GetOneCompany';
import AllCompanies from './pages/admin/companies_management/AllCompanies';
import AddCustomer from './pages/admin/customers_management/AddCustomer';
import UpdateCustomer from './pages/admin/customers_management/UpdateCustomer';
import GetOneCustomer from './pages/admin/customers_management/GetOneCustomer';
import AllCustomers from './pages/admin/customers_management/AllCustomers';
// Company:
import CompanyMainPage from './pages/company/CompanyMainPage';
import AddCoupon from './pages/company/coupons_management/AddCoupon';
import UpdateCoupon from './pages/company/coupons_management/UpdateCoupon';
import AllCoupons from './pages/company/coupons_management/AllCoupons';
import CompanyDetails from './pages/company/info/CompanyDetails';
// Customer:
import CustomerMainPage from './pages/customer/CustomerMainPage';
import CouponsByCategoryView from './pages/customer/purchases/CouponsByCategoryView';
import PurchaseCoupon from './pages/customer/purchases/PurchaseCoupon';
import AllPurchases from './pages/customer/purchases/AllPurchases';
import CustomerDetails from './pages/customer/info/CustomerDetails';

// import AlertMessage to display messages to the user if necessary 
import AlertMessage from './share/ui/AlertMessage';

// import bootstrap and app css 
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  const dispatch = useDispatch();

  const isExpired = (receivedExpiration) => {
    // create a new date of now and a new date of receivedExpiration
    const now = new Date();
    const expirationAsDate = new Date(receivedExpiration);

    // create a boolean variable, isInThePast, which receives the user token expiration date, 
    // checks if it is earlier than now, and returns true or false respectively
    const isInThePast = expirationAsDate.getTime() < now.getTime();

    // create a boolean variable, expired, which is true if the variables expirationAsDate 
    // or receivedExpiration are not exist or the variable isInThePast is true
    const expired = !expirationAsDate || !receivedExpiration || isInThePast;
    
    // if the property receivedExpiration exists and isInThePast is true, the redux global states 
    // that contain the user details are reset and an Alert of logoff will display to the user
    if (receivedExpiration && isInThePast) {
      dispatch(resetUserDetails('Your time in the system is up. Please sign in again.'));
    };
    return expired;
  };

  return (
    <div>
      <Router>
        <NavBar
          // sends to NavBar.js and to AppRoutes.js redux store clientType state value
          // and our isExpired function that receives redux store expiration state value and returns a boolean value
          clientType={useSelector(state => state.clientType)}
          isExpired={isExpired(useSelector(state => state.expiration))}
        />
        <AppRoutes
          clientType={useSelector(state => state.clientType)}
          isExpired={isExpired(useSelector(state => state.expiration))}
        />
      </Router>
      <AlertMessage />
    </div >
  );
};

export default App;

const AppRoutes = ({ clientType, isExpired }) => {

  if (!clientType || isExpired) {
    return (
      <Routes>
        <Route
          path='/coupons/about'
          element={<AboutPage />}
        />
        <Route
          path='/coupons/login'
          element={<LoginPage />}
        />
        <Route
          path='*'
          element={<HomePage />}
        />
      </Routes>
    );
  };
  return (
    <Routes>
      <Route
        path='/coupons/about'
        element={<AboutPage />}
      />
      {clientType === 'admin' && (
        <>
          <Route
            path='/coupons/admin'
            element={<AdminMainPage />}
          />
          <Route
            path='/coupons/admin/company/add'
            element={<AddCompany />}
          />
          <Route
            path='/coupons/admin/company/update/:id'
            element={<UpdateCompany />}
          />
          <Route
            path='/coupons/admin/company/:id'
            element={<GetOneCompany />}
          />
          <Route
            path='/coupons/admin/companies'
            element={<AllCompanies />}
          />
          <Route
            path='/coupons/admin/customer/add'
            element={<AddCustomer />}
          />
          <Route
            path='/coupons/admin/customer/update/:id'
            element={<UpdateCustomer />}
          />
          <Route
            path='/coupons/admin/customer/:id'
            element={<GetOneCustomer />}
          />
          <Route
            path='/coupons/admin/customers'
            element={<AllCustomers />}
          />
        </>
      )}
      {clientType === 'company' && (
        <>
          <Route
            path='/coupons/company'
            element={<CompanyMainPage />}
          />
          <Route
            path='/coupons/company/coupon/add'
            element={<AddCoupon />}
          />
          <Route
            path='/coupons/company/coupon/update/:id'
            element={<UpdateCoupon />}
          />
          <Route
            path='/coupons/company/coupons'
            element={<AllCoupons />}
          />
          <Route
            path='/coupons/company/coupons/category'
            element={<AllCoupons category={true} />}
          />
          <Route
            path='/coupons/company/coupons/maxPrice'
            element={<AllCoupons maxPrice={true} />}
          />
          <Route
            path='/coupons/company/details'
            element={<CompanyDetails />}
          />
        </>
      )}
      {clientType === 'customer' && (
        <>
          <Route
            path='/coupons/customer'
            element={<CustomerMainPage />}
          />
          <Route
            path='/coupons/customer/purchase'
            element={<PurchaseCoupon />}
          />
          <Route
            path='/coupons/customer/coupons'
            element={<AllPurchases maxPrice={false} category={false} />}
          />
          <Route
            path='/coupons/customer/coupons/maxPrice'
            element={<AllPurchases maxPrice={true} />}
          />
          <Route
            path='/coupons/customer/coupons/category'
            element={<AllPurchases category={true} />}
          />
          <Route
            path='/coupons/customer/details'
            element={<CustomerDetails />}
          />
          <Route
            path='/coupons/category/coupons/:category'
            element={<CouponsByCategoryView />}
          />
        </>
      )}
      <Route
        path='*'
        element={<HomePage />}
      />
    </Routes>
  );
};