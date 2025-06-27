
import { useState } from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Calendar, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface DateRangeFilterProps {
  onDateRangeChange: (startDate: Date | null, endDate: Date | null) => void;
}

const DateRangeFilter = ({ onDateRangeChange }: DateRangeFilterProps) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const quickRanges = [
    { label: "Aujourd'hui", days: 0 },
    { label: "7 derniers jours", days: 7 },
    { label: "30 derniers jours", days: 30 },
    { label: "90 derniers jours", days: 90 },
    { label: "Cette année", days: 365 },
  ];

  const handleQuickRange = (days: number) => {
    const end = new Date();
    const start = days === 0 ? new Date() : new Date(Date.now() - days * 24 * 60 * 60 * 1000);
    
    setStartDate(start);
    setEndDate(end);
    onDateRangeChange(start, end);
    setIsOpen(false);
  };

  const handleDateSelect = (date: Date | undefined, type: 'start' | 'end') => {
    if (!date) return;
    
    if (type === 'start') {
      setStartDate(date);
      onDateRangeChange(date, endDate);
    } else {
      setEndDate(date);
      onDateRangeChange(startDate, date);
    }
  };

  const clearDates = () => {
    setStartDate(null);
    setEndDate(null);
    onDateRangeChange(null, null);
  };

  const formatDateRange = () => {
    if (!startDate && !endDate) return "Sélectionner une période";
    if (startDate && !endDate) return `Depuis ${format(startDate, 'dd MMM yyyy', { locale: fr })}`;
    if (!startDate && endDate) return `Jusqu'au ${format(endDate, 'dd MMM yyyy', { locale: fr })}`;
    if (startDate && endDate) {
      return `${format(startDate, 'dd MMM', { locale: fr })} - ${format(endDate, 'dd MMM yyyy', { locale: fr })}`;
    }
    return "Sélectionner une période";
  };

  return (
    <div className="space-y-2">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full justify-between h-11 border-gray-200",
              (startDate || endDate) && "border-senepay-orange text-senepay-orange"
            )}
          >
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              <span className="truncate">{formatDateRange()}</span>
            </div>
            <ChevronDown className="h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <div className="flex">
            {/* Raccourcis de période */}
            <div className="border-r p-3 space-y-1">
              <div className="text-sm font-medium mb-2">Raccourcis</div>
              {quickRanges.map((range) => (
                <Button
                  key={range.label}
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start text-xs"
                  onClick={() => handleQuickRange(range.days)}
                >
                  {range.label}
                </Button>
              ))}
              {(startDate || endDate) && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start text-xs text-red-500 hover:text-red-600"
                  onClick={clearDates}
                >
                  Effacer
                </Button>
              )}
            </div>

            {/* Calendriers */}
            <div className="flex">
              <div className="p-3">
                <div className="text-sm font-medium mb-2">Date de début</div>
                <CalendarComponent
                  mode="single"
                  selected={startDate}
                  onSelect={(date) => handleDateSelect(date, 'start')}
                  className="rounded-md border-0"
                />
              </div>
              <div className="p-3 border-l">
                <div className="text-sm font-medium mb-2">Date de fin</div>
                <CalendarComponent
                  mode="single"
                  selected={endDate}
                  onSelect={(date) => handleDateSelect(date, 'end')}
                  className="rounded-md border-0"
                />
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>

      {/* Badges des dates sélectionnées */}
      {(startDate || endDate) && (
        <div className="flex flex-wrap gap-1">
          {startDate && (
            <Badge variant="secondary" className="text-xs">
              Début: {format(startDate, 'dd/MM/yy', { locale: fr })}
            </Badge>
          )}
          {endDate && (
            <Badge variant="secondary" className="text-xs">
              Fin: {format(endDate, 'dd/MM/yy', { locale: fr })}
            </Badge>
          )}
        </div>
      )}
    </div>
  );
};

export default DateRangeFilter;
