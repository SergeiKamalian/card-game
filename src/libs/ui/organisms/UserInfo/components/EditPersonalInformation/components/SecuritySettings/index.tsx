import { memo, useMemo, useState } from "react";
import { FormField, Wrapper } from "../../../../../../atoms";
import { IoEye } from "react-icons/io5";
import { IoEyeOffSharp } from "react-icons/io5";
import { StyledPasswordEyeButton } from "./styles";

export const SecuritySettings = memo(() => {
  const [isPasswordView, setIsPasswordView] = useState(true);

  const PasswordEyeButton = useMemo(() => {
    const changePasswordView = () => setIsPasswordView((prev) => !prev);
    return (
      <StyledPasswordEyeButton onClick={changePasswordView}>
        {!isPasswordView ? <IoEye size={20} /> : <IoEyeOffSharp size={20} />}
      </StyledPasswordEyeButton>
    );
  }, [isPasswordView]);

  return (
    <Wrapper padding="20px 20px 0">
      <FormField
        name="password"
        label="Password"
        type={isPasswordView ? "password" : "text"}
        minWidth="300px"
        rightIcon={PasswordEyeButton}
      />
    </Wrapper>
  );
});
