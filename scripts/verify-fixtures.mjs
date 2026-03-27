import { readFile } from "node:fs/promises";
import path from "node:path";

const fixtureDir = path.join(process.cwd(), "public", "demo-data");

async function readJson(name) {
  const content = await readFile(path.join(fixtureDir, name), "utf8");
  return JSON.parse(content);
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

const [entities, assets, ownership, scenarios] = await Promise.all([
  readJson("entities.json"),
  readJson("assets.json"),
  readJson("ownership.json"),
  readJson("scenarios.json"),
]);

const entityIds = new Set(entities.map((entity) => entity.id));
assert(entityIds.has("aster-grid-holdings"), "Missing default entity");
assert(entities.length >= 5, "Need at least five entities");
assert(assets.length >= 10, "Need at least ten assets");
assert(ownership.length >= 6, "Need at least six ownership edges");
assert(scenarios.length >= 50, "Need enough scenario rows");

for (const asset of assets) {
  assert(entityIds.has(asset.entityId), `Unknown entity for asset ${asset.assetId}`);
}

for (const edge of ownership) {
  assert(entityIds.has(edge.rootId), `Unknown root entity in ownership edge`);
  assert(entityIds.has(edge.sourceId), `Unknown source entity in ownership edge`);
  assert(entityIds.has(edge.targetId), `Unknown target entity in ownership edge`);
}

for (const point of scenarios) {
  assert(entityIds.has(point.entityId), `Unknown entity in scenario row ${point.year}`);
}

console.log("Fixture verification passed.");
