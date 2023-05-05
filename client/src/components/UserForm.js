import FormWrapper from "../assets/wrappers/Form";
import FormRow from "./FormRow";
import Alert from "./Alert";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { auth, resetError } from "../store/features/userSlice";
import { useNavigate } from "react-router-dom";

const initialUserState = {
    isMember: true,
    name: "",
    email: "",
    password: "",
};

const initialAlertState = {
    visible: false,
    type: "",
    message: "",
};

const UserForm = ({ isMember }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { userId, error } = useSelector((store) => store.userState);

    useEffect(() => {
        if (userId) {
            navigate("/dashboard");
        }
    }, [userId, navigate]);

    const [userState, setUserState] = useState({
        ...initialUserState,
        isMember,
    });

    const [alertState, setAlertState] = useState(initialAlertState);

    const toggleMember = () => {
        clearAlert();
        setUserState({
            ...initialUserState,
            isMember: !userState.isMember,
        });
        dispatch(resetError());
    };

    const handleChange = (e) => {
        const key = e.target.id.split("-").pop();
        setUserState({
            ...userState,
            [key]: e.target.value,
        });
    };

    const showAlert = (type, message) => {
        setAlertState({
            visible: true,
            type,
            message,
        });
    };

    const clearAlert = () => {
        setAlertState(initialAlertState);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { name, email, password, role, isMember } = userState;

        if (
            !email ||
            !password ||
            (!isMember && !name) ||
            (!isMember && !role)
        ) {
            showAlert("danger", "Please provide all values");
        } else {
            clearAlert();
        }

        dispatch(
            auth({
                user: isMember
                    ? { email, password }
                    : { name, role, email, password },
                isMember,
            })
        );
    };

    const renderAlert = (alertState, error) => {
        if (error) {
            return <Alert type="danger" message={error} />;
        }
        if (alertState.visible) {
            return (
                <Alert type={alertState.type} message={alertState.message} />
            );
        }
        return null;
    };

    return (
        <FormWrapper>
            <h2>{userState.isMember ? "Log In" : "Register"}</h2>
            {renderAlert(alertState, error)}
            {!userState.isMember && (
                <FormRow
                    inputId="user-form-name"
                    label="Name"
                    value={userState.name}
                    handleChange={handleChange}
                    options={{
                        type: "text",
                    }}
                />
            )}
            {!userState.isMember && (
                <FormRow
                    inputId="user-form-role"
                    label="Role"
                    value={userState.role}
                    handleChange={handleChange}
                    options={{
                        type: "select",
                        selectPrompt: "Select a role...",
                        selectOptions: [
                            {
                                value: "seller",
                                text: "Seller",
                            },
                            {
                                value: "buyer",
                                text: "Buyer",
                            },
                        ],
                    }}
                />
            )}
            <FormRow
                inputId="user-form-email"
                label="Email Address"
                value={userState.email}
                handleChange={handleChange}
                options={{
                    type: "email",
                }}
            />
            <FormRow
                inputId="user-form-password"
                label="Password"
                value={userState.password}
                handleChange={handleChange}
                options={{
                    type: "password",
                }}
            />
            <button
                type="submit"
                className="btn btn-primary"
                onClick={handleSubmit}
            >
                Submit
            </button>
            <p>
                {userState.isMember ? "Not a member yet?" : "Already a member?"}
                <button
                    type="button"
                    className="member-btn"
                    onClick={toggleMember}
                >
                    {userState.isMember ? "Register" : "Login"}
                </button>
            </p>
        </FormWrapper>
    );
};

export default UserForm;
