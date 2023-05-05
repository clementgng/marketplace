import AlertWrapper from "../assets/wrappers/Alert";

const Alert = ({ type, message }) => (
    <AlertWrapper className={`alert-${type}`}>{message}</AlertWrapper>
);

export default Alert;
