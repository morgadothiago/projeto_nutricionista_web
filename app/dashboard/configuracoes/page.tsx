"use client"

import { useState } from "react"
import { DashboardLayout } from "@/app/components/dashboard/dashboard-layout"
import { useSession } from "next-auth/react"
import {
  User,
  Lock,
  Bell,
  Settings as SettingsIcon,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Save,
} from "lucide-react"
import { toast } from "sonner"

type TabType = "personal" | "security" | "notifications" | "preferences"

export default function ConfiguracoesPage() {
  const { data: session } = useSession()
  const [activeTab, setActiveTab] = useState<TabType>("personal")
  const [isLoading, setIsLoading] = useState(false)

  // Dados pessoais
  const [personalData, setPersonalData] = useState({
    name: session?.user?.name || "",
    email: session?.user?.email || "",
    phone: "",
    birthDate: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
  })

  // Dados de segurança
  const [securityData, setSecurityData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  // Notificações
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    weeklyReport: true,
    appointmentReminders: true,
  })

  // Preferências
  const [preferences, setPreferences] = useState({
    language: "pt-BR",
    timezone: "America/Sao_Paulo",
    dateFormat: "DD/MM/YYYY",
    theme: "light",
  })

  const handleSavePersonalData = async () => {
    setIsLoading(true)
    try {
      // Simulação de API
      await new Promise((resolve) => setTimeout(resolve, 1000))
      toast.success("Dados pessoais atualizados com sucesso!")
    } catch (error) {
      toast.error("Erro ao atualizar dados pessoais")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSavePassword = async () => {
    if (securityData.newPassword !== securityData.confirmPassword) {
      toast.error("As senhas não coincidem")
      return
    }

    if (securityData.newPassword.length < 6) {
      toast.error("A senha deve ter no mínimo 6 caracteres")
      return
    }

    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      toast.success("Senha alterada com sucesso!")
      setSecurityData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      })
    } catch (error) {
      toast.error("Erro ao alterar senha")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSaveNotifications = async () => {
    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      toast.success("Preferências de notificação atualizadas!")
    } catch (error) {
      toast.error("Erro ao atualizar notificações")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSavePreferences = async () => {
    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      toast.success("Preferências atualizadas com sucesso!")
    } catch (error) {
      toast.error("Erro ao atualizar preferências")
    } finally {
      setIsLoading(false)
    }
  }

  const tabs = [
    {
      id: "personal" as TabType,
      label: "Dados Pessoais",
      icon: User,
    },
    {
      id: "security" as TabType,
      label: "Segurança",
      icon: Lock,
    },
    {
      id: "notifications" as TabType,
      label: "Notificações",
      icon: Bell,
    },
    {
      id: "preferences" as TabType,
      label: "Preferências",
      icon: SettingsIcon,
    },
  ]

  return (
    <DashboardLayout
      userName={session?.user?.name || ""}
      userRole={session?.user?.role || ""}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Configurações
          </h1>
          <p className="text-gray-600">
            Gerencie suas informações pessoais e preferências
          </p>
        </div>

        {/* Tabs Navigation */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex overflow-x-auto">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                      activeTab === tab.id
                        ? "border-emerald-500 text-emerald-600"
                        : "border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{tab.label}</span>
                  </button>
                )
              })}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {/* Dados Pessoais */}
            {activeTab === "personal" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Nome */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nome Completo
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        value={personalData.name}
                        onChange={(e) =>
                          setPersonalData({ ...personalData, name: e.target.value })
                        }
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        placeholder="Seu nome completo"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        value={personalData.email}
                        onChange={(e) =>
                          setPersonalData({ ...personalData, email: e.target.value })
                        }
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        placeholder="seu@email.com"
                      />
                    </div>
                  </div>

                  {/* Telefone */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Telefone
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="tel"
                        value={personalData.phone}
                        onChange={(e) =>
                          setPersonalData({ ...personalData, phone: e.target.value })
                        }
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        placeholder="(00) 00000-0000"
                      />
                    </div>
                  </div>

                  {/* Data de Nascimento */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Data de Nascimento
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="date"
                        value={personalData.birthDate}
                        onChange={(e) =>
                          setPersonalData({
                            ...personalData,
                            birthDate: e.target.value,
                          })
                        }
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Endereço */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Endereço
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={personalData.address}
                      onChange={(e) =>
                        setPersonalData({ ...personalData, address: e.target.value })
                      }
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="Rua, número, complemento"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Cidade */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cidade
                    </label>
                    <input
                      type="text"
                      value={personalData.city}
                      onChange={(e) =>
                        setPersonalData({ ...personalData, city: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="Sua cidade"
                    />
                  </div>

                  {/* Estado */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Estado
                    </label>
                    <select
                      value={personalData.state}
                      onChange={(e) =>
                        setPersonalData({ ...personalData, state: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    >
                      <option value="">Selecione</option>
                      <option value="SP">São Paulo</option>
                      <option value="RJ">Rio de Janeiro</option>
                      <option value="MG">Minas Gerais</option>
                      {/* Adicionar outros estados */}
                    </select>
                  </div>

                  {/* CEP */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      CEP
                    </label>
                    <input
                      type="text"
                      value={personalData.zipCode}
                      onChange={(e) =>
                        setPersonalData({ ...personalData, zipCode: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="00000-000"
                    />
                  </div>
                </div>

                {/* Botão Salvar */}
                <div className="flex justify-end">
                  <button
                    onClick={handleSavePersonalData}
                    disabled={isLoading}
                    className="flex items-center space-x-2 px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg font-medium hover:from-emerald-600 hover:to-teal-700 transition-all disabled:opacity-50"
                  >
                    <Save className="w-5 h-5" />
                    <span>{isLoading ? "Salvando..." : "Salvar Alterações"}</span>
                  </button>
                </div>
              </div>
            )}

            {/* Segurança */}
            {activeTab === "security" && (
              <div className="space-y-6">
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-sm text-yellow-800">
                    <strong>Dica de Segurança:</strong> Use uma senha forte com pelo
                    menos 8 caracteres, incluindo letras maiúsculas, minúsculas,
                    números e símbolos.
                  </p>
                </div>

                <div className="space-y-4">
                  {/* Senha Atual */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Senha Atual
                    </label>
                    <input
                      type="password"
                      value={securityData.currentPassword}
                      onChange={(e) =>
                        setSecurityData({
                          ...securityData,
                          currentPassword: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="Digite sua senha atual"
                    />
                  </div>

                  {/* Nova Senha */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nova Senha
                    </label>
                    <input
                      type="password"
                      value={securityData.newPassword}
                      onChange={(e) =>
                        setSecurityData({
                          ...securityData,
                          newPassword: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="Digite sua nova senha"
                    />
                  </div>

                  {/* Confirmar Senha */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Confirmar Nova Senha
                    </label>
                    <input
                      type="password"
                      value={securityData.confirmPassword}
                      onChange={(e) =>
                        setSecurityData({
                          ...securityData,
                          confirmPassword: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="Confirme sua nova senha"
                    />
                  </div>
                </div>

                {/* Botão Salvar */}
                <div className="flex justify-end">
                  <button
                    onClick={handleSavePassword}
                    disabled={isLoading}
                    className="flex items-center space-x-2 px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg font-medium hover:from-emerald-600 hover:to-teal-700 transition-all disabled:opacity-50"
                  >
                    <Save className="w-5 h-5" />
                    <span>{isLoading ? "Alterando..." : "Alterar Senha"}</span>
                  </button>
                </div>
              </div>
            )}

            {/* Notificações */}
            {activeTab === "notifications" && (
              <div className="space-y-6">
                <div className="space-y-4">
                  {/* Email */}
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">
                        Notificações por Email
                      </h4>
                      <p className="text-sm text-gray-600">
                        Receba atualizações importantes por email
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notifications.emailNotifications}
                        onChange={(e) =>
                          setNotifications({
                            ...notifications,
                            emailNotifications: e.target.checked,
                          })
                        }
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                    </label>
                  </div>

                  {/* Push */}
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">
                        Notificações Push
                      </h4>
                      <p className="text-sm text-gray-600">
                        Receba alertas no navegador
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notifications.pushNotifications}
                        onChange={(e) =>
                          setNotifications({
                            ...notifications,
                            pushNotifications: e.target.checked,
                          })
                        }
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                    </label>
                  </div>

                  {/* SMS */}
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">
                        Notificações por SMS
                      </h4>
                      <p className="text-sm text-gray-600">
                        Receba lembretes via SMS
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notifications.smsNotifications}
                        onChange={(e) =>
                          setNotifications({
                            ...notifications,
                            smsNotifications: e.target.checked,
                          })
                        }
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                    </label>
                  </div>

                  {/* Relatório Semanal */}
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">
                        Relatório Semanal
                      </h4>
                      <p className="text-sm text-gray-600">
                        Receba um resumo das suas atividades
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notifications.weeklyReport}
                        onChange={(e) =>
                          setNotifications({
                            ...notifications,
                            weeklyReport: e.target.checked,
                          })
                        }
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                    </label>
                  </div>

                  {/* Lembretes de Consulta */}
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">
                        Lembretes de Consulta
                      </h4>
                      <p className="text-sm text-gray-600">
                        Receba lembretes antes das consultas
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notifications.appointmentReminders}
                        onChange={(e) =>
                          setNotifications({
                            ...notifications,
                            appointmentReminders: e.target.checked,
                          })
                        }
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                    </label>
                  </div>
                </div>

                {/* Botão Salvar */}
                <div className="flex justify-end">
                  <button
                    onClick={handleSaveNotifications}
                    disabled={isLoading}
                    className="flex items-center space-x-2 px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg font-medium hover:from-emerald-600 hover:to-teal-700 transition-all disabled:opacity-50"
                  >
                    <Save className="w-5 h-5" />
                    <span>{isLoading ? "Salvando..." : "Salvar Preferências"}</span>
                  </button>
                </div>
              </div>
            )}

            {/* Preferências */}
            {activeTab === "preferences" && (
              <div className="space-y-6">
                <div className="space-y-4">
                  {/* Idioma */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Idioma
                    </label>
                    <select
                      value={preferences.language}
                      onChange={(e) =>
                        setPreferences({ ...preferences, language: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    >
                      <option value="pt-BR">Português (Brasil)</option>
                      <option value="en-US">English (US)</option>
                      <option value="es-ES">Español</option>
                    </select>
                  </div>

                  {/* Fuso Horário */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Fuso Horário
                    </label>
                    <select
                      value={preferences.timezone}
                      onChange={(e) =>
                        setPreferences({ ...preferences, timezone: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    >
                      <option value="America/Sao_Paulo">
                        São Paulo (GMT-3)
                      </option>
                      <option value="America/Manaus">Manaus (GMT-4)</option>
                      <option value="America/Noronha">
                        Fernando de Noronha (GMT-2)
                      </option>
                    </select>
                  </div>

                  {/* Formato de Data */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Formato de Data
                    </label>
                    <select
                      value={preferences.dateFormat}
                      onChange={(e) =>
                        setPreferences({
                          ...preferences,
                          dateFormat: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    >
                      <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                      <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                      <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                    </select>
                  </div>

                  {/* Tema */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tema
                    </label>
                    <div className="grid grid-cols-3 gap-4">
                      <button
                        onClick={() =>
                          setPreferences({ ...preferences, theme: "light" })
                        }
                        className={`p-4 border-2 rounded-lg transition-all ${
                          preferences.theme === "light"
                            ? "border-emerald-500 bg-emerald-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div className="text-center">
                          <div className="w-12 h-12 mx-auto mb-2 bg-white rounded-lg border border-gray-300"></div>
                          <span className="text-sm font-medium">Claro</span>
                        </div>
                      </button>

                      <button
                        onClick={() =>
                          setPreferences({ ...preferences, theme: "dark" })
                        }
                        className={`p-4 border-2 rounded-lg transition-all ${
                          preferences.theme === "dark"
                            ? "border-emerald-500 bg-emerald-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div className="text-center">
                          <div className="w-12 h-12 mx-auto mb-2 bg-gray-800 rounded-lg"></div>
                          <span className="text-sm font-medium">Escuro</span>
                        </div>
                      </button>

                      <button
                        onClick={() =>
                          setPreferences({ ...preferences, theme: "auto" })
                        }
                        className={`p-4 border-2 rounded-lg transition-all ${
                          preferences.theme === "auto"
                            ? "border-emerald-500 bg-emerald-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div className="text-center">
                          <div className="w-12 h-12 mx-auto mb-2 bg-gradient-to-r from-white to-gray-800 rounded-lg"></div>
                          <span className="text-sm font-medium">Auto</span>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Botão Salvar */}
                <div className="flex justify-end">
                  <button
                    onClick={handleSavePreferences}
                    disabled={isLoading}
                    className="flex items-center space-x-2 px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg font-medium hover:from-emerald-600 hover:to-teal-700 transition-all disabled:opacity-50"
                  >
                    <Save className="w-5 h-5" />
                    <span>{isLoading ? "Salvando..." : "Salvar Preferências"}</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
