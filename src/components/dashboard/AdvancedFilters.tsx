
import { useState } from 'react';
import { Filter, RotateCcw, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import SearchBar from './SearchBar';
import DateRangeFilter from './DateRangeFilter';
import CurrencySelector, { Currency } from './CurrencySelector';

interface AdvancedFiltersProps {
  onFiltersChange: (filters: any) => void;
}

const AdvancedFilters = ({ onFiltersChange }: AdvancedFiltersProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    startDate: null as Date | null,
    endDate: null as Date | null,
    currency: null as Currency | null,
    status: '',
    paymentMethod: '',
    amountRange: { min: '', max: '' }
  });

  const paymentMethods = [
    { value: 'orange_money', label: 'Orange Money', icon: '🟠' },
    { value: 'wave', label: 'Wave', icon: '🌊' },
    { value: 'free_money', label: 'Free Money', icon: '💜' },
    { value: 'wizall', label: 'Wizall', icon: '💚' },
    { value: 'visa_card', label: 'Visa Card', icon: '💳' },
    { value: 'mastercard', label: 'Mastercard', icon: '💳' },
  ];

  const statuses = [
    { value: 'completed', label: 'Complété', color: 'bg-green-500' },
    { value: 'pending', label: 'En attente', color: 'bg-yellow-500' },
    { value: 'failed', label: 'Échoué', color: 'bg-red-500' },
    { value: 'cancelled', label: 'Annulé', color: 'bg-gray-500' },
  ];

  const updateFilters = (key: string, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const resetFilters = () => {
    const emptyFilters = {
      search: '',
      startDate: null,
      endDate: null,
      currency: null,
      status: '',
      paymentMethod: '',
      amountRange: { min: '', max: '' }
    };
    setFilters(emptyFilters);
    onFiltersChange(emptyFilters);
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.search) count++;
    if (filters.startDate || filters.endDate) count++;
    if (filters.currency) count++;
    if (filters.status) count++;
    if (filters.paymentMethod) count++;
    if (filters.amountRange.min || filters.amountRange.max) count++;
    return count;
  };

  const activeFiltersCount = getActiveFiltersCount();

  return (
    <Card>
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CardHeader className="pb-3">
          <CollapsibleTrigger asChild>
            <div className="flex items-center justify-between cursor-pointer">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Filter className="h-5 w-5 text-senepay-orange" />
                Filtres Avancés
                {activeFiltersCount > 0 && (
                  <Badge className="bg-senepay-orange text-white ml-2">
                    {activeFiltersCount}
                  </Badge>
                )}
              </CardTitle>
              <div className="flex items-center gap-2">
                {activeFiltersCount > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      resetFilters();
                    }}
                    className="text-red-500 hover:text-red-600"
                  >
                    <RotateCcw className="h-4 w-4 mr-1" />
                    Réinitialiser
                  </Button>
                )}
                <Settings className="h-4 w-4 text-gray-400" />
              </div>
            </div>
          </CollapsibleTrigger>
        </CardHeader>

        <CollapsibleContent>
          <CardContent className="space-y-6">
            {/* Barre de recherche */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Recherche Globale
              </label>
              <SearchBar
                onSearch={(query) => updateFilters('search', query)}
                value={filters.search}
              />
            </div>

            {/* Filtres en grille */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Filtre de date */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Période
                </label>
                <DateRangeFilter
                  onDateRangeChange={(startDate, endDate) => {
                    updateFilters('startDate', startDate);
                    updateFilters('endDate', endDate);
                  }}
                />
              </div>

              {/* Sélecteur de devise */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Devise d'affichage
                </label>
                <CurrencySelector
                  onCurrencyChange={(currency) => updateFilters('currency', currency)}
                  selectedCurrency={filters.currency}
                />
              </div>

              {/* Statut */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Statut
                </label>
                <Select
                  value={filters.status}
                  onValueChange={(value) => updateFilters('status', value)}
                >
                  <SelectTrigger className="h-11">
                    <SelectValue placeholder="Tous les statuts" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Tous les statuts</SelectItem>
                    {statuses.map((status) => (
                      <SelectItem key={status.value} value={status.value}>
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${status.color}`} />
                          {status.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Méthode de paiement */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Méthode de paiement
                </label>
                <Select
                  value={filters.paymentMethod}
                  onValueChange={(value) => updateFilters('paymentMethod', value)}
                >
                  <SelectTrigger className="h-11">
                    <SelectValue placeholder="Toutes les méthodes" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Toutes les méthodes</SelectItem>
                    {paymentMethods.map((method) => (
                      <SelectItem key={method.value} value={method.value}>
                        <div className="flex items-center gap-2">
                          <span>{method.icon}</span>
                          {method.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Plage de montants */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Montant (FCFA)
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    className="flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={filters.amountRange.min}
                    onChange={(e) => updateFilters('amountRange', { ...filters.amountRange, min: e.target.value })}
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    className="flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={filters.amountRange.max}
                    onChange={(e) => updateFilters('amountRange', { ...filters.amountRange, max: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {/* Résumé des filtres actifs */}
            {activeFiltersCount > 0 && (
              <div className="pt-4 border-t">
                <div className="flex flex-wrap gap-2">
                  <span className="text-sm text-gray-600">Filtres actifs:</span>
                  {filters.search && (
                    <Badge variant="secondary">Recherche: "{filters.search}"</Badge>
                  )}
                  {(filters.startDate || filters.endDate) && (
                    <Badge variant="secondary">Période sélectionnée</Badge>
                  )}
                  {filters.currency && (
                    <Badge variant="secondary">
                      {filters.currency.flag} {filters.currency.code}
                    </Badge>
                  )}
                  {filters.status && (
                    <Badge variant="secondary">
                      Statut: {statuses.find(s => s.value === filters.status)?.label}
                    </Badge>
                  )}
                  {filters.paymentMethod && (
                    <Badge variant="secondary">
                      Méthode: {paymentMethods.find(m => m.value === filters.paymentMethod)?.label}
                    </Badge>
                  )}
                  {(filters.amountRange.min || filters.amountRange.max) && (
                    <Badge variant="secondary">Montant filtré</Badge>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};

export default AdvancedFilters;
