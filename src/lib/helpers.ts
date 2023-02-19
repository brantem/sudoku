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

export const shuffle = <T>(a: T[]): T[] => {
  const b = [...a];
  for (let i = b.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [b[i], b[j]] = [b[j], b[i]];
  }
  return b;
};
