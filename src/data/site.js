// ÚNICO arquivo que você precisa editar para mudar conteúdo do site.
// TODO: confirmar planos, preços, cidades e contatos reais com o cliente.
export const SITE = {
  name: "Turbonet",
  tagline: "Internet de verdade, sem enrolação.",
  cnpj: "08.853.084/0001-18",
  razaoSocial: "JOBSON LUIS MELO DE NEGREIROS LTDA",
  whatsapp: "5500000000000", // TODO: número real (DDI+DDD+número)
  phone: "0800 000 0000",
  email: "contato@turbonet.com.br",
  cities: [
    {
      name: "Cidade 1",
      plans: [
        { id: "p100", name: "Turbo 100", speed: "100 Mega", price: 69.9, perks: ["Wi-Fi grátis", "Instalação rápida", "Suporte 24h"] },
        { id: "p300", name: "Turbo 300", speed: "300 Mega", price: 89.9, featured: true, perks: ["Wi-Fi 5 grátis", "Ideal para streaming", "Suporte 24h"] },
        { id: "p500", name: "Turbo 500", speed: "500 Mega", price: 119.9, perks: ["Wi-Fi 6", "Ideal para games", "Suporte prioritário"] },
      ]
    },
    {
      name: "Cidade 2",
      plans: [
        { id: "p200", name: "Turbo 200", speed: "200 Mega", price: 79.9, perks: ["Wi-Fi grátis", "Instalação rápida", "Suporte 24h"] },
        { id: "p400", name: "Turbo 400", speed: "400 Mega", price: 99.9, featured: true, perks: ["Wi-Fi 5 grátis", "Ideal para streaming", "Suporte 24h"] },
        { id: "p600", name: "Turbo 600", speed: "600 Mega", price: 129.9, perks: ["Wi-Fi 6", "Ideal para games", "Suporte prioritário"] },
      ]
    },
    {
      name: "Cidade 3",
      plans: [
        { id: "p150", name: "Turbo 150", speed: "150 Mega", price: 74.9, perks: ["Wi-Fi grátis", "Instalação rápida", "Suporte 24h"] },
        { id: "p450", name: "Turbo 450", speed: "450 Mega", price: 109.9, featured: true, perks: ["Wi-Fi 6", "Ideal para streaming", "Suporte prioritário"] },
      ]
    }
  ],
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
