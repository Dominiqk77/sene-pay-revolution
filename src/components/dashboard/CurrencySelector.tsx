
import { useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface Currency {
  code: string;
  name: string;
  symbol: string;
  flag: string;
  rate: number; // Taux par rapport au FCFA
}

interface CurrencySelectorProps {
  onCurrencyChange: (currency: Currency) => void;
  selectedCurrency?: Currency;
}

const currencies: Currency[] = [
  { code: 'XOF', name: 'Franc CFA (BCEAO)', symbol: 'FCFA', flag: '🇸🇳', rate: 1 },
  { code: 'XAF', name: 'Franc CFA (BEAC)', symbol: 'FCFA', flag: '🇨🇲', rate: 1 },
  { code: 'USD', name: 'Dollar Américain', symbol: '$', flag: '🇺🇸', rate: 0.0016 },
  { code: 'EUR', name: 'Euro', symbol: '€', flag: '🇪🇺', rate: 0.0015 },
  { code: 'GBP', name: 'Livre Sterling', symbol: '£', flag: '🇬🇧', rate: 0.0013 },
  { code: 'NGN', name: 'Naira Nigérian', symbol: '₦', flag: '🇳🇬', rate: 0.64 },
  { code: 'GHS', name: 'Cedi Ghanéen', symbol: '₵', flag: '🇬🇭', rate: 0.0095 },
  { code: 'MAD', name: 'Dirham Marocain', symbol: 'DH', flag: '🇲🇦', rate: 0.016 },
  { code: 'TND', name: 'Dinar Tunisien', symbol: 'د.ت', flag: '🇹🇳', rate: 0.005 },
  { code: 'DZD', name: 'Dinar Algérien', symbol: 'DA', flag: '🇩🇿', rate: 0.22 },
];

const CurrencySelector = ({ onCurrencyChange, selectedCurrency }: CurrencySelectorProps) => {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState<Currency>(selectedCurrency || currencies[0]);

  const handleSelect = (currency: Currency) => {
    setCurrent(currency);
    onCurrencyChange(currency);
    setOpen(false);
  };

  const formatAmount = (amount: number, currency: Currency) => {
    return `${(amount * currency.rate).toLocaleString()} ${currency.symbol}`;
  };

  return (
    <div className="space-y-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between h-11 border-gray-200 hover:border-senepay-orange"
          >
            <div className="flex items-center gap-2">
              <span className="text-lg">{current.flag}</span>
              <div className="flex flex-col items-start">
                <span className="font-medium">{current.code}</span>
                <span className="text-xs text-gray-500 truncate">{current.name}</span>
              </div>
            </div>
            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-0">
          <Command>
            <CommandInput placeholder="Rechercher une devise..." />
            <CommandList>
              <CommandEmpty>Aucune devise trouvée.</CommandEmpty>
              <CommandGroup heading="Devises Africaines" className="text-senepay-orange font-medium">
                {currencies.filter(currency => 
                  ['XOF', 'XAF', 'NGN', 'GHS', 'MAD', 'TND', 'DZD'].includes(currency.code)
                ).map((currency) => (
                  <CommandItem
                    key={currency.code}
                    value={currency.code}
                    onSelect={() => handleSelect(currency)}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{currency.flag}</span>
                      <div>
                        <div className="font-medium">{currency.code}</div>
                        <div className="text-sm text-gray-500">{currency.name}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {currency.symbol}
                      </Badge>
                      <Check
                        className={cn(
                          "h-4 w-4",
                          current.code === currency.code ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
              <CommandGroup heading="Devises Internationales">
                {currencies.filter(currency => 
                  ['USD', 'EUR', 'GBP'].includes(currency.code)
                ).map((currency) => (
                  <CommandItem
                    key={currency.code}
                    value={currency.code}
                    onSelect={() => handleSelect(currency)}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{currency.flag}</span>
                      <div>
                        <div className="font-medium">{currency.code}</div>
                        <div className="text-sm text-gray-500">{currency.name}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {currency.symbol}
                      </Badge>
                      <Check
                        className={cn(
                          "h-4 w-4",
                          current.code === currency.code ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {/* Exemple de conversion */}
      {current.code !== 'XOF' && (
        <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded">
          <div className="flex justify-between">
            <span>Exemple: 100,000 FCFA =</span>
            <span className="font-medium">{formatAmount(100000, current)}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default CurrencySelector;
export type { Currency };
