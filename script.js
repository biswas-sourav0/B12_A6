 
      const API_ROOT = "https://openapi.programming-hero.com/api";

      let state = { categories: [], active: null, plants: [], cart: [] };

      const categoriesEl = document.getElementById("categories");
      const gridEl = document.getElementById("grid");
      const spinner = document.getElementById("spinner");
      const cartList = document.getElementById("cartList");
      const totalEl = document.getElementById("total");
      const modal = document.getElementById("modal");
      const modalBox = document.getElementById("modalBox");

      document.getElementById("year").textContent = new Date().getFullYear();

      function setLoading(on) {
        spinner.classList.toggle("show", !!on);
      }

      
      function fp(n) {
        return Number(n || 0).toFixed(2);
      }

    
      async function loadCategories() {
        try {
          setLoading(true);
          const res = await fetch(`${API_ROOT}/categories`);
          const json = await res.json();
          const items = json?.data || json?.categories || [];
          
          state.categories = Array.isArray(items) ? items.slice(0, 10) : [];
          renderCategories();
        } catch (err) {
          categoriesEl.innerHTML =
            '<div style="color:#b91c1c">Failed to load</div>';
          console.error(err);
        } finally {
          setLoading(false);
        }
      }

      function renderCategories() {
        categoriesEl.innerHTML = "";
       
        const all = document.createElement("button");
        all.className = "cat-btn" + (state.active === null ? " active" : "");
        all.textContent = "All Trees";
        all.onclick = () => {
          state.active = null;
          setActive(null);
          loadAllPlants();
        };
        categoriesEl.appendChild(all);

        state.categories.forEach((c) => {
          const btn = document.createElement("button");
          btn.className = "cat-btn" + (state.active == c.id ? " active" : "");
          btn.textContent =
            c.name || c.category_name || c.category || "Category";
          btn.onclick = () => {
            state.active = c.id;
            setActive(c.id);
            loadPlantsByCategory(c.id);
          };
          categoriesEl.appendChild(btn);
        });
      }

      function setActive(id) {
        const btns = categoriesEl.querySelectorAll(".cat-btn");
        btns.forEach((b) => b.classList.remove("active"));
        if (id === null) {
          btns[0]?.classList.add("active");
          return;
        }
        btns.forEach((b) => {
          if (
            b.textContent &&
            b.textContent.toLowerCase().includes(String(id).toLowerCase())
          ) {
          }
        });
        
        const idx = Array.from(categoriesEl.children).findIndex(
          (n) =>
            n.textContent &&
            n.textContent.toLowerCase().includes(String(id).toLowerCase())
        );
        if (idx >= 0) categoriesEl.children[idx].classList.add("active");
      }

     
      async function loadAllPlants() {
        try {
          setLoading(true);
          const res = await fetch(`${API_ROOT}/plants`);
          const json = await res.json();
          const items = json?.data || json?.plants || [];
          state.plants = Array.isArray(items) ? items : [];
          renderPlants();
        } catch (err) {
          gridEl.innerHTML =
            '<div style="color:#b91c1c">Failed to load plants</div>';
          console.error(err);
        } finally {
          setLoading(false);
        }
      }

      // Load by category
      async function loadPlantsByCategory(id) {
        try {
          setLoading(true);
          const res = await fetch(`${API_ROOT}/category/${id}`);
          const json = await res.json();
          const items = json?.data || json?.plants || [];
          state.plants = Array.isArray(items) ? items : [];
          renderPlants();
        } catch (err) {
          gridEl.innerHTML = '<div style="color:#b91c1c">Failed to load</div>';
          console.error(err);
        } finally {
          setLoading(false);
        }
      }

      
      function renderPlants() {
        gridEl.innerHTML = "";
        if (!state.plants.length) {
          gridEl.innerHTML = '<div style="color:#567a60">No trees found.</div>';
          return;
        }
        state.plants.forEach((p) => {
          const card = document.createElement("article");
          card.className = "card";
          const img = document.createElement("img");
          img.src =
            p.image ||
            p.thumbnail ||
            "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=800&q=60";
          card.appendChild(img);
          const h4 = document.createElement("h4");
          h4.textContent = p.name || p.plant_name || "Unknown Plant";
          h4.onclick = async () => {
            const d = await fetchPlantDetail(p.id || p._id || p.plant_id);
            openModal(d || p);
          };
          card.appendChild(h4);
          const desc = document.createElement("p");
          desc.textContent = (
            p.description ||
            p.short_description ||
            "No description"
          ).slice(0, 120);
          card.appendChild(desc);
          const meta = document.createElement("div");
          meta.className = "meta";
          const tag = document.createElement("div");
          tag.className = "tag";
          tag.textContent = p.category || p.category_name || "General";
          const price = document.createElement("div");
          price.className = "price";
          price.textContent =
            "৳ " + fp(p.price || p.cost || Math.random() * 500 + 200);
          meta.appendChild(tag);
          meta.appendChild(price);
          card.appendChild(meta);
          const btn = document.createElement("button");
          btn.className = "add";
          btn.textContent = "Add to Cart";
          btn.onclick = () =>
            addToCart({
              id: p.id || p._id || p.plant_id || Date.now(),
              name: p.name || p.plant_name || "Plant",
              price: fp(p.price || p.cost || Math.random() * 500 + 200),
            });
          card.appendChild(btn);
          gridEl.appendChild(card);
        });
      }

     
      async function fetchPlantDetail(id) {
        if (!id) return null;
        try {
          setLoading(true);
          const res = await fetch(`${API_ROOT}/plant/${id}`);
          const json = await res.json();
          return json?.data || json?.plant || null;
        } catch (e) {
          console.error(e);
          return null;
        } finally {
          setLoading(false);
        }
      }

      // Modal
      function openModal(detail) {
        modalBox.innerHTML = "";
        if (!detail) {
          modalBox.innerHTML = "<p>Detail not found</p>";
          modal.classList.add("show");
          return;
        }
        modalBox.innerHTML = `
    <div style="display:flex;gap:12px;flex-wrap:wrap">
      <img src="${
        detail.image ||
        detail.thumbnail ||
        "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=800&q=60"
      }" style="width:220px;height:160px;object-fit:cover;border-radius:8px"/>
      <div style="flex:1">
        <h3>${detail.name || detail.plant_name || "Unknown"}</h3>
        <p>${(
          detail.description ||
          detail.detail ||
          detail.short_description ||
          "No extra details."
        ).slice(0, 800)}</p>
        <p><strong>Category:</strong> ${
          detail.category || detail.category_name || "General"
        }</p>
        <p><strong>Price:</strong> ৳ ${fp(
          detail.price || detail.cost || Math.random() * 500 + 200
        )}</p>
        <div style="margin-top:8px"><button class="plant-btn" onclick='addToCart({id:${JSON.stringify(
          detail.id || detail._id || detail.plant_id || Date.now()
        )}, name:${JSON.stringify(
          detail.name || detail.plant_name || "Plant"
        )}, price:${fp(
          detail.price || detail.cost || Math.random() * 500 + 200
        )}})'>Add to Cart</button></div>
      </div>
    </div>
  `;
        modal.classList.add("show");
      }
      function closeModal() {
        modal.classList.remove("show");
      }
      window.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeModal();
      });

      // Cart functions
      function addToCart(item) {
        const found = state.cart.find((c) => c.id == item.id);
        if (found) found.qty = (found.qty || 1) + 1;
        else state.cart.push({ ...item, qty: 1 });
        renderCart();
      }
      function removeFromCart(id) {
        state.cart = state.cart.filter((c) => c.id != id);
        renderCart();
      }
      function renderCart() {
        cartList.innerHTML = "";
        if (!state.cart.length) {
          cartList.innerHTML = '<div style="color:#7f9a88">Cart is empty</div>';
          totalEl.textContent = "0.00";
          return;
        }
        state.cart.forEach((it) => {
          const div = document.createElement("div");
          div.className = "cart-item";
          div.innerHTML = `<div><strong>${
            it.name
          }</strong><div style="font-size:13px;color:#406b4f">৳ ${fp(
            it.price
          )} × ${it.qty}</div></div>`;
          const rm = document.createElement("button");
          rm.className = "remove";
          rm.innerHTML = "✖";
          rm.onclick = () => removeFromCart(it.id);
          div.appendChild(rm);
          cartList.appendChild(div);
        });
        const total = state.cart.reduce(
          (s, i) => s + Number(i.price) * (i.qty || 1),
          0
        );
        totalEl.textContent = fp(total);
      }

    
      function submitPlant() {
        const n = document.getElementById("name").value;
        const e = document.getElementById("email").value;
        const c = document.getElementById("count").value;
        alert(
          `Thanks ${n}! Request to plant ${c} tree(s) received. We'll contact you at ${e}.`
        );
        document.getElementById("plantForm").reset();
      }

     
      loadCategories().then(() => loadAllPlants());