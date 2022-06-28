import { NextFunction, Request, Response } from 'express';
import CoinGeckoService from '@services/coinGecko.service';
import FiatService from '@services/Fiat.service';

class ConverterController {
  private coinGeckoService = new CoinGeckoService();
  private fiatService = new FiatService();

  public list = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { type } = req.query;
      if ('FIAT' === type) res.status(200).json({ data: await this.fiatService.getFiatList() });
      else res.status(200).json({ data: await this.coinGeckoService.listAllCryptoCurrencies() });
    } catch (error) {
      next(error);
    }
  };
}

export default ConverterController;
