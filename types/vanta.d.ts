declare module "vanta/dist/vanta.birds.min.js" {
  const BIRDS: (options: Record<string, unknown>) => {
    destroy: () => void;
    triggerMouseMove?: (x: number, y: number) => void;
    mouseX?: number;
    mouseY?: number;
    resize?: () => void;
  };
  export default BIRDS;
}
