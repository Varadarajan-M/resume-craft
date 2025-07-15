import { kebabToPascalCase } from "@/shared/lib/utils";
import {
  Circle,
  Line,
  Path,
  Polygon,
  Polyline,
  Rect,
  Svg,
} from "@react-pdf/renderer";
import * as lucideIcons from "lucide-static";

interface PdfLucideIconProps {
  name: string;
  size?: number;
  color?: string;
}

export function PdfLucideIcon({
  name,
  size = 16,
  color = "black",
}: PdfLucideIconProps) {
  const properName = kebabToPascalCase(name);
  const svgString = (lucideIcons as Record<string, string>)[properName];

  if (!svgString) return null;

  const viewBox = svgString.match(/viewBox="([^"]+)"/)?.[1] ?? "0 0 24 24";

  const elements = Array.from(
    svgString.matchAll(
      /<(path|rect|circle|line|polyline|polygon)\s+([^>]*)\/?>/g
    )
  );

  const parseAttributes = (attrString: string): Record<string, string> => {
    const attrs: Record<string, string> = {};
    for (const [, key, val] of attrString.matchAll(/(\w+)=["']([^"']+)["']/g)) {
      attrs[key] = val;
    }
    return attrs;
  };

  const renderElement = (
    tag: string,
    attrs: Record<string, string>,
    index: number
  ) => {
    const common = {
      key: `${tag}-${index}`,
      stroke: color,
      strokeWidth: attrs["stroke-width"] ?? 2,
      fill: attrs.fill ?? "none",
    };

    switch (tag) {
      case "path":
        return <Path {...common} d={attrs.d} />;
      case "rect":
        return (
          <Rect
            {...common}
            x={attrs.x}
            y={attrs.y}
            width={attrs.width}
            height={attrs.height}
            rx={attrs.rx}
            ry={attrs.ry}
          />
        );
      case "circle":
        return <Circle {...common} cx={attrs.cx} cy={attrs.cy} r={attrs.r} />;
      case "line":
        return (
          <Line
            {...common}
            x1={attrs.x1}
            y1={attrs.y1}
            x2={attrs.x2}
            y2={attrs.y2}
          />
        );
      case "polyline":
        return <Polyline {...common} points={attrs.points} />;
      case "polygon":
        return <Polygon {...common} points={attrs.points} />;
      default:
        return null;
    }
  };

  return (
    <Svg viewBox={viewBox} width={size} height={size}>
      {elements.map(([_, tag, attrString], i) =>
        renderElement(tag, parseAttributes(attrString), i)
      )}
    </Svg>
  );
}
