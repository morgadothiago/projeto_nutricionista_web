"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuthContext } from "@/app/contexts/auth-context"
import { DashboardWrapper } from "@/app/components/dashboard/dashboard-wrapper"
import { SettingsSection } from "@/app/components/dashboard/settings-section"
import { NotificationToggle } from "@/app/components/dashboard/notification-toggle"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { User, Target, Bell, Lock, Loader2, AlertCircle } from "lucide-react"
import { useApi } from "@/app/hooks/useApi"
import { getUserProfile, updateUserProfile, updateNotificationSettings } from "@/app/services/api"
import { Card } from "@/components/ui/card"

export default function ConfiguracoesPage() {
  const router = useRouter()
  const { isAuthenticated, userRole, userName, userEmail, isLoading } = useAuthContext()

  // Fetch dados do perfil
  const {
    data: profileData,
    loading: loadingProfile,
    error: errorProfile,
  } = useApi<any>(getUserProfile)

  // States para formulário
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    height: "",
    goal: "emagrecimento",
    targetWeight: "",
  })

  const [notifications, setNotifications] = useState({
    mealReminders: true,
    waterReminders: true,
    dailySummary: false,
    planUpdates: true,
  })

  const [saving, setSaving] = useState(false)

  // Preencher formulário quando dados chegarem
  useEffect(() => {
    if (profileData) {
      setFormData({
        name: profileData.name || userName || "",
        email: profileData.email || userEmail || "",
        age: profileData.age || "",
        height: profileData.height || "",
        goal: profileData.goal || "emagrecimento",
        targetWeight: profileData.targetWeight || "",
      })
      if (profileData.notifications) {
        setNotifications(profileData.notifications)
      }
    }
  }, [profileData, userName, userEmail])

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login")
    }
  }, [isLoading, isAuthenticated, router])

  const handleSave = async () => {
    setSaving(true)
    try {
      await updateUserProfile({
        name: formData.name,
        email: formData.email,
        age: formData.age ? Number(formData.age) : undefined,
        height: formData.height ? Number(formData.height) : undefined,
        goal: formData.goal,
        targetWeight: formData.targetWeight ? Number(formData.targetWeight) : undefined,
      })
      await updateNotificationSettings(notifications)
      alert("Configurações salvas com sucesso!")
    } catch (error) {
      alert("Erro ao salvar configurações. Tente novamente.")
    } finally {
      setSaving(false)
    }
  }

  if (isLoading || loadingProfile) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-[#2DD49F]" />
      </div>
    )
  }

  if (!isAuthenticated || !userRole) {
    return null
  }

  return (
    <DashboardWrapper userRole={userRole as "nutricionista" | "paciente"}>
      <div className="space-y-6 max-w-4xl">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-[#2E3A59]">Configurações</h1>
          <p className="text-[#6B7280] mt-2">
            Gerencie seu perfil e preferências
          </p>
        </div>

        {/* Error Alert */}
        {errorProfile && (
          <Card className="p-6 bg-[#FFF3E0] border-[#FF8C42]">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-6 h-6 text-[#FF8C42]" />
              <div>
                <p className="font-semibold text-[#2E3A59]">
                  Erro ao carregar perfil
                </p>
                <p className="text-sm text-[#6B7280]">{errorProfile}</p>
              </div>
            </div>
          </Card>
        )}

        {/* Perfil Section */}
        <SettingsSection
          icon={User}
          iconColor="text-[#2DD49F]"
          iconBgColor="bg-[#E6F9F0]"
          title="Perfil"
          subtitle="Suas informações pessoais"
        >
          <div className="space-y-4">
            <div>
              <Label htmlFor="name" className="text-sm text-[#6B7280] mb-2 block">
                Nome completo
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="bg-gray-50 border-0"
              />
            </div>

            <div>
              <Label htmlFor="email" className="text-sm text-[#6B7280] mb-2 block">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="bg-gray-50 border-0"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="age" className="text-sm text-[#6B7280] mb-2 block">
                  Idade
                </Label>
                <Input
                  id="age"
                  type="number"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  className="bg-gray-50 border-0"
                />
              </div>
              <div>
                <Label htmlFor="height" className="text-sm text-[#6B7280] mb-2 block">
                  Altura (cm)
                </Label>
                <Input
                  id="height"
                  type="number"
                  value={formData.height}
                  onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                  className="bg-gray-50 border-0"
                />
              </div>
            </div>
          </div>
        </SettingsSection>

        {/* Objetivos Section */}
        <SettingsSection
          icon={Target}
          iconColor="text-[#FF8C42]"
          iconBgColor="bg-[#FFF3E0]"
          title="Objetivos"
          subtitle="Suas metas nutricionais"
        >
          <div className="space-y-4">
            <div>
              <Label htmlFor="goal" className="text-sm text-[#6B7280] mb-2 block">
                Objetivo principal
              </Label>
              <select
                id="goal"
                value={formData.goal}
                onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                className="w-full px-4 py-3 bg-gray-50 border-0 rounded-xl text-[#2E3A59] focus:outline-none focus:ring-2 focus:ring-[#2DD49F]"
              >
                <option value="emagrecimento">Emagrecimento</option>
                <option value="ganho-massa">Ganho de massa muscular</option>
                <option value="manutencao">Manutenção</option>
                <option value="saude">Saúde e bem-estar</option>
              </select>
            </div>

            <div>
              <Label htmlFor="target-weight" className="text-sm text-[#6B7280] mb-2 block">
                Peso meta (kg)
              </Label>
              <Input
                id="target-weight"
                type="number"
                value={formData.targetWeight}
                onChange={(e) => setFormData({ ...formData, targetWeight: e.target.value })}
                className="bg-gray-50 border-0"
              />
            </div>
          </div>
        </SettingsSection>

        {/* Notificações Section */}
        <SettingsSection
          icon={Bell}
          iconColor="text-[#4A90E2]"
          iconBgColor="bg-[#E3F2FD]"
          title="Notificações"
          subtitle="Lembretes e alertas"
        >
          <div className="space-y-1">
            <NotificationToggle
              label="Lembrete de refeições"
              defaultChecked={notifications.mealReminders}
              onChange={(checked) => setNotifications({ ...notifications, mealReminders: checked })}
            />
            <NotificationToggle
              label="Lembrete de água"
              defaultChecked={notifications.waterReminders}
              onChange={(checked) => setNotifications({ ...notifications, waterReminders: checked })}
            />
            <NotificationToggle
              label="Resumo diário"
              defaultChecked={notifications.dailySummary}
              onChange={(checked) => setNotifications({ ...notifications, dailySummary: checked })}
            />
            <NotificationToggle
              label="Novidades do plano"
              defaultChecked={notifications.planUpdates}
              onChange={(checked) => setNotifications({ ...notifications, planUpdates: checked })}
            />
          </div>
        </SettingsSection>

        {/* Segurança Section */}
        <SettingsSection
          icon={Lock}
          iconColor="text-[#9B59B6]"
          iconBgColor="bg-[#F3E5F5]"
          title="Segurança"
          subtitle="Senha e acesso"
        >
          <Button
            variant="outline"
            className="border-[#9B59B6] text-[#9B59B6] hover:bg-[#F3E5F5]"
          >
            Alterar senha
          </Button>
        </SettingsSection>

        {/* Save Button */}
        <Button
          onClick={handleSave}
          disabled={saving}
          className="w-full bg-[#2DD49F] hover:bg-[#24b685] h-14 text-base font-semibold"
        >
          {saving ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Salvando...
            </>
          ) : (
            "Salvar alterações"
          )}
        </Button>
      </div>
    </DashboardWrapper>
  )
}
