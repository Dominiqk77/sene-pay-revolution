
import React, { useState } from 'react';
import { ChevronDown, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';

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
  { code: 'XOF', name: 'Franc CFA', symbol: 'FCFA', flag: '🇸🇳', rate: 1 },
  { code: 'EUR', name: 'Euro', symbol: '€', flag: '🇪🇺', rate: 0.0015 },
  { code: 'USD', name: 'Dollar US', symbol: '$', flag: '🇺🇸', rate: 0.0017 },
  { code: 'GBP', name: 'Livre Sterling', symbol: '£', flag: '🇬🇧', rate: 0.0013 },
  { code: 'CAD', name: 'Dollar Canadien', symbol: 'C$', flag: '🇨🇦', rate: 0.0022 },
  { code: 'CHF', name: 'Franc Suisse', symbol: 'CHF', flag: '🇨🇭', rate: 0.0015 },
  { code: 'JPY', name: 'Yen Japonais', symbol: '¥', flag: '🇯🇵', rate: 0.25 },
  { code: 'CNY', name: 'Yuan Chinois', symbol: '¥', flag: '🇨🇳', rate: 0.012 },
  { code: 'NGN', name: 'Naira Nigérian', symbol: '₦', flag: '🇳🇬', rate: 1.3 },
  { code: 'GHS', name: 'Cedi Ghanéen', symbol: '₵', flag: '🇬🇭', rate: 0.019 },
  { code: 'MAD', name: 'Dirham Marocain', symbol: 'DH', flag: '🇲🇦', rate: 0.017 },
  { code: 'TND', name: 'Dinar Tunisien', symbol: 'د.ت', flag: '🇹🇳', rate: 0.0052 }
];

const CurrencySelector: React.FC<CurrencySelectorProps> = ({ 
  onCurrencyChange, 
  selectedCurrency = currencies[0] // FCFA par défaut
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCurrencies = currencies.filter(currency =>
    currency.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    currency.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCurrencySelect = (currency: Currency) => {
    onCurrencyChange(currency);
    setIsOpen(false);
    setSearchTerm('');
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2 min-w-[140px] justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg">{selectedCurrency.flag}</span>
            <span className="font-medium">{selectedCurrency.symbol}</span>
            <span className="text-sm text-gray-500">{selectedCurrency.code}</span>
          </div>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="p-3">
          <div className="flex items-center gap-2 mb-3">
            <DollarSign className="h-4 w-4 text-senepay-orange" />
            <h4 className="font-medium">Sélectionner une devise</h4>
          </div>
          
          {/* Barre de recherche */}
          <input
            type="text"
            placeholder="Rechercher une devise..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 border rounded-md text-sm mb-3 focus:outline-none focus:ring-2 focus:ring-senepay-orange/50"
          />
          
          {/* Liste des devises */}
          <div className="max-h-60 overflow-y-auto space-y-1">
            {filteredCurrencies.map((currency) => (
              <button
                key={currency.code}
                onClick={() => handleCurrencySelect(currency)}
                className={`w-full flex items-center justify-between p-2 rounded-md hover:bg-gray-50 transition-colors ${
                  selectedCurrency.code === currency.code ? 'bg-senepay-orange/10 border border-senepay-orange/20' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{currency.flag}</span>
                  <div className="text-left">
                    <div className="font-medium text-sm">{currency.name}</div>
                    <div className="text-xs text-gray-500">{currency.code}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-sm">{currency.symbol}</div>
                  {currency.code !== 'XOF' && (
                    <div className="text-xs text-gray-500">
                      1 FCFA = {currency.rate.toFixed(4)} {currency.symbol}
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
          
          {/* Message si FCFA sélectionné */}
          {selectedCurrency.code === 'XOF' && (
            <div className="mt-3 p-2 bg-green-50 border border-green-200 rounded-md">
              <Badge className="bg-green-500 text-white mb-1">
                Devise par défaut
              </Badge>
              <p className="text-xs text-green-700">
                Le Franc CFA (FCFA) est la devise principale de SenePay
              </p>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default CurrencySelector;
