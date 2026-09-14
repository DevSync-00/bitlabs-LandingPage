import createGlobe from "cobe";
import { useEffect, useRef } from "react";

interface Location {
  name: string;
  lat: number;
  lng: number;
}

const HQ: Location = { name: "BitLabs", lat: 9.02, lng: 38.74 }; // Addis Ababa, Ethiopia

const LOCATIONS: Location[] = [
  // Africa
  { name: "Nairobi", lat: -1.29, lng: 36.82 },
  { name: "Lagos", lat: 6.52, lng: 3.38 },
  { name: "Cairo", lat: 30.04, lng: 31.24 },

  // Europe
  { name: "London", lat: 51.51, lng: -0.13 },
  { name: "Frankfurt", lat: 50.11, lng: 8.68 },
  { name: "Paris", lat: 48.86, lng: 2.35 },
  { name: "Berlin", lat: 52.52, lng: 13.4 },
  { name: "Stockholm", lat: 59.33, lng: 18.06 },

  // Middle East
  { name: "Dubai", lat: 25.2, lng: 55.27 },

  // Asia
  { name: "Tokyo", lat: 35.68, lng: 139.69 },
  { name: "Singapore", lat: 1.35, lng: 103.82 },
  { name: "Bengaluru", lat: 12.97, lng: 77.59 },
  { name: "Shanghai", lat: 31.23, lng: 121.47 },
  { name: "Mumbai", lat: 19.08, lng: 72.88 },

  // Americas
  { name: "New York", lat: 40.71, lng: -74.01 },
  { name: "San Francisco", lat: 37.77, lng: -122.42 },
  { name: "Toronto", lat: 43.65, lng: -79.38 },
  { name: "São Paulo", lat: -23.55, lng: -46.63 },

  // Oceania
  { name: "Sydney", lat: -33.87, lng: 151.21 },
];

// Brand blue, per theme, as 0–1 RGB triples (cobe's color format).
const hexToRgb01 = (hex: string): [number, number, number] => {
  const n = parseInt(hex.replace("#", ""), 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
};

// The phi value that puts Addis Ababa (HQ) centered on-camera at theta=0.3,
// solved from the same lat/lng->3D conversion cobe uses (see project() logic
// referenced above): phi = atan2(-px, pz) where px/pz come from HQ's
// unrotated unit-sphere position. Precomputed here rather than derived at
// runtime since HQ's coordinates are fixed.
const HQ_CENTER_PHI = -2.243;
// How far (radians) the globe swings each side of HQ_CENTER_PHI. At 0.6 rad
// HQ stays comfortably within the front-facing hemisphere throughout the
// swing (never crosses into "behind the globe"), so its badge and arcs no
// longer disappear during idle rotation.
const OSC_AMPLITUDE = 0.6;
const OSC_SPEED = 0.006;

/**
 * 3D WebGL Globe powered by cobe.
 *
 * Position tracking for the "BitLabs" badge and the connecting lines is
 * handled entirely by cobe itself, not by hand-rolled trigonometry:
 *  - The HQ marker has `size: 0` (no dot) and an `id: "hq"`. Because it has
 *    an id, cobe exposes its live screen position as the CSS anchor
 *    `--cobe-hq` and its facing-camera state as `--cobe-visible-hq` — both
 *    updated automatically every frame as the globe rotates. The badge below
 *    is a normal DOM element pinned to that anchor via CSS Anchor
 *    Positioning, so it can never drift out of sync with the globe.
 *  - Connections to HQ use cobe's native `arcs` option, rendered directly on
 *    the WebGL canvas with cobe's own internal projection — no manual
 *    lat/lng-to-screen math anywhere in this file.
 * Reference: https://cobe.vercel.app/ ("Custom Labels" / CSS Anchors recipe).
 */
export function CobeGlobe({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef<number>(0);
  const oscPhaseRef = useRef<number>(0);
  const freePhiRef = useRef<number>(HQ_CENTER_PHI);
  useEffect(() => {
    let width = 0;
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Patch WebGL context drawArrays to fix cobe v2 bug where leftover enabled vertex attributes
    // from arcs/markers shaders cause "WebGL: INVALID_OPERATION: drawArrays: no buffer is bound to enabled attribute"
    const origGetContext = canvas.getContext.bind(canvas);
    canvas.getContext = ((type: string, attribs?: any) => {
      const gl = origGetContext(type, attribs) as WebGLRenderingContext | WebGL2RenderingContext | null;
      if (gl && !(gl as any).__cobePatched) {
        (gl as any).__cobePatched = true;
        const origDrawArrays = gl.drawArrays.bind(gl);
        const maxAttribs = gl.getParameter(gl.MAX_VERTEX_ATTRIBS) || 16;
        gl.drawArrays = (mode: GLenum, first: GLint, count: GLsizei) => {
          if (mode === gl.TRIANGLES && count === 6 && first === 0) {
            for (let i = 1; i < maxAttribs; i++) {
              gl.disableVertexAttribArray(i);
            }
          }
          return origDrawArrays(mode, first, count);
        };
      }
      return gl;
    }) as any;

    const onResize = () => {
      if (canvas) width = canvas.offsetWidth || 520;
    };
    window.addEventListener("resize", onResize);
    onResize();

    const brandColor = hexToRgb01("#1F53DB");

    const globe = createGlobe(canvas, {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi: HQ_CENTER_PHI,
      theta: 0.3,
      dark: 0,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [1, 1, 1],
      markerColor: brandColor,
      glowColor: [1, 1, 1],
      markers: [
        // HQ: invisible dot (size 0), exists only so cobe tracks its screen
        // position under the id "hq" for the CSS-anchored badge below.
        { location: [HQ.lat, HQ.lng], size: 0, id: "hq" },
        ...LOCATIONS.map((loc) => ({
          location: [loc.lat, loc.lng] as [number, number],
          size: 0.05,
        })),
      ],
      // Native arcs: cobe positions and hides these itself, every frame.
      arcs: LOCATIONS.map((loc) => ({
        from: [HQ.lat, HQ.lng] as [number, number],
        to: [loc.lat, loc.lng] as [number, number],
      })),
      arcColor: brandColor,
      arcWidth: 0.4,
      arcHeight: 0.3,
    });

    let animationFrameId: number;
    const animate = () => {
      if (!pointerInteracting.current) {
        oscPhaseRef.current += OSC_SPEED;
        freePhiRef.current =
          HQ_CENTER_PHI + Math.sin(oscPhaseRef.current) * OSC_AMPLITUDE;
      }
      const currentPhi = freePhiRef.current + pointerInteractionMovement.current;
      globe.update({ phi: currentPhi });
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      globe.destroy();
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div className={`relative flex items-center justify-center w-full max-w-[580px] aspect-square mx-auto ${className}`}>
      <canvas
        ref={canvasRef}
        style={{ width: "100%", height: "100%", aspectRatio: "1" }}
        onPointerDown={(e) => {
          pointerInteracting.current = e.clientX - pointerInteractionMovement.current;
          if (canvasRef.current) canvasRef.current.style.cursor = "grabbing";
        }}
        onPointerUp={() => {
          pointerInteracting.current = null;
          if (canvasRef.current) canvasRef.current.style.cursor = "grab";
        }}
        onPointerOut={() => {
          pointerInteracting.current = null;
          if (canvasRef.current) canvasRef.current.style.cursor = "grab";
        }}
        onMouseMove={(e) => {
          if (pointerInteracting.current !== null) {
            const delta = e.clientX - pointerInteracting.current;
            pointerInteractionMovement.current = delta * 0.008;
          }
        }}
        onTouchMove={(e) => {
          if (pointerInteracting.current !== null && e.touches[0]) {
            const delta = e.touches[0].clientX - pointerInteracting.current;
            pointerInteractionMovement.current = delta * 0.008;
          }
        }}
        className="cursor-grab select-none touch-none"
      />

      {/* "BitLabs" badge — position and visibility both come from cobe's
          native --cobe-hq anchor / --cobe-visible-hq variable, not from
          any coordinate math in this component. */}
      <div
        className="bitlabs-hq-badge"
        style={
          {
            // CSS Anchor Positioning isn't in React's CSSProperties typings yet.
            positionAnchor: "--cobe-hq",
            opacity: "var(--cobe-visible-hq, 0)",
          } as React.CSSProperties
        }
      >
        <span className="bitlabs-hq-ping" />
        <span>BitLabs</span>
      </div>

      <style>{`
        .bitlabs-hq-badge {
          z-index: 10;
          pointer-events: none;
          display: flex;
          align-items: center;
          gap: 6px;
          border-radius: 9999px;
          background: #2563eb;
          color: #fff;
          font-weight: 700;
          font-size: 12px;
          line-height: 1;
          padding: 6px 12px;
          box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.3);
          border: 1px solid rgb(255 255 255 / 0.2);
          white-space: nowrap;
          transition: opacity 0.3s ease, top 0.12s linear, left 0.12s linear, translate 0.12s linear;
        }
        .bitlabs-hq-ping {
          width: 8px;
          height: 8px;
          border-radius: 9999px;
          background: #fff;
          flex-shrink: 0;
          animation: bitlabs-hq-pulse 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        @keyframes bitlabs-hq-pulse {
          75%, 100% { transform: scale(2); opacity: 0; }
        }
        /* Position via CSS Anchor Positioning where supported (Chrome 125+,
           Edge 125+, Firefox 132+/147+, Safari 18.2+/26 — broad coverage as
           of 2026). Falls back to a hidden badge rather than a badge stuck
           in the wrong place on unsupported browsers. */
        @supports (anchor-name: --x) {
          .bitlabs-hq-badge {
            position: absolute;
            top: anchor(center);
            left: anchor(center);
            translate: -50% -50%;
          }
        }
        @supports not (anchor-name: --x) {
          .bitlabs-hq-badge {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
