import CoinGecko from 'coingecko-api';
class CoinGeckoService {
  CoinGeckoClient = new CoinGecko();

  public ping(): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        resolve(this.CoinGeckoClient.ping());
      } catch (error) {
        reject(error);
      }
    });
  }

  public listAllCryptoCurrencies(): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const { success, data } = await this.CoinGeckoClient.coins.markets();
        if (success) {
          resolve(!Array.isArray(data) ? [] : data.map(({ id, symbol, name, image, current_price }) => ({ id, symbol, name, image, current_price })));
        }
        resolve([]);
      } catch (error) {
        reject(error);
      }
    });
  }
}

export default CoinGeckoService;
