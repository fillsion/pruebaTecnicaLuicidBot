// src/app/api/tasks/[id]/route.ts

import { NextResponse } from "next/server";

import { readTasksDb, writeTasksDb } from "@/lib/tasks-db";
import type { TaskPriority } from "@/types/task";

export const runtime = "nodejs";

type Params = {
  params: Promise<{
    id: string;
  }>;
};

type UpdateTaskBody = Partial<{
  title: string;
  completed: boolean;
  priority: TaskPriority;
}>;

export async function GET(_request: Request, { params }: Params) {
  const { id } = await params;

  const db = await readTasksDb();
  const task = db.tasks.find((item: { id: string }) => item.id === id);

  if (!task) {
    return NextResponse.json({ message: "Task not found." }, { status: 404 });
  }

  return NextResponse.json(task);
}

export async function PATCH(request: Request, { params }: Params) {
  const { id } = await params;
  const body = (await request.json()) as UpdateTaskBody;

  const db = await readTasksDb();

  const taskIndex = db.tasks.findIndex(
    (task: { id: string }) => task.id === id,
  );

  if (taskIndex === -1) {
    return NextResponse.json({ message: "Task not found." }, { status: 404 });
  }

  db.tasks[taskIndex] = {
    ...db.tasks[taskIndex],
    ...body,
    title: body.title?.trim() ?? db.tasks[taskIndex].title,
  };

  await writeTasksDb(db);

  return NextResponse.json(db.tasks[taskIndex]);
}

export async function DELETE(_request: Request, { params }: Params) {
  const { id } = await params;

  const db = await readTasksDb();

  const taskExists = db.tasks.some((task: { id: string }) => task.id === id);

  if (!taskExists) {
    return NextResponse.json({ message: "Task not found." }, { status: 404 });
  }

  db.tasks = db.tasks.filter((task: { id: string }) => task.id !== id);

  await writeTasksDb(db);

  return new Response(null, { status: 204 });
}
