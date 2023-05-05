import Button from "react-bootstrap/Button";
import FormRow from "./FormRow";
import FormWrapper from "../assets/wrappers/Form";
import { useSelector, useDispatch } from "react-redux";
import {
    updateCurrentItem,
    resetCurrentItem,
    setItem,
    saveItem,
} from "../store/features/itemSlice";

const ItemDetail = ({ item }) => {
    const { token } = useSelector((store) => store.userState);
    const dispatch = useDispatch();

    const handleChange = (e) => {
        const key = e.target.id.split("-").pop();
        dispatch(
            updateCurrentItem({
                name: key,
                value: e.target.value,
            })
        );
    };

    const handleClickCancel = () => dispatch(resetCurrentItem());

    const handleClickSave = () => {
        dispatch(setItem(item));
        dispatch(saveItem({ token, item }));
    };

    return (
        <FormWrapper>
            <h3>{item.id ? "Item" : "New Item"}</h3>
            <FormRow
                inputId="item-form-name"
                label="Name"
                value={item?.name || ""}
                handleChange={handleChange}
                options={{
                    type: "text",
                }}
            />
            <FormRow
                inputId="item-form-description"
                label="Description"
                value={item?.description || ""}
                handleChange={handleChange}
                options={{
                    as: "textarea",
                    row: 3,
                }}
            ></FormRow>
            <FormRow
                inputId="item-form-price"
                label="Price"
                value={item?.price || ""}
                handleChange={handleChange}
                options={{
                    type: "Number",
                }}
            />
            <div className="d-flex justify-content-between">
                <Button variant="link" onClick={handleClickCancel}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={handleClickSave}>
                    Save
                </Button>
            </div>
        </FormWrapper>
    );
};

export default ItemDetail;
