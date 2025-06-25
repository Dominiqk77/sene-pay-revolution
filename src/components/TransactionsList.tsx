
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { 
  Search,
  Filter,
  Download,
  RefreshCw,
  CreditCard,
  Smartphone,
  Calendar,
  ChevronRight,
  ChevronLeft
} from "lucide-react";

interface Transaction {
  id: string;
  reference_id: string;
  amount: number;
  currency: string;
  status: string;
  payment_method: string;
  customer_email: string;
  customer_phone: string;
  description: string;
  created_at: string;
  completed_at: string;
}

interface TransactionsListProps {
  merchantId?: string;
}

const TransactionsList = ({ merchantId }: TransactionsListProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [methodFilter, setMethodFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalTransactions, setTotalTransactions] = useState(0);

  const itemsPerPage = 20;

  useEffect(() => {
    if (user) {
      fetchTransactions();
    }
  }, [user, currentPage, statusFilter, methodFilter]);

  const fetchTransactions = async () => {
    try {
      setLoading(true);

      let query = supabase
        .from('transactions')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false })
        .range((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage - 1);

      if (merchantId) {
        query = query.eq('merchant_id', merchantId);
      }

      if (statusFilter !== 'all') {
        query = query.eq('status', statusFilter);
      }

      if (methodFilter !== 'all') {
        query = query.eq('payment_method', methodFilter);
      }

      const { data, error, count } = await query;

      if (error) throw error;

      setTransactions(data || []);
      setTotalTransactions(count || 0);
      setTotalPages(Math.ceil((count || 0) / itemsPerPage));

    } catch (error) {
      console.error('Error fetching transactions:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les transactions",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const exportTransactions = async () => {
    try {
      // Récupérer toutes les transactions avec les filtres actuels
      let query = supabase
        .from('transactions')
        .select('*')
        .order('created_at', { ascending: false });

      if (merchantId) {
        query = query.eq('merchant_id', merchantId);
      }

      if (statusFilter !== 'all') {
        query = query.eq('status', statusFilter);
      }

      if (methodFilter !== 'all') {
        query = query.eq('payment_method', methodFilter);
      }

      const { data, error } = await query;

      if (error) throw error;

      // Convertir en CSV
      const csvContent = [
        ['Référence', 'Montant', 'Devise', 'Statut', 'Méthode', 'Email client', 'Téléphone', 'Description', 'Date création', 'Date completion'].join(','),
        ...(data || []).map(t => [
          t.reference_id,
          t.amount,
          t.currency,
          t.status,
          t.payment_method || '',
          t.customer_email || '',
          t.customer_phone || '',
          (t.description || '').replace(/,/g, ';'),
          new Date(t.created_at).toLocaleString('fr-FR'),
          t.completed_at ? new Date(t.completed_at).toLocaleString('fr-FR') : ''
        ].join(','))
      ].join('\n');

      // Télécharger le fichier
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `transactions_${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast({
        title: "Export réussi",
        description: "Les transactions ont été exportées en CSV"
      });

    } catch (error) {
      console.error('Export error:', error);
      toast({
        title: "Erreur d'export",
        description: "Impossible d'exporter les transactions",
        variant: "destructive"
      });
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      pending: { variant: "secondary" as const, label: "En attente" },
      completed: { variant: "default" as const, label: "Confirmé" },
      failed: { variant: "destructive" as const, label: "Échoué" },
      refunded: { variant: "outline" as const, label: "Remboursé" }
    };

    const config = variants[status as keyof typeof variants] || variants.pending;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const getMethodIcon = (method: string) => {
    if (method?.includes('card') || method === 'visa_card' || method === 'mastercard') {
      return <CreditCard className="h-4 w-4" />;
    }
    return <Smartphone className="h-4 w-4" />;
  };

  const filteredTransactions = transactions.filter(transaction =>
    transaction.reference_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transaction.customer_email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transaction.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Transactions
            </CardTitle>
            <CardDescription>
              {totalTransactions} transaction{totalTransactions > 1 ? 's' : ''} au total
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={fetchTransactions} size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Actualiser
            </Button>
            <Button variant="outline" onClick={exportTransactions} size="sm">
              <Download className="h-4 w-4 mr-2" />
              Exporter CSV
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Filtres */}
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
              <Input
                placeholder="Rechercher par référence, email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les statuts</SelectItem>
              <SelectItem value="pending">En attente</SelectItem>
              <SelectItem value="completed">Confirmé</SelectItem>
              <SelectItem value="failed">Échoué</SelectItem>
              <SelectItem value="refunded">Remboursé</SelectItem>
            </SelectContent>
          </Select>
          <Select value={methodFilter} onValueChange={setMethodFilter}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Méthode" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les méthodes</SelectItem>
              <SelectItem value="orange_money">Orange Money</SelectItem>
              <SelectItem value="wave">Wave</SelectItem>
              <SelectItem value="free_money">Free Money</SelectItem>
              <SelectItem value="wizall">Wizall</SelectItem>
              <SelectItem value="visa_card">Visa</SelectItem>
              <SelectItem value="mastercard">Mastercard</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Liste des transactions */}
        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-senepay-orange mx-auto mb-4"></div>
            <p className="text-gray-600">Chargement des transactions...</p>
          </div>
        ) : filteredTransactions.length === 0 ? (
          <div className="text-center py-8">
            <CreditCard className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">Aucune transaction trouvée</p>
          </div>
        ) : (
          <>
            <div className="space-y-2">
              {filteredTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      {getMethodIcon(transaction.payment_method)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium">{transaction.reference_id}</span>
                        {getStatusBadge(transaction.status)}
                      </div>
                      <div className="text-sm text-gray-600">
                        {transaction.customer_email && (
                          <span>{transaction.customer_email}</span>
                        )}
                        {transaction.customer_phone && transaction.customer_email && (
                          <span> • </span>
                        )}
                        {transaction.customer_phone && (
                          <span>{transaction.customer_phone}</span>
                        )}
                      </div>
                      {transaction.description && (
                        <div className="text-sm text-gray-500 truncate max-w-[300px]">
                          {transaction.description}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">
                      {transaction.amount.toLocaleString()} {transaction.currency}
                    </div>
                    <div className="text-sm text-gray-500">
                      {new Date(transaction.created_at).toLocaleString('fr-FR')}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-6">
                <div className="text-sm text-gray-600">
                  Page {currentPage} sur {totalPages}
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default TransactionsList;
