import { MdEmail } from "react-icons/md";
import { ImMail4 } from "react-icons/im";
import { Link } from "react-router-dom";
import {
   GlobalStyle,
   Form,
   Title,
   FirstMsg,
   FormInput,
   Btn,
   BoldTxt,
   Email,
   TopIcon,
} from "../../components/styles/Form.styled";

const ForgetPassword = () => {
   return (
      <>
         <GlobalStyle />
         <Form>
            <TopIcon>
               <ImMail4 size={50} />
            </TopIcon>
            <Title className="forgetPass">Forget Password</Title>
            <FirstMsg className="forgetPass">
               No worries, we’ll send you reset instructions
            </FirstMsg>

            <Email>
               <i className="email">
                  <MdEmail size={18} />
               </i>
               <FormInput
                  type="email"
                  className="signup"
                  placeholder="Email"
                  required
                  name="email"
               />
            </Email>

            <Btn type="submit" className="btn">
               Send
            </Btn>

            <BoldTxt>
               <Link to="/login" className="boldTxt">
                  Back to login
               </Link>
            </BoldTxt>
         </Form>
      </>
   );
};

export default ForgetPassword;
