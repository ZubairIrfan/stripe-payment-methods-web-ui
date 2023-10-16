import React, { useMemo, useState } from 'react';
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
} from '@stripe/react-stripe-js';
import useResponsiveFontSize from './useResponsiveFontSize';
import ReactJson from 'react-json-view';

const useOptions = () => {
  const fontSize = useResponsiveFontSize();
  const options = useMemo(
    () => ({
      style: {
        base: {
          fontSize,
          color: '#424770',
          letterSpacing: '0.025em',
          fontFamily: 'Roboto, Source Code Pro, monospace, SFUIDisplay',
          '::placeholder': {
            color: '#aab7c4',
          },
        },
        invalid: {
          color: '#9e2146',
        },
      },
    }),
    [fontSize]
  );

  return options;
};

const SplitForm = () => {
  const [isProcessing, setProcessingTo] = useState(false);
  const [checkoutError, setCheckoutError] = useState();
  const [createdPaymentMethodDetails, setCreatedPaymentMethodDetails] =
    useState(null);

  const stripe = useStripe();
  const elements = useElements();
  const options = useOptions();

  const handleCardDetailsChange = (event) => {
    event.error ? setCheckoutError(event.error.message) : setCheckoutError();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setProcessingTo(true);

    const cardElement = elements.getElement(CardNumberElement);

    try {
      const paymentMethodData = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      });
      setCreatedPaymentMethodDetails(paymentMethodData);
      if (paymentMethodData.error) {
        setCheckoutError(paymentMethodData.error.message);
        setProcessingTo(false);
        return;
      }
      setProcessingTo(false);
    } catch (err) {
      setCheckoutError(err.message);
    }
  };

  return (
    <div
      style={{
        padding: 18,
      }}
    >
      <h2>Stripe Payment Method Id Generator</h2>
      <form
        onSubmit={handleSubmit}
        style={{ display: 'flex', alignItems: 'center' }}
      >
        <label style={{ flex: 3, margin: 10 }}>
          <span>Card number</span>
          <CardNumberElement
            options={options}
            onChange={handleCardDetailsChange}
          />
        </label>
        <label style={{ flex: 1, margin: 10 }}>
          <span>Expiration date</span>

          <CardExpiryElement
            options={options}
            onChange={handleCardDetailsChange}
          />
        </label>
        <label style={{ flex: 1, margin: 10 }}>
          <span>CVC</span>
          <CardCvcElement
            options={options}
            onChange={handleCardDetailsChange}
          />
        </label>

        {!checkoutError && <div>{checkoutError}</div>}
        <button
          type="submit"
          disabled={isProcessing || !stripe}
          style={{ width: 60, height: 40 }}
        >
          Add
        </button>
      </form>
      {createdPaymentMethodDetails ? (
        <div>
          <h4>Created Payment Method Details:</h4>
          <ReactJson src={createdPaymentMethodDetails} />
        </div>
      ) : null}
    </div>
  );
};

export default SplitForm;
