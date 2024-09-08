<template>
  <div class="designers-page">
    <h1>Diseñadores de Super Autos</h1>
    <p>Explora los diseñadores detrás de los super autos más icónicos.</p>

    <div class="designer-cards">
      <div
        class="designer-card"
        v-for="designer in designers"
        :key="designer.id"
      >
        <div class="image-container">
          <img
            :src="designer.imageDe"
            :alt="designer.name"
            class="designer-image"
          />
        </div>
        <h2>{{ designer.name }}</h2>
        <p>{{ designer.nationality }}</p>
        <div class="button-container">
          <button @click="showDesignerDetails(designer.id)">
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
          <h2>{{ selectedDesigner?.name }}</h2>
        </div>
        <div class="modal-body">
          <img
            :src="selectedDesigner?.imageDe"
            :alt="selectedDesigner?.name"
            class="modal-image"
          />
          <div class="modal-details">
            <p>
              <strong>Nacionalidad:</strong> {{ selectedDesigner?.nationality }}
            </p>
            <p><strong>Premios:</strong> {{ selectedDesigner?.awards }}</p>
            <p><strong>Biografía:</strong> {{ selectedDesigner?.biography }}</p>
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
  getDesignerDetailsById,
  getDesignerDetailsByName,
  getDesigners,
} from '~/services/designers';
import type { Designer } from '~/interfaces/designers';
import '~/assets/styles/designers.css';

const route = useRoute();

const designers = ref<Designer[]>([]);
const isModalVisible = ref(false);
const selectedDesigner = ref<Designer | null>(null);

const fetchDesignerDetails = async () => {
  const name = route.params.name as string;
  if (name) {
    const designerDetails = await getDesignerDetailsByName(name);
    if (designerDetails) {
      selectedDesigner.value = designerDetails;
      isModalVisible.value = true;
    }
  }
};

onMounted(async () => {
  designers.value = await getDesigners();
  await fetchDesignerDetails();
});

watch(
  () => route.params,
  async () => {
    await fetchDesignerDetails();
  }
);

const showDesignerDetails = async (designerId: number) => {
  const designerDetails = await getDesignerDetailsById(designerId);
  if (designerDetails) {
    selectedDesigner.value = designerDetails;
    isModalVisible.value = true;
  } else {
    selectedDesigner.value = null;
  }
};

const closeModal = () => {
  isModalVisible.value = false;
};
</script>
