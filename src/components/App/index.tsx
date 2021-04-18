import { useState } from 'react';
import Form from '../Form';
import Chart from '../Chart';
import AppStyles from './styled';

import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [fromCurrency, setFromCurrency] = useState<string>('');
  const [toCurrency, setToCurrency] = useState<string>('');

  const handleChangeCurrency = (fromCurrency: string, toCurrency: string): void => {
    setFromCurrency(fromCurrency);
    setToCurrency(toCurrency);
  }

  return (
    <div className="App">
      <AppStyles/>
      <Form
        handleChangeCurrency={handleChangeCurrency}
      />
      <Chart
        fromCurrency={fromCurrency}
        toCurrency={toCurrency}
      />
    </div>
  );
}

export default App;
