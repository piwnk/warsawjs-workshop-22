import { areValuesPositive, areCodesUnique, allItemsContainKey, areValuesStrings } from './utils';

export default class CurrencyExchange {

  constructor(data, options = { buyFee: .1, sellFee: .1 }) {

    if (!Array.isArray(data)) { throw new Error('Tablica walut nie jest tablicą'); }
    if (data.length === 0) { throw new Error('Tablica walut jest pusta'); }

    const { names, rates } = data.reduce((accum, entry) => {
      const { code, buy, sell } = entry;
      accum.names.push(code);
      accum.rates[code] = { buy, sell };
      return accum;
    }, {
      names: [],
      rates: {}
    });

    const buys = data.map(item => item.buy);
    const sells = data.map(item => item.sell);

    const { buyFee, sellFee } = options;


    if (buyFee < .1) { throw new Error('sellFee jest za małe'); }
    if (sellFee < .1) { throw new Error('sellFee jest za małe'); }


    if (areValuesStrings(names)) { throw new Error('Nie wszystkie kody są stringami'); }

    if (areCodesUnique(data)) {
      throw new Error('Kody walut nie są unikalne');
    }

    if (areValuesPositive(buys)) {
      throw new Error('Nie wszystkie wartości BUY są dodatnie');
    }

    if (areValuesPositive(sells)) {
      throw new Error('Nie wszystkie wartości SELL są dodatnie');
    }

    if (allItemsContainKey(data, 'code')) {
      throw new Error('Brakuje kodu waluty');
    }

    if (allItemsContainKey(data, 'buy')) {
      throw new Error('Brakuje klucza BUY');
    }

    if (allItemsContainKey(data, 'sell')) {
      throw new Error('Brakuje klucza SELL');
    }

    this.currencies = names;
    this.rates = rates;
    this.buyFee = buyFee;
    this.sellFee = sellFee;
  }

  getCurrencyList() {
    return this.currencies;
  }

  getCurrencyRate(code) {
    return this.rates[code];
  }

  buy(currency, amount) {
    const amountNum = Number(amount);
    if (!this.rates[currency] || isNaN(amountNum) || amountNum <= 0) {
      throw new Error('Invalid currency or amount');
    }
    return this.rates[currency].buy * amount + this.buyFee;
  }

  sell(currency, amount) {
    const amountNum = Number(amount);
    if (!this.rates[currency] || isNaN(amountNum) || amountNum <= 0) {
      throw new Error('Invalid currency or amount');
    }
    return this.rates[currency].sell * amount - this.sellFee;
  }
}
