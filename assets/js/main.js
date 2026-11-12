const translations = {
  pt: {
    "meta.title": "Camila Rodrigues | Desenvolvedora Web",
    "nav.about": "Sobre",
    "nav.experience": "Experiência",
    "nav.education": "Formação",
    "nav.skills": "Habilidades",
    "nav.projects": "Projetos",
    "nav.contact": "Contato",
    "hero.badge": "Disponível para novas oportunidades",
    "hero.greeting": "Olá, eu sou a",
    "hero.role": "Desenvolvedora Web",
    "hero.description": "Formada em Análise e Desenvolvimento de Sistemas, crio interfaces modernas, acessíveis e responsivas com HTML, CSS, JavaScript e TypeScript.",
    "hero.ctaProjects": "Ver projetos",
    "hero.ctaContact": "Entrar em contato",
    "about.title": "Sobre mim",
    "about.p1": "Sou desenvolvedora web formada em Análise e Desenvolvimento de Sistemas, com experiência em desenvolvimento no Tribunal de Contas da União e em suporte de TI no Serpro.",
    "about.p2": "Gosto de transformar ideias em produtos digitais bem feitos, com código organizado e atenção aos detalhes. Estou sempre estudando para evoluir como profissional.",
    "about.h1": "anos de estágio em desenvolvimento",
    "about.h2": "graduação concluída",
    "about.h3": "site disponível em dois idiomas",
    "experience.title": "Experiência",
    "experience.tcu.role": "Estagiária de Desenvolvimento",
    "experience.tcu.period": "1 ano e 6 meses",
    "experience.tcu.description": "Atuação no desenvolvimento e na manutenção de sistemas web, colaborando com a equipe em novas funcionalidades e melhorias.",
    "experience.serpro.role": "Assistência de TI",
    "experience.serpro.description": "Suporte técnico a usuários, diagnóstico e resolução de problemas de hardware, software e rede.",
    "education.title": "Formação",
    "education.degree.title": "Tecnólogo em Análise e Desenvolvimento de Sistemas",
    "education.degree.status": "Graduação concluída",
    "education.courses.title": "Cursos na Alura",
    "education.courses.description": "Formações e cursos em desenvolvimento web, front-end e boas práticas de programação.",
    "skills.title": "Habilidades",
    "projects.title": "Projetos",
    "projects.soon": "Em breve",
    "projects.placeholderTitle": "Novos projetos chegando",
    "projects.placeholderDescription": "Esta seção vai reunir os projetos que desenvolvi, com tecnologias utilizadas e links para o código e para a versão online.",
    "contact.title": "Vamos conversar?",
    "contact.text": "Estou aberta a oportunidades, projetos e trocas de conhecimento. Fique à vontade para entrar em contato.",
    "footer.rights": "Todos os direitos reservados."
  },
  en: {
    "meta.title": "Camila Rodrigues | Web Developer",
    "nav.about": "About",
    "nav.experience": "Experience",
    "nav.education": "Education",
    "nav.skills": "Skills",
    "nav.projects": "Projects",
    "nav.contact": "Contact",
    "hero.badge": "Open to new opportunities",
    "hero.greeting": "Hi, I'm",
    "hero.role": "Web Developer",
    "hero.description": "Graduated in Systems Analysis and Development, I build modern, accessible and responsive interfaces with HTML, CSS, JavaScript and TypeScript.",
    "hero.ctaProjects": "View projects",
    "hero.ctaContact": "Get in touch",
    "about.title": "About me",
    "about.p1": "I'm a web developer with a degree in Systems Analysis and Development, with development experience at the Brazilian Federal Court of Accounts (TCU) and IT support experience at Serpro.",
    "about.p2": "I enjoy turning ideas into well-crafted digital products, with clean code and attention to detail. I'm always learning to keep growing as a professional.",
    "about.h1": "years as a development intern",
    "about.h2": "degree completed",
    "about.h3": "website available in two languages",
    "experience.title": "Experience",
    "experience.tcu.role": "Software Development Intern",
    "experience.tcu.period": "1 year and 6 months",
    "experience.tcu.description": "Worked on the development and maintenance of web systems, collaborating with the team on new features and improvements.",
    "experience.serpro.role": "IT Support Assistant",
    "experience.serpro.description": "Technical support for users, diagnosing and solving hardware, software and network issues.",
    "education.title": "Education",
    "education.degree.title": "Associate Degree in Systems Analysis and Development",
    "education.degree.status": "Degree completed",
    "education.courses.title": "Alura Courses",
    "education.courses.description": "Learning paths and courses in web development, front-end and programming best practices.",
    "skills.title": "Skills",
    "projects.title": "Projects",
    "projects.soon": "Coming soon",
    "projects.placeholderTitle": "New projects on the way",
    "projects.placeholderDescription": "This section will showcase the projects I've built, with the technologies used and links to the source code and live versions.",
    "contact.title": "Let's talk?",
    "contact.text": "I'm open to opportunities, projects and knowledge sharing. Feel free to reach out.",
    "footer.rights": "All rights reserved."
  }
};

const LANGUAGE_STORAGE_KEY = "preferred-language";

const htmlLangByLanguage = {
  pt: "pt-BR",
  en: "en"
};

function readStoredLanguage() {
  try {
    return localStorage.getItem(LANGUAGE_STORAGE_KEY);
  } catch {
    return null;
  }
}

function storeLanguage(language) {
  try {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  } catch {
    return;
  }
}

function detectInitialLanguage() {
  const stored = readStoredLanguage();
  if (stored && translations[stored]) {
    return stored;
  }
  return navigator.language?.toLowerCase().startsWith("pt") ? "pt" : "en";
}

function applyLanguage(language) {
  const dictionary = translations[language];

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const text = dictionary[element.dataset.i18n];
    if (text) {
      element.textContent = text;
    }
  });

  document.documentElement.lang = htmlLangByLanguage[language];
  document.title = dictionary["meta.title"];
  document.getElementById("lang-toggle").setAttribute(
    "aria-label",
    language === "pt" ? "Switch to English" : "Mudar para português"
  );

  storeLanguage(language);
}

function setupLanguageToggle() {
  let currentLanguage = detectInitialLanguage();
  applyLanguage(currentLanguage);

  document.getElementById("lang-toggle").addEventListener("click", () => {
    currentLanguage = currentLanguage === "pt" ? "en" : "pt";
    applyLanguage(currentLanguage);
  });
}

function setupMobileMenu() {
  const toggle = document.getElementById("menu-toggle");
  const links = document.getElementById("nav-links");

  const setOpen = (isOpen) => {
    links.classList.toggle("open", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
  };

  toggle.addEventListener("click", () => {
    setOpen(!links.classList.contains("open"));
  });

  links.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setOpen(false));
  });
}

function setupHeaderOnScroll() {
  const header = document.getElementById("header");
  const update = () => header.classList.toggle("header--scrolled", window.scrollY > 20);
  update();
  window.addEventListener("scroll", update, { passive: true });
}

function setupRevealAnimations() {
  const elements = document.querySelectorAll(".reveal");

  if (!("IntersectionObserver" in window)) {
    elements.forEach((element) => element.classList.add("visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  elements.forEach((element) => observer.observe(element));
}

function setupActiveNavLink() {
  const links = document.querySelectorAll(".nav__links a");
  const sections = document.querySelectorAll("main section[id]");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          links.forEach((link) => {
            link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
          });
        }
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );

  sections.forEach((section) => observer.observe(section));
}

function setCurrentYear() {
  document.getElementById("year").textContent = new Date().getFullYear();
}

setupLanguageToggle();
setupMobileMenu();
setupHeaderOnScroll();
setupRevealAnimations();
setupActiveNavLink();
setCurrentYear();
