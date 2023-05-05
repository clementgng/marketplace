import styled from "styled-components";

// sky 500 color from https://tailwindcss.com/docs/customizing-colors
const Wrapper = styled.form`
    max-width: 400px;
    border-top: 5px solid #0ea5e9;
    margin: 3rem auto;
    padding: 2rem 2.5rem;
    border-radius: 0.25rem;
    background-color: #ffffff;

    .member-btn {
        background: transparent;
        border: transparent;
        color: #0369a1;
        cursor: pointer;
    }

    .btn {
        margin-top: 1rem;
        width: 100%;
        height: 3rem;
        cursor: pointer;
        border: transparent;
        border-radius: 0.25rem;
        padding: 0.5rem 1rem;
        font-weight: 700;
        text-transform: capitalize;
    }

    .btn-primary {
        color: #ffffff;
        background-color: #0ea5e9;
    }
`;

export default Wrapper;
