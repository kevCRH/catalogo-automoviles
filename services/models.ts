import type { Model } from '~/interfaces/models';
import type { Designer } from '~/interfaces/designers';
import type { Manufacturer } from '~/interfaces/manufacturers';
import modelsData from '~/static/DB/models.json';
import designersData from '~/static/DB/designers.json';
import manufacturersData from '~/static/DB/manufacturers.json';

export function getModels(): Model[] {
  return modelsData as Model[];
}

export function getDesigners(): Designer[] {
  return designersData as Designer[];
}

export function getManufacturers(): Manufacturer[] {
  return manufacturersData as Manufacturer[];
}

export function getModelDetailsById(modelId: number) {
  const models = getModels();
  const designers = getDesigners();
  const manufacturers = getManufacturers();

  const model = models.find((m) => m.id === modelId);
  if (!model) {
    return null;
  }

  const designer = designers.find((d) => d.id === model.designerId);
  const manufacturer = manufacturers.find((m) => m.id === model.manufacturerId);

  return {
    name: model.name,
    model: model.model,
    year: model.year,
    type: model.type,
    price: model.price,
    designerName: designer?.name ?? 'Unknown Designer',
    manufacturerName: manufacturer?.name ?? 'Unknown Manufacturer',
    image: model.image,
  };
}
