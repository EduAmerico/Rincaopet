export type PetHealthInfo = {
  heartProblems: boolean
  controlledMedication: boolean
  medicationDetails?: string
  respiratoryIssues: boolean
  skinAllergies: boolean
  epilepsy: boolean
  recentSurgery: boolean
  anxiousOrAggressive: boolean
  earProblems: boolean
  mobilityIssues: boolean
  otherNotes?: string
}

export type HealthQuestion = {
  key: keyof Omit<PetHealthInfo, 'medicationDetails' | 'otherNotes'>
  label: string
  description: string
  professionalNote: string
}

export const healthQuestions: HealthQuestion[] = [
  {
    key: 'heartProblems',
    label: 'Problemas cardíacos',
    description: 'O pet possui diagnóstico ou histórico de problemas no coração?',
    professionalNote: 'Evitar estresse prolongado e monitorar durante o banho.',
  },
  {
    key: 'controlledMedication',
    label: 'Medicamento controlado',
    description: 'O pet faz uso contínuo de medicamento controlado?',
    professionalNote: 'Verificar horário da última dose e possíveis interações.',
  },
  {
    key: 'respiratoryIssues',
    label: 'Problemas respiratórios',
    description: 'Bronquiolite, asma, colapso traqueal ou outras condições respiratórias?',
    professionalNote: 'Preferir secagem mais leve e ambiente ventilado.',
  },
  {
    key: 'skinAllergies',
    label: 'Alergias de pele',
    description: 'Sensibilidade a shampoos, produtos ou alergias dermatológicas?',
    professionalNote: 'Usar linha hipoalergênica e observar reações na pele.',
  },
  {
    key: 'epilepsy',
    label: 'Epilepsia ou convulsões',
    description: 'O pet já teve convulsões ou possui epilepsia diagnosticada?',
    professionalNote: 'Manuseio calmo, reduzir ruídos e evitar estímulos intensos.',
  },
  {
    key: 'recentSurgery',
    label: 'Cirurgia recente',
    description: 'Operação ou procedimento cirúrgico nos últimos 3 meses?',
    professionalNote: 'Evitar pressão ou manipulação na região operada.',
  },
  {
    key: 'anxiousOrAggressive',
    label: 'Ansiedade ou agressividade',
    description: 'Demonstra medo, ansiedade ou reatividade no manuseio?',
    professionalNote: 'Abordagem gradual; considerar pausas e reforço positivo.',
  },
  {
    key: 'earProblems',
    label: 'Problemas de orelha',
    description: 'Otite crônica, infecções recorrentes ou dor ao tocar as orelhas?',
    professionalNote: 'Limpeza cuidadosa; não profundar sem avaliação.',
  },
  {
    key: 'mobilityIssues',
    label: 'Dificuldade de locomoção',
    description: 'Artrite, displasia, dor articular ou dificuldade para ficar em pé?',
    professionalNote: 'Apoio extra ao entrar/sair da banheira; evitar escorregões.',
  },
]

export const defaultHealthInfo: PetHealthInfo = {
  heartProblems: false,
  controlledMedication: false,
  medicationDetails: '',
  respiratoryIssues: false,
  skinAllergies: false,
  epilepsy: false,
  recentSurgery: false,
  anxiousOrAggressive: false,
  earProblems: false,
  mobilityIssues: false,
  otherNotes: '',
}

export function getActiveHealthAlerts(health: PetHealthInfo | undefined) {
  if (!health) return []
  return healthQuestions
    .filter((q) => health[q.key])
    .map((q) => ({
      label: q.label,
      note: q.professionalNote,
      medicationDetails:
        q.key === 'controlledMedication' && health.medicationDetails
          ? health.medicationDetails
          : undefined,
    }))
}
