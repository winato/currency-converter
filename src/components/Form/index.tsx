import { useState, useEffect, ChangeEvent } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Row from './Row';
import { Title, Equal, StyledForm } from './styled';
import currencies from '../../mocks/currencies';
import { getExchangeRate } from '../../api';

interface Props {
  handleChangeCurrency: ((fromCurrency: string, toCurrency: string) => void);
}

interface RatesData {
  "1. From_Currency Code": string,
  "2. From_Currency Name": string,
  "3. To_Currency Code": string,
  "4. To_Currency Name": string,
  "5. Exchange Rate": string,
  "6. Last Refreshed": string,
  "7. Time Zone": string,
  "8. Bid Price": string,
  "9. Ask Price": string
}

const Form = ({ 
  handleChangeCurrency,
 }: Props) => {
  const [fromCurrency, setFromCurrency] = useState<string>('');
  const [toCurrency, setToCurrency] = useState<string>('');
  const [exchageRate, setExchangeRate] = useState<number>(1);
  const [amount, setAmount] = useState<number>(1);
  const [amountInFromCurrency, setAmountInFromCurrency] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  let toAmount: number, fromAmount: number;

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

    handleChangeCurrency(fromCurrency, toCurrency);
    getRates();
  }, [fromCurrency, toCurrency]);

  const getRates = (): void => {
    getExchangeRate({
      from_currency: fromCurrency,
      to_currency: toCurrency,
    })
    .then(({ data }) => {
      const rates: RatesData = data['Realtime Currency Exchange Rate'];

      if (!rates) {
        toast.error(data['Note']);
      }

      const rate = rates && rates['5. Exchange Rate'];
      setExchangeRate(parseFloat(rate))
    })
    .catch((e) => {
      toast.error('Something went wrong');
    })
    .finally(() => {
      setIsLoading(false);
    })
  }

  const hangleChangeAmount = (e: ChangeEvent<HTMLInputElement>, isFrom: boolean) => {
    const amount: number = parseInt(e.target.value, 10);
    setAmount(amount);
    setAmountInFromCurrency(isFrom);
  }

  return (
    <StyledForm>
      <Title>Convert</Title>
      <Row
        isLoading={isLoading}
        handleChangeCurrency={(e) => setFromCurrency(e.target.value)}
        hangleChangeAmount={(e: ChangeEvent<HTMLInputElement>) => hangleChangeAmount(e, true)}
        currencies={currencies}
        selectedCurrency={fromCurrency}
        amount={fromAmount}
      />
      <Equal>
      =
      </Equal>
      <Row
        isLoading={isLoading}
        handleChangeCurrency={(e) => setToCurrency(e.target.value)}
        hangleChangeAmount={(e: ChangeEvent<HTMLInputElement>) => hangleChangeAmount(e, false)}
        currencies={currencies}
        selectedCurrency={toCurrency}
        amount={toAmount}
      />
      <ToastContainer/>
    </StyledForm>
  )
}

export default Form;
