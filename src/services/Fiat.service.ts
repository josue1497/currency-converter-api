import { request } from '../utils/util';

class FiatService {
  private MAIN_CURRENCY_PATH = '/currency_data';
  private url: string;
  private apiKey: string;
  private headers: Object;
  constructor() {
    this.url = process.env.CURRENCY_LAYER_API;
    this.apiKey = process.env.CURRENCY_LAYER_API_KEY;
    this.headers = {
      'Content-Type': 'application/json',
      apiKey: this.apiKey,
    };
  }

  public async getFiatList(): Promise<any> {
    const { success, currencies } = await request({
      baseURL: this.url,
      url: `${this.MAIN_CURRENCY_PATH}/list`,
      headers: this.headers,
    });
    return !success ? [] : this.mapCurrencies(currencies);
  }

  private async mapCurrencies(currencies: any) {
    const curreciesKeys = Object.keys(currencies);
    const USD_SOURCE = 'USD';
    const prices = await this.getFiatValueBySource(USD_SOURCE, curreciesKeys.join(','));
    return curreciesKeys.map(key => ({ symbol: key, name: currencies[key], current_price: prices[`${USD_SOURCE}${key}`] }));
  }

  public async getFiatValueBySource(_source = 'USD', currencies: string): Promise<any> {
    const { success, quotes } = await request({
      baseURL: this.url,
      url: `${this.MAIN_CURRENCY_PATH}/live?source=${_source}&currencies=${currencies}`,
      headers: this.headers,
    });
    return !success ? {} : quotes;
  }
}

export default FiatService;
