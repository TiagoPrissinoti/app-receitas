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

<img width="1919" height="954" alt="image" src="https://github.com/user-attachments/assets/e5f73f2f-a4f3-4c91-9abf-f53f0ea06695" />
<img width="1600" height="786" alt="WhatsApp Image 2026-09-01 at 12 33 07" src="https://github.com/user-attachments/assets/b9a48fc0-fbd3-4e1b-a9b7-57a3e26657fc" />
<img width="1600" height="787" alt="WhatsApp Image 2026-09-01 at 12 33 38" src="https://github.com/user-attachments/assets/966ceb48-50d4-451a-9d6e-8234a9eca121" />



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
