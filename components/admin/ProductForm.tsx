'use client'

import { FormEvent, useMemo, useState } from 'react'
import { breeds } from '@/lib/data/breeds'
import { productCategories } from '@/lib/data/products'
import {
  compressImageFile,
  defaultImageForCategory,
  productImagePresets,
} from '@/lib/catalog/imageUpload'
import { applyPromo } from '@/lib/products/display'
import { formatPrice } from '@/lib/utils'
import type {
  EnergyProfile,
  LifeStage,
  PetSize,
  Product,
  ProductCategory,
} from '@/lib/types'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'

type ProductFormValues = {
  name: string
  brand: string
  category: ProductCategory
  description: string
  image: string
  saleType: 'unit' | 'weight'
  price: string
  pricePerKg: string
  minimumWeightGrams: string
  weightStepGrams: string
  promoPercent: string
  active: boolean
  recommendedSizes: PetSize[]
  recommendedLifeStages: LifeStage[]
  energyProfile: EnergyProfile | ''
  forNeutered: boolean
  isTherapeutic: boolean
  breedIds: string[]
}

const sizes: { value: PetSize; label: string }[] = [
  { value: 'small', label: 'Pequeno' },
  { value: 'medium', label: 'Médio' },
  { value: 'large', label: 'Grande' },
  { value: 'giant', label: 'Gigante' },
]

const stages: { value: LifeStage; label: string }[] = [
  { value: 'puppy', label: 'Filhote' },
  { value: 'adult', label: 'Adulto' },
  { value: 'senior', label: 'Sênior' },
]

const energies: { value: EnergyProfile; label: string }[] = [
  { value: 'light', label: 'Leve' },
  { value: 'standard', label: 'Padrão' },
  { value: 'high-energy', label: 'Alta energia' },
]

function emptyForm(): ProductFormValues {
  return {
    name: '',
    brand: '',
    category: 'racao',
    description: '',
    image: defaultImageForCategory('racao'),
    saleType: 'unit',
    price: '',
    pricePerKg: '',
    minimumWeightGrams: '500',
    weightStepGrams: '50',
    promoPercent: '0',
    active: true,
    recommendedSizes: [],
    recommendedLifeStages: [],
    energyProfile: '',
    forNeutered: false,
    isTherapeutic: false,
    breedIds: [],
  }
}

function productToForm(product: Product): ProductFormValues {
  return {
    name: product.name,
    brand: product.brand,
    category: product.category,
    description: product.description ?? '',
    image: product.image,
    saleType: product.saleType,
    price: product.saleType === 'unit' ? String(product.price) : '',
    pricePerKg: product.saleType === 'weight' ? String(product.pricePerKg) : '',
    minimumWeightGrams:
      product.saleType === 'weight' ? String(product.minimumWeightGrams) : '500',
    weightStepGrams: product.saleType === 'weight' ? String(product.weightStepGrams) : '50',
    promoPercent: String(product.promoPercent ?? 0),
    active: product.active !== false,
    recommendedSizes: product.recommendedSizes ?? [],
    recommendedLifeStages: product.recommendedLifeStages ?? [],
    energyProfile: product.energyProfile ?? '',
    forNeutered: Boolean(product.forNeutered),
    isTherapeutic: Boolean(product.isTherapeutic),
    breedIds: product.breedIds ?? [],
  }
}

function parseMoney(value: string): number {
  return Number(value.replace(',', '.'))
}

function buildProduct(id: string, values: ProductFormValues): Product | null {
  const name = values.name.trim()
  const brand = values.brand.trim()
  if (!name || !brand) return null

  const promoPercent = Math.min(90, Math.max(0, Number(values.promoPercent) || 0))
  const base = {
    id,
    name,
    brand,
    category: values.category,
    image: values.image || defaultImageForCategory(values.category),
    description: values.description.trim(),
    promoPercent,
    active: values.active,
    recommendedSizes: values.recommendedSizes,
    recommendedLifeStages: values.recommendedLifeStages,
    energyProfile: values.energyProfile || undefined,
    forNeutered: values.forNeutered || undefined,
    isTherapeutic: values.isTherapeutic || undefined,
    breedIds: values.breedIds,
  }

  if (values.saleType === 'weight') {
    const pricePerKg = parseMoney(values.pricePerKg)
    if (!pricePerKg || pricePerKg <= 0) return null
    return {
      ...base,
      saleType: 'weight',
      pricePerKg,
      minimumWeightGrams: Math.max(50, Number(values.minimumWeightGrams) || 500),
      weightStepGrams: Math.max(10, Number(values.weightStepGrams) || 50),
    }
  }

  const price = parseMoney(values.price)
  if (!price || price <= 0) return null
  return { ...base, saleType: 'unit', price }
}

function toggleValue<T>(list: T[], value: T): T[] {
  return list.includes(value) ? list.filter((item) => item !== value) : [...list, value]
}

const fieldClass =
  'w-full rounded-chip border border-border bg-surface px-4 py-3 text-sm text-ink outline-none focus:border-primary focus:ring-2 focus:ring-primary/15'

interface ProductFormProps {
  product?: Product
  onSubmit: (product: Product) => void
  onCancel: () => void
}

export function ProductForm({ product, onSubmit, onCancel }: ProductFormProps) {
  const [values, setValues] = useState<ProductFormValues>(
    product ? productToForm(product) : emptyForm()
  )
  const [error, setError] = useState('')
  const [uploading, setUploading] = useState(false)

  const listPrice =
    values.saleType === 'weight' ? parseMoney(values.pricePerKg) : parseMoney(values.price)
  const promoPercent = Math.min(90, Math.max(0, Number(values.promoPercent) || 0))
  const promoPrice = listPrice > 0 ? applyPromo(listPrice, promoPercent) : 0

  const previewLabel = useMemo(() => {
    if (!(listPrice > 0)) return 'Informe o preço para ver a promoção'
    if (promoPercent <= 0) return 'Sem promoção'
    const suffix = values.saleType === 'weight' ? '/kg' : ''
    return `${formatPrice(listPrice)}${suffix} → ${formatPrice(promoPrice)}${suffix}`
  }, [listPrice, promoPercent, promoPrice, values.saleType])

  async function handleImage(file: File) {
    setUploading(true)
    setError('')
    try {
      const image = await compressImageFile(file)
      setValues((prev) => ({ ...prev, image }))
    } catch {
      setError('Não foi possível carregar a imagem.')
    } finally {
      setUploading(false)
    }
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    const next = buildProduct(product?.id ?? `p-${crypto.randomUUID()}`, values)
    if (!next) {
      setError('Preencha nome, marca e um preço válido.')
      return
    }
    onSubmit(next)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <Card className="space-y-4">
        <h2 className="font-heading text-lg font-bold text-ink">Dados do produto</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="block text-sm font-medium text-ink">
            Nome
            <Input
              className="mt-1"
              value={values.name}
              onChange={(e) => setValues((prev) => ({ ...prev, name: e.target.value }))}
              required
            />
          </label>
          <label className="block text-sm font-medium text-ink">
            Marca
            <Input
              className="mt-1"
              value={values.brand}
              onChange={(e) => setValues((prev) => ({ ...prev, brand: e.target.value }))}
              required
            />
          </label>
          <label className="block text-sm font-medium text-ink">
            Categoria
            <select
              className={`${fieldClass} mt-1`}
              value={values.category}
              onChange={(e) => {
                const category = e.target.value as ProductCategory
                setValues((prev) => ({
                  ...prev,
                  category,
                  image: productImagePresets.some((preset) => preset.src === prev.image)
                    ? defaultImageForCategory(category)
                    : prev.image,
                }))
              }}
            >
              {productCategories.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </label>
          <label className="block text-sm font-medium text-ink">
            Tipo de venda
            <select
              className={`${fieldClass} mt-1`}
              value={values.saleType}
              onChange={(e) =>
                setValues((prev) => ({
                  ...prev,
                  saleType: e.target.value as 'unit' | 'weight',
                }))
              }
            >
              <option value="unit">Unidade</option>
              <option value="weight">A granel (kg)</option>
            </select>
          </label>
        </div>
        <label className="block text-sm font-medium text-ink">
          Descrição
          <textarea
            className={`${fieldClass} mt-1 min-h-[96px]`}
            value={values.description}
            onChange={(e) => setValues((prev) => ({ ...prev, description: e.target.value }))}
            placeholder="Ingredientes, indicação, tamanho da embalagem..."
          />
        </label>
        <label className="flex items-center gap-2 text-sm font-medium text-ink">
          <input
            type="checkbox"
            checked={values.active}
            onChange={(e) => setValues((prev) => ({ ...prev, active: e.target.checked }))}
            className="rounded border-border text-secondary"
          />
          Visível no catálogo
        </label>
      </Card>

      <Card className="space-y-4">
        <h2 className="font-heading text-lg font-bold text-ink">Imagem</h2>
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="flex h-36 w-36 items-center justify-center overflow-hidden rounded-card border border-border bg-background">
            {values.image ? (
              <img src={values.image} alt="" className="h-full w-full object-contain p-2" />
            ) : (
              <span className="text-xs text-muted">Sem foto</span>
            )}
          </div>
          <div className="flex-1 space-y-3">
            <input
              type="file"
              accept="image/*"
              disabled={uploading}
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) void handleImage(file)
              }}
            />
            <p className="text-xs text-muted">JPG, PNG ou SVG. A foto é compactada automaticamente.</p>
            <div className="flex flex-wrap gap-2">
              {productImagePresets.map((preset) => (
                <button
                  key={preset.src}
                  type="button"
                  onClick={() => setValues((prev) => ({ ...prev, image: preset.src }))}
                  className="rounded-chip border border-border px-3 py-1.5 text-xs font-medium hover:border-secondary"
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Card>

      <Card className="space-y-4">
        <h2 className="font-heading text-lg font-bold text-ink">Preço e promoção</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {values.saleType === 'unit' ? (
            <label className="block text-sm font-medium text-ink">
              Preço (R$)
              <Input
                className="mt-1"
                inputMode="decimal"
                value={values.price}
                onChange={(e) => setValues((prev) => ({ ...prev, price: e.target.value }))}
                placeholder="89.90"
                required
              />
            </label>
          ) : (
            <>
              <label className="block text-sm font-medium text-ink">
                Preço por kg (R$)
                <Input
                  className="mt-1"
                  inputMode="decimal"
                  value={values.pricePerKg}
                  onChange={(e) => setValues((prev) => ({ ...prev, pricePerKg: e.target.value }))}
                  placeholder="18.90"
                  required
                />
              </label>
              <label className="block text-sm font-medium text-ink">
                Mínimo (g)
                <Input
                  className="mt-1"
                  inputMode="numeric"
                  value={values.minimumWeightGrams}
                  onChange={(e) =>
                    setValues((prev) => ({ ...prev, minimumWeightGrams: e.target.value }))
                  }
                />
              </label>
              <label className="block text-sm font-medium text-ink">
                Passo (g)
                <Input
                  className="mt-1"
                  inputMode="numeric"
                  value={values.weightStepGrams}
                  onChange={(e) =>
                    setValues((prev) => ({ ...prev, weightStepGrams: e.target.value }))
                  }
                />
              </label>
            </>
          )}
          <label className="block text-sm font-medium text-ink">
            Promoção (%)
            <Input
              className="mt-1"
              inputMode="numeric"
              min={0}
              max={90}
              value={values.promoPercent}
              onChange={(e) => setValues((prev) => ({ ...prev, promoPercent: e.target.value }))}
            />
          </label>
        </div>
        <p className="rounded-card bg-secondary/15 px-4 py-3 text-sm font-medium text-ink">
          {previewLabel}
        </p>
      </Card>

      <Card className="space-y-4">
        <h2 className="font-heading text-lg font-bold text-ink">Recomendações (gamificação)</h2>
        <p className="text-sm text-muted">
          Esses campos ajudam a sugerir o produto certo para o perfil do pet.
        </p>
        <div>
          <p className="mb-2 text-sm font-medium text-ink">Porte</p>
          <div className="flex flex-wrap gap-2">
            {sizes.map((size) => (
              <button
                key={size.value}
                type="button"
                onClick={() =>
                  setValues((prev) => ({
                    ...prev,
                    recommendedSizes: toggleValue(prev.recommendedSizes, size.value),
                  }))
                }
                className={`rounded-chip border px-3 py-1.5 text-xs font-medium ${
                  values.recommendedSizes.includes(size.value)
                    ? 'border-secondary bg-secondary/15 text-secondary'
                    : 'border-border text-muted'
                }`}
              >
                {size.label}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="mb-2 text-sm font-medium text-ink">Fase da vida</p>
          <div className="flex flex-wrap gap-2">
            {stages.map((stage) => (
              <button
                key={stage.value}
                type="button"
                onClick={() =>
                  setValues((prev) => ({
                    ...prev,
                    recommendedLifeStages: toggleValue(prev.recommendedLifeStages, stage.value),
                  }))
                }
                className={`rounded-chip border px-3 py-1.5 text-xs font-medium ${
                  values.recommendedLifeStages.includes(stage.value)
                    ? 'border-secondary bg-secondary/15 text-secondary'
                    : 'border-border text-muted'
                }`}
              >
                {stage.label}
              </button>
            ))}
          </div>
        </div>
        <label className="block text-sm font-medium text-ink">
          Perfil calórico
          <select
            className={`${fieldClass} mt-1`}
            value={values.energyProfile}
            onChange={(e) =>
              setValues((prev) => ({
                ...prev,
                energyProfile: e.target.value as EnergyProfile | '',
              }))
            }
          >
            <option value="">Não informado</option>
            {energies.map((energy) => (
              <option key={energy.value} value={energy.value}>
                {energy.label}
              </option>
            ))}
          </select>
        </label>
        <div className="flex flex-wrap gap-4">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={values.forNeutered}
              onChange={(e) => setValues((prev) => ({ ...prev, forNeutered: e.target.checked }))}
              className="rounded border-border"
            />
            Indicado para castrados
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={values.isTherapeutic}
              onChange={(e) => setValues((prev) => ({ ...prev, isTherapeutic: e.target.checked }))}
              className="rounded border-border"
            />
            Ração terapêutica
          </label>
        </div>
        <div>
          <p className="mb-2 text-sm font-medium text-ink">Raças (opcional)</p>
          <div className="flex max-h-40 flex-wrap gap-2 overflow-y-auto">
            {breeds.map((breed) => (
              <button
                key={breed.id}
                type="button"
                onClick={() =>
                  setValues((prev) => ({
                    ...prev,
                    breedIds: toggleValue(prev.breedIds, breed.id),
                  }))
                }
                className={`rounded-chip border px-3 py-1.5 text-xs font-medium ${
                  values.breedIds.includes(breed.id)
                    ? 'border-secondary bg-secondary/15 text-secondary'
                    : 'border-border text-muted'
                }`}
              >
                {breed.name}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {error && <p className="text-sm font-medium text-secondary">{error}</p>}

      <div className="flex gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" variant="secondary" disabled={uploading}>
          {product ? 'Salvar alterações' : 'Cadastrar produto'}
        </Button>
      </div>
    </form>
  )
}
