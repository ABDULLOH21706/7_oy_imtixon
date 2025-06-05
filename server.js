import express from "express";
import cors from "cors";

const app = express();
const PORT = 7070;

app.use(cors());
app.use(express.json());
let managersData = [
  {
    id: 1,
    ism: "Ali",
    familiya: "Valiyev",
    email: "ali@example.com",
    rol: "admin",
    holat: "ishdan bo'shatilgan",
  },
  {
    id: 2,
    ism: "Laylo",
    familiya: "Karimova",
    email: "laylo@example.com",
    rol: "manager",
    holat: "faol",
  },
];
app.get("/api/staff/all-managers", (req, res) => {
  console.log("📥 GET /api/staff/all-managers");
  res.json(managersData);
});
app.post("/api/staff/create-manager", (req, res) => {
  const { ism, familiya, email, rol, holat } = req.body;

  if (!ism || !familiya || !email || !rol || !holat) {
    return res
      .status(400)
      .json({ message: "Barcha maydonlar to‘ldirilishi kerak." });
  }

  const newId =
    managersData.length > 0 ? managersData[managersData.length - 1].id + 1 : 1;
  const newManager = { id: newId, ism, familiya, email, rol, holat };

  managersData.push(newManager);
  console.log("🆕 Yangi manager qo‘shildi:", newManager);
  res.status(201).json({ message: "Manager qo‘shildi", manager: newManager });
});
app.put("/api/staff/all-managers/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = managersData.findIndex((m) => m.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Manager topilmadi." });
  }

  const { ism, familiya, email, rol, holat } = req.body;

  if (!ism || !familiya || !email || !rol || !holat) {
    return res.status(400).json({ message: "To‘liq ma'lumot kiriting." });
  }

  managersData[index] = { id, ism, familiya, email, rol, holat };
  console.log("✏️ Manager yangilandi:", managersData[index]);
  res.json({ updatedManager: managersData[index] });
});
app.delete("/api/staff/all-managers/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = managersData.findIndex((m) => m.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Manager topilmadi." });
  }

  const deletedManager = managersData.splice(index, 1)[0];
  console.log("🗑️ Manager o‘chirildi:", deletedManager);
  res.json({ message: "Manager o‘chirildi", deletedManager });
});


let adminsData = [
  {
    id: 1,
    ism: "Aziz",
    familiya: "Xudoyberdiyev",
    email: "aziz@example.com",
    rol: "admin",
    holat: "ishdan bo'shatilgan",
  },
  {
    id: 2,
    ism: "Malika",
    familiya: "Nazarova",
    email: "malika@example.com",
    rol: "admin",
    holat: "ishdan bo'shatilgan",
  },
  {
    id: 3,
    ism: "Aziz",
    familiya: "Xudoyberdiyev",
    email: "aziz@example.com",
    rol: "admin",
    holat: "faol",
  },
  {
    id: 4,
    ism: "Aziz",
    familiya: "Xudoyberdiyev",
    email: "aziz@example.com",
    rol: "admin",
    holat: "faol",
  },
  {
    id: 5,
    ism: "Aziz",
    familiya: "Xudoyberdiyev",
    email: "aziz@example.com",
    rol: "admin",
    holat: "faol",
  },
  {
    id: 6,
    ism: "Aziz",
    familiya: "Xudoyberdiyev",
    email: "aziz@example.com",
    rol: "admin",
    holat: "faol",
  },
];
app.get("/api/staff/all-admins", (req, res) => {
  console.log("📥 GET /api/staff/all-admins");
  res.json(adminsData);
});
app.post("/api/staff/create-admin", (req, res) => {
  const { ism, familiya, email, rol, holat } = req.body;

  if (!ism || !familiya || !email || !rol || !holat) {
    return res
      .status(400)
      .json({ message: "Barcha maydonlar to‘ldirilishi kerak." });
  }

  const newId =
    adminsData.length > 0 ? adminsData[adminsData.length - 1].id + 1 : 1;
  const newAdmin = { id: newId, ism, familiya, email, rol, holat };

  adminsData.push(newAdmin);
  console.log("🆕 Yangi admin qo‘shildi:", newAdmin);
  res.status(201).json({ message: "Admin qo‘shildi", admin: newAdmin });
});
app.put("/api/staff/all-admins/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = adminsData.findIndex((m) => m.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Manager topilmadi." });
  }

  const { ism, familiya, email, rol, holat } = req.body;

  if (!ism || !familiya || !email || !rol || !holat) {
    return res.status(400).json({ message: "To‘liq ma'lumot kiriting." });
  }

  adminsData[index] = { id, ism, familiya, email, rol, holat };
  console.log("✏️ Manager yangilandi:", managersData[index]);
  res.json({ updatedAdmin: adminsData[index] });
});
app.delete("/api/staff/all-admins/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = adminsData.findIndex((a) => a.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Admin topilmadi." });
  }

  const deletedAdmin = adminsData.splice(index, 1)[0];
  console.log("🗑️ Admin o‘chirildi:", deletedAdmin);
  res.json({ message: "Admin o‘chirildi", deletedAdmin });
});




let teachersData = [
  {
    id: 1,
    ism: "Aziz",
    familiya: "Xudoyberdiyev",
    email: "aziz@example.com",
    fan: "teacher",
    holat: "ishdan bo'shatilgan",
  },
  {
    id: 2,
    ism: "Malika",
    familiya: "Nazarova",
    email: "malika@example.com",
    fan: "teacher",
    holat: "ishdan bo'shatilgan",
  },
  {
    id: 3,
    ism: "Aziza",
    familiya: "Xudoyberdiyev",
    email: "aziz@example.com",
    fan: "teacher",
    holat: "faol",
  },
  {
    id: 4,
    ism: "olim",
    familiya: "Xudoyberdiyev",
    email: "aziz@example.com",
    fan: "teacher",
    holat: "faol",
  },
  {
    id: 5,
    ism: "joxa",
    familiya: "Xudoyberdiyev",
    email: "aziz@example.com",
    fan: "teacher",
    holat: "faol",
  },
  {
    id: 6,
    ism: "salim",
    familiya: "Xudoyberdiyev",
    email: "aziz@example.com",
    fan: "teacher",
    holat: "ishdan bo'shatilgan",
  },
];
app.get("/api/teacher/all-teacher", (req, res) => {
  console.log("📥 GET /api/teacher/all-teacher");
  res.json(teachersData);
});
app.post("/api/teacher/create-teacher", (req, res) => {
  const { ism, familiya, email, rol, holat } = req.body;

  if (!ism || !familiya || !email || !rol || !holat) {
    return res
      .status(400)
      .json({ message: "Barcha maydonlar to‘ldirilishi kerak." });
  }
  const newId =
    teachersData.length > 0 ? teachersData[teachersData.length - 1].id + 1 : 1;
  const newTeacher = { id: newId, ism, familiya, email, rol, holat };
  teachersData.push(newTeacher);
  console.log("🆕 Yangi ustoz qo‘shildi:", newTeacher);
  res.status(201).json({ message: "Ustoz qo‘shildi", teacher: newTeacher });
});
app.put("/api/teacher/all-teacher/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = teachersData.findIndex((t) => t.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Ustoz topilmadi." });
  }

  const { ism, familiya, email, rol, holat } = req.body;

  if (!ism || !familiya || !email || !rol || !holat) {
    return res.status(400).json({ message: "To‘liq ma'lumot kiriting." });
  }

  teachersData[index] = { id, ism, familiya, email, rol, holat };
  console.log("✏️ Ustoz yangilandi:", teachersData[index]);
  res.json({ updatedTeacher: teachersData[index] });
});
app.delete("/api/teacher/all-teacher/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = teachersData.findIndex((t) => t.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Ustoz topilmadi." });
  }

  const deletedTeacher = teachersData.splice(index, 1)[0];
  console.log("🗑️ Ustoz o‘chirildi:", deletedTeacher);
  res.json({ message: "Ustoz o‘chirildi", deletedTeacher });
});


app.listen(PORT, () => {
  console.log(`🚀 Server http://localhost:${PORT} da ishga tushdi`);
});
