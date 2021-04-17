import axios from 'axios';
import {
  apiKey,
  alphaRatesFunction,
  alphaHistoryFunction,
} from '../constants';

interface ConverterParams {
  from_currency: string,
  to_currency: string,
}

interface HistoryParams {
  from_symbol: string,
  to_symbol: string,
}

const getExchangeRate = (payload: ConverterParams) => {
  return axios.get('https://www.alphavantage.co/query', {
    params: { 
      ...payload,
      apikey: apiKey,
      function: alphaRatesFunction,
    },
  })
}

const getDailyHistory = (payload: HistoryParams) => {
  return axios.get('https://www.alphavantage.co/query', {
    params: { 
      ...payload,
      apikey: apiKey,
      function: alphaHistoryFunction,
    },
  })
}

export {
  getExchangeRate,
  getDailyHistory,
}
