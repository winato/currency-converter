import { ChangeEvent } from 'react';
import { Input, Select } from './styled';

interface Props {
  currencies: string[];
  selectedCurrency: string;
  handleChangeCurrency: ((e: ChangeEvent<HTMLSelectElement>) => void);
  hangleChangeAmount: ((e: ChangeEvent<HTMLInputElement>) => void);
  amount: number,
  isLoading: boolean,
}

const Row = ({
  currencies,
  selectedCurrency,
  handleChangeCurrency,
  hangleChangeAmount,
  amount,
  isLoading,
}: Props) => {
  return (
    <div>
      <form noValidate autoComplete="off">
        <Input
          type="number"
          value={amount}
          onChange={hangleChangeAmount}
          disabled={isLoading}
        />
        <Select
          value={selectedCurrency}
          onChange={handleChangeCurrency}
          disabled={isLoading}
        >
          {
            currencies.map((currencyCode: string) => (
              <option
                key={currencyCode}
                value={currencyCode}
              >
                {currencyCode}
              </option>
            ))
          }
        </Select>
      </form>
    </div>
  )
}

export default Row;
