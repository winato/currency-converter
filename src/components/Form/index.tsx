import { useState, useEffect } from 'react';
import Row from './Row';
import { Title, Equal, StyledForm } from './styled';
import currencies from '../../mocks/currencies';
import { getExchangeRate } from '../../api';
import { ToastContainer, toast } from 'react-toastify';

interface Props {
  handleChangeCurrency: ((fromCurrency: string, toCurrency: string) => void);
}

const Form = ({ 
  handleChangeCurrency,
 }: Props) => {
  const [fromCurrency, setFromCurrency] = useState('');
  const [toCurrency, setToCurrency] = useState('');
  const [exchageRate, setExchangeRate] = useState(1);
  const [amount, setAmount] = useState(1);
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  let toAmount, fromAmount

  if (amountInFromCurrency) {
    fromAmount = amount;
    toAmount = (amount * exchageRate) || 0;
  } else {
    toAmount = amount;
    fromAmount = (amount / exchageRate) || 0;
  }

  useEffect(() => {
    const [defaultFrom, defaultTo] = currencies;
    setFromCurrency(defaultFrom);
    setToCurrency(defaultTo);
  }, [])

  useEffect(() => {
    if (!fromCurrency || !toCurrency) return;

    setIsLoading(true);

    handleChangeCurrency(fromCurrency, toCurrency)

    getExchangeRate({
      from_currency: fromCurrency,
      to_currency: toCurrency,
    })
    .then(({ data }) => {
      const rates = data['Realtime Currency Exchange Rate'];
      if (!rates) {
        toast.error(data['Note']);
      }
      const rate = rates && rates['5. Exchange Rate'];
      setExchangeRate(Number(rate))
    })
    .catch((e) => {
      toast.error('Something went wrong');
    })
    .finally(() => {
      setIsLoading(false);
    })
  }, [fromCurrency, toCurrency]);

  const handleAmountChange = (e: any, isFrom: boolean) => {
    const amount = e.target.value;
    setAmount(amount);
    setAmountInFromCurrency(isFrom);
  }

  return (
    <StyledForm>
      <Title>Convert</Title>
      <Row
        isLoading={isLoading}
        handleChange={(e) => setFromCurrency(e.target.value)}
        hangleChangeAmount={(e) => handleAmountChange(e, true)}
        currencies={currencies}
        selectedCurrency={fromCurrency}
        amount={fromAmount}
      />
      <Equal>
      =
      </Equal>
      <Row
        isLoading={isLoading}
        handleChange={(e) => setToCurrency(e.target.value)}
        hangleChangeAmount={(e) => handleAmountChange(e, false)}
        currencies={currencies}
        selectedCurrency={toCurrency}
        amount={toAmount}
      />
      <ToastContainer/>
    </StyledForm>
  )
}

export default Form;
