// ===== CONFIG =====
const WHATSAPP_NUMBER = "5511999999999"; // TODO: substituir pelo número real da M&B

function wppLink(message) {
  return (
    "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(message)
  );
}

// Default floating + main CTA messages
const defaultMsg =
  "Olá! Encontrei vocês através do site da M&B Confeitaria e gostaria de fazer uma encomenda.";
document.getElementById("wppFloat").href = wppLink(defaultMsg);
document.getElementById("mainWppCta").href = wppLink(defaultMsg);

// Header scroll state
const header = document.getElementById("siteHeader");
const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 40);
document.addEventListener("scroll", onScroll);
onScroll();

// Mobile nav toggle
const menuToggle = document.getElementById("menuToggle");
const primaryNav = document.getElementById("primaryNav");
menuToggle.addEventListener("click", () => {
  const open = primaryNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", open);
});
primaryNav.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    primaryNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", false);
  }),
);

// Menu tabs (Cardápio)
const tabs = document.querySelectorAll(".menu-tab");
const lists = document.querySelectorAll(".menu-list");
function activateTab(name) {
  tabs.forEach((t) => t.classList.toggle("active", t.dataset.tab === name));
  lists.forEach((l) => l.classList.toggle("active", l.dataset.list === name));
}
tabs.forEach((t) =>
  t.addEventListener("click", () => activateTab(t.dataset.tab)),
);
document.querySelectorAll("[data-tab-link]").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    activateTab(link.dataset.tabLink);
    document.getElementById("cardapio").scrollIntoView({ behavior: "smooth" });
  });
});

// Menu item order buttons -> prefilled WhatsApp message
document.querySelectorAll(".menu-item-cta").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    const product = btn.dataset.order;
    const msg = `Olá! Encontrei vocês através do site da M&B Confeitaria e gostaria de fazer um pedido: ${product}.`;
    window.open(wppLink(msg), "_blank");
  });
});

// Gallery filters
const gfilters = document.querySelectorAll(".gfilter");
const gitems = document.querySelectorAll(".gitem");
gfilters.forEach((f) =>
  f.addEventListener("click", () => {
    gfilters.forEach((x) => x.classList.remove("active"));
    f.classList.add("active");
    const cat = f.dataset.filter;
    gitems.forEach((item) => {
      item.style.display =
        cat === "todos" || item.dataset.cat === cat ? "" : "none";
    });
  }),
);

// Personalizer
const pTipo = document.getElementById("pTipo");
const pTamanho = document.getElementById("pTamanho");
const pSabor = document.getElementById("pSabor");
const pTema = document.getElementById("pTema");
const pPreview = document.getElementById("pPreview");
const pSubmit = document.getElementById("pSubmit");

function updatePreview() {
  const tema = pTema.value.trim() ? pTema.value.trim() : "a combinar";
  const text = `${pTipo.value} · Tamanho ${pTamanho.value} · Sabor ${pSabor.value} · Tema: ${tema}`;
  pPreview.textContent = text;
  return text;
}
[pTipo, pTamanho, pSabor, pTema].forEach((el) =>
  el.addEventListener("input", updatePreview),
);
updatePreview();

pSubmit.addEventListener("click", (e) => {
  e.preventDefault();
  const tema = pTema.value.trim() ? pTema.value.trim() : "a combinar";
  const msg = `Olá! Encontrei vocês através do site da M&B Confeitaria e gostaria de encomendar um bolo personalizado:\n- Tipo: ${pTipo.value}\n- Tamanho: ${pTamanho.value}\n- Sabor: ${pSabor.value}\n- Tema: ${tema}`;
  window.open(wppLink(msg), "_blank");
});
