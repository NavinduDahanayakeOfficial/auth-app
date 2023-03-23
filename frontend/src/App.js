import {
   BrowserRouter as Router,
   Routes,
   Route,
   Navigate,
} from "react-router-dom";


import ForgetPassword from "./pages/auth/ForgetPassword";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import TermsAndCond from "./pages/auth/TermsAndCond";
import ResetPassword  from "./pages/auth/ResetPassword";
import Verify from "./pages/auth/Verify";

import Home from "./pages/Home";


function App() {
 

   return (
      <div className="App">
         <Router>
           
            <div className="page">
               <Routes>
                  <Route
                     path="/"
                     element={<Home /> }
                  />
                  <Route
                     path="/login"
                     element={ <Login />}
                  />
                  <Route
                     path="/signup"
                     element= {<Signup />}
                  />
                  <Route
                     path="/login/forgetpassword"
                     element={<ForgetPassword />}
                  />
                  <Route
                     path="/singup/termsandconditions"
                     element={<TermsAndCond />}
                  />
                  <Route
                     path="/resetpassword/:resetToken"
                     element={<ResetPassword />}
                  />
                  <Route
                     path="/verify/:verificationToken"
                     element={<Verify />}
                  />
               </Routes>
            </div>
         </Router>
      </div>
   );
}

export default App;
