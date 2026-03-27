import { OwnershipGraph } from "@/components/ownership-graph";
import { StudioShell } from "@/components/studio-shell";
import {
  getEntityBySlug,
  getEntityOptions,
  getOwnershipPayload,
} from "@/lib/demo-data";

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function RelationshipsPage({
  searchParams,
}: PageProps) {
  const params = await searchParams;
  const requestedEntity =
    typeof params.entity === "string" ? params.entity : undefined;
  const [options, entity, ownership] = await Promise.all([
    getEntityOptions(),
    getEntityBySlug(requestedEntity),
    getOwnershipPayload(requestedEntity),
  ]);

  const relatedEntityIds = new Set<string>([
    entity.id,
    ...ownership.data.flatMap((edge) => [edge.sourceId, edge.targetId]),
  ]);

  const relatedEntities = options
    .filter((option) => relatedEntityIds.has(option.id))
    .map((option) => option.id);

  const entities = await Promise.all(relatedEntities.map((slug) => getEntityBySlug(slug)));

  return (
    <StudioShell
      currentPath="/relationships"
      currentSlug={entity.slug}
      options={options}
    >
      <OwnershipGraph entity={entity} entities={entities} edges={ownership.data} />
    </StudioShell>
  );
}
