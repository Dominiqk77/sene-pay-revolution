
import React, { useState } from 'react';
import { Filter, RotateCcw, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import SearchBar from './SearchBar';
import DateRangeFilter from './DateRangeFilter';
import CurrencySelector from './CurrencySelector';

interface FilterState {
  search: string;
  dateRange: { from: Date; to: Date } | null;
  currency: { code: string; name: string; symbol: string; flag: string; rate: number };
  status: string[];
  paymentMethods: string[];
  amountRange: { min: number; max: number } | null;
}

interface AdvancedFiltersProps {
  onFiltersChange: (filters: FilterState) => void;
}

const AdvancedFilters: React.FC<AdvancedFiltersProps> = ({ onFiltersChange }) => {
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    dateRange: null,
    currency: { code: 'XOF', name: 'Franc CFA', symbol: 'FCFA', flag: '🇸🇳', rate: 1 },
    status: [],
    paymentMethods: [],
    amountRange: null
  });

  const [showAdvanced, setShowAdvanced] = useState(false);

  const updateFilters = (newFilters: Partial<FilterState>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    onFiltersChange(updatedFilters);
  };

  const resetFilters = () => {
    const defaultFilters: FilterState = {
      search: '',
      dateRange: null,
      currency: { code: 'XOF', name: 'Franc CFA', symbol: 'FCFA', flag: '🇸🇳', rate: 1 },
      status: [],
      paymentMethods: [],
      amountRange: null
    };
    setFilters(defaultFilters);
    onFiltersChange(defaultFilters);
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.search) count++;
    if (filters.dateRange) count++;
    if (filters.currency.code !== 'XOF') count++;
    if (filters.status.length > 0) count++;
    if (filters.paymentMethods.length > 0) count++;
    if (filters.amountRange) count++;
    return count;
  };

  const statusOptions = [
    { value: 'completed', label: 'Confirmées', color: 'bg-green-500' },
    { value: 'pending', label: 'En attente', color: 'bg-orange-500' },
    { value: 'failed', label: 'Échouées', color: 'bg-red-500' },
    { value: 'cancelled', label: 'Annulées', color: 'bg-gray-500' }
  ];

  const paymentMethodOptions = [
    { value: 'orange_money', label: 'Orange Money', color: 'bg-orange-500' },
    { value: 'wave', label: 'Wave', color: 'bg-blue-500' },
    { value: 'free_money', label: 'Free Money', color: 'bg-purple-500' },
    { value: 'wizall', label: 'Wizall', color: 'bg-green-500' },
    { value: 'visa_card', label: 'Visa Card', color: 'bg-blue-600' },
    { value: 'mastercard', label: 'Mastercard', color: 'bg-red-600' }
  ];

  return (
    <Card className="mb-6">
      <CardContent className="p-4">
        {/* Filtres principaux */}
        <div className="flex flex-wrap gap-4 items-center justify-between mb-4">
          <div className="flex flex-wrap gap-3 items-center flex-1">
            <SearchBar
              onSearch={(query) => updateFilters({ search: query })}
              placeholder="Rechercher transactions, clients, montants..."
            />
            
            <DateRangeFilter
              onDateRangeChange={(range) => updateFilters({ dateRange: range })}
            />
            
            <CurrencySelector
              selectedCurrency={filters.currency}
              onCurrencyChange={(currency) => updateFilters({ currency })}
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="flex items-center gap-2"
            >
              <Filter className="h-4 w-4" />
              Filtres avancés
              {getActiveFiltersCount() > 0 && (
                <Badge className="bg-senepay-orange text-white ml-1">
                  {getActiveFiltersCount()}
                </Badge>
              )}
            </Button>
            
            {getActiveFiltersCount() > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={resetFilters}
                className="flex items-center gap-2"
              >
                <RotateCcw className="h-4 w-4" />
                Réinitialiser
              </Button>
            )}
            
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Exporter
            </Button>
          </div>
        </div>

        {/* Filtres avancés */}
        {showAdvanced && (
          <div className="border-t pt-4 space-y-4">
            {/* Filtres par statut */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Statut des transactions
              </label>
              <div className="flex flex-wrap gap-2">
                {statusOptions.map((status) => (
                  <button
                    key={status.value}
                    onClick={() => {
                      const newStatus = filters.status.includes(status.value)
                        ? filters.status.filter(s => s !== status.value)
                        : [...filters.status, status.value];
                      updateFilters({ status: newStatus });
                    }}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                      filters.status.includes(status.value)
                        ? `${status.color} text-white`
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {status.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Filtres par méthode de paiement */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Méthodes de paiement
              </label>
              <div className="flex flex-wrap gap-2">
                {paymentMethodOptions.map((method) => (
                  <button
                    key={method.value}
                    onClick={() => {
                      const newMethods = filters.paymentMethods.includes(method.value)
                        ? filters.paymentMethods.filter(m => m !== method.value)
                        : [...filters.paymentMethods, method.value];
                      updateFilters({ paymentMethods: newMethods });
                    }}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                      filters.paymentMethods.includes(method.value)
                        ? `${method.color} text-white`
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {method.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Filtre par montant */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Montant minimum ({filters.currency.symbol})
                </label>
                <input
                  type="number"
                  placeholder="0"
                  className="w-full p-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-senepay-orange/50"
                  onChange={(e) => {
                    const min = parseFloat(e.target.value) || 0;
                    updateFilters({
                      amountRange: { 
                        min, 
                        max: filters.amountRange?.max || 1000000 
                      }
                    });
                  }}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Montant maximum ({filters.currency.symbol})
                </label>
                <input
                  type="number"
                  placeholder="1000000"
                  className="w-full p-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-senepay-orange/50"
                  onChange={(e) => {
                    const max = parseFloat(e.target.value) || 1000000;
                    updateFilters({
                      amountRange: { 
                        min: filters.amountRange?.min || 0, 
                        max 
                      }
                    });
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Résumé des filtres actifs */}
        {getActiveFiltersCount() > 0 && (
          <div className="mt-4 pt-4 border-t">
            <div className="flex flex-wrap gap-2 text-sm">
              <span className="text-gray-600">Filtres actifs :</span>
              {filters.search && (
                <Badge variant="outline">Recherche: "{filters.search}"</Badge>
              )}
              {filters.dateRange && (
                <Badge variant="outline">
                  Période: {filters.dateRange.from.toLocaleDateString()} - {filters.dateRange.to.toLocaleDateString()}
                </Badge>
              )}
              {filters.currency.code !== 'XOF' && (
                <Badge variant="outline">
                  Devise: {filters.currency.flag} {filters.currency.symbol}
                </Badge>
              )}
              {filters.status.length > 0 && (
                <Badge variant="outline">
                  Statuts: {filters.status.length}
                </Badge>
              )}
              {filters.paymentMethods.length > 0 && (
                <Badge variant="outline">
                  Méthodes: {filters.paymentMethods.length}
                </Badge>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AdvancedFilters;
