import { mount } from '@vue/test-utils';
import { expect, describe, it, vi } from 'vitest';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import EditModal from '../editModal/EditModal.vue';

const vuetify = createVuetify({
  components,
  directives
});

describe('EditModal', () => {
  it('simulate a successful form submission, by mocking the formRef.validate() method to return true', () => {
    // Arrange
    const mockEditedProduct = {
      name: 'Testprodukt',
      quantity: 10
    };
    const mockSaveEditModal = vi.fn();
    const mockCloseModal = vi.fn();

    const wrapper = mount(EditModal, {
      props: {
        editModal: true,
        editedProduct: mockEditedProduct
      },
      global: {
        plugins: [vuetify]
      },
      emits: {
        'save-edit-modal': mockSaveEditModal,
        'close-edit-modal': mockCloseModal
      }
    });

    const formRef = wrapper.vm.formRef;
    vi.spyOn(formRef, 'validate').mockReturnValue(Promise.resolve({ valid: true }));
    vi.spyOn(wrapper.vm, 'saveEdit').mockImplementation(() => {
      mockSaveEditModal(wrapper.vm.localEditedProduct);
      mockCloseModal();
    });

    // Act
    wrapper.vm.saveEdit();

    // Assert
    expect(mockSaveEditModal).toHaveBeenCalledWith(mockEditedProduct);
    expect(mockCloseModal).toHaveBeenCalled();
  });
});
