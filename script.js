const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];

const USERS = [{ username: "shokh1234", password: "shokh1234" }];
const PRODUCTS = [
  { id: 1, name: "Essential Black Tee", price: 29, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&auto=format&fit=crop&q=80&grayscale" },
  { id: 2, name: "White Classic Tee", price: 29, image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&auto=format&fit=crop&q=80&grayscale" },
  { id: 3, name: "Oversized Shadow Tee", price: 35, image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&auto=format&fit=crop&q=80&grayscale" },
  { id: 4, name: "Graphic Monochrome Tee", price: 39, image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=600&auto=format&fit=crop&q=80&grayscale" },
  { id: 5, name: "Cropped Boxy Tee", price: 32, image: "https://images.unsplash.com/photo-1533659828870-95ee305cee3e?w=600&auto=format&fit=crop&q=80&grayscale" },
  { id: 6, name: "Vintage Wash Tee", price: 34, image: "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=600&auto=format&fit=crop&q=80&grayscale" }
];

let cart = JSON.parse(localStorage.getItem("mono_cart") || "[]");

function saveCart() {
  localStorage.setItem("mono_cart", JSON.stringify(cart));
  $("#cartBadge").textContent = cart.reduce((s, i) => s + i.qty, 0);
}

function card(p) {
  const c = document.createElement("div");
  c.className = "product-card reveal";
  c.innerHTML = `<div class="img-wrapper"><img src="${p.image}" alt="${p.name}"></div>
    <h3>${p.name}</h3><p class="price">$${p.price.toFixed(2)}</p>
    <button class="btn">Add to Cart</button>`;
  c.querySelector("button").onclick = () => {
    const f = cart.find((i) => i.id === p.id);
    f ? f.qty++ : cart.push({ ...p, qty: 1 });
    saveCart();
  };
  return c;
}

function reveal() {
  const obs = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && e.target.classList.add("visible")), { threshold: 0.15 });
  $$(".reveal").forEach((el) => obs.observe(el));
}

function renderCart() {
  const list = $("#cartItemsList"), total = $("#cartTotal");
  if (!cart.length) {
    list.innerHTML = "<p style='padding:1rem 0;color:#666'>Your cart is empty.</p>";
    total.textContent = "$0.00";
    return;
  }
  list.innerHTML = cart.map((i) => `<div class="cart-item">
    <div class="cart-item-info">
      <span class="cart-item-name">${i.name} x ${i.qty}</span>
      <span class="cart-item-price">$${(i.price * i.qty).toFixed(2)}</span>
    </div>
    <button class="remove-item" data-id="${i.id}">Remove</button>
  </div>`).join("");
  total.textContent = "$" + cart.reduce((s, i) => s + i.price * i.qty, 0).toFixed(2);
  $$(".remove-item").forEach((b) => {
    b.onclick = () => { cart = cart.filter((x) => x.id !== +b.dataset.id); saveCart(); renderCart(); };
  });
}

function renderHome() {
  $("#mainContent").innerHTML = `
    <section class="hero">
      <div>
        <span class="hero-tag">New Collection 2025</span>
        <h1>BLACK &amp; WHITE.<br>NO COMPROMISE.</h1>
        <p>Premium monochrome T-shirts. Minimal design, maximum impact.</p>
        <div class="hero-actions">
          <a href="shop.html" class="btn">Shop Collection</a>
          <a href="#about" class="btn" style="background:#fff;color:#000">Learn More</a>
        </div>
      </div>
      <div class="hero-image"><img src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&auto=format&fit=crop&q=80&grayscale" alt="Hero"></div>
    </section>
    <div class="marquee"><div class="marquee-inner rtl"><span>PREMIUM COTTON</span><span>•</span><span>MINIMAL DESIGN</span><span>•</span><span>MONOCHROME</span><span>•</span><span>PREMIUM COTTON</span><span>•</span><span>MINIMAL DESIGN</span><span>•</span><span>MONOCHROME</span><span>•</span></div></div>
    <section id="about" style="margin-top:4rem" class="reveal">
      <h2 class="section-title">About MONO</h2>
      <p class="about-text">MONO is a T-shirt store built on a single idea: black and white, nothing more.</p>
    </section>
    <section class="reveal">
      <div class="section-head"><h2 class="section-title">Popular T-Shirts</h2><a href="shop.html" class="section-link">View all</a></div>
      <div class="popular-grid" id="popularGrid"></div>
    </section>
    <section class="reveal" style="margin-top:4rem">
      <h2 class="section-title">Why Choose Us</h2>
      <div class="features-grid">
        <div class="feature-card"><div class="feature-num">01</div><h3>Premium Fabric</h3><p>100% heavyweight cotton.</p></div>
        <div class="feature-card"><div class="feature-num">02</div><h3>Free Shipping</h3><p>Worldwide delivery.</p></div>
        <div class="feature-card"><div class="feature-num">03</div><h3>Easy Returns</h3><p>30-day return policy.</p></div>
      </div>
    </section>`;
  PRODUCTS.slice(0, 3).forEach((p) => $("#popularGrid").appendChild(card(p)));
  reveal();
}

function renderShop() {
  $("#mainContent").innerHTML = `<h1 class="section-title">All T-Shirts</h1><div class="shop-grid" id="shopGrid"></div>`;
  PRODUCTS.forEach((p) => $("#shopGrid").appendChild(card(p)));
  reveal();
}

function renderContact() {
  $("#mainContent").innerHTML = `
    <h1 class="section-title">Contact Us</h1>
    <div class="contact-grid">
      <form class="contact-form" id="contactForm">
        <div class="form-group"><label>Name</label><input type="text" id="cName"></div>
        <div class="form-group"><label>Email</label><input type="email" id="cEmail"></div>
        <div class="form-group"><label>Message</label><textarea id="cMsg"></textarea></div>
        <button type="submit" class="btn full">Send Message</button>
      </form>
      <div class="contact-info"><h3>Get in touch</h3><p>hello@mono.store</p><p>+1 (555) 000-0000</p></div>
    </div>`;
  $("#contactForm").onsubmit = (e) => { e.preventDefault(); alert("Message sent! (demo)"); e.target.reset(); };
  reveal();
}

function startApp() {
  $("#authPage").style.display = "none";
  $("#appPage").style.display = "block";
  const user = sessionStorage.getItem("mono_user") || "shokh1234";
  $("#userAvatar").textContent = user[0].toUpperCase();
  $("#userName").textContent = user;
  saveCart();

  window.onscroll = () => $("#mainHeader").classList.toggle("scrolled", window.scrollY > 10);
  $("#hamburgerBtn").onclick = () => { $("#mobileMenu").classList.add("open"); $("#menuOverlay").classList.add("active"); };
  $("#closeMenu").onclick = $("#menuOverlay").onclick = () => { $("#mobileMenu").classList.remove("open"); $("#menuOverlay").classList.remove("active"); };

  $("#cartIcon").onclick = () => { renderCart(); $("#cartModal").classList.add("open"); };
  $("#closeCartBtn").onclick = () => $("#cartModal").classList.remove("open");
  $("#cartModal").onclick = (e) => { if (e.target.id === "cartModal") e.target.classList.remove("open"); };
  $("#checkoutBtn").onclick = () => {
    if (!cart.length) return alert("Cart is empty!");
    alert("Checkout successful! (demo)");
    cart = []; saveCart(); renderCart();
    $("#cartModal").classList.remove("open");
  };

  const page = location.pathname.split("/").pop();
  page.includes("shop") ? renderShop() : page.includes("contact") ? renderContact() : renderHome();
}

document.addEventListener("DOMContentLoaded", () => {
  if (sessionStorage.getItem("mono_logged") === "true") return startApp();
  document.body.classList.add("loaded");
  $("#authForm").onsubmit = (e) => {
    e.preventDefault();
    const u = $("#username").value.trim(), p = $("#password").value.trim();
    const err = $("#authError");
    if (!u || !p) { err.textContent = "Please fill in all fields!"; err.classList.add("show"); return; }
    if (USERS.some((x) => x.username === u && x.password === p)) {
      sessionStorage.setItem("mono_logged", "true");
      sessionStorage.setItem("mono_user", u);
      startApp();
    } else { err.textContent = "Invalid username or password"; err.classList.add("show"); }
  };
});