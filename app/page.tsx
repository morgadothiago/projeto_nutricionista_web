"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useAuthContext } from "@/app/contexts/auth-context"
import {
  ArrowRight,
  Check,
  CheckCircle2,
  Leaf,
  ShieldCheck,
  Smartphone,
  Star,
  Users,
  FileCheck,
  Activity,
  Heart,
  Trophy,
  Zap,
  Menu,
  X
} from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { MultiStepForm } from "@/components/anamnese/MultiStepForm"
import type { AnamneseFormData } from "@/types/anamnese"
import { api } from "@/app/services/api"
import { toast } from "sonner"
import { motion, useScroll, useTransform } from "framer-motion"
import { n8n } from "./services/n8n"

export default function Home() {
  const router = useRouter()
  const { isAuthenticated, userRole, isLoading } = useAuthContext()
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { scrollY } = useScroll()

  const heroY = useTransform(scrollY, [0, 500], [0, 150])
  const opacityHero = useTransform(scrollY, [0, 300], [1, 0])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Redireciona se já estiver autenticado
  useEffect(() => {
    if (!isLoading && isAuthenticated && userRole) {
      if (userRole === "nutricionista") {
        router.push("/dashboard/nutricionista")
      } else if (userRole === "paciente") {
        router.push("/dashboard/pacients")
      } else {
        router.push("/dashboard")
      }
    }
  }, [isLoading, isAuthenticated, userRole, router])

  const handleAnamneseSubmit = async (data: AnamneseFormData) => {
    try {
      await api.post("/anamnesis", data)

      toast.success("Anamnese enviada com sucesso!", {
        description: "Obrigado! Suas informações foram recebidas.",
        duration: 5000,
      })

      await n8n.post("/nutricionista", data)

      setTimeout(() => {
        window.location.reload()
      }, 2500)
    } catch (error: any) {
      let errorMessage = "Erro ao enviar anamnese. Tente novamente."

      if (error.response) {
        errorMessage =
          error.response.data?.message ||
          error.response.data?.error ||
          `Erro ${error.response.status}: ${error.response.statusText}`
      } else if (error.request) {
        errorMessage = "Não foi possível conectar ao servidor."
      }

      toast.error("Erro ao enviar anamnese", {
        description: errorMessage,
      })
    }
  }

  const fadeInUpPropsVariants = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 }
  }

  const fadeInUpProps = {
    variants: fadeInUpPropsVariants,
    initial: "initial",
    whileInView: "animate",
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.6, ease: "easeOut" as const }
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-emerald-500/30 selection:text-emerald-900 overflow-x-hidden">
      {/* Noise Texture Overlay */}
      <div className="fixed inset-0 bg-noise pointer-events-none z-0"></div>

      {/* Floating Navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "py-4" : "py-6"}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`mx-auto rounded-full transition-all duration-300 ${isScrolled ? "bg-white/80 backdrop-blur-md shadow-lg border border-white/20 pl-6 pr-2 py-2" : "bg-transparent py-2"}`}>
            <div className="flex justify-between items-center">
              <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => window.scrollTo(0, 0)}>
                <Image
                  src="/Logo.svg"
                  alt="Zap Nutre Logo"
                  width={120}
                  height={40}
                  className="h-8 w-auto"
                  priority
                />
              </div>

              {/* Desktop Menu */}
              <div className="hidden md:flex items-center space-x-1">
                <Link href="#features">
                  <Button variant="ghost" className="text-slate-600 hover:text-emerald-600 hover:bg-emerald-50/50 rounded-full px-5">
                    Funcionalidades
                  </Button>
                </Link>
                <Link href="#pricing">
                  <Button variant="ghost" className="text-slate-600 hover:text-emerald-600 hover:bg-emerald-50/50 rounded-full px-5">
                    Preços
                  </Button>
                </Link>
                <Link href="#faq">
                  <Button variant="ghost" className="text-slate-600 hover:text-emerald-600 hover:bg-emerald-50/50 rounded-full px-5">
                    FAQ
                  </Button>
                </Link>
              </div>

              <div className="hidden md:flex items-center space-x-3">
                <Link href="/login">
                  <Button variant="ghost" className="text-slate-700 font-medium hover:bg-slate-100 rounded-full px-6">
                    Entrar
                  </Button>
                </Link>
                <Link href="/cadastro">
                  <Button className="bg-slate-900 hover:bg-slate-800 text-white rounded-full px-6 py-5 shadow-lg shadow-slate-900/20 transition-all hover:scale-105 font-medium">
                    Começar Agora
                  </Button>
                </Link>
              </div>

              {/* Mobile Menu Button */}
              <div className="md:hidden pr-2">
                <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                  {mobileMenuOpen ? <X /> : <Menu />}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-full left-0 right-0 bg-white border-b border-slate-100 p-4 md:hidden shadow-xl"
          >
            <div className="flex flex-col space-y-4">
              <Link href="#features" onClick={() => setMobileMenuOpen(false)} className="text-slate-600 font-medium p-2">Funcionalidades</Link>
              <Link href="#pricing" onClick={() => setMobileMenuOpen(false)} className="text-slate-600 font-medium p-2">Preços</Link>
              <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="text-slate-600 font-medium p-2">Entrar</Link>
              <Link href="/cadastro" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full bg-emerald-600 text-white rounded-xl">Começar Agora</Button>
              </Link>
            </div>
          </motion.div>
        )}
      </motion.nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden z-10">
        {/* Mesh Gradient Background */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-tr from-emerald-200/40 via-teal-100/30 to-blue-100/30 rounded-full blur-[120px] -z-10 animate-blob"></div>
        <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-gradient-to-bl from-emerald-100/40 via-green-50/30 to-transparent rounded-full blur-[100px] -z-10 animate-blob animation-delay-2000"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              style={{ y: heroY, opacity: opacityHero }}
              className="space-y-8 text-center lg:text-left"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center px-4 py-1.5 rounded-full bg-white border border-emerald-100 text-emerald-700 text-sm font-semibold shadow-sm mb-4"
              >
                <span className="flex h-2 w-2 rounded-full bg-emerald-500 mr-2 animate-pulse"></span>
                Nova versão 2.0 disponível
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-5xl lg:text-7xl font-bold text-slate-900 leading-[1.1] tracking-tight"
              >
                Nutrição que <br />
                <span className="relative inline-block">
                  <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">transforma</span>
                  <span className="absolute bottom-2 left-0 w-full h-3 bg-emerald-200/30 -z-10 -rotate-1"></span>
                </span> sua vida.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-xl text-slate-600 leading-relaxed max-w-xl mx-auto lg:mx-0"
              >
                A plataforma completa que conecta nutricionistas e pacientes.
                Planos personalizados, chat em tempo real e resultados comprovados.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4 pt-4 justify-center lg:justify-start"
              >
                <Link href="/cadastro">
                  <Button className="w-full sm:w-auto h-14 px-8 text-lg bg-emerald-600 hover:bg-emerald-700 text-white rounded-full shadow-xl shadow-emerald-200/50 transition-all hover:scale-[1.02] hover:-translate-y-1 font-semibold group">
                    Começar Grátis
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="#anamnese">
                  <Button variant="outline" className="w-full sm:w-auto h-14 px-8 text-lg border-2 border-slate-200 text-slate-700 hover:border-emerald-200 hover:bg-emerald-50/30 hover:text-emerald-700 rounded-full font-semibold transition-all">
                    Fazer Avaliação
                  </Button>
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex items-center justify-center lg:justify-start gap-8 pt-8 border-t border-slate-200/60"
              >
                <div>
                  <p className="text-3xl font-bold text-slate-900">+5k</p>
                  <p className="text-sm text-slate-500 font-medium">Pacientes</p>
                </div>
                <div className="w-px h-10 bg-slate-200"></div>
                <div>
                  <p className="text-3xl font-bold text-slate-900">98%</p>
                  <p className="text-sm text-slate-500 font-medium">Satisfação</p>
                </div>
                <div className="w-px h-10 bg-slate-200"></div>
                <div>
                  <p className="text-3xl font-bold text-slate-900">24/7</p>
                  <p className="text-sm text-slate-500 font-medium">Suporte</p>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotateY: 30 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 1, type: "spring" }}
              className="relative lg:h-[700px] flex items-center justify-center perspective-1000"
            >
              <div className="relative z-10 w-full max-w-[500px]">
                <div className="absolute inset-0 bg-emerald-500 rounded-[3rem] rotate-3 opacity-10 blur-2xl"></div>
                <Image
                  src="/doctorImg.png"
                  alt="App Interface"
                  width={600}
                  height={700}
                  className="relative z-10 object-contain drop-shadow-2xl hover:scale-[1.02] transition-transform duration-700"
                  priority
                />

                {/* Floating Elements */}
                <motion.div
                  animate={{ y: [0, -15, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-20 -right-4 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/50 z-20"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-emerald-100 rounded-xl">
                      <Trophy className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Meta Atingida</p>
                      <p className="text-sm font-bold text-slate-900">-5kg em 30 dias</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  animate={{ y: [0, 15, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute bottom-32 -left-8 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/50 z-20"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-2">
                      {[1, 2, 3].map(i => (
                        <div key={i} className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white"></div>
                      ))}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">Nutris Online</p>
                      <p className="text-xs text-emerald-600 font-medium">Disponíveis agora</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Marquee Section */}
      <section className="py-10 bg-white border-y border-slate-100 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center gap-16 mx-8 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
              <span className="text-2xl font-bold flex items-center gap-2"><Activity /> HealthPlus</span>
              <span className="text-2xl font-bold flex items-center gap-2"><Heart /> MedCare</span>
              <span className="text-2xl font-bold flex items-center gap-2"><Leaf /> NutriLife</span>
              <span className="text-2xl font-bold flex items-center gap-2"><Zap /> EnergyFit</span>
              <span className="text-2xl font-bold flex items-center gap-2"><ShieldCheck /> SecureHealth</span>
              <span className="text-2xl font-bold flex items-center gap-2"><Star /> TopDoctors</span>
            </div>
          ))}
        </div>
      </section>

      {/* Bento Grid Features */}
      <section id="features" className="py-32 bg-slate-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            {...fadeInUpProps}
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <h2 className="text-sm font-bold text-emerald-600 uppercase tracking-widest mb-3">Recursos Poderosos</h2>
            <h3 className="text-3xl lg:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
              Tudo que você precisa para <br /> evoluir sua saúde.
            </h3>
            <p className="text-lg text-slate-600 leading-relaxed">
              Tecnologia de ponta aliada ao conhecimento dos melhores profissionais.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
            {/* Large Card */}
            <motion.div
              {...fadeInUpProps}
              className="md:col-span-2 row-span-2 bg-white rounded-[2.5rem] p-10 shadow-sm border border-slate-200 hover:shadow-xl transition-all duration-500 group overflow-hidden relative"
            >
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-emerald-100 flex items-center justify-center mb-6 text-emerald-600">
                    <Smartphone className="w-7 h-7" />
                  </div>
                  <h4 className="text-3xl font-bold text-slate-900 mb-4">App Mobile Integrado</h4>
                  <p className="text-lg text-slate-600 max-w-md">
                    Acompanhe sua dieta, registre refeições e fale com seu nutricionista em tempo real, onde estiver.
                  </p>
                </div>
                <Button variant="link" className="w-fit p-0 text-emerald-600 font-bold text-lg group-hover:translate-x-2 transition-transform">
                  Saiba mais <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
              <div className="absolute right-0 bottom-0 w-1/2 h-3/4 bg-gradient-to-tl from-emerald-50 to-transparent rounded-tl-[3rem] group-hover:scale-105 transition-transform duration-700">
                {/* Abstract UI Mockup */}
                <div className="absolute top-10 left-10 w-full h-full bg-white rounded-tl-3xl shadow-2xl border border-slate-100 p-6">
                  <div className="space-y-4">
                    <div className="h-8 w-3/4 bg-slate-100 rounded-lg"></div>
                    <div className="h-32 w-full bg-emerald-50/50 rounded-xl border border-emerald-100"></div>
                    <div className="h-8 w-1/2 bg-slate-100 rounded-lg"></div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Tall Card */}
            <motion.div
              {...fadeInUpProps}
              className="md:col-span-1 row-span-2 bg-slate-900 rounded-[2.5rem] p-10 shadow-xl border border-slate-800 hover:shadow-2xl transition-all duration-500 group relative overflow-hidden text-white"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/20 rounded-full blur-[80px]"></div>
              <div className="relative z-10 h-full flex flex-col">
                <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-6 text-emerald-400">
                  <Activity className="w-7 h-7" />
                </div>
                <h4 className="text-2xl font-bold mb-4">Monitoramento Inteligente</h4>
                <p className="text-slate-400 mb-8 flex-grow">
                  Gráficos detalhados da sua evolução, consumo de água e macronutrientes.
                </p>

                <div className="bg-white/5 rounded-2xl p-4 border border-white/10 backdrop-blur-sm">
                  <div className="flex justify-between items-end h-32 gap-2">
                    {[40, 70, 50, 90, 60, 80].map((h, i) => (
                      <div key={i} className="w-full bg-emerald-500/50 rounded-t-lg hover:bg-emerald-400 transition-colors" style={{ height: `${h}%` }}></div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Small Card 1 */}
            <motion.div
              {...fadeInUpProps}
              className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-200 hover:shadow-xl transition-all duration-500 group"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-4 text-blue-600">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-2">Dados Seguros</h4>
              <p className="text-slate-600 text-sm">Criptografia de ponta a ponta para sua privacidade.</p>
            </motion.div>

            {/* Small Card 2 */}
            <motion.div
              {...fadeInUpProps}
              className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-200 hover:shadow-xl transition-all duration-500 group"
            >
              <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center mb-4 text-purple-600">
                <Leaf className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-2">100% Natural</h4>
              <p className="text-slate-600 text-sm">Foco em reeducação alimentar sem remédios.</p>
            </motion.div>

            {/* Small Card 3 */}
            <motion.div
              {...fadeInUpProps}
              className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-200 hover:shadow-xl transition-all duration-500 group"
            >
              <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center mb-4 text-orange-600">
                <Star className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-2">Top Rated</h4>
              <p className="text-slate-600 text-sm">Avaliado com 4.9/5 por mais de 2 mil usuários.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Anamnese Section - Glass Card */}
      <section id="anamnese" className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-slate-900">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/40 to-slate-900"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid.svg')] opacity-[0.03]"></div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            {...fadeInUpProps}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/5 border border-white/10 text-emerald-400 text-sm font-medium mb-6 backdrop-blur-sm">
              <FileCheck className="w-4 h-4 mr-2" />
              Avaliação Gratuita
            </div>
            <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
              Comece sua transformação.
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
              Preencha nossa anamnese inteligente em menos de 2 minutos e receba uma análise preliminar do seu perfil.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Glow Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-[2.5rem] blur opacity-30"></div>

            <div className="relative bg-slate-900/50 backdrop-blur-xl rounded-[2.5rem] p-2 border border-white/10 shadow-2xl">
              <div className="bg-white rounded-[2rem] overflow-hidden">
                <MultiStepForm onSubmit={handleAnamneseSubmit} isEmbedded />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-32 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            {...fadeInUpProps}
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <h2 className="text-sm font-bold text-emerald-600 uppercase tracking-widest mb-3">Planos Flexíveis</h2>
            <h2 className="text-3xl lg:text-5xl font-bold text-slate-900 mb-6 tracking-tight">Investimento transparente.</h2>
            <p className="text-lg text-slate-600">
              Escolha a melhor opção para sua jornada de saúde. Sem contratos de fidelidade.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-center">
            {/* Paciente */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-slate-50 rounded-[2rem] p-8 border border-slate-200 hover:border-emerald-200 transition-all duration-300"
            >
              <h3 className="text-xl font-bold text-slate-900 mb-2">Paciente</h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-bold text-slate-900">Grátis</span>
              </div>
              <p className="text-slate-600 mb-8 text-sm">Ideal para começar sua jornada.</p>
              <ul className="space-y-4 mb-8">
                {["Acesso ao app", "Diário alimentar", "Chat com nutri"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-600 text-sm">
                    <Check className="w-4 h-4 text-emerald-500" /> {item}
                  </li>
                ))}
              </ul>
              <Link href="/cadastro">
                <Button variant="outline" className="w-full h-12 rounded-xl font-semibold border-slate-300 hover:bg-white hover:border-emerald-500 hover:text-emerald-600">
                  Começar Grátis
                </Button>
              </Link>
            </motion.div>

            {/* Nutri Pro */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-slate-900 rounded-[2.5rem] p-10 shadow-2xl relative border border-slate-800 transform scale-105 z-10"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                Mais Popular
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Nutri Pro</h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-5xl font-bold text-white">R$ 97</span>
                <span className="text-slate-400">/mês</span>
              </div>
              <p className="text-slate-400 mb-8 text-sm">Para nutricionistas em crescimento.</p>
              <ul className="space-y-4 mb-8">
                {["Até 50 pacientes", "App personalizado", "Gestão financeira", "Suporte prioritário"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-300 text-sm">
                    <Check className="w-4 h-4 text-emerald-400" /> {item}
                  </li>
                ))}
              </ul>
              <Link href="/cadastro">
                <Button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white h-14 rounded-xl font-bold transition-all shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 hover:-translate-y-1">
                  Assinar Agora
                </Button>
              </Link>
            </motion.div>

            {/* Clinic */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-slate-50 rounded-[2rem] p-8 border border-slate-200 hover:border-emerald-200 transition-all duration-300"
            >
              <h3 className="text-xl font-bold text-slate-900 mb-2">Clínica</h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-bold text-slate-900">R$ 297</span>
                <span className="text-slate-500">/mês</span>
              </div>
              <p className="text-slate-600 mb-8 text-sm">Para grandes operações.</p>
              <ul className="space-y-4 mb-8">
                {["Pacientes ilimitados", "Múltiplos nutris", "Relatórios avançados"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-600 text-sm">
                    <Check className="w-4 h-4 text-emerald-500" /> {item}
                  </li>
                ))}
              </ul>
              <Link href="/cadastro">
                <Button variant="outline" className="w-full h-12 rounded-xl font-semibold border-slate-300 hover:bg-white hover:border-emerald-500 hover:text-emerald-600">
                  Falar com Vendas
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-32 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            {...fadeInUpProps}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Dúvidas frequentes</h2>
            <p className="text-lg text-slate-600">
              Tudo que você precisa saber sobre o Zap Nutre.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Accordion type="single" collapsible className="w-full space-y-4">
              {[
                { q: "O aplicativo é gratuito para pacientes?", a: "Sim! Pacientes podem criar uma conta gratuitamente, preencher a anamnese e se conectar com seus nutricionistas sem custo algum." },
                { q: "Como funciona para nutricionistas?", a: "Nutricionistas têm acesso a um painel completo de gestão, criação de dietas e acompanhamento. Oferecemos um período de teste gratuito." },
                { q: "Posso cancelar a qualquer momento?", a: "Com certeza. Não acreditamos em fidelidade forçada. Você pode cancelar sua assinatura a qualquer momento diretamente pelo painel." },
                { q: "Meus dados estão seguros?", a: "Sim, utilizamos criptografia de ponta a ponta e seguimos rigorosamente a LGPD para garantir a segurança e privacidade de todos os seus dados de saúde." }
              ].map((item, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="bg-white border border-slate-200 rounded-2xl px-6 shadow-sm data-[state=open]:border-emerald-200 transition-all">
                  <AccordionTrigger className="text-left font-semibold text-slate-900 hover:no-underline hover:text-emerald-600 py-6 text-lg">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600 pb-6 leading-relaxed">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white pt-20 pb-10 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2">
              <Image
                src="/Logo.svg"
                alt="Zap Nutre Logo"
                width={140}
                height={48}
                className="h-10 w-auto mb-6"
              />
              <p className="max-w-xs leading-relaxed text-slate-500">
                Transformando vidas através da nutrição inteligente e tecnologia humanizada.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-6">Produto</h4>
              <ul className="space-y-4 text-sm text-slate-600">
                <li><Link href="#" className="hover:text-emerald-600 transition-colors">Funcionalidades</Link></li>
                <li><Link href="#" className="hover:text-emerald-600 transition-colors">Preços</Link></li>
                <li><Link href="#" className="hover:text-emerald-600 transition-colors">Para Nutricionistas</Link></li>
                <li><Link href="#" className="hover:text-emerald-600 transition-colors">Para Pacientes</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-6">Legal</h4>
              <ul className="space-y-4 text-sm text-slate-600">
                <li><Link href="#" className="hover:text-emerald-600 transition-colors">Termos de Uso</Link></li>
                <li><Link href="#" className="hover:text-emerald-600 transition-colors">Privacidade</Link></li>
                <li><Link href="#" className="hover:text-emerald-600 transition-colors">Contato</Link></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
            <span>© 2024 Zap Nutre. Todos os direitos reservados.</span>
            <div className="flex gap-6">
              <Link href="#" className="hover:text-emerald-600 transition-colors">Instagram</Link>
              <Link href="#" className="hover:text-emerald-600 transition-colors">LinkedIn</Link>
              <Link href="#" className="hover:text-emerald-600 transition-colors">Twitter</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}


