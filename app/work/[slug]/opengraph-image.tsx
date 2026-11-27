import { projects } from "@/lib/data";
import { projectCard, OG_SIZE } from "@/lib/og";

export const alt = "A project by Bintang Anandhiya";
export const size = OG_SIZE;
export const contentType = "image/png";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug)!;
  return projectCard(p);
}
