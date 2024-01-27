import { Test, TestingModule } from '@nestjs/testing';
import { PollingOptionsController } from './polling-options.controller';
import { PollingOptionsService } from './polling-options.service';

describe('PollingOptionsController', () => {
  let controller: PollingOptionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PollingOptionsController],
      providers: [PollingOptionsService],
    }).compile();

    controller = module.get<PollingOptionsController>(PollingOptionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
