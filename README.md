 🍳 CookShare

Plataforma completa de gerenciamento de receitas com autenticação de usuários, upload de imagens e sistema completo de CRUD.

---

🚀 Sobre o projeto

O CookShare é uma aplicação fullstack desenvolvida para permitir que usuários possam cadastrar, visualizar, editar e excluir receitas de forma segura e organizada.

A aplicação conta com autenticação de usuários, upload de imagens e uma arquitetura bem estruturada seguindo boas práticas de desenvolvimento backend e frontend.

---

 🛠️ Tecnologias utilizadas

🔹 Backend

* Node.js
* Express
* TypeScript
* Prisma ORM
* SQLite
* JWT (autenticação)
* Multer (upload de imagens)

 🔹 Frontend

* React
* JavaScript
* HTML5
* CSS3

---

 🔐 Funcionalidades

* ✅ Cadastro e login de usuários
* ✅ Autenticação com JWT
* ✅ Proteção de rotas
* ✅ CRUD completo de receitas
* ✅ Upload de imagens para receitas
* ✅ Validação de dados no backend
* ✅ Estrutura MVC no backend
* ✅ Integração completa entre frontend e backend

---

# 📸 Demonstração


<img width="1600" height="786" alt="WhatsApp Image 2026-09-01 at 12 33 07" src="https://github.com/user-attachments/assets/55c725e6-8749-41d0-805e-d65631d27b3b" />
<img width="1600" height="786" alt="WhatsApp Image 2026-09-01 at 12 33 07" src="https://github.com/user-attachments/assets/b9a48fc0-fbd3-4e1b-a9b7-57a3e26657fc" />
<img width="1600" height="787" alt="WhatsApp Image 2026-09-01 at 12 33 38" src="https://github.com/user-attachments/assets/966ceb48-50d4-451a-9d6e-8234a9eca121" />
<img width="1600" height="786" alt="WhatsApp Image 2026-09-01 at 12 33 07" src="https://github.com/user-attachments/assets/0491cbca-571c-4ff2-ad49-1173e6d98710" />
<img width="1600" height="786" alt="WhatsApp Image 2026-09-01 at 12 35 07" src="https://github.com/user-attachments/assets/dfb7e874-18f8-42cb-a894-a8bd7ce7a3cc" />
<img width="1600" height="795" alt="WhatsApp Image 2026-09-01 at 12 35 16" src="https://github.com/user-attachments/assets/fb51a38a-47ca-4494-8f72-1f87ecf2a41c" />







---

 ⚙️ Como rodar o projeto localmente

🔹 Clone o repositório

```bash
git clone https://github.com/seu-usuario/seu-repo.git
```

---

 🔹 Backend

```bash
cd backend
npm install
npx prisma migrate dev
npm run dev
```

---

🔹 Frontend

```bash
cd frontend
npm install
npm start
```

---

 📂 Estrutura do projeto

```
backend/
 ├── src/
 │   ├── controllers/
 │   ├── middlewares/
 │   ├── database/
 │   ├── config/
 │   └── lib/
 ├── prisma/
 └── uploads/

frontend/
 ├── components/
 ├── pages/
 └── services/
```

---

🔗 API (exemplos de rotas)

* `POST /auth/register` → Cadastro de usuário
* `POST /auth/login` → Login
* `GET /recipes` → Listar receitas
* `POST /recipes` → Criar receita
* `PUT /recipes/:id` → Atualizar receita
* `DELETE /recipes/:id` → Deletar receita

---

 🧠 Aprendizados

Este projeto permitiu aplicar na prática:

* Arquitetura MVC
* Autenticação com JWT
* Upload de arquivos no backend
* Integração frontend-backend
* Uso de ORM (Prisma)
* Organização de código em larga escala

---

 🚧 Melhorias futuras

* Deploy completo da aplicação
* Sistema de favoritos
* Paginação de receitas
* Melhorias na interface (UI/UX)

---

## 👨‍💻 Autor

Desenvolvido por Tiago Ribeiro Prissinoti Simari

---

 📌 Observações

Este projeto foi desenvolvido com fins educacionais e para prática de desenvolvimento fullstack.
