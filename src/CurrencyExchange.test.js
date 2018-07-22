import CurrencyExchange from './CurrencyExchange';

let exchange;


// test('CurrencyExchange powinien być klasą', () => {
//   expect(CurrencyExchange.toString()).toContain('class');
// });

describe('data test', () => {

  test('Tablica zawiera code, buy, sell', () => {
    expect(() => {
      exchange = new CurrencyExchange([
        { codeX: 'USD', sellX: 3, buyX: 4 }
      ]);
    }).toThrowError();
  });

  test('Kod waluty jest tekstem', () => {
    expect(() => {
      new CurrencyExchange([
        { code: 5, buy: 3, sell: 4 }
      ]);
    }).toThrowError();
  });

  test('tablica nie jest pusta', () => {
    expect(() => {
      new CurrencyExchange([]);
    }).toThrowError();
  });

  test('kody walut są unikalne', () => {
    expect(() => {
      new CurrencyExchange([
        { code: 'USD', buy: 3, sell: 5 },
        { code: 'USD', buy: 3, sell: 5 },
      ]);
    }).toThrowError();
  });

  test('wartości BUY są dodatnie', () => {
    expect(() => {
      new CurrencyExchange([
        { code: 'USD', buy: -3, sell: 5 },
        { code: 'USD', buy: 3, sell: -5 },
      ]);
    }).toThrowError();
  });
});


describe('Dane są poprawne', () => {

  beforeEach(() => {
    exchange = new CurrencyExchange([
      { code: 'USD', buy: 3, sell: 4 },
      { code: 'EUR', buy: 4, sell: 5 }
    ]);
  });

  afterEach(() => {
    exchange = undefined;
  });

  describe('getCurrencyList', () => {

    test('getCurrencyList jest funkcją', () => {
      expect(typeof exchange.getCurrencyList).toEqual('function');
    });

    test('getCurrencyList zwraca listę walut', () => {
      expect(exchange.getCurrencyList()).toEqual(['USD', 'EUR']);
    });
  });

  describe('getCurrencyRate', () => {
    test('powinna być funkcja', () => {
      expect(typeof exchange.getCurrencyRate).toEqual('function');
    });

    test('zwraca kurs wymiany dla danej waluty', () => {
      expect(exchange.getCurrencyRate('USD')).toEqual({
        buy: 3,
        sell: 4
      });
    });
  });

  describe('buy, sell', () => {
    test.each([
      ['USD', '123a'],
      [undefined, undefined],
      [-100, undefined],
      ['EUR', undefined],
      ['EUR', -100]
    ])('rzuca wyjątek, gdy wartości buy lub sell są niepoprawne (%p %p)', (...args) => {
      expect(() => exchange.buy(...args)).toThrowError();
      expect(() => exchange.sell(...args)).toThrowError();
    });
    test('zwraca poprawną wartość buy, sell', () => {
      expect(exchange.buy('EUR', 10)).toBeCloseTo(40.10, 2);
      expect(exchange.sell('EUR', 10)).toBeCloseTo(49.90, 2);
    });

    test('buySell za małe', () => {
      expect(() => {
        exchange = new CurrencyExchange([
          { code: 'USD', buy: 3, sell: 5 },
        ], {
          buyFee: .09,
          sellFee: .09
        });
      }).toThrowError();
    });
  });
});
