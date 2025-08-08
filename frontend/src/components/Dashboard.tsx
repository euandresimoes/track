import { useState, useMemo, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Plus,
  Mic,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Filter,
  Trash2,
  Loader2,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import transactionService, {
  Transaction as ApiTransaction,
  TransactionType as ApiTransactionType,
  CreateTransactionData,
} from "@/services/transactionService";

type TransactionType = "INCOME" | "EXPENSE";

interface Transaction {
  id: number;
  type: TransactionType;
  description: string;
  amount: number;
  date: string;
}

const Dashboard = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAddingTransaction, setIsAddingTransaction] = useState(false);
  const [isMicOpen, setIsMicOpen] = useState(false);
  const [filter, setFilter] = useState<"all" | TransactionType>("all");
  const [newTransaction, setNewTransaction] = useState({
    type: "INCOME" as TransactionType,
    description: "",
    amount: "",
  });

  const { toast } = useToast();

  // Carregar transações ao montar o componente
  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      setIsLoading(true);
      const data = await transactionService.getTransactions();

      // Converter o formato da API para o formato local
      const formattedTransactions: Transaction[] = data.map(
        (item: ApiTransaction) => ({
          id: item.id,
          type: item.type as TransactionType,
          description: item.description,
          amount: item.amount,
          date: item.created_at, // Armazenar a data completa
        })
      );

      setTransactions(formattedTransactions);
    } catch (error: any) {
      console.error("Erro ao carregar transações:", error);
      toast({
        title: "Erro",
        description:
          error.response?.data?.message ||
          "Não foi possível carregar as transações",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const filteredTransactions = useMemo(() => {
    return filter === "all"
      ? transactions
      : transactions.filter((t) => t.type === filter);
  }, [transactions, filter]);

  const summary = useMemo(() => {
    const income = transactions
      .filter((t) => t.type === "INCOME")
      .reduce((sum, t) => sum + t.amount, 0);
    const expenses = transactions
      .filter((t) => t.type === "EXPENSE")
      .reduce((sum, t) => sum + t.amount, 0);
    const balance = income - expenses;

    return { income, expenses, balance };
  }, [transactions]);

  const handleAddTransaction = async () => {
    if (!newTransaction.description || !newTransaction.amount) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);

      const transactionData: CreateTransactionData = {
        type: newTransaction.type as ApiTransactionType,
        description: newTransaction.description,
        amount: parseFloat(newTransaction.amount),
      };

      await transactionService.createTransaction(transactionData);

      // Recarregar transações após adicionar uma nova
      await fetchTransactions();

      setNewTransaction({ type: "INCOME", description: "", amount: "" });
      setIsAddingTransaction(false);

      toast({
        title: "Sucesso",
        description: `${
          newTransaction.type === "INCOME" ? "Venda" : "Gasto"
        } adicionada com sucesso!`,
      });
    } catch (error: any) {
      console.error("Erro ao adicionar transação:", error);
      toast({
        title: "Erro",
        description:
          error.response?.data?.message ||
          "Não foi possível adicionar a transação",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteTransaction = async (id: number) => {
    try {
      setIsLoading(true);
      await transactionService.deleteTransaction(id);

      // Atualizar a lista local após excluir
      setTransactions(transactions.filter((t) => t.id !== id));

      toast({
        title: "Sucesso",
        description: "Transação removida com sucesso!",
      });
    } catch (error: any) {
      console.error("Erro ao excluir transação:", error);
      toast({
        title: "Erro",
        description:
          error.response?.data?.message ||
          "Não foi possível excluir a transação",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Dashboard Financeiro
            </h1>
            <p className="text-muted-foreground">
              Gerencie suas vendas e gastos
            </p>
          </div>

          <div className="flex gap-2">
            <Dialog
              open={isAddingTransaction}
              onOpenChange={setIsAddingTransaction}
            >
              <DialogTrigger asChild>
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300">
                  <Plus className="mr-2 h-4 w-4" />
                  Nova Transação
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-card border-border">
                <DialogHeader>
                  <DialogTitle>Adicionar Transação</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="type">Tipo</Label>
                    <Select
                      value={newTransaction.type}
                      onValueChange={(value: TransactionType) =>
                        setNewTransaction((prev) => ({ ...prev, type: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="INCOME">Venda</SelectItem>
                        <SelectItem value="EXPENSE">Gasto</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="description">Descrição</Label>
                    <Input
                      id="description"
                      value={newTransaction.description}
                      onChange={(e) =>
                        setNewTransaction((prev) => ({
                          ...prev,
                          description: e.target.value,
                        }))
                      }
                      placeholder="Descreva a transação"
                    />
                  </div>
                  <div>
                    <Label htmlFor="amount">Valor (R$)</Label>
                    <Input
                      id="amount"
                      type="number"
                      step="0.01"
                      value={newTransaction.amount}
                      onChange={(e) =>
                        setNewTransaction((prev) => ({
                          ...prev,
                          amount: e.target.value,
                        }))
                      }
                      placeholder="0,00"
                    />
                  </div>
                  <Button
                    onClick={handleAddTransaction}
                    className="w-full bg-primary hover:bg-primary/90"
                  >
                    Adicionar
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            <Button
              onClick={() => setIsMicOpen(true)}
              variant="outline"
              className="border-border hover:bg-muted transition-all duration-300"
            >
              <Mic className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-card border-border shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Vendas</CardTitle>
              <TrendingUp className="h-4 w-4 text-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">
                R$ {summary.income}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Gastos</CardTitle>
              <TrendingDown className="h-4 w-4 text-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">
                R$ {summary.expenses}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Saldo Atual</CardTitle>
              <DollarSign className="h-4 w-4 text-foreground" />
            </CardHeader>
            <CardContent>
              <div
                className={`text-2xl font-bold ${
                  summary.balance >= 0 ? "text-success" : "text-destructive"
                }`}
              >
                R$ {summary.balance}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Transações</CardTitle>
              <Filter className="h-4 w-4 text-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{transactions.length}</div>
            </CardContent>
          </Card>
        </div>

        {/* Transactions Table */}
        <Card className="bg-card border-border shadow-card">
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <CardTitle>Transações</CardTitle>
              <div className="flex items-center gap-2">
                {isLoading && (
                  <div className="flex items-center">
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    <span className="text-sm text-muted-foreground">
                      Carregando...
                    </span>
                  </div>
                )}
                <Select
                  value={filter}
                  onValueChange={(value: "all" | TransactionType) =>
                    setFilter(value)
                  }
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas</SelectItem>
                    <SelectItem value="INCOME">Vendas</SelectItem>
                    <SelectItem value="EXPENSE">Gastos</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Descrição</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead className="text-right">Valor</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          transaction.type === "INCOME"
                            ? "bg-success/20 text-success"
                            : "bg-destructive/20 text-destructive"
                        }`}
                      >
                        {transaction.type === "INCOME" ? "Venda" : "Gasto"}
                      </span>
                    </TableCell>
                    <TableCell>{transaction.description}</TableCell>
                    <TableCell>
                      {new Date(transaction.date).toLocaleDateString("pt-BR")}{" "}
                      às{" "}
                      {new Date(transaction.date).toLocaleTimeString("pt-BR", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </TableCell>
                    <TableCell
                      className={`text-right font-medium ${
                        transaction.type === "INCOME"
                          ? "text-success"
                          : "text-destructive"
                      }`}
                    >
                      {transaction.type === "INCOME" ? "+" : "-"}R${" "}
                      {transaction.amount}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        onClick={() => handleDeleteTransaction(transaction.id)}
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 hover:bg-destructive hover:text-destructive-foreground"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {filteredTransactions.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                Nenhuma transação encontrada
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Microphone Modal */}
      <Dialog open={isMicOpen} onOpenChange={setIsMicOpen}>
        <DialogContent className="bg-card border-border max-w-sm">
          <div className="flex flex-col items-center justify-center py-8">
            <div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center shadow-card animate-pulse">
              <Mic className="h-12 w-12 text-primary-foreground" />
            </div>
            <p className="text-center text-muted-foreground mt-4">
              Funcionalidade de microfone será implementada
            </p>
            <Button
              onClick={() => setIsMicOpen(false)}
              variant="outline"
              className="mt-4"
            >
              Fechar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;
