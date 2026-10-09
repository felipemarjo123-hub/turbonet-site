// ÚNICO arquivo que você precisa editar para mudar conteúdo do site.
export const SITE = {
  name: "Turbonet",
  tagline: "Internet de verdade, sem enrolação.",
  cnpj: "08.853.084/0001-18",
  razaoSocial: "JOBSON LUIS MELO DE NEGREIROS LTDA",
  whatsapp: "5500000000000",
  phone: "0800 000 0000",
  email: "contato@turbonet.com.br",
  cities: ["São Paulo", "Rio de Janeiro", "Belo Horizonte"],
  plans: {
    "São Paulo": [
      { id: "p100_sp", name: "Turbo 100", speed: "100 Mega", price: 79.9, perks: ["Wi-Fi grátis", "Instalação rápida", "Suporte 24h"] },
      { id: "p300_sp", name: "Turbo 300", speed: "300 Mega", price: 99.9, featured: true, perks: ["Wi-Fi 5 grátis", "Ideal para streaming", "Suporte 24h"] },
      { id: "p500_sp", name: "Turbo 500", speed: "500 Mega", price: 129.9, perks: ["Wi-Fi 6", "Ideal para games", "Suporte prioritário"] },
    ],
    "Rio de Janeiro": [
      { id: "p150_rj", name: "Praia 150", speed: "150 Mega", price: 89.9, perks: ["Wi-Fi grátis", "Instalação rápida", "Suporte 24h"] },
      { id: "p400_rj", name: "Praia 400", speed: "400 Mega", price: 119.9, featured: true, perks: ["Wi-Fi 5 grátis", "Ideal para streaming", "Suporte 24h"] },
    ],
    "Belo Horizonte": [
      { id: "p200_bh", name: "Serra 200", speed: "200 Mega", price: 69.9, perks: ["Wi-Fi grátis", "Instalação em 24h", "Suporte 24h"] },
      { id: "p600_bh", name: "Serra 600", speed: "600 Mega", price: 139.9, featured: true, perks: ["Wi-Fi 6", "Ultra velocidade", "Suporte VIP"] },
    ]
  },
  channels: [
    { icon: "💬", title: "WhatsApp", text: "Atendimento rápido por mensagem", href: "https://wa.me/5500000000000" },
    { icon: "📞", title: "Telefone", text: "Fale com a central", href: "tel:08000000000" },
    { icon: "✉️", title: "E-mail", text: "contato@turbonet.com.br", href: "mailto:contato@turbonet.com.br" },
    { icon: "🧾", title: "2ª via de fatura", text: "Acesse a área do cliente", href: "central.html" },
  ],
  faq: [
    { q: "Quanto tempo leva a instalação?", a: "Normalmente até 48h úteis após a contratação." },
    { q: "Como emito a 2ª via do boleto?", a: "Pela central do cliente ou pelo WhatsApp." },
    { q: "Estou sem internet, e agora?", a: "Reinicie o roteador e, se persistir, abra um chamado na central." },
  ],
};
