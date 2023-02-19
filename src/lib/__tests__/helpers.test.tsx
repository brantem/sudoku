import { cn, getTimeDiff, padStart } from 'lib/helpers';

test('cn', () => {
  expect(cn('text-red', { 'text-black': true })).toEqual('text-black');
});

test('getTimeDiff', () => {
  const a = new Date();
  a.setHours(a.getHours() - 1);
  a.setMinutes(a.getMinutes() - 1);
  a.setSeconds(a.getSeconds() - 1);
  expect(getTimeDiff(a.getTime(), Date.now())).toEqual({ hours: 1, minutes: 1, seconds: 1 });
});

test('padStart', () => {
  expect(padStart(1)).toEqual('01');
});
