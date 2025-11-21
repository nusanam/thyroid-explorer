import type { RefObject } from 'react';
import type { SimulationLink, SimulationNode } from '../data/types';
import { getSimulationLinkColor, getSimulationNodeColor } from './styling';

export const updateTooltipPosition = (
  event: MouseEvent,
  tooltipRef: RefObject<HTMLDivElement | null>
) => {
  if (!tooltipRef.current) return;

  const tooltip = tooltipRef.current;
  const tooltipRect = tooltip.getBoundingClientRect();
  const padding = 10;

  let left = event.pageX + padding;
  let top = event.pageY + padding;

  // Keep tooltip within viewport
  if (left + tooltipRect.width > window.innerWidth) {
    left = event.pageX - tooltipRect.width - padding;
  }
  if (top + tooltipRect.height > window.innerHeight) {
    top = event.pageY - tooltipRect.height - padding;
  }

  tooltip.style.left = `${left}px`;
  tooltip.style.top = `${top}px`;
};

export const showLinkTooltip = (
  event: MouseEvent,
  link: SimulationLink,
  tooltipRef: RefObject<HTMLDivElement | null>,
  nodes: SimulationNode[]
) => {
  if (!tooltipRef.current) return;

  const tooltip = tooltipRef.current;
  const sourceNode = nodes.find((n) => {
    const linkSourceId =
      typeof link.source === 'string' ? link.source : link.source.id;
    return n.id === linkSourceId;
  });
  const targetNode = nodes.find((n) => {
    const linkTargetId =
      typeof link.target === 'string' ? link.target : link.target.id;
    return n.id === linkTargetId;
  });

  // build tooltip content
  const typeColor = getSimulationLinkColor(link.type);
  const typeEmoji =
    link.type === 'inhibitory' ? '⊣' : link.type === 'stimulatory' ? '→' : '⇄';

  tooltip.innerHTML = `
    <div class="font-bold text-sm mb-2 flex items-center gap-2">
      <span style="color: ${typeColor}">${typeEmoji}</span>
      <span>${sourceNode?.label} → ${targetNode?.label}</span>
    </div>
    <div class="text-xs mb-2">
      <span class="inline-block px-2 py-0.5 rounded text-white" style="background-color: ${typeColor}">
        ${link.type.toUpperCase()}
      </span>
      <span class="ml-2 px-2 py-0.5 rounded bg-gray-200">
        ${link.strength.toUpperCase()}
      </span>
    </div>
    <p class="text-sm mb-2">${link.description}</p>
    ${
      link.mechanismDetail
        ? `
      <div class="text-xs text-gray-600 mt-2 pt-2 border-t border-gray-200">
        <strong>Mechanism:</strong> ${link.mechanismDetail}
      </div>
    `
        : ''
    }
  `;

  tooltip.style.display = 'block';
  tooltip.style.opacity = '0';
  updateTooltipPosition(event, tooltipRef);

  setTimeout(() => {
    tooltip.style.opacity = '1';
  }, 10);
};

export const showNodeTooltip = (
  event: MouseEvent,
  node: SimulationNode,
  tooltipRef: RefObject<HTMLDivElement | null>
) => {
  if (!tooltipRef.current) return;

  const tooltip = tooltipRef.current;
  const nodeColor = getSimulationNodeColor(node.category);

  tooltip.innerHTML = `
    <div class="font-bold text-base mb-2" style="color: ${nodeColor}">
      ${node.label}
    </div>
    <div class="text-sm text-gray-700 mb-1">${node.description}</div>
    ${
      node.normalRange
        ? `
      <div class="text-xs mt-2 pt-2 border-t border-gray-200">
        <div><strong>Normal Range:</strong> ${node.normalRange} ${
            node.unit || ''
          }</div>
        ${
          node.optimalRange
            ? `<div><strong>Optimal:</strong> ${node.optimalRange}</div>`
            : ''
        }
      </div>
    `
        : ''
    }
  `;

  tooltip.style.display = 'block';
  tooltip.style.opacity = '0';
  updateTooltipPosition(event, tooltipRef);

  setTimeout(() => {
    tooltip.style.opacity = '1';
  }, 10);
};

export const hideLinkTooltip = (
  tooltipRef: RefObject<HTMLDivElement | null>
) => {
  if (!tooltipRef.current) return;

  tooltipRef.current.style.opacity = '0';
  setTimeout(() => {
    if (tooltipRef.current) {
      tooltipRef.current.style.display = 'none';
    }
  }, 200);
};
