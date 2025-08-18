import { useState } from "react";
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

interface Transaction {
  id: string;
  type: "sale" | "expense";
  amount: number;
  description: string;
  date: string;
}

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

  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: "1",
      type: "sale",
      amount: 1500,
      description: "Project payment",
      date: "2025-08-18",
    },
    {
      id: "2",
      type: "expense",
      amount: 500,
      description: "Office supplies",
      date: "2025-08-17",
    },
    {
      id: "3",
      type: "sale",
      amount: 1854,
      description: "Xbox Series S",
      date: "2025-09-14",
    },
    {
      id: "4",
      type: "sale",
      amount: 930,
      description: "Moto G15",
      date: "2025-09-23",
    },
    {
      id: "5",
      type: "expense",
      amount: 300,
      description: "Internet bill",
      date: "2025-09-01",
    },
    {
      id: "6",
      type: "sale",
      amount: 2200,
      description: "Freelance website",
      date: "2025-09-05",
    },
    {
      id: "7",
      type: "expense",
      amount: 150,
      description: "Electricity bill",
      date: "2025-09-07",
    },
    {
      id: "8",
      type: "sale",
      amount: 760,
      description: "Tablet Samsung",
      date: "2025-09-10",
    },
    {
      id: "9",
      type: "expense",
      amount: 1200,
      description: "New monitor",
      date: "2025-09-11",
    },
    {
      id: "10",
      type: "sale",
      amount: 3400,
      description: "Mobile app project",
      date: "2025-09-15",
    },
    {
      id: "11",
      type: "expense",
      amount: 450,
      description: "Team lunch",
      date: "2025-09-16",
    },
    {
      id: "12",
      type: "sale",
      amount: 1290,
      description: "Headphones",
      date: "2025-09-18",
    },
    {
      id: "13",
      type: "sale",
      amount: 2750,
      description: "Backend service",
      date: "2025-09-21",
    },
    {
      id: "14",
      type: "expense",
      amount: 600,
      description: "Cloud services",
      date: "2025-09-22",
    },
    {
      id: "15",
      type: "sale",
      amount: 980,
      description: "Keyboard + Mouse",
      date: "2025-09-24",
    },
    {
      id: "16",
      type: "expense",
      amount: 250,
      description: "Coffee & snacks",
      date: "2025-09-25",
    },
    {
      id: "17",
      type: "sale",
      amount: 4200,
      description: "E-commerce website",
      date: "2025-09-27",
    },
    {
      id: "18",
      type: "expense",
      amount: 700,
      description: "Software licenses",
      date: "2025-09-28",
    },
    {
      id: "19",
      type: "sale",
      amount: 1950,
      description: "Gaming PC build",
      date: "2025-09-29",
    },
    {
      id: "20",
      type: "expense",
      amount: 320,
      description: "Transport",
      date: "2025-09-30",
    },
    // Add more sample data as needed
  ]);

  const totalSales = transactions
    .filter((t) => t.type === "sale")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalExpenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const balance = totalSales - totalExpenses;

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const chartData = transactions
    .reduce((acc: any[], transaction) => {
      const date = formatDate(transaction.date);
      const existingData = acc.find((item) => item.date === date);

      if (existingData) {
        if (transaction.type === "sale") {
          existingData.sales += transaction.amount;
        } else {
          existingData.expenses += transaction.amount;
        }
      } else {
        acc.push({
          date,
          sales: transaction.type === "sale" ? transaction.amount : 0,
          expenses: transaction.type === "expense" ? transaction.amount : 0,
        });
      }

      return acc;
    }, [])
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const handleDelete = (id: string) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  const filteredTransactions = transactions.filter((transaction) => {
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
    const date = new Date(transaction.date);
    if (filters.startDate && date < new Date(filters.startDate)) {
      return false;
    }
    if (filters.endDate && date > new Date(filters.endDate)) {
      return false;
    }

    return true;
  });

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
              R${totalSales.toLocaleString()}
            </p>
          </CardContent>
        </Card>
        <Card className="shadow-md bg-card/80">
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-base font-medium text-card-foreground">
              Total de Despesas
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-1">
            <p className="text-xl font-bold text-red-500">
              R${totalExpenses.toLocaleString()}
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
              ${balance.toLocaleString()}
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
            <AreaChart data={chartData}>
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
              />
              <ChartTooltip content={<ChartTooltipContent />} />
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
                  value="sale"
                  className="hover:bg-foreground/80 hover:text-background text-foreground focus:bg-foreground/80 focus:text-background"
                >
                  Vendas
                </SelectItem>
                <SelectItem
                  value="expense"
                  className="hover:bg-foreground/80 hover:text-background text-foreground focus:bg-foreground/80 focus:text-background"
                >
                  Despesas
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
              value={filters.startDate ? formatDate(filters.startDate) : ""}
              onChange={(e) => {
                const [day, month, year] = e.target.value.split("/");
                const formattedDate =
                  day && month && year ? `${year}-${month}-${day}` : "";
                setFilters({ ...filters, startDate: formattedDate });
              }}
              onKeyPress={(e) => {
                const pattern = /[0-9\/]/;
                if (!pattern.test(e.key)) {
                  e.preventDefault();
                }
              }}
            />
            <Input
              type="text"
              placeholder="dd/mm/yyyy"
              className="h-8 text-xs ring-0 focus:ring-0 focus:ring-offset-0 outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
              value={filters.endDate ? formatDate(filters.endDate) : ""}
              onChange={(e) => {
                const [day, month, year] = e.target.value.split("/");
                const formattedDate =
                  day && month && year ? `${year}-${month}-${day}` : "";
                setFilters({ ...filters, endDate: formattedDate });
              }}
              onKeyPress={(e) => {
                const pattern = /[0-9\/]/;
                if (!pattern.test(e.key)) {
                  e.preventDefault();
                }
              }}
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
                      {formatDate(transaction.date)}
                    </TableCell>
                    <TableCell className="py-2">
                      {transaction.description}
                    </TableCell>
                    <TableCell className="py-2">
                      <span
                        className={
                          transaction.type === "sale"
                            ? "text-emerald-500"
                            : "text-red-500"
                        }
                      >
                        {transaction.type === "sale" ? "Venda" : "Despesa"}
                      </span>
                    </TableCell>
                    <TableCell
                      className={`py-2 ${
                        transaction.type === "sale"
                          ? "text-emerald-500"
                          : "text-red-500"
                      }`}
                    >
                      R${transaction.amount.toLocaleString()}
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
