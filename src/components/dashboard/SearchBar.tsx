
import React, { useState, useEffect } from 'react';
import { Search, Clock, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  onSearch, 
  placeholder = "Rechercher transactions, clients, montants..." 
}) => {
  const [query, setQuery] = useState('');
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('senepay_search_history');
    if (saved) {
      setSearchHistory(JSON.parse(saved));
    }
  }, []);

  const handleSearch = (searchQuery: string) => {
    if (searchQuery.trim()) {
      onSearch(searchQuery);
      
      // Ajouter à l'historique
      const newHistory = [searchQuery, ...searchHistory.filter(h => h !== searchQuery)].slice(0, 5);
      setSearchHistory(newHistory);
      localStorage.setItem('senepay_search_history', JSON.stringify(newHistory));
    }
    setShowSuggestions(false);
  };

  const clearHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem('senepay_search_history');
  };

  return (
    <div className="relative w-full max-w-md">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch(query)}
          onFocus={() => setShowSuggestions(true)}
          className="pl-10 pr-10"
        />
        {query && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setQuery('');
              onSearch('');
            }}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
          >
            <X className="h-3 w-3" />
          </Button>
        )}
      </div>

      {/* Suggestions et historique */}
      {showSuggestions && (
        <Card className="absolute top-full left-0 right-0 mt-1 z-50 bg-white shadow-lg border">
          <div className="p-2">
            {searchHistory.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-gray-500">Recherches récentes</span>
                  <Button variant="ghost" size="sm" onClick={clearHistory} className="h-auto p-1">
                    <X className="h-3 w-3" />
                  </Button>
                </div>
                {searchHistory.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setQuery(item);
                      handleSearch(item);
                    }}
                    className="flex items-center w-full p-2 text-left hover:bg-gray-50 rounded text-sm"
                  >
                    <Clock className="h-3 w-3 mr-2 text-gray-400" />
                    {item}
                  </button>
                ))}
              </div>
            )}
            
            {/* Suggestions intelligentes */}
            <div className="border-t pt-2 mt-2">
              <span className="text-xs font-medium text-gray-500 mb-2 block">Suggestions</span>
              {['Transactions aujourd\'hui', 'Orange Money', 'Montant > 10000', 'Statut: completed'].map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setQuery(suggestion);
                    handleSearch(suggestion);
                  }}
                  className="block w-full p-2 text-left hover:bg-gray-50 rounded text-sm text-gray-600"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default SearchBar;
