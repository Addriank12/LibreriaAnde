import { FilterByUsernamePipe } from './filter-by-username.pipe';

describe('FilterByUsernamePipe', () => {
  it('create an instance', () => {
    const pipe = new FilterByUsernamePipe();
    expect(pipe).toBeTruthy();
  });
});
