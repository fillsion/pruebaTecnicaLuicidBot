import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { Task, TaskPriority } from "@/types/task";
import { readTasksDb, writeTasksDb } from "@/lib/tasks-db";

export const runtime = "nodejs";

type CreateTaskBody = {
  title?: string;
  priority?: TaskPriority;
};

export async function GET() {
  const db = await readTasksDb();

  return NextResponse.json(db.tasks);
}

export async function POST(request: Request) {
  const body = (await request.json()) as CreateTaskBody;

  if (!body.title || body.title.trim().length < 3) {
    return NextResponse.json(
      { message: "Title must have at least 3 characters." },
      { status: 400 },
    );
  }

  if (!body.priority) {
    return NextResponse.json(
      { message: "Priority is required." },
      { status: 400 },
    );
  }

  const db = await readTasksDb();

  const newTask: Task = {
    id: randomUUID(),
    title: body.title.trim(),
    completed: false,
    createdAt: new Date().toISOString().split("T")[0],
    priority: body.priority,
  };

  db.tasks.unshift(newTask);

  await writeTasksDb(db);

  return NextResponse.json(newTask, { status: 201 });
}
