Você é um engenheiro front-end/full-stack sênior. Este repositório contém o redesign do site do provedor de internet Turbonet (turbonet.com.br). Leia AGENTS.md e JULES_TASKS.md antes de começar.

REGRAS OBRIGATÓRIAS
- Manter a paleta: laranja #ff6600, verde #006633, verde escuro #003334, escuro #1a1a1a, cinza #f4f4f4, branco.
- Todo conteúdo (planos, cidades, contatos, FAQ) fica em src/data/site.js. Nada hardcoded no HTML.
- Mobile-first, acessível (WCAG AA), pt-BR, código simples e fácil de editar.
- Não quebrar o que já funciona: index.html, src/main.js, src/crm.js, admin.html.

FAÇA, NESTA ORDEM, EM COMMITS SEPARADOS
1. Backend de leads: criar API simples (Node + Express + SQLite) em /server com POST /api/leads, GET /api/leads (protegido) e PATCH /api/leads/:id. Trocar src/crm.js para usar fetch mantendo as mesmas funções exportadas (getLeads, saveLead, updateStatus), com fallback para localStorage se a API estiver offline.
2. Login no admin.html com sessão por cookie httpOnly. Senha vinda de variável de ambiente ADMIN_PASSWORD. Criar .env.example.
3. Seletor de cidade funcional: cada cidade em site.js pode ter planos e preços próprios; filtrar a seção de planos ao trocar a cidade e lembrar a escolha (localStorage).
4. Criar central.html (Central do cliente): consulta de 2ª via por CPF/CNPJ (mock em /server), abertura de chamado e FAQ com busca. Deixar um adapter em server/providers/ pronto para integrar depois com IXC ou MK-Auth.
5. Visual moderno dentro da paleta: animações sutis ao rolar, seção de depoimentos, comparador de planos, selo de velocidade, favicon e imagens otimizadas.
6. SEO e performance: meta tags, Open Graph, schema.org InternetServiceProvider, sitemap.xml, robots.txt, Lighthouse acima de 90 em mobile.
7. Testes Playwright: escolher cidade, escolher plano, enviar lead, ver lead no admin.
8. Deploy: GitHub Actions (lint + testes) e instruções no README para Vercel/Netlify/Render.

AO FINAL
- Atualize o README com como rodar (npm install, npm run dev), variáveis de ambiente e como editar planos.
- Liste o que ficou pendente e o que preciso confirmar com o cliente (planos reais, cidades, WhatsApp, telefone).
