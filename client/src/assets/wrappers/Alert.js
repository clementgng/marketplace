import styled from "styled-components";

const Wrapper = styled.div`
    padding: 0.375rem 0.75rem;
    margin-bottom: 1rem;
    border-color: transparent;
    border-radius: 0.25rem;
    text-align: center;

    &.alert-danger {
        color: #7f1d1d;
        background-color: #fca5a5;
    }
`;

export default Wrapper;
