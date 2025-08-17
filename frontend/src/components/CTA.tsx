import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";

const CTA = () => {
  return (
    <section className="py-20 lg:py-28">
      <div className="container mx-auto px-4">
        <div className="relative bg-gradient-hero rounded-3xl p-8 lg:p-16 text-white overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-48 translate-x-48"></div>
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-white/5 rounded-full translate-y-36 -translate-x-36"></div>
          
          <div className="relative z-10 text-center max-w-4xl mx-auto">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">
              Pronto para transformar 
              <br className="hidden lg:block" />
              seu negócio?
            </h2>
            
            <p className="text-xl lg:text-2xl text-white/90 mb-12 max-w-2xl mx-auto">
              Junte-se a milhares de empreendedores que já descobriram o poder 
              de ter tudo organizado em um só lugar.
            </p>

            {/* Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="flex items-center justify-center md:justify-start gap-3 text-lg">
                <div className="bg-white/20 rounded-full p-1">
                  <Check className="h-5 w-5" />
                </div>
                Teste grátis por 14 dias
              </div>
              <div className="flex items-center justify-center md:justify-start gap-3 text-lg">
                <div className="bg-white/20 rounded-full p-1">
                  <Check className="h-5 w-5" />
                </div>
                Sem compromisso
              </div>
              <div className="flex items-center justify-center md:justify-start gap-3 text-lg">
                <div className="bg-white/20 rounded-full p-1">
                  <Check className="h-5 w-5" />
                </div>
                Suporte especializado
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="outline" 
                size="lg" 
                className="bg-white text-primary hover:bg-white/90 border-white text-lg px-8 py-4 font-semibold"
              >
                Começar agora gratuitamente
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
              <Button 
                variant="ghost" 
                size="lg" 
                className="text-white hover:bg-white/10 text-lg px-8 py-4 border border-white/30"
              >
                Falar com especialista
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="mt-12 pt-8 border-t border-white/20">
              <p className="text-white/70 text-sm mb-4">
                Mais de 10.000 empresas confiam no Track
              </p>
              <div className="flex items-center justify-center gap-8 text-white/50">
                <div className="text-2xl font-bold">⭐⭐⭐⭐⭐</div>
                <div className="text-sm">4.9/5 avaliação média</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;