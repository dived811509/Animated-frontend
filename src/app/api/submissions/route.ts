import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, discord, message } = body;

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const existing = await prisma.submission.findUnique({
      where: { email },
    });

    if (existing) {
      return NextResponse.json(
        { error: "You already submitted" },
        { status: 409 },
      );
    }

    const submission = await prisma.submission.create({
      data: { name, email, discord, message },
    });

    return NextResponse.json(submission);
  } catch (error) {
    console.error("Submission API error:", error);

    let message = "Internal Server Error";

    if (error instanceof Error) {
      message = error.message;
    }

    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const list = await prisma.submission.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(list);
  } catch (error) {
    console.error("Fetch submissions error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
