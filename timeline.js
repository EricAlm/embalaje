const years = [
  {
    year: "2022",
    projects: [
      {
        category: "Hardware educativo",
        title: "Archi",
        text: "La placa educativa que lleva programación y electrónica a las aulas. Combina hardware, proyectos STEM y una plataforma para aprender haciendo.",
        details: [
          "Placa programable con sensores integrados.",
          "Programación por bloques y proyectos guiados.",
          "Diseño y fabricación nacional."
        ],
        tags: "Hardware · Firmware · Educación",
        images: [
          {
            src: "assets/timeline/tl-archi.jpg",
            alt: "Placa Archi Kids de color verde sobre una base negra y una superficie dorada.",
            label: "Archi"
          }
        ],
        link: "https://archikids.com.ar/",
        linkLabel: "archikids.com.ar ↗",
        note: ""
      }
    ]
  },
  {
    year: "2023",
    projects: [
      {
        category: "Archifarm",
        title: "Indoor",
        text: "Sistema de cultivo indoor con control de luz, temperatura, humedad y riego. Registro de datos para seguir las condiciones del cultivo.",
        details: [
          "Control de luz, temperatura y humedad.",
          "Riego automatizado y datos en la nube.",
          "Placa Archi Farm y sensores."
        ],
        tags: "Sensores · Control",
        images: [
          {
            src: "assets/timeline/tl-indoor.jpg",
            alt: "Gabinete de cultivo indoor con dos cámaras iluminadas y plantas.",
            label: "Indoor"
          }
        ],
        link: "https://github.com/NewsanLab/ArchiFarm",
        linkLabel: "Repositorio ArchiFarm ↗",
        note: ""
      }
    ]
  },
  {
    year: "2024",
    projects: [
      {
        category: "Adiestramiento K9",
        title: "K9 Trainner",
        text: "Lanzador de pelotas para el adiestramiento de caninos del Servicio Penitenciario. Archi controla el mecanismo y una app móvil registra los tiempos.",
        details: [
          "Lanzador con motor de 12 V y mecanismo de resorte.",
          "Control por app móvil vía Bluetooth.",
          "Registro de tiempos y base de datos."
        ],
        tags: "Mecánica · BLE · App",
        images: [
          {
            src: "assets/timeline/tl-k9.jpg",
            alt: "Vista de corte del lanzador K9 Trainner con mecanismo de resorte y motor.",
            label: "K9 Trainner"
          }
        ],
        link: "https://github.com/NewsanLab/K9-Trainner",
        linkLabel: "Repositorio K9 Trainner ↗",
        note: ""
      },
      {
        category: "Simulación naval",
        title: "Simulador de Navegación",
        text: "Sistema de navegación para el adiestramiento de la Armada Argentina. Escenarios virtuales, instrumentos y plataforma abierta.",
        details: [
          "Escenarios costeros y maniobras virtuales.",
          "Instrumentos y controles integrados.",
          "Plataforma abierta para nuevas funciones."
        ],
        tags: "Software · 3D · Instrumentos",
        images: [
          {
            src: "assets/timeline/tl-simulador.jpg",
            alt: "Puente de mando del simulador de navegación con tres pantallas y rueda de timón.",
            label: "Simulador de Navegación"
          }
        ],
        link: "",
        linkLabel: "",
        note: ""
      }
    ]
  },
  {
    year: "2025",
    projects: [
      {
        category: "Simulación naval · v2",
        title: "Simulador de Navegación",
        text: "Segunda versión instalada en Puerto Belgrano. Mejoras de realismo, estabilidad y nuevos escenarios, con instrumentos y controles integrados.",
        details: [
          "Nuevos escenarios y mayor realismo.",
          "Mejoras de estabilidad y control.",
          "Integración de instrumentos."
        ],
        tags: "Simulación · Integración",
        images: [
          {
            src: "assets/timeline/tl-simulador.jpg",
            alt: "Puente de mando del simulador de navegación con tres pantallas y rueda de timón.",
            label: "Simulador · Puerto Belgrano"
          }
        ],
        link: "",
        linkLabel: "",
        note: ""
      },
      {
        category: "Oceanografía",
        title: "Boya Oceanográfica",
        text: "Puesta en marcha de una boya para el cultivo de mejillones con el CONICET. Sensores de temperatura, salinidad y oxígeno, con monitoreo remoto.",
        details: [
          "Temperatura, salinidad y oxígeno.",
          "Telemetría y monitoreo remoto.",
          "Cultivo de mejillones con CONICET."
        ],
        tags: "Sensores · Telemetría",
        images: [
          {
            src: "assets/timeline/tl-boya.svg",
            alt: "Ilustración técnica de una boya oceanográfica con panel solar, sensores y línea de cultivo de mejillones.",
            label: "Boya Oceanográfica"
          }
        ],
        link: "",
        linkLabel: "",
        note: ""
      },
      {
        category: "Test automotriz",
        title: "JIGs Automotriz",
        text: "Dos celdas de testing para la línea automotriz: antena RF y placa de carga inalámbrica de 15 W en versión unitaria.",
        details: [
          "Jig de antena RF: switch RF y analizador de redes.",
          "Validación FM/AM y trazabilidad por QR.",
          "Jig de carga 15 W, versión unitaria."
        ],
        tags: "RF · Test · Trazabilidad",
        images: [
          {
            src: "assets/timeline/jig.jpeg",
            alt: "Detalle del cabezal neumático del jig de antena RF.",
            label: "JIG · antena RF"
          },
          {
            src: "assets/timeline/jig-3.jpeg",
            alt: "Jig de testing con pantalla de estado y actuador neumático.",
            label: "JIG · carga 15 W"
          }
        ],
        link: "https://github.com/NewsanLab/Jig-Felko",
        linkLabel: "Repositorio Jig-Felko ↗",
        note: ""
      }
    ]
  },
  {
    year: "2026",
    projects: [
      {
        category: "Automotriz · matricial",
        title: "JIGs Automotriz x5",
        text: "Evolución matricial del jig de carga de 15 W: cinco estaciones en paralelo, secuencia automática y registro centralizado de resultados.",
        details: [
          "Cinco estaciones en paralelo.",
          "Secuencia automática y registro centralizado.",
          "Evolución del jig de carga 15 W."
        ],
        tags: "Matricial · Producción",
        images: [
          {
            src: "assets/timeline/tl-jig-2.jpg",
            alt: "Jig matricial con pantalla azul y luces de estación.",
            label: "JIGs x5"
          }
        ],
        link: "",
        linkLabel: "",
        note: ""
      }
    ]
  }
];

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

const scrollSpace = $("#tl-scroll-space");
const timeline = $(".tl-timeline");
const track = $("#tl-track");
const progressFill = $("#tl-progress");
const counter = $("#tl-counter");
const hintText = $("#tl-hint-text");
const nodes = $$(".tl-node");
const milestones = $$(".tl-milestone");
const card = $("#tl-card");
const veil = $("#tl-veil");
const cardClose = $("#tl-close");
const cardInfo = $("#tl-card-info");
const cardYear = $("#tl-card-title");
const cardCount = $("#tl-year-count");
const yearProjects = $("#tl-year-projects");
const imageGrid = $("#tl-image-grid");
const backgroundLayers = [
  $(".tl-skip"),
  $(".tl-header"),
  $(".tl-timeline"),
  $(".tl-hint"),
  $(".tl-footer")
];

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
const pad = value => String(value).padStart(2, "0");

let maxShift = 0;
let currentIndex = -1;
let activeIndex = -1;
let isOpen = false;
let lastNode = null;
let frame = 0;

function renderYear(index) {
  const data = years[index];
  const count = data.projects.length;

  cardYear.textContent = data.year;
  cardCount.textContent = `${count} ${count === 1 ? "hito" : "hitos"}`;

  yearProjects.innerHTML = data.projects.map(project => `
    <article class="tl-year-project">
      <span class="tl-year-project-category">${project.category}</span>
      <h3>${project.title}</h3>
      <p>${project.text}</p>
      <details>
        <summary>Detalle</summary>
        <ul class="tl-details">
          ${project.details.map(item => `<li>${item}</li>`).join("")}
        </ul>
      </details>
      <div class="tl-project-foot">
        <span class="tl-tags">${project.tags}</span>
        ${project.link
          ? `<a class="tl-link" href="${project.link}" target="_blank" rel="noopener">${project.linkLabel}</a>`
          : project.note
            ? `<span class="tl-note">${project.note}</span>`
            : ""}
      </div>
    </article>
  `).join("");

  const images = data.projects.flatMap(project => project.images);
  imageGrid.className = `tl-image-grid is-${images.length}`;
  imageGrid.innerHTML = images.map(image => `
    <figure class="tl-image-cell">
      <img src="${image.src}" alt="${image.alt}" loading="lazy" decoding="async"/>
      <figcaption>${image.label}</figcaption>
    </figure>
  `).join("");

  cardInfo.scrollTop = 0;
}

function openCard(index, { focus = true } = {}) {
  if (isOpen && activeIndex === index) return;

  renderYear(index);

  activeIndex = index;
  lastNode = nodes[index];
  isOpen = true;

  card.classList.add("is-open");
  veil.classList.add("is-open");
  card.setAttribute("aria-hidden", "false");
  document.body.classList.add("tl-locked");

  backgroundLayers.forEach(layer => {
    if (layer) layer.inert = true;
  });

  milestones.forEach((milestone, position) => {
    milestone.classList.toggle("is-active", position === index);
  });

  nodes.forEach((node, position) => {
    node.setAttribute("aria-expanded", String(position === index));
  });

  if (focus) {
    window.setTimeout(() => {
      if (isOpen && activeIndex === index && !card.contains(document.activeElement)) {
        card.focus({ preventScroll: true });
        if (document.activeElement !== card) {
          cardClose.focus({ preventScroll: true });
        }
      }
    }, 120);
  }
}

function closeCard() {
  if (!isOpen) return;

  isOpen = false;
  activeIndex = -1;
  card.classList.remove("is-open");
  veil.classList.remove("is-open");
  card.setAttribute("aria-hidden", "true");
  document.body.classList.remove("tl-locked");

  backgroundLayers.forEach(layer => {
    if (layer) layer.inert = false;
  });

  milestones.forEach(milestone => milestone.classList.remove("is-active"));
  nodes.forEach(node => node.setAttribute("aria-expanded", "false"));

  if (lastNode) lastNode.focus({ preventScroll: true });
  lastNode = null;
}

function measure() {
  maxShift = Math.max(0, track.scrollWidth - timeline.clientWidth);
}

function update() {
  const total = Math.max(1, scrollSpace.offsetHeight - window.innerHeight);
  const progress = clamp(window.scrollY / total, 0, 1);

  track.style.transform = `translate3d(${(-progress * maxShift).toFixed(2)}px, 0, 0)`;
  progressFill.style.width = `${(progress * 100).toFixed(2)}%`;
  hintText.textContent = progress > .985 ? "Fin de la trayectoria" : "Scroll para recorrer";

  const index = Math.min(years.length - 1, Math.floor(progress * years.length));

  if (index !== currentIndex) {
    currentIndex = index;
    counter.textContent = `${pad(index + 1)} / ${pad(years.length)}`;

    milestones.forEach((milestone, position) => {
      milestone.classList.toggle("is-current", position === index);
    });
  }
}

function requestUpdate() {
  if (frame) return;
  frame = requestAnimationFrame(() => {
    frame = 0;
    update();
  });
}

nodes.forEach((node, index) => {
  node.setAttribute("aria-expanded", "false");
  node.addEventListener("click", () => openCard(index));
});

cardClose.addEventListener("click", closeCard);

document.addEventListener("keydown", event => {
  if (!isOpen || event.key !== "Tab") return;

  const focusable = $$(
    'button, [href], input, select, textarea, summary, [tabindex]:not([tabindex="-1"])',
    card
  ).filter(
    element =>
      !element.disabled &&
      element.tabIndex >= 0 &&
      element.offsetParent !== null
  );

  if (!focusable.length) return;

  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  if (document.activeElement === card) {
    event.preventDefault();
    (event.shiftKey ? last : first).focus();
    return;
  }

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
});

window.addEventListener("scroll", requestUpdate, { passive: true });
window.addEventListener("resize", () => {
  measure();
  requestUpdate();
});
window.addEventListener("load", () => {
  measure();
  requestUpdate();
});

if ("ResizeObserver" in window) {
  new ResizeObserver(() => {
    measure();
    requestUpdate();
  }).observe(timeline);
}

[...new Set(years.flatMap(year => year.projects.flatMap(project => project.images.map(image => image.src))))].forEach(source => {
  const image = new Image();
  image.src = source;
});

measure();
requestUpdate();
