import { useState } from "react";
import { Link } from "react-router-dom";
import PasswordInput from "../../components/passwordInput/PasswordInput";

import {
   GlobalStyle,
   Form,
   Title,
   FirstMsg,
   FormInput,
   RemMeAndForgetPass,
   CustomCheck,
   Btn,
   HorizontalLine,
   BottomText,
   BoldTxt,
   ErrorMsg,
   Email,
} from "../../components/styles/Form.styled";
import { MdEmail } from "react-icons/md";

const Login = () => {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");

   const handleInputChange = () => {};

   const loginUser = () => {};

   return (
      <>
         <GlobalStyle />
         <Form onSubmit={loginUser}>
            <Title>Login</Title>
            <FirstMsg>Welcome back</FirstMsg>

            <ErrorMsg>error</ErrorMsg>

            <Email>
               <i className="email">
                  <MdEmail  size={18} />
               </i>
               <FormInput
                  type="email"
                  className="login"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={handleInputChange}
               />
            </Email>

            <PasswordInput
               className="login"
               placeholder="Password"
               value={email}
               onChange={handleInputChange}
            />

            <RemMeAndForgetPass>
               <div>
                  <CustomCheck type="checkbox" id="customCheck1"></CustomCheck>
                  <BoldTxt>
                     <label htmlFor="customCheck1">Remember me</label>
                  </BoldTxt>
               </div>

               <BoldTxt>
                  <Link to="/login/forgetpassword">Forgot password?</Link>
               </BoldTxt>
            </RemMeAndForgetPass>

            <Btn>Log in</Btn>

            <HorizontalLine />

            <Btn className="google">Login with Google</Btn>

            <BottomText>
               <BoldTxt>
                  Not registered yet?{" "}
                  <Link to="/signup">Create an account</Link>
               </BoldTxt>
            </BottomText>
         </Form>
      </>
   );
};

export default Login;
