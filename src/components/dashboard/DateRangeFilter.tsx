
import React, { useState } from 'react';
import { Calendar, CalendarDays } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { format, subDays, startOfMonth, endOfMonth, subMonths } from 'date-fns';
import { fr } from 'date-fns/locale';

interface DateRange {
  from: Date;
  to: Date;
}

interface DateRangeFilterProps {
  onDateRangeChange: (range: DateRange | null) => void;
}

const DateRangeFilter: React.FC<DateRangeFilterProps> = ({ onDateRangeChange }) => {
  const [dateRange, setDateRange] = useState<DateRange | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const quickRanges = [
    {
      label: "Aujourd'hui",
      range: { from: new Date(), to: new Date() }
    },
    {
      label: "7 derniers jours",
      range: { from: subDays(new Date(), 7), to: new Date() }
    },
    {
      label: "30 derniers jours",
      range: { from: subDays(new Date(), 30), to: new Date() }
    },
    {
      label: "Ce mois",
      range: { from: startOfMonth(new Date()), to: endOfMonth(new Date()) }
    },
    {
      label: "Mois dernier",
      range: { 
        from: startOfMonth(subMonths(new Date(), 1)), 
        to: endOfMonth(subMonths(new Date(), 1)) 
      }
    }
  ];

  const handleQuickRange = (range: DateRange) => {
    setDateRange(range);
    onDateRangeChange(range);
    setIsOpen(false);
  };

  const formatDateRange = () => {
    if (!dateRange) return "Sélectionner une période";
    
    if (dateRange.from.toDateString() === dateRange.to.toDateString()) {
      return format(dateRange.from, 'dd MMM yyyy', { locale: fr });
    }
    
    return `${format(dateRange.from, 'dd MMM', { locale: fr })} - ${format(dateRange.to, 'dd MMM yyyy', { locale: fr })}`;
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          className="flex items-center gap-2 min-w-[200px] justify-start"
        >
          <Calendar className="h-4 w-4" />
          {formatDateRange()}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <div className="flex">
          {/* Raccourcis rapides */}
          <div className="p-3 border-r bg-gray-50 min-w-[160px]">
            <h4 className="font-medium text-sm mb-3 flex items-center gap-2">
              <CalendarDays className="h-4 w-4" />
              Raccourcis
            </h4>
            <div className="space-y-1">
              {quickRanges.map((quick, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickRange(quick.range)}
                  className="block w-full text-left px-2 py-1.5 text-sm hover:bg-white rounded transition-colors"
                >
                  {quick.label}
                </button>
              ))}
            </div>
            
            {dateRange && (
              <div className="mt-4 pt-3 border-t">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setDateRange(null);
                    onDateRangeChange(null);
                    setIsOpen(false);
                  }}
                  className="w-full text-xs"
                >
                  Effacer
                </Button>
              </div>
            )}
          </div>
          
          {/* Calendrier */}
          <div className="p-3">
            <CalendarComponent
              initialFocus
              mode="range"
              defaultMonth={dateRange?.from}
              selected={dateRange ? { from: dateRange.from, to: dateRange.to } : undefined}
              onSelect={(range) => {
                if (range?.from && range?.to) {
                  const newRange = { from: range.from, to: range.to };
                  setDateRange(newRange);
                  onDateRangeChange(newRange);
                }
              }}
              numberOfMonths={2}
              locale={fr}
            />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default DateRangeFilter;
