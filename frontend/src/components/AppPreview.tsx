import { Monitor } from "lucide-react";

const AppPreview = () => {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Veja o Track em ação
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Uma interface intuitiva e poderosa para gerenciar todos os aspectos do seu negócio
          </p>
        </div>

        {/* macOS Style Window */}
        <div className="max-w-6xl mx-auto">
          <div className="bg-card rounded-2xl shadow-2xl border border-border overflow-hidden">
            {/* Window Header */}
            <div className="bg-muted/50 border-b border-border px-6 py-4 flex items-center">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="flex-1 text-center">
                <div className="bg-background rounded-lg px-4 py-1 mx-8 text-sm text-muted-foreground border border-border">
                  app.track.com
                </div>
              </div>
              <div className="w-16"></div>
            </div>

            {/* App Content Area */}
            <div className="bg-background aspect-[16/10] flex items-center justify-center relative overflow-hidden">
              {/* Placeholder for app screenshot */}
              <div className="text-center space-y-4">
                <Monitor className="w-16 h-16 text-muted-foreground mx-auto" />
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-foreground">
                    Dashboard Principal
                  </h3>
                  <p className="text-muted-foreground max-w-md">
                    Aqui será exibida uma captura de tela da interface do Track, 
                    mostrando o dashboard principal com gráficos, métricas e funcionalidades.
                  </p>
                </div>
              </div>

              {/* Grid pattern overlay for visual interest */}
              <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>
            </div>
          </div>

          {/* Feature highlights around the preview */}
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Monitor className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Interface Moderna
              </h3>
              <p className="text-muted-foreground">
                Design limpo e intuitivo que facilita a navegação
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Monitor className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Responsivo
              </h3>
              <p className="text-muted-foreground">
                Funciona perfeitamente em desktop, tablet e mobile
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Monitor className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Tempo Real
              </h3>
              <p className="text-muted-foreground">
                Dados atualizados instantaneamente
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppPreview;