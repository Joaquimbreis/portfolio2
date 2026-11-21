const CONFIG = {
  repositories: {
    maratona: "https://github.com/Joaquimbreis/maratona-tech",
    fellas: "https://github.com/Joaquimbreis/fellas-tech"
  },
  emailjs: {
    publicKey: "h99dVlL3-NXjDKUHp",
    serviceId: "service_m1bhjof",
    templateId: "template_w72v66g"
  }
};

document.querySelectorAll("[data-repo]").forEach(link => {
  const url = CONFIG.repositories[link.dataset.repo];
  if (url) {
    link.href = url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  } else {
    link.addEventListener("click", event => {
      event.preventDefault();
    });
  }
});

const yearElement = document.getElementById("year");
if (yearElement) yearElement.textContent = new Date().getFullYear();

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(element => observer.observe(element));

let emailJsPromise;

function loadEmailJs() {
  if (window.emailjs) {
    return Promise.resolve();
  }

  if (!emailJsPromise) {
    emailJsPromise = new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js";
      script.onload = () => {
        window.emailjs.init({ publicKey: CONFIG.emailjs.publicKey });
        resolve();
      };
      script.onerror = () => reject(new Error("Não foi possível carregar o serviço de e-mail."));
      document.head.appendChild(script);
    });
  }

  return emailJsPromise;
}

const contactForm = document.getElementById("contactForm");
const formFeedback = document.getElementById("formFeedback");

contactForm.addEventListener("submit", async event => {
  event.preventDefault();

  if (!CONFIG.emailjs.publicKey || !CONFIG.emailjs.serviceId || !CONFIG.emailjs.templateId) {
    formFeedback.textContent = "O formulário está temporariamente indisponível. Entre em contato pelo e-mail informado na página.";
    formFeedback.style.color = "#ffbd78";
    return;
  }

  const submitButton = contactForm.querySelector('button[type="submit"]');
  const formData = new FormData(contactForm);
  const message = {
    from_name: String(formData.get("name") || "").trim(),
    reply_to: String(formData.get("email") || "").trim(),
    subject: String(formData.get("subject") || "").trim(),
    message: String(formData.get("message") || "").trim()
  };

  if (!message.from_name || !message.reply_to || !message.subject || !message.message) return;

  submitButton.disabled = true;
  submitButton.innerHTML = 'Enviando <i class="bi bi-arrow-repeat"></i>';
  formFeedback.textContent = "Enviando sua mensagem...";
  formFeedback.style.color = "var(--muted)";

  try {
    await loadEmailJs();
    await window.emailjs.send(CONFIG.emailjs.serviceId, CONFIG.emailjs.templateId, message);
    formFeedback.textContent = "Mensagem enviada com sucesso. Obrigado pelo contato!";
    formFeedback.style.color = "var(--cyan)";
    contactForm.reset();
  } catch (error) {
    console.error("Erro ao enviar formulário:", error);
    formFeedback.textContent = "Não foi possível enviar sua mensagem agora. Tente novamente ou utilize o e-mail informado na página.";
    formFeedback.style.color = "#ffbd78";
  } finally {
    submitButton.disabled = false;
    submitButton.innerHTML = 'Enviar mensagem <i class="bi bi-arrow-up-right"></i>';
  }
});
