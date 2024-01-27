import { Test, TestingModule } from '@nestjs/testing';
import { PollingOptionsService } from './polling-options.service';

describe('PollingOptionsService', () => {
  let service: PollingOptionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PollingOptionsService],
    }).compile();

    service = module.get<PollingOptionsService>(PollingOptionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
