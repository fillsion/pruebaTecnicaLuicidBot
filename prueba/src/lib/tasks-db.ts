import { TasksDb } from "@/types/task";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const DB_PATH = path.join(process.cwd(), "src", "mock-db", "tasks.json");

export async function readTasksDb(): Promise<TasksDb> {
  const file = await readFile(DB_PATH, "utf-8");

  return JSON.parse(file) as TasksDb;
}

export async function writeTasksDb(data: TasksDb): Promise<void> {
  await writeFile(DB_PATH, JSON.stringify(data, null, 2));
}
