const burgerBtn = document.getElementById("burgerBtn");
const drawer = document.getElementById("drawer");
const overlay = document.getElementById("overlay");
const closeBtn = document.getElementById("closeBtn");

function openDrawer() {
  drawer.classList.add("open");
  overlay.classList.add("active");
  burgerBtn.setAttribute("aria-expanded", "true");
  drawer.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeDrawer() {
  drawer.classList.remove("open");
  overlay.classList.remove("active");
  burgerBtn.setAttribute("aria-expanded", "false");
  drawer.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

burgerBtn.addEventListener("click", openDrawer);
closeBtn.addEventListener("click", closeDrawer);
overlay.addEventListener("click", closeDrawer);

// ESC buat nutup
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeDrawer();
});

const dropdownToggle = document.querySelector(".dropdown > a");

dropdownToggle.addEventListener("click", (e) => {
  e.preventDefault();
  e.stopPropagation();
  dropdownToggle.parentElement.classList.toggle("open");
});



let donation = [];
let currentCategory = "All";

const cardsGrid = document.getElementById("cardsGrid");
const searchInput = document.getElementById("searchInput");
const filterButtons = document.getElementById("filterButtons");

fetch("./donation.json")
  .then((res) => res.json())
  .then((data) => {
    donation = data;
    renderCards();
  })
  .catch((err) => console.error("Failed to load donation:", err));

function renderCards() {
  const keyword = searchInput.value.toLowerCase().trim();

  const filtered = donation.filter((item) => {
    const matchCategory =
      currentCategory === "All" || item.category === currentCategory;

    const matchKeyword =
      item.title.toLowerCase().includes(keyword) ||
      item.location.toLowerCase().includes(keyword) ||
      item.desc.toLowerCase().includes(keyword);

    return matchCategory && matchKeyword;
  });

  cardsGrid.innerHTML = filtered.map(cardTemplate).join("");
}

function cardTemplate(item) {
  const percentRaw = (item.collected / item.target) * 100;
  const percent = Math.min(Math.round(percentRaw), 100); // biar max 100%
  return `
    <div class="activity-card">
      <div class="img-wrap">
        <img src="${item.image}" alt="${item.title}" loading="lazy" />
        <div class="date-badge">
          <span>📅</span>
          <span>${item.daysLeft} Days Left</span>
        </div>
      </div>

      <div class="card-body">
        <h3>${item.title}</h3>
        <div class="location">
         <img src="/Assets/location.svg" alt="Gambar lokasi program" class="place-icon">
          <p>${item.location}</p>
        </div>
        <p class="desc">${item.desc}</p>

        <div class="donation-progress">
          <div class="progress-top">
            <span>Collected: <span class="collected">${formatRupiah(item.collected)}</span></span>
            <span>${percent}%</span>
          </div>

          <div class="progress-bar">
            <div class="progress-fill" style="width:${percent}%"></div>
          </div>

          <div class="progress-bottom">
            <span>Target: ${formatRupiah(item.target)}</span>
          </div>
        </div>

        <a href="${item.url}" target="blank" class="join-btn">Donasi Sekarang!</a>
      </div>
    </div>
  `;
}


function formatRupiah(num) {
  return "Rp" + num.toLocaleString("id-ID");
}
searchInput.addEventListener("input", renderCards);

filterButtons.addEventListener("click", (e) => {
  const btn = e.target.closest("button");
  if (!btn) return;

  document
    .querySelectorAll(".chip")
    .forEach((b) => b.classList.remove("active"));

  btn.classList.add("active");
  currentCategory = btn.dataset.category;

  renderCards();
});

function joinNow(id) {
  const item = donation.find((a) => a.id === id);
  alert(`You clicked Join Now for: ${item.title}`);
  // nanti bisa diganti ke WA / Form / modal
}

const filterSelect = document.getElementById("filterSelect");

filterSelect.addEventListener("change", () => {
  currentCategory = filterSelect.value;

  // sync active state di chips (biar konsisten)
  document.querySelectorAll(".chip").forEach((b) => {
    b.classList.toggle("active", b.dataset.category === currentCategory);
  });

  renderCards();
});

// kalau user klik chip di desktop, sync ke dropdown juga
filterButtons.addEventListener("click", (e) => {
  const btn = e.target.closest("button");
  if (!btn) return;

  document.querySelectorAll(".chip").forEach((b) => b.classList.remove("active"));
  btn.classList.add("active");

  currentCategory = btn.dataset.category;

  // sync dropdown
  filterSelect.value = currentCategory;

  renderCards();
});