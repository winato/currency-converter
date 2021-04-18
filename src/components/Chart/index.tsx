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

interface HistoryData {
  "1. Information": string,
  "2. From Symbol": string,
  "3. To Symbol": string,
  "4. Output Size": string,
  "5. Last Refreshed": string,
  "6. Time Zone": string
}

const Chart = ({
  fromCurrency,
  toCurrency
}: Props) => {
  const [history, setHistory] = useState<FormattedHistoryData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const formatHistory = (historyObj: HistoryData) => {
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
