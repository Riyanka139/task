import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


const Payment = (props) => {

  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [amount, setAmount] = useState(0);
  const { user } = props;
  const navigate = useNavigate();


  useEffect(() => {
    if (!user.firstName) {
      navigate("/")
    }
  },[navigate, user])

  const handlePayAndPlaceOrder = async () => {
    setIsComplete(false);
    if (!stripe || !elements) {
      setError("Stripe Not Loaded",
      );
      return;
    }



    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      setError("Card Element Not Found",
      );
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.log("[error]", error);
      setError(error.message || "Error In Payment",
      );
      return;
    } else {
      const pm = paymentMethod?.id || "0";
      console.log(pm, amount,user);
      // hit payment api from server
      setAmount('')
    }
  };
  return (
    <div >
      {error && <p className='text-danger'>{error}</p>}
      <div className='d-flex flex-wrap gap-4 mb-3 align-items-center'>
      <p className='mb-0'>Name: {user.firstName} {user.lastName}</p>
      <Form.Group>
        <Form.Label>Amount</Form.Label>
        <Form.Control required type="number" placeholder="Enter Amount" name="amount" onChange={(e) => setAmount(e.target.value)} value={amount} />
        </Form.Group>
      </div>
      <div className='p-2 border'>
      <CardElement
        onChange={(event) => {
          setIsComplete(event.complete);
        }}
        options={{
          style: {
            base: {
              fontSize: "15px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
        {/* <PaymentElement /> */}
        </div>
      <Button className='mt-4 w-25'

        disabled={!isComplete}
        onClick={() => handlePayAndPlaceOrder()}
      >
        Pay
      </Button>
    </div>

  );
}

export default Payment