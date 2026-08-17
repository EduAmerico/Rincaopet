# Agropet Goldpet

Aplicativo Next.js da Agropet Goldpet: catálogo de produtos, carrinho com checkout via WhatsApp e agendamento de banho e tosa com perfil completo do pet.

## Requisitos

- Node.js 18+
- npm

## Como rodar

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

## Scripts

- `npm run dev` — servidor de desenvolvimento
- `npm run build` — build de produção
- `npm run start` — servidor de produção
- `npm run lint` — ESLint
- `npx tsc --noEmit` — verificação de tipos

## Estrutura principal

- `app/` — rotas (catálogo, carrinho, banho e tosa)
- `components/` — UI e fluxos de cadastro/agendamento
- `lib/` — dados mock, hooks, recomendações e gamificação comercial
