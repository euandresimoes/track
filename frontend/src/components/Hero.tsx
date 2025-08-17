import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart3, Users, CreditCard, TrendingUp } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative py-20 lg:py-28 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-feature opacity-50"></div>
      
      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 text-sm font-medium text-primary mb-8">
            <TrendingUp className="h-4 w-4" />
            Gerencie seu negócio de forma inteligente
          </div>

          {/* Main heading */}
          <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
            Controle total do seu
            <span className="bg-gradient-hero bg-clip-text text-transparent block lg:inline lg:ml-4">
              empreendimento
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl lg:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
            Track é a plataforma completa para gerenciar vendas, gastos, clientes, leads e boletos. 
            Tudo em um só lugar, de forma simples e eficiente.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button variant="hero" size="lg" className="text-lg px-8 py-4">
              Começar gratuitamente
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-4">
              Ver demonstração
            </Button>
          </div>

          {/* Feature highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="flex flex-col items-center text-center p-6 rounded-lg bg-card shadow-track-sm hover:shadow-track-md transition-all duration-300">
              <div className="bg-primary/10 p-3 rounded-full mb-4">
                <BarChart3 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Vendas & Relatórios</h3>
              <p className="text-sm text-muted-foreground">
                Acompanhe suas vendas e gere relatórios detalhados
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-6 rounded-lg bg-card shadow-track-sm hover:shadow-track-md transition-all duration-300">
              <div className="bg-primary/10 p-3 rounded-full mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Gestão de Clientes</h3>
              <p className="text-sm text-muted-foreground">
                Organize seus clientes e leads de forma eficiente
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-6 rounded-lg bg-card shadow-track-sm hover:shadow-track-md transition-all duration-300">
              <div className="bg-primary/10 p-3 rounded-full mb-4">
                <CreditCard className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Controle Financeiro</h3>
              <p className="text-sm text-muted-foreground">
                Gerencie gastos e boletos de forma organizada
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;