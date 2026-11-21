# Portfólio — Joaquim Bernardo

Portfólio pessoal desenvolvido com HTML5, CSS3, JavaScript e Bootstrap 5.

## Estrutura

```text
portfolio_canes/
├── index.html
├── README.md
└── assets/
    ├── css/
    │   └── style.css
    ├── js/
    │   └── script.js
    └── img/
        └── profile.jpg
```

## Executar localmente

1. Extraia o projeto.
2. Abra a pasta no VS Code.
3. Execute `index.html` com Live Server ou abra o arquivo diretamente no navegador.
4. É necessária conexão com a internet para carregar Bootstrap, Bootstrap Icons, fontes e o serviço EmailJS.

## Formulário de contato

O formulário utiliza EmailJS para encaminhar as mensagens ao endereço configurado no serviço.

As credenciais públicas do EmailJS estão em `assets/js/script.js`, no objeto `CONFIG.emailjs`. Para alterar a integração, atualize `publicKey`, `serviceId` e `templateId`.

O template do EmailJS deve receber as variáveis `from_name`, `reply_to`, `subject` e `message`. Configure o endereço de destino no painel do EmailJS e defina `Reply-To` como `{{reply_to}}`.

## Repositórios

Os endereços dos repositórios dos projetos são configurados no objeto `CONFIG.repositories`, em `assets/js/script.js`.

## Tecnologias do portfólio

HTML5 · CSS3 · JavaScript · Bootstrap 5 · EmailJS
