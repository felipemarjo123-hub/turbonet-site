Faça uma REVISÃO DE SEGURANÇA e de qualidade deste repositório (site do provedor Turbonet: página de vendas, formulário de leads, mini-CRM em admin.html). Corrija o que encontrar e abra um PR.

1. SEGURANÇA (prioridade)
- XSS: main.js e admin.html montam HTML com innerHTML usando dados do usuário (nome, telefone, cidade). Escape tudo ou use textContent/createElement.
- admin.html está sem autenticação e os leads (dados pessoais, LGPD) ficam no localStorage. Proteja com login no servidor e nunca guarde senha no front.
- Validação e sanitização do formulário (nome, telefone BR, cidade e plano dentro da lista permitida), no cliente e no servidor.
- Anti-spam: honeypot, rate limit e captcha (Turnstile/hCaptcha).
- Headers de segurança: CSP, X-Content-Type-Options, Referrer-Policy, frame-ancestors; CORS restrito.
- Links externos com rel="noopener noreferrer". Sem segredos no repositório, com .env.example e .gitignore.
- LGPD: checkbox de consentimento, link para política de privacidade, e como excluir um lead.
- Rode npm audit se houver dependências.

2. QUALIDADE E MELHORIAS
- Acessibilidade (labels nos campos, contraste, foco visível, aria nos botões).
- SEO e performance (meta, Open Graph, schema.org InternetServiceProvider, Lighthouse > 90).
- Código mais simples e organizado, sem mudar a paleta (#ff6600, #006633, #003334, #1a1a1a, #f4f4f4).
- Todo conteúdo continua em src/data/site.js.

3. ENTREGA
- Um PR com commits separados por tema.
- Relatório no PR: vulnerabilidades por gravidade (alta/média/baixa), o que foi corrigido, o que ficou pendente e sugestões extras.
