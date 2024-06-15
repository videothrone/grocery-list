<template>
  <v-container class="grocery-list">
    <v-form class="grocery-list__form" ref="form" @submit.prevent="submitForm" novalidate>
      <v-row>
        <v-col cols="12">
          <v-text-field
            :key="newProductKey"
            v-model="newProduct"
            label="Product"
            type="text"
            :rules="[rules.required]"
            required
          />
          <v-text-field
            v-model="newQuantity"
            label="Quantity"
            type="number"
            :rules="[rules.required, rules.numeric]"
            required
          />
          <div class="grocery-list__form-buttons">
            <v-btn type="submit" color="primary">Add product</v-btn>
            <v-btn
              v-if="products.length > 0"
              icon="mdi-restore"
              class="grocery-list__form-buttons-reset"
              @click="deleteAllProducts"
            >
              <v-icon>mdi-restore</v-icon>
              <span aria-hidden="true" class="visually-hidden">Delete all products</span>
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
  <v-container class="grocery-list__list-container">
    <v-row class="grocery-list__list">
      <v-col
        class="grocery-list__list-item"
        cols="12"
        v-for="(product, index) in products"
        :key="product.createdAt"
      >
        <v-card
          class="grocery-list__list-item-card"
          :class="{ 'grocery-list__list-item-card--checked': product.checked }"
        >
          <v-card-title class="grocery-list__list-item-card-title">
            <div>{{ product.name }}</div>
          </v-card-title>
          <v-card-text class="grocery-list__list-item-card-text">
            <div>{{ product.quantity }} items</div>
          </v-card-text>
          <v-card-actions class="grocery-list__list-item-card-actions">
            <div>
              <v-btn @click="openEditModal(index)" class="grocery-list__list-item-edit">Edit</v-btn>
              <v-btn @click="deleteProduct(index)" color="error">Delete</v-btn>
            </div>
            <v-checkbox
              class="grocery-list__list-item-card-checkbox"
              v-model="product.checked"
              aria-label="Checked"
              hide-details
              @change="handleToggleChecked(index)"
            />
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  <EditModal
    :editModal="editModal"
    :editedProduct="editedProduct"
    @save-edit-modal="saveEditModal"
    @close-edit-modal="closeEditModal"
  />
</template>

<script setup>
import { ref, watch } from 'vue';
import EditModal from '@/components/editModal/EditModal.vue';

const newProduct = ref('');
const newProductKey = ref(Date.now());
const newQuantity = ref('');
const products = ref(JSON.parse(localStorage.getItem('products')) || []);
const form = ref(null);
const editModal = ref(false);
const editedProduct = ref({ name: '', quantity: '' });

const rules = {
  required: (value) => !!value || 'This field is required.',
  numeric: (value) => /^\d*\.?\d+$/.test(value) || 'Please enter a valid number.'
};

watch(
  products,
  (value) => {
    localStorage.setItem('products', JSON.stringify(value));
  },
  { deep: true }
);

const submitForm = () => {
  form.value?.validate().then((response) => {
    if (response.valid) {
      addProduct();
      resetForm();
    }
    return;
  });
};

const resetForm = () => {
  newProduct.value = '';
  newQuantity.value = '';
  form.value?.resetValidation();

  // Reset the form key value, forces the field to re-render
  // This is a workaround since the field validation would not reset
  newProductKey.value = Date.now();
};

const addProduct = () => {
  // Look for any existing checked products
  const checkedProducts = products.value.filter((product) => product.checked);

  const newProductObject = {
    name: newProduct.value,
    quantity: newQuantity.value,
    checked: false,
    createdAt: new Date().getTime()
  };

  // If there are checked products, put them to the end of the list
  if (checkedProducts.length > 0) {
    const uncheckedProducts = products.value.filter((product) => !product.checked);
    const sortedProducts = [...uncheckedProducts, newProductObject, ...checkedProducts];
    products.value = sortedProducts;
  } else {
    products.value.push(newProductObject);
  }

  resetForm();
};

const deleteProduct = (index) => {
  products.value.splice(index, 1);
};

const deleteAllProducts = () => {
  products.value = [];
  resetForm();
};

const openEditModal = (index) => {
  editedProduct.value = { ...products.value[index] };
  editModal.value = true;
};

const closeEditModal = () => {
  editModal.value = false;
};

const saveEditModal = (updatedProduct) => {
  // Update the product in the products array
  const index = products.value.findIndex(
    (product) => product.createdAt === editedProduct.value.createdAt
  );
  if (index !== -1) {
    products.value[index] = { ...updatedProduct };
  }

  closeEditModal();
};
const handleToggleChecked = (index) => {
  const product = products.value[index];

  if (product.checked) {
    // If the product is checked, move it to the end of the checked products
    const uncheckedProducts = products.value.filter((item) => !item.checked);
    const checkedProducts = products.value.filter((item) => item.checked);
    checkedProducts.sort((a, b) => a.createdAt - b.createdAt);

    products.value = uncheckedProducts.concat(checkedProducts);
  } else {
    // If the product is not checked, move it to the end of the unchecked products
    const uncheckedProducts = products.value.filter((item) => !item.checked);
    uncheckedProducts.sort((a, b) => a.createdAt - b.createdAt);

    products.value = uncheckedProducts.concat(products.value.filter((item) => item.checked));
  }
};
</script>

<style lang="scss" scoped>
@import '@/components/groceryList/GroceryList.scss';
</style>
