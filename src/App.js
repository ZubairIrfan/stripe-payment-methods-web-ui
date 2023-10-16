import './App.css';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./components/CheckoutForm"

const stripePromise = loadStripe("pk_test_51NzK2rJg6T4WRJkVCbhr1Bbd9aHMJkmgLnr77ES0jOEmwxovFEfaVT0pQbzWkFwASkSqKLgyVJwva7sshRR77Ajy00crQgtohc")

function App() {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
}

export default App;
