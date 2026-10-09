import { SITE } from "./data/site.js";
import { saveLead } from "./crm.js";

const $ = (id) => document.getElementById(id);
const brl = (v) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

$("tagline").textContent = SITE.tagline;
$("wa").href = `https://wa.me/${SITE.whatsapp}`;

const cityOpts = SITE.cities.map((c) => `<option value="${c}">${c}</option>`).join("");
$("city").innerHTML = cityOpts;
$("leadCity").innerHTML = cityOpts;

function renderPlans(city) {
  const plansForCity = SITE.plans[city] || [];

  $("leadPlan").innerHTML = plansForCity.map((p) => `<option value="${p.id}">${p.name} – ${brl(p.price)}</option>`).join("");

  $("plans").innerHTML = plansForCity.map((p) => `
    <div class="card ${p.featured ? "featured" : ""}">
      <h3>${p.name}</h3><div class="speed">${p.speed}</div>
      <div class="price">${brl(p.price)} <small>/mês</small></div>
      <ul>${p.perks.map((x) => `<li>${x}</li>`).join("")}</ul>
      <a class="btn" href="#contratar" data-plan="${p.id}">Contratar</a>
    </div>`).join("");

  document.querySelectorAll("[data-plan]").forEach((a) =>
    a.addEventListener("click", () => {
      // Sync the bottom selector with the top selector just in case
      $("leadCity").value = city;
      $("leadPlan").value = a.dataset.plan;
    })
  );
}

$("city").addEventListener("change", (e) => {
  $("leadCity").value = e.target.value;
  renderPlans(e.target.value);
});

$("leadCity").addEventListener("change", (e) => {
  $("city").value = e.target.value;
  renderPlans(e.target.value);
});

// Initial render for the first city
if (SITE.cities.length > 0) {
    const initialCity = SITE.cities[0];
    $("city").value = initialCity;
    $("leadCity").value = initialCity;
    renderPlans(initialCity);
}

$("channels").innerHTML = SITE.channels.map((c) => `
  <a class="card channel" href="${c.href}"><div class="ic">${c.icon}</div><h3>${c.title}</h3><p>${c.text}</p></a>`).join("");

$("faq").innerHTML = SITE.faq.map((f) => `<details><summary>${f.q}</summary><p>${f.a}</p></details>`).join("");

$("footer").innerHTML = `${SITE.name} · CNPJ ${SITE.cnpj} · ${SITE.razaoSocial}<br>${SITE.phone} · ${SITE.email}`;

$("lead").addEventListener("submit", async (e) => {
  e.preventDefault();
  try {
      await saveLead(Object.fromEntries(new FormData(e.target)));
      e.target.reset();
      $("ok").textContent = "Recebemos! Já já falamos com você.";
      $("ok").style.color = "green";
      $("ok").hidden = false;
  } catch (err) {
      console.error(err);
      $("ok").textContent = "Erro ao enviar. Tente pelo WhatsApp.";
      $("ok").style.color = "red";
      $("ok").hidden = false;
  }
});
