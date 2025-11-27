"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useAuthContext } from "@/app/contexts/auth-context"
import { ArrowRight, Check, CheckCircle2, Leaf, ShieldCheck, Smartphone, Star, Users, FileCheck, ClipboardList } from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function Home() {
  const router = useRouter()
  const { isAuthenticated, userRole, isLoading } = useAuthContext()

  // Redireciona se já estiver autenticado
  useEffect(() => {
    if (!isLoading && isAuthenticated && userRole) {
      if (userRole === "nutricionista") {
        router.push("/dashboard/nutricionista")
      } else if (userRole === "paciente") {
        router.push("/dashboard/paciente")
      } else {
        router.push("/dashboard")
      }
    }
  }, [isLoading, isAuthenticated, userRole, router])

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-emerald-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0 flex items-center">
              <Image
                src="/Logo.svg"
                alt="Zap Nutre Logo"
                width={120}
                height={40}
                className="h-8 w-auto"
                priority
              />
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <Link href="/login">
                <Button variant="ghost" className="text-emerald-900 hover:text-emerald-700 hover:bg-emerald-50">
                  Entrar
                </Button>
              </Link>
              <Link href="/cadastro">
                <Button className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-full px-6 shadow-md shadow-emerald-200">
                  Começar Agora
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-24 bg-gradient-to-br from-emerald-50 via-white to-teal-50 overflow-hidden relative">
        {/* Floating background elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-emerald-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 z-10">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-800 text-sm font-medium animate-fade-in shadow-sm">
                <Star className="w-4 h-4 mr-2 fill-emerald-600 text-emerald-600" />
                A plataforma #1 para nutricionistas e pacientes
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold text-slate-900 leading-tight animate-slide-in-left">
                Cuidar da sua alimentação pode ser <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">mais leve</span>.
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed max-w-xl">
                Conectamos nutricionistas e pacientes de forma simples e eficiente.
                Planos personalizados, acompanhamento em tempo real e resultados que duram.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 animate-fade-in">
                <Link href="/cadastro">
                  <Button className="w-full sm:w-auto h-14 px-8 text-lg bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-xl shadow-lg shadow-emerald-200/50 transition-all hover:scale-105 hover:shadow-xl hover:shadow-emerald-300/50 font-semibold">
                    Criar conta grátis
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link href="/login">
                  <Button variant="outline" className="w-full sm:w-auto h-14 px-8 text-lg border-2 border-emerald-200 text-emerald-700 hover:bg-emerald-50 hover:border-emerald-300 rounded-xl font-semibold transition-all">
                    Já tenho conta
                  </Button>
                </Link>
              </div>
              <div className="flex items-center gap-4 text-sm text-slate-500">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center text-xs font-bold">
                      <Users className="w-4 h-4 text-slate-400" />
                    </div>
                  ))}
                </div>
                <p>Mais de 5.000 usuários ativos</p>
              </div>
            </div>
            <div className="relative lg:h-[600px] flex items-center justify-center">
              <div className="absolute inset-0 bg-emerald-200/20 rounded-full blur-3xl transform translate-x-10 translate-y-10"></div>
              <Image
                src="/doctorImg.png"
                alt="Nutricionista usando o app"
                width={500}
                height={600}
                className="relative z-10 object-contain drop-shadow-2xl hover:scale-[1.02] transition-transform duration-500"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Anamnese CTA Section */}
      <section className="py-20 bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 text-white text-sm font-medium mb-4">
                <FileCheck className="w-4 h-4 mr-2" />
                Avaliação Nutricional Gratuita
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                Comece sua jornada com uma avaliação completa
              </h2>
              <p className="text-emerald-50 text-lg mb-6">
                Preencha nossa anamnese detalhada e receba uma análise personalizada do seu perfil nutricional.
                É rápido, fácil e completamente gratuito!
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "5 etapas simples e rápidas",
                  "Análise completa de saúde e hábitos",
                  "Cálculo automático de IMC",
                  "Recomendações personalizadas"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-white">
                    <CheckCircle2 className="w-5 h-5 text-emerald-200 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/anamnese">
                <Button className="h-12 px-8 text-lg bg-white text-emerald-600 hover:bg-emerald-50 rounded-xl shadow-lg transition-all hover:scale-105">
                  Preencher Anamnese Gratuita
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-white/10 rounded-xl">
                    <div className="w-12 h-12 rounded-full bg-emerald-400 flex items-center justify-center text-white font-bold">
                      1
                    </div>
                    <div className="text-white">
                      <p className="font-semibold">Dados Pessoais</p>
                      <p className="text-sm text-emerald-100">Informações básicas</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-white/10 rounded-xl">
                    <div className="w-12 h-12 rounded-full bg-emerald-400 flex items-center justify-center text-white font-bold">
                      2
                    </div>
                    <div className="text-white">
                      <p className="font-semibold">Histórico de Saúde</p>
                      <p className="text-sm text-emerald-100">Doenças e alergias</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-white/10 rounded-xl">
                    <div className="w-12 h-12 rounded-full bg-emerald-400 flex items-center justify-center text-white font-bold">
                      3
                    </div>
                    <div className="text-white">
                      <p className="font-semibold">Seus Objetivos</p>
                      <p className="text-sm text-emerald-100">Metas e peso desejado</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-white/10 rounded-xl">
                    <div className="w-12 h-12 rounded-full bg-emerald-400 flex items-center justify-center text-white font-bold">
                      4
                    </div>
                    <div className="text-white">
                      <p className="font-semibold">Hábitos Alimentares</p>
                      <p className="text-sm text-emerald-100">Rotina e preferências</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-white/10 rounded-xl">
                    <div className="w-12 h-12 rounded-full bg-emerald-400 flex items-center justify-center text-white font-bold">
                      5
                    </div>
                    <div className="text-white">
                      <p className="font-semibold">Estilo de Vida</p>
                      <p className="text-sm text-emerald-100">Atividades e sono</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Por que escolher o Zap Nutre?</h2>
            <p className="text-lg text-slate-600">
              Ferramentas poderosas para nutricionistas e uma experiência incrível para pacientes.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Smartphone className="w-8 h-8 text-emerald-500" />,
                title: "Acesso em qualquer lugar",
                description: "Acesse seu plano alimentar, receitas e chat diretamente pelo celular, tablet ou computador."
              },
              {
                icon: <Leaf className="w-8 h-8 text-emerald-500" />,
                title: "Planos Personalizados",
                description: "Dietas adaptadas às suas necessidades, preferências e objetivos específicos."
              },
              {
                icon: <ShieldCheck className="w-8 h-8 text-emerald-500" />,
                title: "Segurança e Privacidade",
                description: "Seus dados de saúde e conversas são protegidos com a mais alta segurança."
              }
            ].map((feature, index) => (
              <div key={index} className="group p-8 rounded-2xl bg-white border border-slate-200 hover:border-emerald-200 hover:shadow-2xl hover:shadow-emerald-100/50 transition-all duration-500 hover:-translate-y-2">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-100 to-teal-100 group-hover:from-emerald-500 group-hover:to-teal-600 flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
                  <div className="group-hover:text-white transition-colors duration-300">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-emerald-700 transition-colors">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900 text-white overflow-hidden relative">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-600/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-600/20 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">Como funciona?</h2>
              <p className="text-emerald-100 text-lg mb-8">
                Simplificamos o processo de acompanhamento nutricional para que você foque no que importa: sua saúde.
              </p>
              <div className="space-y-8">
                {[
                  {
                    step: "01",
                    title: "Crie sua conta",
                    desc: "Cadastre-se como paciente ou nutricionista em menos de 2 minutos."
                  },
                  {
                    step: "02",
                    title: "Conecte-se",
                    desc: "Encontre seu nutricionista ou convide seus pacientes para a plataforma."
                  },
                  {
                    step: "03",
                    title: "Comece a transformação",
                    desc: "Receba planos, acompanhe a evolução e conquiste seus objetivos."
                  }
                ].map((item, idx) => (
                  <div key={idx} className="group flex gap-6 transition-all duration-300 hover:translate-x-2">
                    <div className="text-4xl font-bold text-emerald-500/30 group-hover:text-emerald-400/60 transition-colors duration-300">{item.step}</div>
                    <div>
                      <h4 className="text-xl font-bold mb-2 group-hover:text-emerald-300 transition-colors">{item.title}</h4>
                      <p className="text-emerald-200">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-emerald-500/20 blur-3xl rounded-full animate-pulse"></div>
              <div className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 shadow-2xl">
                <div className="space-y-4">
                  <div className="group flex items-center gap-4 bg-white/5 hover:bg-white/10 p-4 rounded-xl transition-all duration-300 hover:translate-x-2">
                    <CheckCircle2 className="text-emerald-400 group-hover:scale-110 transition-transform duration-300" />
                    <span className="group-hover:text-white transition-colors">Chat integrado com nutricionista</span>
                  </div>
                  <div className="group flex items-center gap-4 bg-white/5 hover:bg-white/10 p-4 rounded-xl transition-all duration-300 hover:translate-x-2">
                    <CheckCircle2 className="text-emerald-400 group-hover:scale-110 transition-transform duration-300" />
                    <span className="group-hover:text-white transition-colors">Diário alimentar digital</span>
                  </div>
                  <div className="group flex items-center gap-4 bg-white/5 hover:bg-white/10 p-4 rounded-xl transition-all duration-300 hover:translate-x-2">
                    <CheckCircle2 className="text-emerald-400 group-hover:scale-110 transition-transform duration-300" />
                    <span className="group-hover:text-white transition-colors">Gráficos de evolução</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 bg-gradient-to-br from-slate-50 to-emerald-50/30 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-20 right-20 w-64 h-64 bg-emerald-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-teal-200/30 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Planos que cabem no seu bolso</h2>
            <p className="text-lg text-slate-600">
              Escolha o plano ideal para você, seja paciente ou profissional.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Paciente */}
            <div className="group bg-white rounded-2xl p-8 shadow-sm border border-slate-200 hover:shadow-2xl hover:shadow-emerald-100/50 transition-all duration-500 hover:-translate-y-2">
              <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-emerald-700 transition-colors">Paciente</h3>
              <div className="text-4xl font-bold text-slate-900 mb-6">Grátis</div>
              <p className="text-slate-600 mb-8">Para quem quer começar a cuidar da saúde.</p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3 text-slate-600 group-hover:text-slate-800 transition-colors">
                  <Check className="w-5 h-5 text-emerald-500 group-hover:scale-110 transition-transform" /> Acesso ao app
                </li>
                <li className="flex items-center gap-3 text-slate-600 group-hover:text-slate-800 transition-colors">
                  <Check className="w-5 h-5 text-emerald-500 group-hover:scale-110 transition-transform" /> Diário alimentar
                </li>
                <li className="flex items-center gap-3 text-slate-600 group-hover:text-slate-800 transition-colors">
                  <Check className="w-5 h-5 text-emerald-500 group-hover:scale-110 transition-transform" /> Chat com nutri
                </li>
              </ul>
              <Link href="/cadastro">
                <Button className="w-full bg-slate-100 hover:bg-emerald-500 hover:text-white text-slate-900 transition-all duration-300 hover:shadow-lg h-12">
                  Começar Grátis
                </Button>
              </Link>
            </div>

            {/* Nutri Pro */}
            <div className="group bg-white rounded-2xl p-8 shadow-xl border-2 border-emerald-500 relative transform md:-translate-y-4 hover:shadow-2xl hover:shadow-emerald-200/50 transition-all duration-500 hover:-translate-y-6">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-4 py-1 rounded-full text-sm font-medium shadow-lg">
                Mais Popular
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-emerald-700 transition-colors">Nutri Pro</h3>
              <div className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-6">R$ 97<span className="text-lg font-normal text-slate-500">/mês</span></div>
              <p className="text-slate-600 mb-8">Para nutricionistas que querem escalar.</p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3 text-slate-600 group-hover:text-slate-800 transition-colors">
                  <Check className="w-5 h-5 text-emerald-500 group-hover:scale-110 transition-transform" /> Até 50 pacientes
                </li>
                <li className="flex items-center gap-3 text-slate-600 group-hover:text-slate-800 transition-colors">
                  <Check className="w-5 h-5 text-emerald-500 group-hover:scale-110 transition-transform" /> App personalizado
                </li>
                <li className="flex items-center gap-3 text-slate-600 group-hover:text-slate-800 transition-colors">
                  <Check className="w-5 h-5 text-emerald-500 group-hover:scale-110 transition-transform" /> Gestão financeira
                </li>
                <li className="flex items-center gap-3 text-slate-600 group-hover:text-slate-800 transition-colors">
                  <Check className="w-5 h-5 text-emerald-500 group-hover:scale-110 transition-transform" /> Suporte prioritário
                </li>
              </ul>
              <Link href="/cadastro">
                <Button className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-lg shadow-emerald-200 hover:shadow-xl hover:shadow-emerald-300 transition-all duration-300 h-12">
                  Assinar Agora
                </Button>
              </Link>
            </div>

            {/* Clinic */}
            <div className="group bg-white rounded-2xl p-8 shadow-sm border border-slate-200 hover:shadow-2xl hover:shadow-emerald-100/50 transition-all duration-500 hover:-translate-y-2">
              <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-emerald-700 transition-colors">Clínica</h3>
              <div className="text-4xl font-bold text-slate-900 mb-6">R$ 297<span className="text-lg font-normal text-slate-500">/mês</span></div>
              <p className="text-slate-600 mb-8">Para clínicas com múltiplos profissionais.</p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3 text-slate-600 group-hover:text-slate-800 transition-colors">
                  <Check className="w-5 h-5 text-emerald-500 group-hover:scale-110 transition-transform" /> Pacientes ilimitados
                </li>
                <li className="flex items-center gap-3 text-slate-600 group-hover:text-slate-800 transition-colors">
                  <Check className="w-5 h-5 text-emerald-500 group-hover:scale-110 transition-transform" /> Múltiplos nutris
                </li>
                <li className="flex items-center gap-3 text-slate-600 group-hover:text-slate-800 transition-colors">
                  <Check className="w-5 h-5 text-emerald-500 group-hover:scale-110 transition-transform" /> Relatórios avançados
                </li>
              </ul>
              <Link href="/cadastro">
                <Button className="w-full bg-slate-100 hover:bg-emerald-500 hover:text-white text-slate-900 transition-all duration-300 hover:shadow-lg h-12">
                  Falar com Vendas
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-100/40 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-100/40 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">O que dizem sobre nós</h2>
            <p className="text-lg text-slate-600">
              Histórias reais de quem transformou sua vida com o Zap Nutre.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Ana Clara",
                role: "Paciente",
                content: "Perdi 10kg em 3 meses com o acompanhamento da minha nutri pelo app. Muito fácil de usar!"
              },
              {
                name: "Dr. Roberto",
                role: "Nutricionista",
                content: "O Zap Nutre revolucionou meu consultório. Consigo atender mais pacientes com mais qualidade."
              },
              {
                name: "Juliana",
                role: "Paciente",
                content: "Adoro as receitas e a facilidade de falar com minha nutricionista. Recomendo para todos!"
              }
            ].map((testimonial, index) => (
              <div key={index} className="group p-8 rounded-2xl bg-gradient-to-br from-slate-50 to-emerald-50/30 border border-slate-100 hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-100/50 transition-all duration-500 hover:-translate-y-2">
                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400 group-hover:scale-110 transition-transform duration-300" />
                  ))}
                </div>
                <p className="text-slate-700 mb-6 italic leading-relaxed group-hover:text-slate-900 transition-colors">"{testimonial.content}"</p>
                <div className="border-t border-slate-200 pt-4">
                  <div className="font-bold text-slate-900">{testimonial.name}</div>
                  <div className="text-sm font-medium bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Perguntas Frequentes</h2>
            <p className="text-lg text-slate-600">
              Tire suas dúvidas sobre o Zap Nutre.
            </p>
          </div>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>O aplicativo é gratuito para pacientes?</AccordionTrigger>
              <AccordionContent>
                Sim! Pacientes podem criar uma conta gratuitamente e se conectar com seus nutricionistas.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Como funciona para nutricionistas?</AccordionTrigger>
              <AccordionContent>
                Nutricionistas têm um período de teste grátis e depois podem escolher um dos nossos planos profissionais para gerenciar seus pacientes.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Posso cancelar a qualquer momento?</AccordionTrigger>
              <AccordionContent>
                Com certeza. Não temos fidelidade e você pode cancelar sua assinatura quando quiser.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-white to-emerald-50/50 relative overflow-hidden">
        {/* Floating background elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-200/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-200/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-emerald-300/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>

        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl font-bold text-slate-900 mb-6">
            Pronto para transformar sua saúde?
          </h2>
          <p className="text-xl text-slate-600 mb-10">
            Junte-se a milhares de pessoas que já estão mudando de vida com o Zap Nutre.
          </p>
          <Link href="/cadastro">
            <Button className="h-14 px-10 text-lg bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-full shadow-xl shadow-emerald-200/50 hover:shadow-2xl hover:shadow-emerald-300/50 transition-all hover:-translate-y-1 hover:scale-105 font-semibold">
              Começar Gratuitamente <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-slate-50 to-slate-100 border-t border-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-1 md:col-span-2">
              <Image
                src="/Logo.svg"
                alt="Zap Nutre Logo"
                width={120}
                height={40}
                className="h-8 w-auto mb-4"
              />
              <p className="text-slate-600 max-w-xs leading-relaxed">
                A plataforma completa para nutricionistas e pacientes conectarem saúde e tecnologia.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-4">Produto</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li><Link href="#" className="hover:text-emerald-600 transition-colors">Funcionalidades</Link></li>
                <li><Link href="#" className="hover:text-emerald-600 transition-colors">Preços</Link></li>
                <li><Link href="#" className="hover:text-emerald-600 transition-colors">Para Nutricionistas</Link></li>
                <li><Link href="#" className="hover:text-emerald-600 transition-colors">Para Pacientes</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li><Link href="#" className="hover:text-emerald-600 transition-colors">Termos de Uso</Link></li>
                <li><Link href="#" className="hover:text-emerald-600 transition-colors">Privacidade</Link></li>
                <li><Link href="#" className="hover:text-emerald-600 transition-colors">Contato</Link></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
            <span className="text-sm text-slate-500">© 2024 Zap Nutre. Todos os direitos reservados.</span>
            <div className="flex gap-4">
              {/* Social icons placeholders */}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
