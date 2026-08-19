const MAX_EDGE = 900
const JPEG_QUALITY = 0.78

export const productImagePresets = [
  { src: '/images/product-racao.svg', label: 'Ração' },
  { src: '/images/product-brinquedo.svg', label: 'Brinquedo' },
  { src: '/images/product-higiene.svg', label: 'Higiene' },
  { src: '/images/product-acessorio.svg', label: 'Acessório' },
] as const

export function defaultImageForCategory(category: string): string {
  if (category === 'brinquedo') return '/images/product-brinquedo.svg'
  if (category === 'higiene') return '/images/product-higiene.svg'
  if (category === 'acessorio') return '/images/product-acessorio.svg'
  return '/images/product-racao.svg'
}

export function compressImageFile(file: File): Promise<string> {
  if (file.type === 'image/svg+xml') {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(String(reader.result))
      reader.onerror = () => reject(new Error('Não foi possível ler o SVG.'))
      reader.readAsDataURL(file)
    })
  }

  return new Promise((resolve, reject) => {
    const image = new Image()
    const objectUrl = URL.createObjectURL(file)
    image.onload = () => {
      const canvas = document.createElement('canvas')
      const scale = Math.min(1, MAX_EDGE / Math.max(image.width, image.height))
      canvas.width = Math.max(1, Math.round(image.width * scale))
      canvas.height = Math.max(1, Math.round(image.height * scale))
      const context = canvas.getContext('2d')
      if (!context) {
        URL.revokeObjectURL(objectUrl)
        reject(new Error('Canvas indisponível.'))
        return
      }
      context.fillStyle = '#ffffff'
      context.fillRect(0, 0, canvas.width, canvas.height)
      context.drawImage(image, 0, 0, canvas.width, canvas.height)
      URL.revokeObjectURL(objectUrl)
      resolve(canvas.toDataURL('image/jpeg', JPEG_QUALITY))
    }
    image.onerror = () => {
      URL.revokeObjectURL(objectUrl)
      reject(new Error('Não foi possível ler a imagem.'))
    }
    image.src = objectUrl
  })
}
