import { forwardRef } from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';
import { CheckIcon } from '@heroicons/react/20/solid';

import { cn } from 'lib/helpers';

type OptionProps = {
  value: string;
  children: React.ReactNode;
};

export const Option = forwardRef<HTMLDivElement, OptionProps>(({ value, children }, forwardedRef) => {
  return (
    <SelectPrimitive.Item
      ref={forwardedRef}
      className={cn(
        'relative flex h-8 select-none items-center pl-6 pr-3 text-sm leading-none data-[highlighted]:bg-neutral-100 data-[highlighted]:outline-none',
        'dark:text-white dark:data-[highlighted]:bg-neutral-900',
      )}
      value={value}
    >
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator className="absolute left-0 inline-flex w-6 items-center justify-center">
        <CheckIcon className="h-4 w-4" />
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  );
});
Option.displayName = 'Option';

type SelectProps = {
  value: string;
  renderValue?: (value: string) => React.ReactNode;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  children: React.ReactNode;
};

const Select = ({ value, renderValue, onChange, label, placeholder, children }: SelectProps) => {
  return (
    <SelectPrimitive.Root value={value} onValueChange={onChange}>
      <SelectPrimitive.Trigger
        className={cn(
          'flex h-8 items-center rounded-full border border-neutral-200 bg-white px-3 hover:bg-neutral-100',
          'dark:border-neutral-800 dark:bg-neutral-900 dark:hover:bg-neutral-800',
        )}
        aria-label={label}
      >
        {renderValue ? (
          <SelectPrimitive.Value placeholder={placeholder}>{renderValue(value)}</SelectPrimitive.Value>
        ) : (
          <SelectPrimitive.Value placeholder={placeholder} />
        )}
      </SelectPrimitive.Trigger>
      <SelectPrimitive.Portal>
        <SelectPrimitive.Content
          className={cn('rounded-md border border-neutral-200 bg-white', 'dark:border-neutral-800 dark:bg-black')}
        >
          <SelectPrimitive.Viewport>{children}</SelectPrimitive.Viewport>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );
};

export default Select;
