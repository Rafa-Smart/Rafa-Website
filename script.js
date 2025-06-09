const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".isi-nav");
console.log("JJJJ")

// Hamburger menu functionality
hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  hamburger.classList.toggle("active");
});

document.querySelectorAll(".isi-nav a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    hamburger.classList.remove("active");
  });
});

// Contact form handling
const form = document.querySelector(".contact-form form");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    console.log(data);
    alert("Thank you for your message! I will get back to you soon.");
    form.reset();
  });
}

// Main content loader
document.addEventListener("DOMContentLoaded", async function () {
  try {
    const data = await ambilData();
    tampilData(data);
    initModal(); // Initialize modal after data is loaded
    console.log("ini berhasil")
  } catch (err) {
    console.error("Error:", err);
    // You might want to show an error message to users
    document.querySelector(".projects-grid").innerHTML = 
      "<p>Failed to load projects. Please try again later.</p>";
  }
});

function initModal() {
  const modal = document.getElementById("projectModal");
  if (!modal) return;

  // Handle click on view project buttons
  document.addEventListener("click", function (e) {
    if (e.target.closest(".view-project")) {
      e.preventDefault();
      const button = e.target.closest(".view-project");
      
      // Get the project data from data attributes
      const title = button.getAttribute("data-title");
      const codeImage = button.getAttribute("data-code-image");
      const processImage = button.getAttribute("data-process-image");
      const description = button.getAttribute("data-description");
      const githubLink = button.getAttribute("data-github");

      // Populate the modal
      if (document.getElementById("modalProjectTitle")) {
        document.getElementById("modalProjectTitle").textContent = title;
        document.getElementById("modalCodeImage").src = codeImage;
        document.getElementById("modalCodeImage").alt = `${title} Code`;
        document.getElementById("modalProcessImage").src = processImage;
        document.getElementById("modalProcessImage").alt = `${title} Process`;
        document.getElementById("modalFullDescription").textContent = description;
        document.getElementById("modalGithubLink").href = githubLink;
        
        modal.style.display = "block";
        document.body.style.overflow = "hidden";
      }
    }

    // Close modal
    if (e.target.classList.contains("close-modal")) {
      modal.style.display = "none";
      document.body.style.overflow = "auto";
    }
  });

  // Close modal when clicking outside
  modal.addEventListener("click", function (e) {
    if (e.target === modal) {
      modal.style.display = "none";
      document.body.style.overflow = "auto";
    }
  });

  // Close with ESC key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modal.style.display === "block") {
      modal.style.display = "none";
      document.body.style.overflow = "auto";
    }
  });
}

async function ambilData() {
  const response = await fetch("data_projek_1.json");
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  return await response.json();
}

function tampilData(data) {
  console.log("berhasil nihhh  ")
  const container = document.querySelector(".projects-grid");
  if (!container) return;
  
  container.innerHTML = data.map(e => templateString(e)).join("");
}

function templateString(e) {
  return `
    <div class="project-card animasi">
      <div class="project-image">
        <img src="${e.gambar}" alt="${e.judul}" />
      </div>
      <div class="project-info">
        <h3>${e.judul}</h3>
        <p>${e.ringkasan}</p>
        <div class="project-tech">
          ${e.teknologi.map(j => `<span>${j.nama}</span>`).join("")}
        </div>
        <div class="grup-link">
          <a href="${e.link}" class="project-link" target="_blank">
            Go On Github <i class="fas fa-arrow-right"></i>
          </a>
          <a href="#" class="project-link view-project" 
             data-title="${e.judul}"
             data-code-image="${e.gambar_kode || e.gambar}"
             data-process-image="${e.gambar_proses || e.gambar}"
             data-description="${e.deskripsi_lengkap || e.ringkasan}"
             data-github="${e.link}">
            View Project <i class="fas fa-arrow-right"></i>
          </a>
        </div>
      </div>
    </div>
  `;
}