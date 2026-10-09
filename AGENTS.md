# Turbonet – Guia para agentes (Antigravity / Jules)

## Projeto
Redesign do site do provedor Turbonet (turbonet.com.br): página de vendas, canais de atendimento, central do cliente e mini-CRM de leads.

## Regras
- **Manter a paleta**: laranja `#ff6600`, verde `#006633`, verde escuro `#003334`, escuro `#1a1a1a`, cinza `#f4f4f4`, branco. Variáveis em `src/styles.css`.
- Todo conteúdo (planos, cidades, contatos, FAQ) fica em `src/data/site.js`. Não hardcode no HTML.
- Sem build por enquanto (HTML + ES modules). Rodar: `npx serve .`
- Mobile-first, acessível, em pt-BR.

## Estrutura
- `index.html` / `src/main.js` – página de vendas
- `src/crm.js` – camada de leads (localStorage → trocar por API)
- `admin.html` – painel de leads

## Tarefas (ver JULES_TASKS.md)
