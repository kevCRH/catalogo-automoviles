import type { Manufacturer } from '~/interfaces/manufacturers';
import manufacturersData from '~/static/DB/manufacturers.json';

export function getManufacturers(): Manufacturer[] {
  return manufacturersData as Manufacturer[];
}

export function getManufacturerDetailsById(
  manufacturerId: number
): Manufacturer | null {
  const manufacturers = getManufacturers();
  return (
    manufacturers.find((manufacturer) => manufacturer.id === manufacturerId) ||
    null
  );
}

export function getManufacturerDetailsByName(
  name: string
): Manufacturer | null {
  const manufacturers = getManufacturers();
  return (
    manufacturers.find(
      (manufacturer) => manufacturer.name.toLowerCase() === name.toLowerCase()
    ) || null
  );
}
