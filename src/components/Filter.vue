<template>
  <v-container class="h-screen pa-10">
    <!-- <p>Filter {{ filterString }}</p> -->
    <v-row>
      <v-col cols="12" class="pa-0">
        <v-chip
          v-if="state.chipPoin"
          class="ml-0 mr-0 mb-3"
          color="blue"
          closable
          @click:close="closeChipPoin"
        >
          Poin: {{ state.slider[0] }} - {{ state.slider[1] }}
        </v-chip>
      </v-col>
      <v-col cols="12" class="pa-0">
        <v-chip
          v-if="state.chipType"
          class="ml-0 mr-0 mb-3"
          color="blue"
          closable
          @click:close="closeChipType"
        >
          Type: {{ formattedState }}
        </v-chip>
      </v-col>
      <v-col cols="12" class="pa-0">
        <v-btn
          size="small"
          variant="tonal"
          color="blue"
          v-if="state.chipPoin && state.chipType"
          v-on:click="clearFilter"
        >
          Clear All Filter
        </v-btn>
      </v-col>
    </v-row>

    <v-row class="mt-10">
      <b>Point Needed</b>
    </v-row>
    <v-row justify="space-between">
      <b>IDR 10.000</b>
      <b>IDR 500.000</b>
    </v-row>
    <v-range-slider
      v-model="state.slider"
      :max="500000"
      :min="10000"
      step="1000"
      track-color="grey"
      track-fill-color="blue"
      thumb-color="white"
      strict
    ></v-range-slider>
    <v-row>
      <b>Awards Type</b>
    </v-row>
    <v-row>
      <!-- <p>{{ state.type }}</p> -->
      <v-col cols="12" class="pa-0">
        <v-checkbox
          density="compact"
          v-model="state.type"
          label="All Type"
          value="all"
          color="blue"
          hide-details
        ></v-checkbox>
      </v-col>
      <v-col cols="12" class="pa-0">
        <v-checkbox
          density="compact"
          v-model="state.type"
          label="Vouchers"
          value="vouchers"
          color="blue"
          hide-details
        ></v-checkbox>
      </v-col>
      <v-col cols="12" class="pa-0">
        <v-checkbox
          density="compact"
          v-model="state.type"
          label="Products"
          value="products"
          color="blue"
          v-bind:on-update:model-value="
            state.slider[0] != 10000 || state.slider[1] != 500000
              ? (state.chipPoin = true)
              : (state.chipPoin = false)
          "
          hide-details
        ></v-checkbox>
      </v-col>
      <v-col cols="12" class="pa-0">
        <v-checkbox
          density="compact"
          v-model="state.type"
          label="Others"
          value="giftcards"
          color="blue"
          v-bind:on-update:model-value="
            state.type.length > 0
              ? (state.chipType = true)
              : (state.chipType = false)
          "
          hide-details
        ></v-checkbox>
      </v-col>
      <v-col cols="12" class="text-center pa-0 mt-10">
        <RouterLink to="/home">
          <v-btn class="w-100" variant="elevated" color="blue"> Filter </v-btn>
        </RouterLink>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { reactive } from "vue";

export default {
  name: "Filter",

  computed: {
    formattedState() {
      const capitalizedArray = this.state.type.map(
        (word) => word.charAt(0).toUpperCase() + word.slice(1)
      );

      const result = capitalizedArray.join(", ");

      return result;
    },
    filterString() {
      return `point_start=${this.state.slider[0]}&point_end=${
        this.state.slider[1]
      }&type=${this.state.type.join(",")}`;
    },
  },
  beforeUnmount() {
    this.$store.commit(
      "setFilter",
      `point_start=${this.state.slider[0]}&point_end=${
        this.state.slider[1]
      }&type=${this.state.type.join(",")}`
    );
  },
  methods: {
    clearFilter() {
      this.state.slider = [10000, 500000];
      this.state.type = [];
      this.state.chipPoin = false;
      this.state.chipType = false;
      this.state.filterString = "";

      this.$router.push("/home");
    },
    closeChipPoin() {
      this.state.chipPoin = false;
      this.state.slider = [10000, 500000];

      this.$router.push("/home");
    },
    closeChipType() {
      this.state.chipType = false;
      this.state.type = [];

      this.$router.push("/home");
    },
  },
  setup() {
    const state = reactive({
      slider: [10000, 500000],
      type: [],
      chipPoin: false,
      chipType: false,
      filterString: "",
    });

    return { state };
  },
};
</script>
