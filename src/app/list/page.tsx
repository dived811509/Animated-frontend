import { prisma } from "@/lib/prisma";

export default async function ListPage() {
  const list = await prisma.submission.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Public Submissions</h1>

      <div className="space-y-4">
        {list.map((item) => (
          <div
            key={item.id}
            className="p-4 rounded-xl border bg-black/40 text-white"
          >
            <p className="font-semibold">{item.name}</p>
            <p className="text-sm text-gray-400">{item.email}</p>
            {item.discord && <p>Discord: {item.discord}</p>}
            {item.message && <p>{item.message}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
