<template>
  <div class="models-page">
    <h1>Modelos de super autos</h1>
    <p>Explora los últimos modelos de super autos con información detallada.</p>

    <div class="model-cards">
      <div class="model-card" v-for="model in models" :key="model.id">
        <div class="image-container">
          <img :src="model.image" :alt="model.name" class="model-image" />
        </div>
        <h2>{{ model.name }}</h2>
        <p>{{ model.year }} - {{ model.type }}</p>
        <div class="button-container">
          <button @click="showModelDetails(model.id)">Ver Detalles</button>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div v-if="isModalVisible" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <button class="close-button" @click="closeModal">&times;</button>
        <div class="modal-header">
          <h2>{{ selectedModel?.name }}</h2>
        </div>
        <div class="modal-body">
          <img
            :src="selectedModel?.image"
            :alt="selectedModel?.name"
            class="modal-image"
          />
          <div class="modal-details">
            <p><strong>Modelo:</strong> {{ selectedModel?.model }}</p>
            <p><strong>Año:</strong> {{ selectedModel?.year }}</p>
            <p><strong>Tipo:</strong> {{ selectedModel?.type }}</p>
            <p><strong>Precio:</strong> {{ selectedModel?.price }}</p>
            <p>
              <strong>Diseñador:</strong>
              <NuxtLink :to="`/designers/${selectedModel?.designerName}`">
                {{ selectedModel?.designerName }}
              </NuxtLink>
            </p>
            <p>
              <strong>Fabricante:</strong>
              <NuxtLink
                :to="`/manufacturers/${selectedModel?.manufacturerName}`"
              >
                {{ selectedModel?.manufacturerName }}
              </NuxtLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getModelDetailsById, getModels } from '~/services/models';
import type { Model } from '~/interfaces/models';
import '~/assets/styles/model.css';

const models = ref<Model[]>([]);
const isModalVisible = ref(false);
const selectedModel = ref<{
  name: string;
  model: string;
  year: number;
  type: string;
  price: string;
  designerName: string;
  manufacturerName: string;
  image: string;
} | null>(null);

onMounted(async () => {
  models.value = await getModels();
});

const showModelDetails = async (modelId: number) => {
  const modelDetails = await getModelDetailsById(modelId);
  if (modelDetails) {
    modelDetails.price = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(Number(modelDetails.price));

    selectedModel.value = modelDetails;
  } else {
    selectedModel.value = null;
  }
  isModalVisible.value = true;
};

const closeModal = () => {
  isModalVisible.value = false;
};
</script>
