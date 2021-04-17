import React from 'react';
import { Input, Select } from './styled';

interface Props {
  currencies: string[];
  selectedCurrency: string;
  handleChange: ((event: any) => void);
  hangleChangeAmount: ((event: any) => void);
  amount: number,
  isLoading: boolean,
}

const Row = ({
  currencies,
  selectedCurrency,
  handleChange,
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
          onChange={handleChange}
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
