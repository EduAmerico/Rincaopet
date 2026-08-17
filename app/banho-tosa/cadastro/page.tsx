import { PageHeader } from '@/components/layout/PageHeader'
import { PetRegistrationWizard } from '@/components/banho-tosa/PetRegistrationWizard'

export default function CadastroPetPage() {
  return (
    <div>
      <PageHeader
        title="Cadastro gamificado"
        description="Cadastre seu cachorro e desbloqueie XP, níveis e conquistas no primeiro banho."
      />
      <PetRegistrationWizard />
    </div>
  )
}
