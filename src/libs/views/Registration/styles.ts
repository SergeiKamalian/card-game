import { Form } from "formik";
import styled from "styled-components";

export const StyledRegistrationForm = styled(Form)`
    display: flex;
    flex-direction: column;
    gap: 10px;

    >button {
        margin-top: 20px;
    }
`
export const StyledRegistrationButtonWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    >div {
        display: flex;
        gap: 5px;
    }
    margin-top: 30px;
`