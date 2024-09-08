import type { Designer } from '~/interfaces/designers';
import designersData from '~/static/DB/designers.json';

export function getDesigners(): Designer[] {
  return designersData as Designer[];
}

export function getDesignerDetailsById(designerId: number): Designer | null {
  const designers = getDesigners();
  return designers.find((designer) => designer.id === designerId) || null;
}

export function getDesignerDetailsByName(name: string): Designer | null {
  const designers = getDesigners();
  return (
    designers.find(
      (designer) => designer.name.toLowerCase() === name.toLowerCase()
    ) || null
  );
}
