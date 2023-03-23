import { Link } from "react-router-dom";
import {
   GlobalStyle,
   Form,
   Title,
   FirstMsg,
   FormInput,
   CustomCheck,
   Btn,
   BoldTxt,
   BottomText,
   Email,
   TermsAndCoLink,
   ErrorMsg,
   Name,
   Card,
} from "../../components/styles/Form.styled";
import PasswordInput from "../../components/passwordInput/PasswordInput";
import { useState, useEffect } from "react";
import { MdEmail } from "react-icons/md";
import { BsFillPersonFill } from "react-icons/bs";
import { TiTick } from "react-icons/ti";
import { ImCross } from "react-icons/im";

const initialState = {
   name: "",
   email: "",
   password: "",
   password2: "",
};

const Signup = () => {
   const [formData, setFormData] = useState(initialState);
   const { name, email, password, password2 } = formData;


   const [uCase, setUCase] = useState(false);
   const [num, setNum] = useState(false);
   const [sChar, setSChar] = useState(false);
   const [passLength, setPassLength] = useState(false);

   const checkIcon = <TiTick size={15} style={{ color: "green" }} />
   const timesIcon = <ImCross size={10} style={{ color: "red" }}/>

   const switchIcon = (condition) => {
      if (condition) {
        return checkIcon;
      }
      return timesIcon;
    };

   const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
   };

   useEffect(() => {
      // Check Lower and Uppercase
      if (password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) {
        setUCase(true);
      } else {
        setUCase(false);
      }
      // Check for numbers
      if (password.match(/([0-9])/)) {
        setNum(true);
      } else {
        setNum(false);
      }
      // Check for special character
      if (password.match(/([!,%,&,@,#,$,^,*,?,_,~])/)) {
        setSChar(true);
      } else {
        setSChar(false);
      }
      // Check for PASSWORD LENGTH
      if (password.length > 7) {
        setPassLength(true);
      } else {
        setPassLength(false);
      }
    }, [password]);

   return (
      <>
         <GlobalStyle />
         <Form>
            <Title>Sign Up</Title>
            <FirstMsg className="signup">
               This is the future of Education. Start for free.
            </FirstMsg>

            <ErrorMsg>error</ErrorMsg>

            <Name>
               <i>
                  <BsFillPersonFill size={18} />
               </i>
               <FormInput
                  type="text"
                  className="signup"
                  placeholder="Name"
                  name="name"
                  required
                  value={name}
                  onChange={handleInputChange}
               />
            </Name>

            <Email>
               <i>
                  <MdEmail size={18} />
               </i>
               <FormInput
                  type="email"
                  className="signup"
                  placeholder="Email"
                  required
                  name="email"
                  value={email}
                  onChange={handleInputChange}
               />
            </Email>

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

            {/* password strength */}
             <Card>
             <ul >
                <li>
                  <span >
                    {switchIcon(uCase)}
                    &nbsp; Lowercase & Uppercase
                  </span>
                </li>
                <li>
                  <span >
                    {switchIcon(num)}
                    &nbsp; Number (0-9)
                  </span>
                </li>
                <li>
                  <span >
                    {switchIcon(sChar)}
                    &nbsp; Special Character (!@#$%^&*)
                  </span>
                </li>
                <li>
                  <span >
                    {switchIcon(passLength)}
                    &nbsp; At least 8 Character
                  </span>
                </li>
              </ul>
             </Card>



            <TermsAndCoLink>
               <CustomCheck type="checkbox" id="customCheck1"></CustomCheck>
               <BoldTxt>
                  <label className="boldTxt">
                     I agree to the{" "}
                     <Link to="/singup/termsandconditions">
                        terms & conditions
                     </Link>
                  </label>
               </BoldTxt>
            </TermsAndCoLink>

            <Btn>Sign Up</Btn>

            <BottomText>
               <BoldTxt>
                  Already have an account? <Link to="/login"> Log in</Link>
               </BoldTxt>
            </BottomText>
         </Form>
      </>
   );
};

export default Signup;
