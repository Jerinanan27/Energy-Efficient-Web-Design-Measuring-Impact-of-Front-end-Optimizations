
const PRODUCTS = [
  // --- BEDS (20 items) ---
  { id: "bed01", name: "Cloud Bed Mini",        price: 49.00, category: "beds", img: "assets/original/prod1.jpg", desc: "Compact donut bed for kittens and small spaces." },
  { id: "bed02", name: "Cloud Bed Classic",     price: 79.00, category: "beds", img: "assets/original/prod2.jpg", desc: "Ultra-soft donut-shaped bed for curled-up naps." },
  { id: "bed03", name: "Cloud Bed Luxe",        price: 129.00, category: "beds", img: "assets/original/prod3.jpg", desc: "Plush memory foam base for premium comfort." },
  { id: "bed04", name: "Heated Cloud Bed",      price: 99.00, category: "beds", img: "assets/original/prod4.jpg", desc: "Low-wattage heated insert for chilly nights." },
  { id: "bed05", name: "Foldaway Travel Bed",   price: 59.00, category: "beds", img: "assets/original/prod5.jpg", desc: "Lightweight, foldable bed for travel." },
  { id: "bed06", name: "Outdoor Sun Bed",       price: 69.00, category: "beds", img: "assets/original/prod6.jpg", desc: "Weather-resistant bed for patios and balconies." },
  { id: "bed07", name: "Bolster Cloud Bed",     price: 89.00, category: "beds", img: "assets/original/prod7.jpg", desc: "Raised bolsters for head support." },
  { id: "bed08", name: "Window Perch Bed",      price: 119.00, category: "beds", img: "assets/original/prod8.jpg", desc: "Comfortable perch-style bed for sunbathing." },
  { id: "bed09", name: "Cave Hide Bed",         price: 84.00, category: "beds", img: "assets/original/prod9.jpg", desc: "Enclosed cave-style bed for shy cats." },
  { id: "bed10", name: "Round Plush Bed",       price: 55.00, category: "beds", img: "assets/original/prod10.jpg", desc: "Soft circular bed with washable cover." },
  { id: "bed11", name: "Large Sofa Bed",        price: 149.00, category: "beds", img: "assets/original/prod11.jpg", desc: "Big enough for multi-cat naps." },
  { id: "bed12", name: "Eco-Fur Bed",           price: 69.00, category: "beds", img: "assets/original/prod12.jpg", desc: "Made with recycled fibers and faux fur." },
  { id: "bed13", name: "Raised Mesh Bed",       price: 64.00, category: "beds", img: "assets/original/prod13.jpg", desc: "Breathable raised bed for summer." },
  { id: "bed14", name: "Orthopedic Support",    price: 179.00, category: "beds", img: "assets/original/prod14.jpg", desc: "High-density foam for older pets." },
  { id: "bed15", name: "Luxury Velvet Bed",     price: 139.00, category: "beds", img: "assets/original/prod15.jpg", desc: "Velvet finish with deep cushioning." },
  { id: "bed16", name: "Travel Bolster Bed",    price: 52.00, category: "beds", img: "assets/original/prod16.jpg", desc: "Portable bolster bed for car trips." },
  { id: "bed17", name: "Cooling Gel Bed",       price: 154.00, category: "beds", img: "assets/original/prod17.jpg", desc: "Cooling layer for hot weather comfort." },
  { id: "bed18", name: "Den-Style Bed",         price: 79.00, category: "beds", img: "assets/original/prod18.jpg", desc: "Cozy den with soft interior lining." },
  { id: "bed19", name: "Washable Foam Bed",     price: 88.00, category: "beds", img: "assets/original/prod19.jpg", desc: "Removable, machine-washable cover." },
  { id: "bed20", name: "Reversible Bed",        price: 66.00, category: "beds", img: "assets/original/prod20.jpg", desc: "Two-sided design for seasonal use." },

  // --- TOYS (20 items) ---
  { id: "toy01", name: "Play Stix Classic",     price: 12.00, category: "toys", img: "assets/original/prod21.jpg", desc: "Interactive wand toy with feathers and bell." },
  { id: "toy02", name: "Feather Wand Pro",      price: 15.00, category: "toys", img: "assets/original/prod22.jpg", desc: "Extra-long wand for active play." },
  { id: "toy03", name: "Automated Mover",       price: 24.00, category: "toys", img: "assets/original/prod23.jpg", desc: "Battery-powered rolling toy." },
  { id: "toy04", name: "Catnip Pouch Mini",     price: 6.00,  category: "toys", img: "assets/original/prod24.jpg", desc: "Organic catnip-filled pouch for quick pounces." },
  { id: "toy05", name: "Laser Dot Pointer",     price: 9.00,  category: "toys", img: "assets/original/prod25.jpg", desc: "Handheld laser for interactive chase." },
  { id: "toy06", name: "Bell Ball Pack",        price: 8.00,  category: "toys", img: "assets/original/prod26.jpg", desc: "Set of 3 jingling balls." },
  { id: "toy07", name: "Crinkle Tunnel",        price: 29.00, category: "toys", img: "assets/original/prod27.jpg", desc: "Collapsible tunnel with crinkle sound." },
  { id: "toy08", name: "Puzzle Treat Toy",      price: 22.00, category: "toys", img: "assets/original/prod28.jpg", desc: "Enrichment puzzle to hide treats." },
  { id: "toy09", name: "Springy Mouse",         price: 7.00,  category: "toys", img: "assets/original/prod29.jpg", desc: "Bouncy mouse for batting fun." },
  { id: "toy10", name: "Rolling Track",         price: 18.00, category: "toys", img: "assets/original/prod30.jpg", desc: "Multi-piece track with removable ball." },
  { id: "toy11", name: "Automatic Feather",     price: 25.00, category: "toys", img: "assets/original/prod31.jpg", desc: "Battery toy that flutters feathers." },
  { id: "toy12", name: "Squeaky Fish",          price: 5.00,  category: "toys", img: "assets/original/prod32.jpg", desc: "Soft fish with hidden squeaker." },
  { id: "toy13", name: "Interactive Plush",     price: 14.00, category: "toys", img: "assets/original/prod33.jpg", desc: "Plush toy with movement sensors." },
  { id: "toy14", name: "Treat Dispenser",       price: 20.00, category: "toys", img: "assets/original/prod34.jpg", desc: "Dispenses treats during play." },
  { id: "toy15", name: "Wand Set",              price: 16.00, category: "toys", img: "assets/original/prod35.jpg", desc: "Pack of 2 wand toys with variety." },
  { id: "toy16", name: "Jingle Ball Tube",      price: 11.00, category: "toys", img: "assets/original/prod36.jpg", desc: "Tube track with bells inside." },
  { id: "toy17", name: "Bubble Chaser",         price: 19.00, category: "toys", img: "assets/original/prod37.jpg", desc: "Safe pet bubble mix and wand." },
  { id: "toy18", name: "Velcro Catch Toy",      price: 10.00, category: "toys", img: "assets/original/prod38.jpg", desc: "Velcro-backed toys for tossing." },
  { id: "toy19", name: "Motion Sensor Toy",     price: 27.00, category: "toys", img: "assets/original/prod39.jpg", desc: "Activates when your cat approaches." },
  { id: "toy20", name: "Mini Rope Toy",         price: 6.50, category: "toys", img: "assets/original/prod40.jpg", desc: "Small rope for tug and carry." },

  // --- COLLARS (20 items) ---
  { id: "col01", name: "Seafur Collar Slim",    price: 12.00, category: "collars", img: "assets/original/prod41.jpg", desc: "Breakaway collar with reflective stitching." },
  { id: "col02", name: "Seafur Collar Classic",  price: 18.00, category: "collars", img: "assets/original/prod42.jpg", desc: "Durable nylon collar with tag ring." },
  { id: "col03", name: "Seafur Collar Luxe",     price: 24.00, category: "collars", img: "assets/original/prod43.jpg", desc: "Leather-look collar with metal buckle." },
  { id: "col04", name: "ID Tag Collar",          price: 16.00, category: "collars", img: "assets/original/prod44.jpg", desc: "Collar + custom engraved tag option." },
  { id: "col05", name: "Reflective Stripe",      price: 14.00, category: "collars", img: "assets/original/prod45.jpg", desc: "High-visibility reflective strip." },
  { id: "col06", name: "Soft Breakaway",         price: 22.00, category: "collars", img: "assets/original/prod46.jpg", desc: "Soft padding with breakaway clasp." },
  { id: "col07", name: "Bell & Tag Collar",      price: 19.00, category: "collars", img: "assets/original/prod47.jpg", desc: "Classic collar with small bell." },
  { id: "col08", name: "Patterned Collar",       price: 17.00, category: "collars", img: "assets/original/prod48.jpg", desc: "Fun printed designs for flair." },
  { id: "col09", name: "Adjustable Micro Collar",price: 13.00, category: "collars", img: "assets/original/prod49.jpg", desc: "Small-size adjustable collar." },
  { id: "col10", name: "GPS Ready Collar",       price: 45.00, category: "collars", img: "assets/original/prod50.jpg", desc: "Works with third-party trackers." },
  { id: "col11", name: "Neon Safety Collar",     price: 15.00, category: "collars", img: "assets/original/prod51.jpg", desc: "Bright neon for evening visibility." },
  { id: "col12", name: "Bow-Tie Collar",         price: 20.00, category: "collars", img: "assets/original/prod52.jpg", desc: "Detachable bow-tie for occasions." },
  { id: "col13", name: "Thin Leather Collar",    price: 28.00, category: "collars", img: "assets/original/prod53.jpg", desc: "Slim leather style with metal ring." },
  { id: "col14", name: "Elastic Comfort",        price: 18.00, category: "collars", img: "assets/original/prod54.jpg", desc: "Elastic stretch for quick release." },
  { id: "col15", name: "Eco-Cotton Collar",      price: 16.00, category: "collars", img: "assets/original/prod55.jpg", desc: "Made from organic cotton materials." },
  { id: "col16", name: "Glow-in-the-Dark",      price: 21.00, category: "collars", img: "assets/original/prod56.jpg", desc: "Charges in light and glows at night." },
  { id: "col17", name: "Mariner Stripe",         price: 17.50, category: "collars", img: "assets/original/prod57.jpg", desc: "Nautical stripe pattern and tag." },
  { id: "col18", name: "Soft Padded Collar",     price: 23.00, category: "collars", img: "assets/original/prod58.jpg", desc: "Padded lining for extra comfort." },
  { id: "col19", name: "Minimalist Collar",      price: 12.50, category: "collars", img: "assets/original/prod59.jpg", desc: "Simple, lightweight, low-profile." },
  { id: "col20", name: "Seasonal Collar Pack",   price: 26.00, category: "collars", img: "assets/original/prod60.jpg", desc: "Set of 2 collars with seasonal prints." },

  // --- FOOD (20 items) ---
  { id: "food01", name: "Platinum Kibble 1kg",  price: 9.00,  category: "food", img: "assets/original/prod61.jpg", desc: "Balanced dry food for daily nutrition." },
  { id: "food02", name: "Salmon Wet Pouch",     price: 1.80,  category: "food", img: "assets/original/prod62.jpg", desc: "Single-serve salmon wet food pouch." },
  { id: "food03", name: "Chicken Wet Tray",     price: 2.20,  category: "food", img: "assets/original/prod63.jpg", desc: "Tray of tender chicken in gravy." },
  { id: "food04", name: "Grain-Free Kibble",    price: 12.00, category: "food", img: "assets/original/prod64.jpg", desc: "High-protein grain-free dry food." },
  { id: "food05", name: "Tuna Feast Can",       price: 2.50,  category: "food", img: "assets/original/prod65.jpg", desc: "Premium canned tuna in natural juices." },
  { id: "food06", name: "Dental Crunch",        price: 7.50,  category: "food", img: "assets/original/prod66.jpg", desc: "Kibble formulated to clean teeth." },
  { id: "food07", name: "Kitten Growth Mix",    price: 11.00, category: "food", img: "assets/original/prod67.jpg", desc: "Nutrition blend for growing kittens." },
  { id: "food08", name: "Senior Care Kibble",   price: 13.50, category: "food", img: "assets/original/prod68.jpg", desc: "Lower-calorie formula for senior cats." },
  { id: "food09", name: "Beef Stew Can",        price: 3.00,  category: "food", img: "assets/original/prod69.jpg", desc: "Hearty beef stew in gravy." },
  { id: "food10", name: "Hydration Jelly Pack", price: 2.80,  category: "food", img: "assets/original/prod70.jpg", desc: "Hydrating jelly toppers for picky eaters." },
  { id: "food11", name: "Salmon Kibble 2kg",    price: 17.00, category: "food", img: "assets/original/prod71.jpg", desc: "Large bag salmon-flavored kibble." },
  { id: "food12", name: "Ocean Tuna Can",       price: 2.40,  category: "food", img: "assets/original/prod72.jpg", desc: "Lightly cooked tuna flakes." },
  { id: "food13", name: "Gravy Chicken Can",    price: 2.60,  category: "food", img: "assets/original/prod73.jpg", desc: "Succulent chicken chunks in gravy." },
  { id: "food14", name: "Sensitive Skin Diet",  price: 18.00, category: "food", img: "assets/original/prod74.jpg", desc: "Limited-ingredient formula for sensitive pets." },
  { id: "food15", name: "Dental Treats Pack",   price: 6.50,  category: "food", img: "assets/original/prod75.jpg", desc: "Crunchy treats for dental care." },
  { id: "food16", name: "Turkey Feast Pouch",   price: 1.90,  category: "food", img: "assets/original/prod76.jpg", desc: "Single-serve turkey pouch." },
  { id: "food17", name: "Freeze-Dried Bites",   price: 8.00,  category: "food", img: "assets/original/prod77.jpg", desc: "High-value freeze-dried treats." },
  { id: "food18", name: "Rich Salmon Tray",     price: 3.10,  category: "food", img: "assets/original/prod78.jpg", desc: "Salmon fillet pieces in sauce." },
  { id: "food19", name: "Weight Control Mix",   price: 14.00, category: "food", img: "assets/original/prod79.jpg", desc: "Lower-calorie dry food for weight management." },
  { id: "food20", name: "Gourmet Platter Can",  price: 4.50,  category: "food", img: "assets/original/prod80.jpg", desc: "Premium mixed-protein gourmet can." }
];

const state = {
  cart: {},
  products: PRODUCTS.slice()
};

function formatPrice(n){ return n.toFixed(2); }

/* Render the list exactly as provided */
function renderProducts(list){
  const grid = document.getElementById('productGrid');
  if (!grid) return;
  grid.innerHTML = '';
  if (!list || list.length === 0) {
    grid.innerHTML = '<p class="muted">No products to show.</p>';
    return;
  }
  list.forEach(p=>{
    const card = document.createElement('article');
    card.className = 'card';
    card.innerHTML = `
      <img src="${p.img}" alt="${p.name}" />
      <div class="card-body">
        <h4>${p.name}</h4>
        <p class="muted">${p.category}</p>
        <p class="muted">$${formatPrice(p.price)}</p>
        <div class="meta">
          <button class="btn btn-quick" data-id="${p.id}">Quick view</button>
          <button class="btn" data-add="${p.id}">Add</button>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

/* Sort helper */
function sortList(list, sortOpt){
  if(!sortOpt) return list.slice();
  const out = list.slice();
  if(sortOpt === 'price-asc') out.sort((a,b)=>a.price - b.price);
  else if(sortOpt === 'price-desc') out.sort((a,b)=>b.price - a.price);
  else if(sortOpt === 'name') out.sort((a,b)=>a.name.localeCompare(b.name));
  return out;
}

/* Get unique categories in the order they first appear in PRODUCTS */
function getCategories(){
  const out = [];
  for(const p of PRODUCTS){
    if(!out.includes(p.category)) out.push(p.category);
  }
  return out;
}

function computeHomepageAllDisplay(sortOpt){
  const globallySorted = sortList(PRODUCTS, sortOpt); // global sort first
  const cats = getCategories();
  const perCatLimit = 2;
  const maxTotal = cats.length * perCatLimit;

  const counts = {};
  const out = [];

  for (const p of globallySorted) {
    const cat = p.category;
    counts[cat] = counts[cat] || 0;
    if (counts[cat] < perCatLimit) {
      out.push(p);
      counts[cat] += 1;
      if (out.length >= maxTotal) break; 
    }
  }

  return out;
}


/* For homepage when a specific category filter is chosen: show first N (8) of that category sorted */
function computeHomepageCategoryDisplay(cat, sortOpt, limit = 8){
  const items = PRODUCTS.filter(p => p.category === cat);
  const sorted = sortList(items, sortOpt);
  return sorted.slice(0, limit);
}

/* For category page: return ALL products in that category (no limit), sorted */
function computeCategoryPageDisplayAll(cat, sortOpt){
  const items = PRODUCTS.filter(p => p.category === cat);
  return sortList(items, sortOpt);
}

function openModal(product){
  const modal = document.getElementById('productModal');
  if (!modal) return;
  document.getElementById('modalTitle').textContent = product.name;
  document.getElementById('modalPrice').textContent = `$${formatPrice(product.price)}`;
  document.getElementById('modalDesc').textContent = product.desc;
  document.getElementById('modalQty').value = 1;
  const images = document.getElementById('modalImages');
  images.innerHTML = `<img src="${product.img}" alt="${product.name}">`;
  modal.setAttribute('aria-hidden','false');
  modal.style.display = 'flex';
}

function closeModal(){
  const modal = document.getElementById('productModal');
  if (!modal) return;
  modal.setAttribute('aria-hidden','true');
  modal.style.display = 'none';
}

function addToCart(id, qty=1){
  if(!state.cart[id]) state.cart[id] = 0;
  state.cart[id] += qty;
  updateCartUI();
}

function updateCartUI(){
  const count = Object.values(state.cart).reduce((a,b)=>a+b,0);
  const cartCountEl = document.getElementById('cartCount');
  if (cartCountEl) cartCountEl.textContent = count;
  const container = document.getElementById('cartItems');
  if (!container) return;
  container.innerHTML = '';
  if(count === 0){
    container.innerHTML = '<p class="muted">Your cart is empty.</p>';
  } else {
    let total = 0;
    for(const id in state.cart){
      const prod = PRODUCTS.find(p=>p.id===id);
      const qty = state.cart[id];
      total += prod.price * qty;
      const item = document.createElement('div');
      item.className = 'cart-item';
      item.innerHTML = `
        <img src="${prod.img}" alt="${prod.name}">
        <div style="flex:1">
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <strong>${prod.name}</strong>
            <button class="icon-btn remove-inline" data-action="remove" data-id="${id}" aria-label="Remove">✕</button>
          </div>
          <div class="muted">$${formatPrice(prod.price)} × ${qty}</div>
          <div class="qty-controls">
            <button data-action="dec" data-id="${id}" aria-label="Decrease">-</button>
            <span style="min-width:28px;text-align:center;display:inline-block;">${qty}</span>
            <button data-action="inc" data-id="${id}" aria-label="Increase">+</button>
          </div>
        </div>
      `;
      container.appendChild(item);
    }
    const totalEl = document.getElementById('cartTotal');
    if (totalEl) totalEl.textContent = formatPrice(total);
  }
}

function openCart(){ 
  const drawer = document.getElementById('cartDrawer');
  if (!drawer) return;
  drawer.classList.add('open'); 
  drawer.setAttribute('aria-hidden','false'); 
}
function closeCart(){ 
  const drawer = document.getElementById('cartDrawer');
  if (!drawer) return;
  drawer.classList.remove('open'); 
  drawer.setAttribute('aria-hidden','true'); 
}

/* --- Header / Hero --- */
let currentSlide = 0;
function initHero(){
  const slides = Array.from(document.querySelectorAll('.hero-slider .slide'));
  if (!slides.length) return;
  const total = slides.length;
  function show(i){
    slides.forEach((s, idx)=> s.classList.toggle('active', idx===i));
  }
  const prev = document.getElementById('prevSlide');
  const next = document.getElementById('nextSlide');
  if (prev) prev.addEventListener('click', ()=>{ currentSlide = (currentSlide -1 + total) % total; show(currentSlide); });
  if (next) next.addEventListener('click', ()=>{ currentSlide = (currentSlide +1) % total; show(currentSlide); });
  setInterval(()=>{ currentSlide = (currentSlide+1)%total; show(currentSlide); }, 5000);
}

function initHeader(){
  const menuBtn = document.getElementById('menuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', ()=>{
      const shown = mobileMenu.getAttribute('aria-hidden') !== 'false';
      mobileMenu.setAttribute('aria-hidden', String(!shown));
      mobileMenu.style.display = shown ? 'block' : 'none';
    });
  }

  const cartBtn = document.getElementById('cartBtn');
  if (cartBtn) cartBtn.addEventListener('click', ()=> openCart());
  const closeCartBtn = document.getElementById('closeCart');
  if (closeCartBtn) closeCartBtn.addEventListener('click', ()=> closeCart());
}

/* --- Product actions --- */
function initProductActions(){
  const productGrid = document.getElementById('productGrid');
  if (productGrid) {
    productGrid.addEventListener('click', (e)=>{
      const quickBtn = e.target.closest('.btn-quick[data-id]');
      if (quickBtn) {
        const id = quickBtn.getAttribute('data-id');
        const product = PRODUCTS.find(p=>p.id===id);
        if(product) openModal(product);
        return;
      }
      const add = e.target.closest('[data-add]');
      if(add){
        const id = add.getAttribute('data-add');
        addToCart(id, 1);
      }
    });
  }

  const closeModalBtn = document.getElementById('closeModal');
  if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);

  const modalAdd = document.getElementById('modalAdd');
  if (modalAdd) modalAdd.addEventListener('click', ()=>{
    const title = document.getElementById('modalTitle').textContent;
    const product = PRODUCTS.find(p => p.name === title);
    const qty = parseInt(document.getElementById('modalQty').value || '1', 10);
    if(product) addToCart(product.id, qty);
    closeModal();
  });
}


function initFiltersAndRenderIndex(){
  const sort = document.getElementById('sortSelect');
  const filter = document.getElementById('filterSelect');

  function apply(){
    const s = sort ? sort.value : 'featured';
    const cat = filter ? filter.value : 'all';
    if(cat === 'all'){
      const list = computeHomepageAllDisplay(s); 
      renderProducts(list);
    } else {
      const list = computeHomepageCategoryDisplay(cat, s, 8); 
      renderProducts(list);
    }
  }

  if(sort) sort.addEventListener('change', apply);
  if(filter) filter.addEventListener('change', apply);

  apply();
}

function initCategorySortAndRender(catParam){
  const sort = document.getElementById('sortSelect');

  function apply(){
    const s = sort ? sort.value : 'featured';
    const list = computeCategoryPageDisplayAll(catParam, s); 
    renderProducts(list);
  }

  if(sort) sort.addEventListener('change', apply);
  apply();
}

function initSearchDropdown() {
  const searchBtn = document.getElementById('searchBtn');
  const dropdown = document.getElementById('searchDropdown');

  if (!searchBtn || !dropdown) return;

  searchBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    dropdown.classList.toggle('show');
    dropdown.setAttribute('aria-hidden', dropdown.classList.contains('show') ? 'false' : 'true');
  });

  dropdown.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-category]');
    if (btn) {
      const category = btn.getAttribute('data-category');
      window.location.href = `category.html?cat=${encodeURIComponent(category)}`;
    }
  });

  document.addEventListener('click', (ev)=>{
    if (dropdown.classList.contains('show')) {
      const inside = ev.target.closest('#searchDropdown') || ev.target.closest('#searchBtn');
      if (!inside) {
        dropdown.classList.remove('show');
        dropdown.setAttribute('aria-hidden','true');
      }
    }
  });
}

/* --- Cart interactions --- */
function initCartActions(){
  const cartItems = document.getElementById('cartItems');
  if (!cartItems) return;
  cartItems.addEventListener('click', (e)=>{
    const btn = e.target.closest('button[data-action]');
    if (!btn) return;
    const id = btn.getAttribute('data-id');
    if (!id) return;
    if (btn.dataset.action === 'inc') {
      state.cart[id] = (state.cart[id] || 0) + 1;
    } else if (btn.dataset.action === 'dec') {
      state.cart[id] = Math.max(1, (state.cart[id] || 1) - 1);
    } else if (btn.dataset.action === 'remove') {
      delete state.cart[id];
    }
    updateCartUI();
  });

  // inline remove fallback
  cartItems.addEventListener('click', (e)=>{
    const rem = e.target.closest('.remove-inline');
    if (rem && rem.dataset.id) {
      delete state.cart[rem.dataset.id];
      updateCartUI();
    }
  });
}

/* parse ?cat=... */
function getCategoryFromURL() {
  const params = new URLSearchParams(window.location.search);
  const cat = params.get('cat');
  return cat ? cat.toLowerCase() : null;
}

/* --- DOM Ready --- */
document.addEventListener('DOMContentLoaded', ()=>{
  initHero();
  initHeader();
  initProductActions();
  initSearchDropdown();
  initCartActions();

  const cat = getCategoryFromURL();
  if (cat) {
    // category page: show ALL products in that category (sorted via sort select)
    const heading = document.getElementById('categoryHeading') || document.querySelector('.collection-header h2');
    if (heading) {
      const label = cat.charAt(0).toUpperCase() + cat.slice(1);
      heading.textContent = `${label}`;
    }
    initCategorySortAndRender(cat);
  } else {
    // homepage: apply the special homepage rules (all -> 2 per category from global sort; category -> first 8)
    initFiltersAndRenderIndex();
  }

  updateCartUI();

  window.addEventListener('keydown', (e)=>{
    if(e.key === 'Escape') {
      closeModal();
      closeCart();
      const mobileMenu = document.getElementById('mobileMenu');
      if(mobileMenu) { mobileMenu.style.display = 'none'; mobileMenu.setAttribute('aria-hidden','true'); }
      document.getElementById('searchDropdown')?.classList.remove('show');
    }
  });
});
