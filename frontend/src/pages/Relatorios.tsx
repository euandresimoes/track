import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, PieChart, TrendingUp, Calendar } from "lucide-react";

const Relatorios = () => {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Relatórios</h1>
        <p className="text-muted-foreground">Análise das suas transações financeiras</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <Card className="bg-card border-border shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Relatório Mensal</CardTitle>
            <Calendar className="h-4 w-4 text-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">Em breve</div>
            <p className="text-xs text-muted-foreground">Análise do mês atual</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Gráficos</CardTitle>
            <BarChart3 className="h-4 w-4 text-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">Em breve</div>
            <p className="text-xs text-muted-foreground">Visualizações gráficas</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Categorias</CardTitle>
            <PieChart className="h-4 w-4 text-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">Em breve</div>
            <p className="text-xs text-muted-foreground">Análise por categoria</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tendências</CardTitle>
            <TrendingUp className="h-4 w-4 text-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">Em breve</div>
            <p className="text-xs text-muted-foreground">Previsões e tendências</p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-card border-border shadow-card">
        <CardHeader>
          <CardTitle>Relatórios Detalhados</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              Os relatórios detalhados serão implementados em breve.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Relatorios;