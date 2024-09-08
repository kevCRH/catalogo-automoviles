<template>
  <div class="manufacturers-page">
    <h1>Fabricantes de Super Autos</h1>
    <p>Explora los fabricantes detrás de los super autos más impresionantes.</p>

    <div class="manufacturer-cards">
      <div
        class="manufacturer-card"
        v-for="manufacturer in manufacturers"
        :key="manufacturer.id"
      >
        <div class="image-container">
          <img
            :src="manufacturer.imageManu"
            :alt="manufacturer.name"
            class="manufacturer-image"
          />
        </div>
        <h2>{{ manufacturer.name }}</h2>
        <p>
          {{ manufacturer.country }} - Fundada en {{ manufacturer.founded }}
        </p>
        <div class="button-container">
          <button @click="showManufacturerDetails(manufacturer.id)">
            Ver Detalles
          </button>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div v-if="isModalVisible" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <button class="close-button" @click="closeModal">&times;</button>
        <div class="modal-header">
          <h2>{{ selectedManufacturer?.name }}</h2>
        </div>
        <div class="modal-body">
          <img
            :src="selectedManufacturer?.imageManu"
            :alt="selectedManufacturer?.name"
            class="modal-image"
          />
          <div class="modal-details">
            <p>
              <strong>Fundador:</strong> {{ selectedManufacturer?.founder }}
            </p>
            <p>
              <strong>Año de Fundación:</strong>
              {{ selectedManufacturer?.founded }}
            </p>
            <p><strong>País:</strong> {{ selectedManufacturer?.country }}</p>
            <p>
              <strong>Biografía:</strong> {{ selectedManufacturer?.biography }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import {
  getManufacturerDetailsById,
  getManufacturerDetailsByName,
  getManufacturers,
} from '~/services/manufactures';
import type { Manufacturer } from '~/interfaces/manufacturers';
import '~/assets/styles/manufacturer.css';

const route = useRoute();

const manufacturers = ref<Manufacturer[]>([]);
const isModalVisible = ref(false);
const selectedManufacturer = ref<Manufacturer | null>(null);

const fetchManufacturerDetails = async () => {
  const name = route.params.name as string;
  if (name) {
    const manufacturerDetails = await getManufacturerDetailsByName(name);
    if (manufacturerDetails) {
      selectedManufacturer.value = manufacturerDetails;
      isModalVisible.value = true;
    }
  }
};

onMounted(async () => {
  manufacturers.value = await getManufacturers();
  await fetchManufacturerDetails();
});

watch(
  () => route.params,
  async () => {
    await fetchManufacturerDetails();
  }
);

const showManufacturerDetails = async (manufacturerId: number) => {
  const manufacturerDetails = await getManufacturerDetailsById(manufacturerId);
  if (manufacturerDetails) {
    selectedManufacturer.value = manufacturerDetails;
    isModalVisible.value = true;
  } else {
    selectedManufacturer.value = null;
  }
};

const closeModal = () => {
  isModalVisible.value = false;
};
</script>
