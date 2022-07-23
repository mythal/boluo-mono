import { makeAction } from './actions';
import { store } from './store';

describe('store', () => {
  it('should get an instance', () => {
    expect(store).toBeDefined();
  });

  it('should make an action', () => {
    const action = makeAction('switchScheme', 'dark');
    expect(action).toEqual({ type: 'switchScheme', payload: 'dark' });
  });
});
