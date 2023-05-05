import { ItemCard } from "../components";

const ItemList = ({ loading, items }) => {
    if (loading) return null;

    return items && items.length > 0 ? (
        <>
            {items.map((item) => (
                <ItemCard key={item.id} item={item} />
            ))}
        </>
    ) : (
        <div>No items</div>
    );
};

export default ItemList;
