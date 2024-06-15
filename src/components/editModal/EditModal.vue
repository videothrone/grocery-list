<template>
  <v-dialog class="groceries-planer__modal" v-model="modal">
    <v-form
      class="groceries-planer__modal-form"
      ref="formRef"
      @submit.prevent="saveEdit"
      novalidate
    >
      <v-card class="groceries-planer__modal-card">
        <h3 class="groceries-planer__modal-card-headline">Edit product</h3>
        <v-card-text>
          <v-text-field
            v-model="localEditedProduct.name"
            label="Product"
            type="text"
            :rules="[rules.required]"
          ></v-text-field>
          <v-text-field
            v-model="localEditedProduct.quantity"
            label="Quantity"
            type="number"
            :rules="[rules.required, rules.numeric]"
          ></v-text-field>
        </v-card-text>
        <v-card-actions class="groceries-planer__modal-card-actions">
          <v-btn type="submit" class="groceries-planer__modal-save-button">Save</v-btn>
          <v-btn @click="closeModal" color="error">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  editModal: Boolean,
  editedProduct: Object
});

const emits = defineEmits(['save-edit-modal', 'close-edit-modal']);

const modal = ref(props.editModal);
const localEditedProduct = ref({ ...props.editedProduct });
const formRef = ref(null);

const rules = {
  required: (value) => !!value || 'This field is required.',
  numeric: (value) => /^\d*\.?\d+$/.test(value) || 'Please enter a valid number.'
};

watch(
  () => props.editModal,
  (newVal) => {
    modal.value = newVal;
  }
);

watch(
  () => props.editedProduct,
  (newVal) => {
    localEditedProduct.value = { ...newVal };
  }
);

const saveEdit = () => {
  formRef.value?.validate().then((response) => {
    if (!response.valid) {
      return;
    }

    emits('save-edit-modal', localEditedProduct.value);
    closeModal();
  });
};

const closeModal = () => {
  emits('close-edit-modal');
};
</script>

<style lang="scss" scoped>
@import '@/components/editModal/EditModal.scss';
</style>
