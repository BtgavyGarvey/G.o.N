/* eslint-disable */
'use client';

import * as React from 'react';
import { format, subDays, startOfToday, endOfToday, startOfMonth, endOfMonth, startOfWeek, endOfWeek } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { DayPicker, DateRange } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

import { Button } from '@/components/ui/button';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';

const SHORTCUTS = [
  {
    label: 'Today',
    range: () => ({ from: startOfToday(), to: endOfToday() }),
  },
  {
    label: 'Yesterday',
    range: () => {
      const yesterday = subDays(startOfToday(), 1);
      return { from: yesterday, to: yesterday };
    },
  },
  {
    label: 'Last 7 Days',
    range: () => ({ from: subDays(new Date(), 6), to: new Date() }),
  },
  {
    label: 'Last 30 Days',
    range: () => ({ from: subDays(new Date(), 29), to: new Date() }),
  },
  {
    label: 'This Month',
    range: () => ({ from: startOfMonth(new Date()), to: endOfMonth(new Date()) }),
  },
  {
    label: 'Last Week',
    range: () => ({
      from: startOfWeek(subDays(new Date(), 7), { weekStartsOn: 1 }),
      to: endOfWeek(subDays(new Date(), 7), { weekStartsOn: 1 }),
    }),
  },
];

export interface DateRangeValue {
  from: Date | undefined;
  to: Date | undefined;
}

interface DateRangePickerProps {
  value: DateRangeValue;
  onChange: (range: DateRangeValue) => void;
}

export function DateRangePicker({ value, onChange }: DateRangePickerProps) {
  const [open, setOpen] = React.useState(false);

  const handleShortcut = (rangeFn: () => DateRangeValue) => {
    const range = rangeFn();
    onChange(range);
    setOpen(false);
  };

  const displayText =
    value?.from && value?.to
      ? `${format(value.from, 'LLL dd, yyyy')} – ${format(value.to, 'LLL dd, yyyy')}`
      : 'Select date range';

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-[280px] justify-start text-left font-normal"
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {displayText}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-4 space-y-4">
        <div className="overflow-y-auto flex gap-2">
          {SHORTCUTS.map((shortcut) => (
            <button
              key={shortcut.label}
              onClick={() => handleShortcut(shortcut.range)}
              className="text-sm px-3 py-1.5 rounded-md bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 transition-all duration-200 border border-transparent hover:border-zinc-300 dark:hover:border-zinc-600"
            >
              {shortcut.label}
            </button>
          ))}
        </div>
        <DayPicker
          mode="range"
          numberOfMonths={2}
          selected={value}
          onSelect={(range: DateRange | undefined) => {
            if (range?.from && range?.to) {
              onChange(range as DateRangeValue);
              setOpen(false);
            }
          }}
          defaultMonth={value?.from ?? new Date()}
        />
      </PopoverContent>
    </Popover>
  );
}