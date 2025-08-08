import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft } from "lucide-react";

const RecuperarSenha = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const { toast } = useToast();

  const handleRecuperarSenha = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Erro",
        description: "Por favor, informe seu email",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulando envio de email - em um ambiente real, você faria uma chamada API aqui
    setTimeout(() => {
      toast({
        title: "Sucesso",
        description: "Instruções de recuperação enviadas para seu email!",
      });
      setEnviado(true);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md bg-card border-border shadow-card">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            {enviado ? "Email Enviado" : "Recuperar Senha"}
          </CardTitle>
          <CardDescription className="text-center">
            {enviado
              ? "Verifique sua caixa de entrada para instruções"
              : "Informe seu email para receber instruções de recuperação"}
          </CardDescription>
        </CardHeader>
        {!enviado ? (
          <CardContent>
            <form onSubmit={handleRecuperarSenha} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90"
                disabled={isLoading}
              >
                {isLoading ? "Enviando..." : "Enviar Instruções"}
              </Button>
            </form>
          </CardContent>
        ) : (
          <CardContent className="text-center space-y-4">
            <p className="text-muted-foreground">
              Enviamos um email com instruções para recuperar sua senha. Por favor, verifique sua caixa de entrada e siga as instruções.
            </p>
            <p className="text-muted-foreground">
              Se não encontrar o email, verifique sua pasta de spam ou tente novamente.
            </p>
          </CardContent>
        )}
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-center text-sm">
            <Link to="/login" className="text-primary hover:underline inline-flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar para o login
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default RecuperarSenha;