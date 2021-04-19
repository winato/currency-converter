import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import ChartCanvas from './ChartCanvas';
import { getDailyHistory } from '../../api'

interface Props {
  fromCurrency: string,
  toCurrency: string,
}

interface FormattedHistoryData {
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
  const [history, setHistory] = useState<FormattedHistoryData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const formatHistory = (historyObj: object) => {
    return Object.entries(historyObj).map(([key, value]): FormattedHistoryData => ({
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
      const history = data['Time Series FX (Daily)'];
      if (history) {
        const historyArray = formatHistory(history);
        setHistory(historyArray);
      } else {
        toast.error(data['Note']);
      }
    })
    .catch((e) => {
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
