import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { FormRow } from '.';
import AddressLineWrapper from '../assets/wrappers/AddressLine';
import { create as createOrder } from '../store/features/orderSlice';

const initialState = {
  address1: '',
  address2: '',
  city: '',
  state: '',
  zipCode: '',
};

const AddressForm = () => {
  const [address, setAddress] = useState(initialState);

  const dispatch = useDispatch();
  const { token } = useSelector((store) => store.userState);
  const { id: cartId } = useSelector((store) => store.cartState);

  const handleChange = (e) => {
    const key = e.target.id.split('-').pop();
    setAddress({
      ...address,
      [key]: e.target.value,
    });
  };

  const handleClickCheckout = () => {
    dispatch(
      createOrder({
        token,
        cartId,
        address,
      })
    );
  };

  return (
    <>
      <p>Please provide your shipping address</p>
      <Form className="form">
        <h3>New Shipping Address</h3>
        <FormRow
          inputId="address-address1"
          label="Address 1"
          value={address.address1}
          handleChange={handleChange}
          options={{ type: 'text' }}
        />
        <FormRow
          inputId="address-address2"
          label="Address 2 (optional)"
          value={address.address2}
          handleChange={handleChange}
          options={{ type: 'text' }}
        />
        <FormRow
          inputId="address-city"
          label="City"
          value={address.city}
          handleChange={handleChange}
          options={{ type: 'text' }}
        />
        <AddressLineWrapper className="d-flex">
          <FormRow
            inputId="address-state"
            label="State"
            value={address.state}
            handleChange={handleChange}
            options={{ type: 'text' }}
          />
          <FormRow
            inputId="address-zipCode"
            label="Zip code"
            value={address.zipCode}
            handleChange={handleChange}
            options={{ type: 'text' }}
          />
        </AddressLineWrapper>
        <Button variant="primary" onClick={handleClickCheckout}>
          Check out
        </Button>
        <Button variant="light  ">Back</Button>
      </Form>
    </>
  );
};

export default AddressForm;
