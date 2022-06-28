import ConverterController from '@/controllers/converter.controller';
import { Routes } from '@interfaces/routes.interface';
import { Router } from 'express';

class ConverterRoute implements Routes {
  public path = '/converter/';
  public router = Router();
  public converterController = new ConverterController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.converterController.list);
  }
}

export default ConverterRoute;
