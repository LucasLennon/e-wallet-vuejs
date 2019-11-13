import Vuex from "vuex";

import Vuetify from "vuetify";
import VueCurrencyInput from "vue-currency-input";
import VueTheMask from "vue-the-mask";
import BaseAlert from "@/core/components/Base/BaseAlert";

import { shallowMount, createLocalVue } from "@vue/test-utils";

import ExchangePage from "../pages/Exchange.page.vue";
import MockVuex from "./MockVuex";

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueCurrencyInput);
localVue.use(VueTheMask);
localVue.use(Vuetify);
localVue.component("BaseAlert", BaseAlert);

describe("Exchange Page Exchangers", () => {
  let store;

  beforeEach(() => {
    store = new Vuex.Store(MockVuex);
  });

  it("should exchangeToDolarValue return a valid Dolar cotation Value", () => {
    const value = 100000;
    const wrapper = shallowMount(ExchangePage, { store, localVue });

    expect(wrapper.vm.exchangeToDolarValue(100000)).toBe(
      value / wrapper.vm.dolarInfo.cotacaoCompra
    );
  });
  it("should exchangeToDolarValue return a valid Value from Dolar cotation (reverse)", () => {
    const value = 500;
    const wrapper = shallowMount(ExchangePage, { store, localVue });

    expect(wrapper.vm.exchangeFromDolarValue(500)).toBe(
      value * wrapper.vm.dolarInfo.cotacaoVenda
    );
  });
  it("should exchangeToBitcoinValue return a valid Bitcoin cotation Value", () => {
    const value = 100000;
    const wrapper = shallowMount(ExchangePage, { store, localVue });

    expect(wrapper.vm.exchangeToBitcoinValue(100000)).toBe(
      value / wrapper.vm.bitcoinInfo.high
    );
  });
  it("should exchangeFromBitcoinValue return a valid value from a Bitcoin cotation (reverse)", () => {
    const value = 1;
    const wrapper = shallowMount(ExchangePage, { store, localVue });

    expect(wrapper.vm.exchangeFromBitcoinValue(1)).toBe(
      wrapper.vm.bitcoinInfo.low * value
    );
  });
});

describe("Exchange Page Prevent Exchange", () => {
  let store;

  beforeEach(() => {
    store = new Vuex.Store(MockVuex);
  });

  it("should preventExchange by default", () => {
    const wrapper = shallowMount(ExchangePage, { store, localVue });
    expect(wrapper.vm.preventExchange()).toBe(true);
    expect(
      !!wrapper.vm.$el.querySelector(".exchangeButton").getAttribute("disabled")
    ).toBe(true);
  });
  it("should preventExchange if same currency exchange", () => {
    const wrapper = shallowMount(ExchangePage, { store, localVue });
    wrapper.setData({
      sendCurrencyType: wrapper.vm.currentUser.currency[0],
      receiveCurrencyType: wrapper.vm.currencyTypes[0],
      receiveCurrencyQuantity: 1,
      sendCurrencyQuantity: 1
    });
    expect(wrapper.vm.preventExchange()).toBe(true);
    expect(
      !!wrapper.vm.$el.querySelector(".exchangeButton").getAttribute("disabled")
    ).toBe(true);
  });
  it("should preventExchange be false on value change", () => {
    const wrapper = shallowMount(ExchangePage, { store, localVue });
    wrapper.setData({
      sendCurrencyType: wrapper.vm.currentUser.currency[0],
      receiveCurrencyType: wrapper.vm.currencyTypes[1],
      receiveCurrencyQuantity: 1,
      sendCurrencyQuantity: 1,
    });
    expect(wrapper.vm.preventExchange()).toBe(false);
    expect(
      !!wrapper.vm.$el.querySelector(".exchangeButton").getAttribute("disabled")
    ).toBe(false);
  });
});

// defineSendValue;
// defineReceiveValue;
describe("Exchange Page Define Values", () => {
   let store;

   beforeEach(() => {
     store = new Vuex.Store(MockVuex);
   });

   it("should defineSendValue BRL", () => {
     const wrapper = shallowMount(ExchangePage, { store, localVue });
     wrapper.setData({
       sendCurrencyType: wrapper.vm.currentUser.currency[0],
       receiveCurrencyType: wrapper.vm.currencyTypes[0],
       receiveCurrencyQuantity: 1,
       sendCurrencyQuantity: 1
     });
     expect(wrapper.vm.defineSendValue(1)).toBe(1);
   });
   it("should defineSendValue BITCOIN", () => {
     const wrapper = shallowMount(ExchangePage, { store, localVue });
     wrapper.setData({
       sendCurrencyType: wrapper.vm.currentUser.currency[3],
       receiveCurrencyType: wrapper.vm.currencyTypes[0],
       receiveCurrencyQuantity: 1,
       sendCurrencyQuantity: 1
     });
     expect(wrapper.vm.defineSendValue(1)).toBe(36500);
   });
   it("should defineSendValue DOLAR|XBT", () => {
     const wrapper = shallowMount(ExchangePage, { store, localVue });
     wrapper.setData({
       sendCurrencyType: wrapper.vm.currentUser.currency[2],
       receiveCurrencyType: wrapper.vm.currencyTypes[0],
       receiveCurrencyQuantity: 1,
       sendCurrencyQuantity: 1
     });
     expect(wrapper.vm.defineSendValue(1)).toBe(4.1756);
   });

   it("should defineReceiveValue BRL", () => {
     const wrapper = shallowMount(ExchangePage, { store, localVue });
     wrapper.setData({
       sendCurrencyType: wrapper.vm.currentUser.currency[0],
       receiveCurrencyType: wrapper.vm.currencyTypes[0],
       receiveCurrencyQuantity: 1,
       sendCurrencyQuantity: 1
     });
     wrapper.vm.defineReceiveValue(1);
     expect(wrapper.vm.sendCurrencyQuantity).toBe(1);
   });
   it("should defineReceiveValue BITCOIN", () => {
     const wrapper = shallowMount(ExchangePage, { store, localVue });
     wrapper.setData({
       sendCurrencyType: wrapper.vm.currentUser.currency[0],
       receiveCurrencyType: wrapper.vm.currencyTypes[3],
       receiveCurrencyQuantity: 1,
       sendCurrencyQuantity: 1
     });
     wrapper.vm.defineReceiveValue(36500);
     expect(wrapper.vm.sendCurrencyQuantity).toBe(1);
   });
   it("should defineReceiveValue DOLAR|XBT", () => {
     const wrapper = shallowMount(ExchangePage, { store, localVue });
     wrapper.setData({
       sendCurrencyType: wrapper.vm.currentUser.currency[0],
       receiveCurrencyType: wrapper.vm.currencyTypes[2],
       receiveCurrencyQuantity: 1,
       sendCurrencyQuantity: 1
     });
     wrapper.vm.defineReceiveValue(4.1756);
     expect(wrapper.vm.sendCurrencyQuantity).toBe(1);
   });
});
