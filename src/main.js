import { SITE } from "./data/site.js";
import { saveLead } from "./crm.js";

const $ = (id) => document.getElementById(id);
const brl = (v) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

$("tagline").textContent = SITE.tagline;
$("wa").href = `https://wa.me/${SITE.whatsapp}`;

const cityOpts = SITE.cities.map((c) => `<option value="${c.name}">${c.name}</option>`).join("");
$("city").innerHTML = cityOpts;
$("leadCity").innerHTML = cityOpts;

function renderPlans(cityName) {
  const cityData = SITE.cities.find(c => c.name === cityName) || SITE.cities[0];

  $("leadPlan").innerHTML = cityData.plans.map((p) => `<option value="${p.id}">${p.name} – ${brl(p.price)}</option>`).join("");

  $("plans").innerHTML = cityData.plans.map((p) => `
    <div class="card ${p.featured ? "featured" : ""}">
      <h3>${p.name}</h3><div class="speed">${p.speed}</div>
      <div class="price">${brl(p.price)} <small>/mês</small></div>
      <ul>${p.perks.map((x) => `<li>${x}</li>`).join("")}</ul>
      <a class="btn" href="#contratar" data-plan="${p.id}">Contratar</a>
    </div>`).join("");

  document.querySelectorAll("[data-plan]").forEach((a) =>
    a.addEventListener("click", () => ($("leadPlan").value = a.dataset.plan)));
}

// Initial render
const savedCity = localStorage.getItem('turbonet_city') || SITE.cities[0].name;
$("city").value = savedCity;
$("leadCity").value = savedCity;
renderPlans(savedCity);

$("city").addEventListener("change", (e) => {
  const newCity = e.target.value;
  $("leadCity").value = newCity;
  localStorage.setItem('turbonet_city', newCity);
  renderPlans(newCity);
});

$("leadCity").addEventListener("change", (e) => {
  const newCity = e.target.value;
  $("city").value = newCity;
  localStorage.setItem('turbonet_city', newCity);
  renderPlans(newCity);
});

$("channels").innerHTML = SITE.channels.map((c) => `
  <a class="card channel" href="${c.href}"><div class="ic">${c.icon}</div><h3>${c.title}</h3><p>${c.text}</p></a>`).join("");

$("faq").innerHTML = SITE.faq.map((f) => `<details><summary>${f.q}</summary><p>${f.a}</p></details>`).join("");

$("footer").innerHTML = `${SITE.name} · CNPJ ${SITE.cnpj} · ${SITE.razaoSocial}<br>${SITE.phone} · ${SITE.email}`;

$("lead").addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = Object.fromEntries(new FormData(e.target));
  const cityData = SITE.cities.find(c => c.name === formData.city) || SITE.cities[0];
  const planName = cityData.plans.find(p => p.id === formData.plan)?.name || formData.plan;

  await saveLead({...formData, plan: planName });
  e.target.reset();
  $("ok").hidden = false;
  setTimeout(() => $("ok").hidden = true, 5000);
});

// Intersection Observer para animações
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

// Adiciona classe aos sections ao carregar
document.querySelectorAll('section').forEach(sec => {
  sec.classList.add('fade-in');
  observer.observe(sec);
});
