import { Btn, CenterAll, GlobalStyle } from "../../components/styles/Form.styled";

const Verify = () => {
    return ( 
    <>
    <GlobalStyle/>
    <section>
      <CenterAll>
        <h2>Account Verification</h2>
        <p>To verify your account, click the button below...</p>
        <br />
        <Btn>
          Verify Account
        </Btn>
      </CenterAll>
    </section>
    </>
     );
}
 
export default Verify;