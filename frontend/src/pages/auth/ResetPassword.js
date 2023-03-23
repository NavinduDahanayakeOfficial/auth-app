import { useState } from "react";
import { Link } from "react-router-dom";
import {
   GlobalStyle,
   Form,
   Title,
   FirstMsg,
   TopIcon,
   Btn,
   BoldTxt,
} from "../../components/styles/Form.styled";
import PasswordInput from "../../components/passwordInput/PasswordInput";
import { RiLockPasswordFill } from "react-icons/ri";


const initialState = {
   password: "",
   password2: "",
};

const ResetPassword = () => {

   const [formData, setFormData] = useState(initialState);
   const { password, password2 } = formData;

   const handleInputChange = () => {}

   return (
      <>
         <GlobalStyle />
         <Form>
            <TopIcon>
               <RiLockPasswordFill size={50}/>
            </TopIcon>
            <Title className="resetPass">Set new password</Title>
            <FirstMsg className="resetPass">
               New password must be different to previous password
            </FirstMsg>

            <PasswordInput
               className="signup"
               placeholder="Password"
               name="password"
               value={password}
               onChange={handleInputChange}
            />

            <PasswordInput
               className="signup"
               placeholder="Confirm password"
               name="password2"
               value={password2}
               onChange={handleInputChange}
            />

            <Btn type="submit">Reset</Btn>

            <BoldTxt>
               <Link to="/login" className="boldTxt">
                  Back to login
               </Link>
            </BoldTxt>
         </Form>
      </>
   );
};

export default ResetPassword;
