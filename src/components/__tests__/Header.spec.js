import { describe, it, expect } from 'vitest';
import { mount, config } from '@vue/test-utils';
import Vuetify from 'vuetify';
import Header from '../Header/Header.vue';

config.global.plugins = [Vuetify];

describe('Header', () => {
  it('should display a headline /w the text "einkaufs:planer"', () => {
    const wrapper = mount(Header, {
      global: {
        plugins: [Vuetify]
      }
    });

    const headline = wrapper.find('.header__headline');
    expect(headline.exists()).toBe(true);
    expect(headline.text()).toContain('einkaufs:planer');
  });
});
