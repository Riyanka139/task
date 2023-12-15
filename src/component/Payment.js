import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';


const Payment = () => {

  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [amount, setAmount] = useState(0)

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
      console.log(pm, amount);

    }
  };
  return (
    <div>
      {error && <p className='text-danger'>{error}</p>}
      <Form.Group className="mb-3">
        <Form.Label>Amount</Form.Label>
        <Form.Control required type="number" placeholder="Enter AMount" name="amount" onChange={(e) => setAmount(e.target.value)} value={amount} />
      </Form.Group>
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
      <Button className='mt-2'

        disabled={!isComplete}
        onClick={() => handlePayAndPlaceOrder()}
      >
        Pay &amp; Fix
      </Button>
    </div>

  );
}

export default Payment