import { SITE } from "./data/site.js";
import { saveLead } from "./crm.js";

const $ = (id) => document.getElementById(id);
const brl = (v) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

$("tagline").textContent = SITE.tagline;
$("wa").href = `https://wa.me/${SITE.whatsapp}`;

const cityOpts = SITE.cities.map((c) => `<option>${c}</option>`).join("");
$("city").innerHTML = cityOpts;
$("leadCity").innerHTML = cityOpts;
$("city").addEventListener("change", (e) => ($("leadCity").value = e.target.value));
$("leadPlan").innerHTML = SITE.plans.map((p) => `<option value="${p.id}">${p.name} – ${brl(p.price)}</option>`).join("");

$("plans").innerHTML = SITE.plans.map((p) => `
  <div class="card ${p.featured ? "featured" : ""}">
    <h3>${p.name}</h3><div class="speed">${p.speed}</div>
    <div class="price">${brl(p.price)} <small>/mês</small></div>
    <ul>${p.perks.map((x) => `<li>${x}</li>`).join("")}</ul>
    <a class="btn" href="#contratar" data-plan="${p.id}">Contratar</a>
  </div>`).join("");
document.querySelectorAll("[data-plan]").forEach((a) =>
  a.addEventListener("click", () => ($("leadPlan").value = a.dataset.plan)));

$("channels").innerHTML = SITE.channels.map((c) => `
  <a class="card channel" href="${c.href}"><div class="ic">${c.icon}</div><h3>${c.title}</h3><p>${c.text}</p></a>`).join("");

$("faq").innerHTML = SITE.faq.map((f) => `<details><summary>${f.q}</summary><p>${f.a}</p></details>`).join("");

$("footer").innerHTML = `${SITE.name} · CNPJ ${SITE.cnpj} · ${SITE.razaoSocial}<br>${SITE.phone} · ${SITE.email}`;

$("lead").addEventListener("submit", async (e) => {
  e.preventDefault();
  await saveLead(Object.fromEntries(new FormData(e.target)));
  e.target.reset();
  $("ok").hidden = false;
});
