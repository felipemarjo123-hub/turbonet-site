# Tarefas para o Jules (cole uma por vez)

1. **Backend de leads**: criar API (Supabase ou Node+SQLite) e trocar `src/crm.js` para usar `fetch`. Manter as mesmas funções exportadas.
2. **Login no admin.html** (Supabase Auth ou senha via backend). Nada de senha no front.
3. **Seletor de cidade real**: ao escolher cidade, filtrar planos e preços por cidade em `site.js`.
4. **Central do cliente**: página `central.html` com 2ª via, abertura de chamado e consulta de status (mock primeiro, depois integração IXC/MK-Auth).
5. **SEO e performance**: meta tags, Open Graph, schema.org `InternetServiceProvider`, Lighthouse > 90.
6. **Testes**: Playwright para fluxo "escolher plano → enviar lead → aparecer no admin".
7. **Deploy**: GitHub Actions → Vercel/Netlify/Cloudflare Pages.
8. **Visual**: animações sutis, imagens/ilustrações, depoimentos, comparador de planos – sem sair da paleta.
