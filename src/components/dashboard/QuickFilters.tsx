
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Filter, 
  Search, 
  Calendar, 
  CreditCard, 
  X,
  TrendingUp,
  Clock
} from 'lucide-react';

interface FilterState {
  search: string;
  status: string;
  paymentMethod: string;
  dateRange: string;
  amountRange: string;
}

interface QuickFiltersProps {
  onFiltersChange: (filters: FilterState) => void;
}

const QuickFilters = ({ onFiltersChange }: QuickFiltersProps) => {
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    status: 'all',
    paymentMethod: 'all',
    dateRange: 'all',
    amountRange: 'all'
  });

  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const updateFilter = (key: keyof FilterState, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);

    // Mettre à jour les filtres actifs
    const active = Object.entries(newFilters)
      .filter(([k, v]) => v !== '' && v !== 'all')
      .map(([k]) => k);
    setActiveFilters(active);
  };

  const clearFilters = () => {
    const clearedFilters = {
      search: '',
      status: 'all',
      paymentMethod: 'all',
      dateRange: 'all',
      amountRange: 'all'
    };
    setFilters(clearedFilters);
    setActiveFilters([]);
    onFiltersChange(clearedFilters);
  };

  const quickFilters = [
    { label: 'Aujourd\'hui', action: () => updateFilter('dateRange', 'today') },
    { label: 'Succès', action: () => updateFilter('status', 'completed') },
    { label: 'Orange Money', action: () => updateFilter('paymentMethod', 'orange_money') },
    { label: '> 10K FCFA', action: () => updateFilter('amountRange', 'high') }
  ];

  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="h-4 w-4 text-gray-600" />
          <span className="font-medium text-sm">Filtres rapides</span>
          {activeFilters.length > 0 && (
            <Badge variant="secondary" className="ml-2">
              {activeFilters.length} actif{activeFilters.length > 1 ? 's' : ''}
            </Badge>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
          {/* Recherche */}
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Rechercher..."
              value={filters.search}
              onChange={(e) => updateFilter('search', e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Statut */}
          <Select value={filters.status} onValueChange={(value) => updateFilter('status', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les statuts</SelectItem>
              <SelectItem value="completed">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  Confirmé
                </div>
              </SelectItem>
              <SelectItem value="pending">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-orange-600" />
                  En attente
                </div>
              </SelectItem>
              <SelectItem value="failed">
                <div className="flex items-center gap-2">
                  <X className="h-4 w-4 text-red-600" />
                  Échoué
                </div>
              </SelectItem>
            </SelectContent>
          </Select>

          {/* Méthode de paiement */}
          <Select value={filters.paymentMethod} onValueChange={(value) => updateFilter('paymentMethod', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Méthode" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les méthodes</SelectItem>
              <SelectItem value="orange_money">Orange Money</SelectItem>
              <SelectItem value="wave">Wave</SelectItem>
              <SelectItem value="free_money">Free Money</SelectItem>
              <SelectItem value="visa_card">Visa</SelectItem>
              <SelectItem value="mastercard">Mastercard</SelectItem>
            </SelectContent>
          </Select>

          {/* Période */}
          <Select value={filters.dateRange} onValueChange={(value) => updateFilter('dateRange', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Période" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toute période</SelectItem>
              <SelectItem value="today">Aujourd'hui</SelectItem>
              <SelectItem value="week">Cette semaine</SelectItem>
              <SelectItem value="month">Ce mois</SelectItem>
              <SelectItem value="quarter">Ce trimestre</SelectItem>
            </SelectContent>
          </Select>

          {/* Montant */}
          <Select value={filters.amountRange} onValueChange={(value) => updateFilter('amountRange', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Montant" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous montants</SelectItem>
              <SelectItem value="low">< 5,000 FCFA</SelectItem>
              <SelectItem value="medium">5K - 50K FCFA</SelectItem>
              <SelectItem value="high">> 50,000 FCFA</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Filtres rapides */}
        <div className="flex flex-wrap gap-2 mb-4">
          {quickFilters.map((filter, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              onClick={filter.action}
              className="text-xs"
            >
              {filter.label}
            </Button>
          ))}
        </div>

        {/* Actions */}
        {activeFilters.length > 0 && (
          <div className="flex justify-between items-center pt-2 border-t">
            <span className="text-sm text-gray-600">
              {activeFilters.length} filtre{activeFilters.length > 1 ? 's' : ''} appliqué{activeFilters.length > 1 ? 's' : ''}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="text-xs"
            >
              <X className="h-3 w-3 mr-1" />
              Effacer tout
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default QuickFilters;
