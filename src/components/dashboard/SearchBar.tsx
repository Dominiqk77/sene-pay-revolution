
import { useState } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  value?: string;
}

const SearchBar = ({ onSearch, placeholder = "Rechercher transactions, clients, références...", value = "" }: SearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState(value);
  const [searchHistory, setSearchHistory] = useState<string[]>([
    "Orange Money",
    "Wave",
    "Visa Card",
    "Complet",
    "En attente"
  ]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    onSearch(query);
    
    // Ajouter à l'historique si ce n'est pas vide et pas déjà présent
    if (query.trim() && !searchHistory.includes(query.trim())) {
      setSearchHistory(prev => [query.trim(), ...prev.slice(0, 4)]);
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    onSearch("");
  };

  const handleQuickSearch = (term: string) => {
    setSearchQuery(term);
    onSearch(term);
  };

  return (
    <div className="space-y-3">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          type="text"
          placeholder={placeholder}
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="pl-10 pr-10 h-11 border-gray-200 focus:border-senepay-orange focus:ring-senepay-orange/20"
        />
        {searchQuery && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearSearch}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 hover:bg-gray-100"
          >
            <X className="h-3 w-3" />
          </Button>
        )}
      </div>

      {/* Recherches rapides */}
      <div className="flex flex-wrap gap-2">
        <span className="text-xs text-gray-500 mr-2">Recherches rapides:</span>
        {searchHistory.map((term, index) => (
          <Badge
            key={index}
            variant="outline"
            className="cursor-pointer hover:bg-senepay-orange/10 hover:border-senepay-orange text-xs"
            onClick={() => handleQuickSearch(term)}
          >
            {term}
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;
