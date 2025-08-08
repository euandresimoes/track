import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { User, Bell, Shield, Database } from "lucide-react";

const Configuracoes = () => {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Configurações</h1>
        <p className="text-muted-foreground">Gerencie suas preferências e configurações</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-card border-border shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Perfil do Usuário
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome</Label>
              <Input id="name" defaultValue="Usuário" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue="usuario@email.com" />
            </div>
            <Button className="w-full">Salvar Alterações</Button>
          </CardContent>
        </Card>

        <Card className="bg-card border-border shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notificações
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="email-notifications">Notificações por Email</Label>
              <Button variant="outline" size="sm">Ativado</Button>
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="push-notifications">Notificações Push</Label>
              <Button variant="outline" size="sm">Desativado</Button>
            </div>
            <Separator />
            <Button className="w-full">Salvar Preferências</Button>
          </CardContent>
        </Card>

        <Card className="bg-card border-border shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Segurança
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="current-password">Senha Atual</Label>
              <Input id="current-password" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-password">Nova Senha</Label>
              <Input id="new-password" type="password" />
            </div>
            <Button className="w-full">Alterar Senha</Button>
          </CardContent>
        </Card>

        <Card className="bg-card border-border shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Dados
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                Gerencie seus dados e privacidade
              </p>
            </div>
            <Button variant="outline" className="w-full">
              Exportar Dados
            </Button>
            <Button variant="destructive" className="w-full">
              Excluir Conta
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Configuracoes;