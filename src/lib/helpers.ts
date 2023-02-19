import { twMerge } from 'tailwind-merge';
import clsx, { ClassValue } from 'clsx';

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const getTimeDiff = (a: number, b: number) => {
  const v = b - a;
  return {
    hours: Math.floor(v / (1000 * 60 * 60)),
    minutes: Math.floor((v % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((v % (1000 * 60)) / 1000),
  };
};

export const padStart = (s: number, maxLength = 2, fillString = '0') => {
  return String.prototype.padStart.call(s, maxLength, fillString);
};
