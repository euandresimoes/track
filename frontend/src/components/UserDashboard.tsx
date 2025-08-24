import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "./ui/chart";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid } from "recharts";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import verifyAccessTokenService from "@/services/VerifyAccessTokenService";
import transactionService, { Transaction } from "@/services/TransactionService";

interface FilterState {
  type: string;
  minAmount: string;
  maxAmount: string;
  startDate: string;
  endDate: string;
}

const UserDashboard = () => {
  const [filters, setFilters] = useState<FilterState>({
    type: "all",
    minAmount: "",
    maxAmount: "",
    startDate: "",
    endDate: "",
  });

  const [transactions, setTransactions] = useState<Transaction[] | null>(null);

  useEffect(() => {
    verifyAccessTokenService.execute();

    const fetchTransactions = async () => {
      const transactions = await transactionService.findAll();
      setTransactions(transactions);
    };
    fetchTransactions();
  }, []);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const formatCurrency = (value: number) => {
    // Converter para número se necessário
    const numValue = typeof value === "number" ? value : Number(value);

    // Verificar se o valor é um número válido
    if (isNaN(numValue) || !isFinite(numValue)) {
      return "R$ 0,00";
    }

    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(numValue);
  };

  if (!transactions) {
    return (
      <div className="h-screen overflow-y-auto p-4 space-y-4 bg-background/5">
        <div className="flex items-center justify-center h-64">
          <p className="text-muted-foreground">Carregando transações...</p>
        </div>
      </div>
    );
  }

  const totalSales = transactions
    .filter((t) => t.type === "INCOME")
    .reduce((acc, curr) => {
      const amount = Number(curr.amount);
      return acc + (isNaN(amount) ? 0 : amount);
    }, 0);

  const totalExpenses = transactions
    .filter((t) => t.type === "EXPENSE")
    .reduce((acc, curr) => {
      const amount = Number(curr.amount);
      return acc + (isNaN(amount) ? 0 : amount);
    }, 0);

  const balance = totalSales - totalExpenses;

  const chartData = transactions
    .reduce((acc: any[], transaction) => {
      const date = formatDate(transaction.created_at);
      const amount = Number(transaction.amount);

      // Ignorar transações com valores inválidos
      if (isNaN(amount)) return acc;

      const existingData = acc.find((item) => item.date === date);

      if (existingData) {
        if (transaction.type === "INCOME") {
          existingData.sales += amount;
        } else {
          existingData.expenses += amount;
        }
      } else {
        acc.push({
          date,
          sales: transaction.type === "INCOME" ? amount : 0,
          expenses: transaction.type === "EXPENSE" ? amount : 0,
        });
      }

      return acc;
    }, [])
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const handleDelete = async (id: number) => {
    const req = await fetch(
      `${
        import.meta.env.VITE_API_URL
      }/v1/transaction/delete?transaction_id=${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );

    if (req.status === 200) {
      setTransactions(transactions.filter((t) => t.id !== id));
      return;
    }

    return;
  };

  const filteredTransactions =
    transactions
      ?.filter((transaction) => {
        // Filter by type
        if (filters.type !== "all" && transaction.type !== filters.type) {
          return false;
        }

        // Filter by amount
        const amount = transaction.amount;
        if (filters.minAmount && amount < parseFloat(filters.minAmount)) {
          return false;
        }
        if (filters.maxAmount && amount > parseFloat(filters.maxAmount)) {
          return false;
        }

        // Filter by date
        if (filters.startDate || filters.endDate) {
          // Convert transaction date to dd/mm/yyyy format for comparison
          const transactionDate = new Date(transaction.created_at);
          const transactionDateStr = formatDate(transactionDate.toISOString());

          // Convert filter dates to Date objects for proper comparison
          if (filters.startDate) {
            const [startDay, startMonth, startYear] = filters.startDate.split('/');
            const startDateObj = new Date(parseInt(startYear), parseInt(startMonth) - 1, parseInt(startDay));
            if (transactionDate < startDateObj) {
              return false;
            }
          }

          if (filters.endDate) {
            const [endDay, endMonth, endYear] = filters.endDate.split('/');
            const endDateObj = new Date(parseInt(endYear), parseInt(endMonth) - 1, parseInt(endDay), 23, 59, 59);
            if (transactionDate > endDateObj) {
              return false;
            }
          }
        }

        return true;
      })
      ?.sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      ) || [];

  return (
    <div className="h-screen overflow-y-auto p-4 space-y-4 bg-background/5">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <Card className="shadow-md bg-card/80">
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-base font-medium text-card-foreground">
              Total de Vendas
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-1">
            <p className="text-xl font-bold text-emerald-500">
              {formatCurrency(totalSales)}
            </p>
          </CardContent>
        </Card>
        <Card className="shadow-md bg-card/80">
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-base font-medium text-card-foreground">
              Total de Gastos
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-1">
            <p className="text-xl font-bold text-red-500">
              {formatCurrency(totalExpenses)}
            </p>
          </CardContent>
        </Card>
        <Card className="shadow-md bg-card/80">
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-base font-medium text-card-foreground">
              Saldo
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-1">
            <p
              className={`text-xl font-bold ${
                balance >= 0 ? "text-emerald-500" : "text-red-500"
              }`}
            >
              {formatCurrency(balance)}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Chart */}
      <Card className="shadow-md bg-card/80">
        <CardHeader className="p-4 pb-2">
          <CardTitle className="text-base font-medium text-card-foreground">
            Visão Geral Financeira
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-1">
          <ChartContainer className="w-full h-[250px]" config={{}}>
            <AreaChart
              data={chartData}
              margin={{ left: 40, right: 20, top: 20, bottom: 20 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="hsl(var(--border))"
              />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
              />
              <YAxis
                tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                tickFormatter={(value) => formatCurrency(value)}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    formatter={(value, name) => [
                      formatCurrency(Number(value)),
                      name === "sales" ? " Vendas" : " Gastos",
                    ]}
                  />
                }
              />
              <Area
                type="monotone"
                dataKey="sales"
                stackId="1"
                stroke="rgb(16, 185, 129)"
                fill="rgb(16, 185, 129)"
                fillOpacity={0.1}
              />
              <Area
                type="monotone"
                dataKey="expenses"
                stackId="1"
                stroke="rgb(239, 68, 68)"
                fill="rgb(239, 68, 68)"
                fillOpacity={0.1}
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Transactions Table */}
      <Card className="shadow-md bg-card/80">
        <CardHeader className="p-4 pb-2">
          <CardTitle className="text-base font-medium text-card-foreground">
            Transações Recentes
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-1">
          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-2 mb-4">
            <Select
              value={filters.type}
              onValueChange={(value) => setFilters({ ...filters, type: value })}
            >
              <SelectTrigger className="h-8 text-xs ring-0 focus:ring-0 focus:ring-offset-0">
                <SelectValue placeholder="Tipo de Transação" />
              </SelectTrigger>
              <SelectContent className="bg-background border-border">
                <SelectItem
                  value="all"
                  className="hover:bg-foreground/80 hover:text-background text-foreground focus:bg-foreground/80 focus:text-background"
                >
                  Todos os Tipos
                </SelectItem>
                <SelectItem
                  value="INCOME"
                  className="hover:bg-foreground/80 hover:text-background text-foreground focus:bg-foreground/80 focus:text-background"
                >
                  Vendas
                </SelectItem>
                <SelectItem
                  value="EXPENSE"
                  className="hover:bg-foreground/80 hover:text-background text-foreground focus:bg-foreground/80 focus:text-background"
                >
                  Gastos
                </SelectItem>
              </SelectContent>
            </Select>

            <Input
              type="number"
              placeholder="Valor Mínimo"
              className="h-8 text-xs ring-0 focus:ring-0 focus:ring-offset-0 outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
              value={filters.minAmount}
              onChange={(e) =>
                setFilters({ ...filters, minAmount: e.target.value })
              }
            />
            <Input
              type="number"
              placeholder="Valor Máximo"
              className="h-8 text-xs ring-0 focus:ring-0 focus:ring-offset-0 outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
              value={filters.maxAmount}
              onChange={(e) =>
                setFilters({ ...filters, maxAmount: e.target.value })
              }
            />
            <Input
              type="text"
              placeholder="dd/mm/yyyy"
              className="h-8 text-xs ring-0 focus:ring-0 focus:ring-offset-0 outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
              value={filters.startDate}
              onChange={(e) =>
                setFilters({ ...filters, startDate: e.target.value })
              }
            />
            <Input
              type="text"
              placeholder="dd/mm/yyyy"
              className="h-8 text-xs ring-0 focus:ring-0 focus:ring-offset-0 outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
              value={filters.endDate}
              onChange={(e) =>
                setFilters({ ...filters, endDate: e.target.value })
              }
            />
          </div>

          <div
            className="overflow-auto"
            style={{ maxHeight: "calc(100vh - 600px)" }}
          >
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs">Data</TableHead>
                  <TableHead className="text-xs">Descrição</TableHead>
                  <TableHead className="text-xs">Tipo</TableHead>
                  <TableHead className="text-xs">Valor</TableHead>
                  <TableHead className="text-xs">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.map((transaction) => (
                  <TableRow key={transaction.id} className="text-sm">
                    <TableCell className="py-2">
                      {formatDate(transaction.created_at)}
                    </TableCell>
                    <TableCell className="py-2">
                      {transaction.description}
                    </TableCell>
                    <TableCell className="py-2">
                      <span
                        className={
                          transaction.type === "INCOME"
                            ? "text-emerald-500"
                            : "text-red-500"
                        }
                      >
                        {transaction.type === "INCOME" ? "Venda" : "Gasto"}
                      </span>
                    </TableCell>
                    <TableCell
                      className={`py-2 ${
                        transaction.type === "INCOME"
                          ? "text-emerald-500"
                          : "text-red-500"
                      }`}
                    >
                      {formatCurrency(transaction.amount)}
                    </TableCell>
                    <TableCell className="py-2">
                      <button
                        onClick={() => handleDelete(transaction.id)}
                        className="p-2 rounded-md border border-border bg-background hover:bg-red-500/10 hover:border-red-500 transition-colors group"
                      >
                        <Trash2
                          size={16}
                          className="text-muted-foreground group-hover:text-red-500"
                        />
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserDashboard;
