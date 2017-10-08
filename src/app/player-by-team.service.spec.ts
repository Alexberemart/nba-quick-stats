import { TestBed, inject } from '@angular/core/testing';

import { PlayerByTeamService } from './player-by-team.service';

describe('PlayerByTeamService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlayerByTeamService]
    });
  });

  it('should be created', inject([PlayerByTeamService], (service: PlayerByTeamService) => {
    expect(service).toBeTruthy();
  }));
});
