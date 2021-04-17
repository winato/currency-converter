import { getDailyHistory } from '../../api'
import { useEffect, useState } from 'react';
import ChartCanvas from './ChartCanvas';
import { ToastContainer, toast } from 'react-toastify';

interface Props {
  fromCurrency: string,
  toCurrency: string,
}

interface State {
  key: string,
  open: string,
  high: string,
  low: string,
  close: string,
}

const Chart = ({
  fromCurrency,
  toCurrency
}: Props) => {
  const [history, setHistory] = useState<State[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const formatHistory = (historyObj: object) => {
    return Object.entries(historyObj).map(([key, value]) => ({
      key,
      open: value['1. open'],
      high: value['2. high'],
      low: value['3. low'],
      close: value['4. close'],
    }))
      .filter((item, index) => index < 30);
  }

  useEffect(() => {
    if (!fromCurrency || !toCurrency) return;

    setIsLoading(true);

    getDailyHistory({
      from_symbol: fromCurrency,
      to_symbol: toCurrency,
    })
    .then(({ data }) => {
      const historyArray = formatHistory(data['Time Series FX (Daily)']);
      setHistory(historyArray);
    })
    .catch(() => {
      toast.error('Something went wrong');
    })
    .finally(() => {
      setIsLoading(false);
    })
  }, [fromCurrency, toCurrency])

  return (
    <>
      <ToastContainer/>
      <ChartCanvas chartData={history} isLoading={isLoading}/>
    </>
  )
}

export default Chart
