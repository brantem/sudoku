import { cn } from 'lib/helpers';

test('cn', () => {
  expect(cn('text-red', { 'text-black': true })).toEqual('text-black');
});
