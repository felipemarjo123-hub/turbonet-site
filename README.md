# Turbonet – Redesign e CRM

Este projeto é um site de vendas de planos de internet e um sistema CRM embutido, focando na performance, acessibilidade e flexibilidade.

## Pré-requisitos
- Node.js (v18+)

## Instalação e Execução

### Backend e Frontend Locais
1. Execute a instalação de pacotes (para subir o backend):
   ```bash
   npm install
   ```

2. Crie o arquivo `.env` na raiz do projeto (como no `.env.example`):
   ```env
   PORT=3000
   ADMIN_PASSWORD=sua_senha_secreta
   ```

3. Inicie a API Node.js e o Banco de Dados (SQLite):
   ```bash
   node server/index.js
   ```

4. Em outro terminal, sirva o Frontend na pasta raiz:
   ```bash
   npx serve .
   ```

5. Acesse `http://localhost:3000` (porta do serve) para ver o site principal.

## Como Editar o Conteúdo
Abra o arquivo `src/data/site.js`. Este é o **único lugar** em que você precisará modificar os textos.

- Adicione ou remova cidades na array `cities`.
- Adicione/remova planos em cada cidade editando a propriedade `plans`.
- Os preços e detalhes são atualizados automaticamente em todo o site.

## Como rodar os Testes (Playwright)
```bash
npx playwright test
```

## Pendências e Dúvidas com Cliente
- [ ] Confirmar os **números de WhatsApp e Telefones**.
- [ ] Confirmar os **planos, preços e características reais** oferecidos por cidade.
- [ ] Definir se a central do cliente integrará futuramente com **IXC** ou **MK-Auth** (o mock no `/server/providers` está pronto para receber o código de produção).
- [ ] O deploy do backend via banco local SQLite não persistirá dados em hospedagens Serverless (Vercel/Render free plan sleep). Ideal migrar para Supabase ou um SQLite persistente em VPS se a volumetria aumentar.

## Deploy
- **Frontend (Vercel/Netlify):** Defina o `build` como vazio e publique a raiz diretamente. Configure o `API_URL` em `src/crm.js` com a URL pública do seu backend.
- **Backend (Render):** Crie um novo `Web Service`, apontando o script de execução para `node server/index.js`.
