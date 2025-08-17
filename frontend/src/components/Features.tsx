import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart3, 
  Users, 
  CreditCard, 
  FileText, 
  TrendingUp, 
  Target,
  DollarSign,
  Calendar,
  Mail
} from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: BarChart3,
      title: "Gestão de Vendas",
      description: "Registre e acompanhe todas as suas vendas com relatórios detalhados e análises de desempenho.",
      details: ["Dashboard em tempo real", "Relatórios customizáveis", "Metas de vendas", "Análise de tendências"]
    },
    {
      icon: DollarSign,
      title: "Controle de Gastos",
      description: "Monitore todos os gastos do seu negócio e mantenha as finanças sempre organizadas.",
      details: ["Categorização automática", "Alertas de gastos", "Controle de orçamento", "Relatórios fiscais"]
    },
    {
      icon: Users,
      title: "Gestão de Clientes",
      description: "Organize sua base de clientes com informações completas e histórico de interações.",
      details: ["Perfis detalhados", "Histórico de compras", "Segmentação avançada", "CRM integrado"]
    },
    {
      icon: Target,
      title: "Gestão de Leads",
      description: "Acompanhe leads desde o primeiro contato até a conversão em vendas.",
      details: ["Funil de vendas", "Lead scoring", "Automação de follow-up", "Conversão otimizada"]
    },
    {
      icon: FileText,
      title: "Controle de Boletos",
      description: "Gerencie boletos a pagar e receber com alertas de vencimento e controle de status.",
      details: ["Alertas de vencimento", "Status automático", "Conciliação bancária", "Relatórios de fluxo"]
    },
    {
      icon: TrendingUp,
      title: "Análises Avançadas",
      description: "Insights poderosos para tomar decisões baseadas em dados reais do seu negócio.",
      details: ["KPIs personalizados", "Previsões", "Benchmarking", "Insights automáticos"]
    }
  ];

  return (
    <section id="features" className="py-20 lg:py-28">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold mb-6">
            Recursos que fazem a
            <span className="bg-gradient-hero bg-clip-text text-transparent ml-3">
              diferença
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Tudo que você precisa para gerenciar seu negócio de forma eficiente e profissional, 
            em uma única plataforma integrada.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={index} 
                className="group hover:shadow-track-lg transition-all duration-300 border-border/50 hover:border-primary/20 hover:-translate-y-1"
              >
                <CardHeader>
                  <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {feature.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-center text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3 flex-shrink-0"></div>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Integration section */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-feature rounded-2xl p-8 lg:p-12 border border-border/50">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="flex-1 text-left lg:text-left">
                <h3 className="text-2xl lg:text-3xl font-bold mb-4">
                  Integração completa
                </h3>
                <p className="text-lg text-muted-foreground mb-6">
                  Todos os módulos trabalham juntos para oferecer uma visão 360° do seu negócio. 
                  Dados conectados, decisões mais assertivas.
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 text-sm bg-primary/10 rounded-full px-3 py-1">
                    <Mail className="h-4 w-4 text-primary" />
                    Notificações automáticas
                  </div>
                  <div className="flex items-center gap-2 text-sm bg-primary/10 rounded-full px-3 py-1">
                    <Calendar className="h-4 w-4 text-primary" />
                    Lembretes inteligentes
                  </div>
                  <div className="flex items-center gap-2 text-sm bg-primary/10 rounded-full px-3 py-1">
                    <BarChart3 className="h-4 w-4 text-primary" />
                    Relatórios unificados
                  </div>
                </div>
              </div>
              <div className="flex-shrink-0">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/50 dark:bg-white/10 rounded-lg p-4 text-center">
                    <Users className="h-8 w-8 text-primary mx-auto mb-2" />
                    <div className="text-sm font-medium">Clientes</div>
                  </div>
                  <div className="bg-white/50 dark:bg-white/10 rounded-lg p-4 text-center">
                    <BarChart3 className="h-8 w-8 text-primary mx-auto mb-2" />
                    <div className="text-sm font-medium">Vendas</div>
                  </div>
                  <div className="bg-white/50 dark:bg-white/10 rounded-lg p-4 text-center">
                    <CreditCard className="h-8 w-8 text-primary mx-auto mb-2" />
                    <div className="text-sm font-medium">Gastos</div>
                  </div>
                  <div className="bg-white/50 dark:bg-white/10 rounded-lg p-4 text-center">
                    <FileText className="h-8 w-8 text-primary mx-auto mb-2" />
                    <div className="text-sm font-medium">Boletos</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;