# Foco & Agenda 🎯

Um timer Pomodoro pessoal com integração ao Google Agenda para máxima produtividade, construído com Next.js, TypeScript e Tailwind CSS.

## 📖 Sobre o Projeto

Este é um projeto de um aplicativo de produtividade que combina a **Técnica Pomodoro** com a praticidade da sua **agenda do Google**. A ideia é criar um ambiente digital limpo e funcional para ajudar no gerenciamento de tempo e na manutenção do foco durante as tarefas do dia a dia.

O usuário pode iniciar ciclos de foco, visualizar seus próximos compromissos diretamente da sua agenda e acompanhar o progresso diário de suas sessões de trabalho.

## ✨ Funcionalidades

- **Timer Pomodoro:** Ciclos de foco e descanso com alternância automática.
- **Integração com Google Agenda:** Visualização dos próximos eventos do dia após o login.
- **Autenticação Segura:** Login com o Google usando NextAuth.js (OAuth 2.0).
- **Notificações do Navegador:** Alertas ao final de cada ciclo de foco ou descanso.
- **Resumo Diário:** Acompanhamento de sessões concluídas e tempo total focado, com dados salvos no navegador (`localStorage`).
- **Interface Moderna:** Design minimalista com tema escuro, construído com Tailwind CSS.

## 🛠️ Tecnologias Utilizadas

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [NextAuth.js](https://next-auth.js.org/)
- [Google Calendar API](https://developers.google.com/calendar)

## 🚀 Como Executar o Projeto Localmente

Para rodar este projeto na sua máquina, siga os passos abaixo.

### Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn

### Instalação

1.  Clone o repositório:
    ```sh
    git clone [https://github.com/Xwiuu/PromodoroPessoal.git](https://github.com/Xwiuu/PromodoroPessoal.git)
    ```
2.  Navegue até a pasta do projeto:
    ```sh
    cd PromodoroPessoal
    ```
3.  Instale as dependências:
    ```sh
    npm install
    ```
4.  **Configuração das Variáveis de Ambiente:**

    - Crie um arquivo chamado `.env.local` na raiz do projeto.
    - Copie o conteúdo do arquivo `.env.example` (que você deve criar) para o seu `.env.local`.
    - Preencha com as suas credenciais do Google Cloud e uma chave secreta para o NextAuth.

    **`.env.example`:**

    ```env
    # Credenciais do Google OAuth
    GOOGLE_CLIENT_ID="SEU_CLIENT_ID_AQUI"
    GOOGLE_CLIENT_SECRET="SEU_CLIENT_SECRET_AQUI"

    # Chave secreta para o NextAuth.js
    # Gere a sua em: [https://generate-secret.vercel.app/32](https://generate-secret.vercel.app/32)
    NEXTAUTH_SECRET="SUA_CHAVE_SECRETA_AQUI"
    ```

5.  Execute o servidor de desenvolvimento:

    ```sh
    npm run dev
    ```

6.  Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver o resultado.

---

_Este projeto foi desenvolvido com a ajuda do Parceiro de Programação._
