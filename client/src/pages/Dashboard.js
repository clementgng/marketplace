import Button from "react-bootstrap/Button";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getall, setCurrentItem } from "../store/features/itemSlice";
import { ItemList, ItemDetail } from "../components";
import { isSeller } from "../utils/role";

const Dashboard = () => {
    const { token, role } = useSelector((store) => store.userState);
    const { loading, items, currentItem } = useSelector(
        (store) => store.itemState
    );
    const dispatch = useDispatch();

    useEffect(() => {
        token && dispatch(getall(token));
    }, [dispatch, token]);

    const handleClickNew = () => {
        dispatch(setCurrentItem({}));
    };

    return currentItem ? (
        <ItemDetail item={currentItem} />
    ) : (
        <>
            {isSeller(role) && (
                <Button onClick={handleClickNew}>New Item</Button>
            )}
            <ItemList loading={loading} items={items} />
        </>
    );
};

export default Dashboard;
