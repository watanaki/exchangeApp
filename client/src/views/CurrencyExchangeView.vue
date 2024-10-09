<template>
  <el-container>
    <el-form :model="form" class="exchange-form" label-width="80px">
      <el-form-item label="从货币">
        <el-select v-model="form.fromCurrency" placeholder="选择货币">
          <el-option v-for="currency in currencies" :label="currency" :value="currency" />
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button @click="swopCurrency" style="margin: auto;">对调</el-button>
      </el-form-item>

      <el-form-item label="到货币" label-width="80px">
        <el-select v-model="form.toCurrency" placeholder="选择货币">
          <el-option v-for="currency in currencies" :label="currency" :value="currency" />
        </el-select>
      </el-form-item>

      <el-form-item label="金额" label-width="80px">
        <el-input v-model="form.amount" type="number" min="0" placeholder="输入金额" />
      </el-form-item>

      <el-form-item>
        <el-button @click="exchange" type="primary">兑换</el-button>
      </el-form-item>

      <el-form-item>
        <el-button @click="fetchCurrencies" type="primary">get</el-button>
      </el-form-item>

      <div v-if="res" class="result">
        <p>兑换结果: {{ res }}</p>
      </div>

    </el-form>


  </el-container>
</template>

<script setup lang="ts">
import axios from '../axios';
import { onBeforeMount, ref } from 'vue';

interface ExchangeInfo {
  fromCurrency: string,
  toCurrency: string,
  rate: number,
}

const form = ref({
  fromCurrency: '',
  toCurrency: '',
  amount: 0,
});

const res = ref<number | null>(0);
const currencies = ref<string[]>([]);
const rates = ref<ExchangeInfo[]>([]);

onBeforeMount(() => {
  fetchCurrencies();
});

const fetchCurrencies = async () => {
  try {
    const res = await axios.get<ExchangeInfo[]>('/exchangeRates');
    rates.value = res.data;
    currencies.value = [
      ...new Set(res.data.map(
        (rate: ExchangeInfo) => [rate.fromCurrency, rate.toCurrency]
      ).flat())
    ];
    // console.log(currencies.value);

  } catch (error) {
    console.log("Failed to load currencies", error);
  }
};

const exchange = () => {
  if (form.value.amount <= 0) {
    res.value = 0;
    return;
  }
  const { fromCurrency: from, toCurrency: to } = form.value;
  let rate = 0;
  if (from === to) rate = 1;
  else {
    for (let i = 0; i < rates.value.length; i++) {
      let { fromCurrency, toCurrency, rate: r } = rates.value[i];
      if (fromCurrency === from && toCurrency === to) {
        rate = r;
        break;
      }
      else if (fromCurrency === to && toCurrency === from) {
        rate = 1 / r;
        break;
      }
    }
  }
  res.value = form.value.amount * rate;
}

const swopCurrency = () => {
  const { fromCurrency, toCurrency } = form.value;
  if (fromCurrency || toCurrency)
    [form.value.fromCurrency, form.value.toCurrency] = [toCurrency, fromCurrency];
}

</script>

<style scoped></style>