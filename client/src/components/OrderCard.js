import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';

const OrderCard = ({ order }) => (
  <Card className="mb-3">
    <Card.Body>
      <ListGroup variant="flush">
        {order.items.map((entry) => (
          <ListGroup.Item
            key={entry.item.id}
            className="d-flex justify-content-between align-items-start"
          >
            <div>
              <div className="fw-bold">{entry.item.name}</div>
              <p>{entry.item.description}</p>
            </div>
            <Badge bg="primary" pill>
              {entry.quantity}
            </Badge>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Card.Body>
    <Card.Footer>
      <div>
        <div className="fw-bold">Ship to</div>
        <div>
          <div>
            <span>{order.address.address1}</span>
            {!!order.address.address2 && (
              <span>, {order.address.address2}</span>
            )}
          </div>
          <div>
            <span>{order.address.city}</span>,{' '}
            <span>{order.address.state}</span>,{' '}
            <span>{order.address.zipCode}</span>
          </div>
        </div>
      </div>
    </Card.Footer>
  </Card>
);

export default OrderCard;
