import Card from 'react-bootstrap/Card';

const ItemCardBody = ({ item }) => (
  <Card.Body>
    <Card.Title>{item.name}</Card.Title>
    <Card.Text>{item.description}</Card.Text>
    <Card.Text>${item.price}</Card.Text>
  </Card.Body>
);

export default ItemCardBody;
