import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import fs from "fs/promises";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE = path.join(__dirname, "subjects.json");

async function readData() {
  try {
    const data = await fs.readFile(DATA_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function writeData(data: any) {
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // API routes
  app.get("/api/subjects", async (req, res) => {
    const subjects = await readData();
    res.json(subjects);
  });

  app.post("/api/subjects", async (req, res) => {
    const subjects = await readData();
    const newSubject = { ...req.body, id: Date.now().toString() };
    subjects.push(newSubject);
    await writeData(subjects);
    res.status(201).json(newSubject);
  });

  app.put("/api/subjects/:id", async (req, res) => {
    const subjects = await readData();
    const index = subjects.findIndex((s: any) => s.id === req.params.id);
    if (index !== -1) {
      subjects[index] = { ...subjects[index], ...req.body };
      await writeData(subjects);
      res.json(subjects[index]);
    } else {
      res.status(404).json({ error: "Not found" });
    }
  });

  app.delete("/api/subjects/:id", async (req, res) => {
    const subjects = await readData();
    const filtered = subjects.filter((s: any) => s.id !== req.params.id);
    await writeData(filtered);
    res.status(204).send();
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
