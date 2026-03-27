"use client";

import { useMemo, useState } from "react";
import {
  Background,
  Controls,
  MiniMap,
  ReactFlow,
  type Edge,
  type Node,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import type { EntityRecord, OwnershipEdge } from "@/types/demo";

type OwnershipGraphProps = {
  entity: EntityRecord;
  entities: EntityRecord[];
  edges: OwnershipEdge[];
};

type ViewMode = "full" | "owners" | "subsidiaries";

const viewModes: ViewMode[] = ["full", "owners", "subsidiaries"];

export function OwnershipGraph({
  entity,
  entities,
  edges,
}: OwnershipGraphProps) {
  const [viewMode, setViewMode] = useState<ViewMode>("full");
  const entityMap = useMemo(
    () => new Map(entities.map((item) => [item.id, item])),
    [entities],
  );

  const { nodes, flowEdges } = useMemo(() => {
    const filteredEdges = edges.filter((edge) => {
      if (viewMode === "owners") return edge.category === "owner";
      if (viewMode === "subsidiaries") return edge.category === "subsidiary";
      return true;
    });

    const owners = filteredEdges.filter((edge) => edge.category === "owner");
    const subsidiaries = filteredEdges.filter(
      (edge) => edge.category === "subsidiary",
    );

    const graphNodes: Node[] = [
      {
        id: entity.id,
        position: { x: 300, y: 180 },
        data: { label: entity.name },
        style: {
          width: 220,
          borderRadius: 20,
          background: "#0f172a",
          color: "white",
          border: "1px solid rgba(255,255,255,0.08)",
          padding: 18,
          fontWeight: 600,
        },
      },
    ];

    owners.forEach((edge, index) => {
      const related = entityMap.get(edge.sourceId);
      if (!related) return;

      graphNodes.push({
        id: edge.sourceId,
        position: { x: 10, y: 50 + index * 130 },
        data: { label: related.name },
        style: {
          width: 220,
          borderRadius: 18,
          background: "#e0f2fe",
          color: "#0f172a",
          border: "1px solid rgba(14,165,233,0.25)",
          padding: 16,
          fontWeight: 500,
        },
      });
    });

    subsidiaries.forEach((edge, index) => {
      const related = entityMap.get(edge.targetId);
      if (!related) return;

      graphNodes.push({
        id: edge.targetId,
        position: { x: 590, y: 50 + index * 130 },
        data: { label: related.name },
        style: {
          width: 220,
          borderRadius: 18,
          background: "#ecfccb",
          color: "#1e293b",
          border: "1px solid rgba(101,163,13,0.25)",
          padding: 16,
          fontWeight: 500,
        },
      });
    });

    const graphEdges: Edge[] = filteredEdges.map((edge) => ({
      id: `${edge.sourceId}-${edge.targetId}`,
      source: edge.sourceId,
      target: edge.targetId,
      animated: false,
      label: `${edge.percentage}%`,
      style: {
        stroke: edge.category === "owner" ? "#0ea5e9" : "#84cc16",
        strokeWidth: 2.5,
      },
      labelStyle: {
        fill: "#0f172a",
        fontWeight: 700,
      },
      labelBgStyle: {
        fill: "#ffffff",
        fillOpacity: 0.9,
      },
    }));

    return { nodes: graphNodes, flowEdges: graphEdges };
  }, [edges, entity, entityMap, viewMode]);

  return (
    <div className="rounded-[1.75rem] border border-white/70 bg-white/85 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
      <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">
            Relationship Graph
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-950">
            Ownership and control around {entity.shortName}
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-600">
            The demo graph keeps the direct capital stack and controlled entity
            network only. It is intentionally compact and fixture-backed.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {viewModes.map((mode) => (
            <button
              key={mode}
              type="button"
              onClick={() => setViewMode(mode)}
              className={`rounded-full px-4 py-2 text-sm font-medium capitalize transition ${
                viewMode === mode
                  ? "bg-slate-950 text-white"
                  : "border border-slate-200 bg-slate-50 text-slate-600 hover:text-slate-950"
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>
      <div className="h-[640px] overflow-hidden rounded-[1.5rem] border border-slate-200 bg-slate-50">
        <ReactFlow
          fitView
          nodes={nodes}
          edges={flowEdges}
          nodesDraggable={false}
          elementsSelectable={false}
          minZoom={0.5}
          maxZoom={1.2}
        >
          <Background color="rgba(148,163,184,0.2)" />
          <MiniMap
            pannable
            zoomable
            style={{ backgroundColor: "#e2e8f0" }}
            nodeColor="#0f172a"
          />
          <Controls />
        </ReactFlow>
      </div>
    </div>
  );
}
