<template>
  <v-container class="h-screen">
    <!-- <p>{{ filter }}</p> -->
    <v-row class="text-start">
      <v-col
        class="mb-0"
        v-for="item in state.items"
        :key="item.id"
        cols="12"
        sm="12"
        md="6"
        lg="3"
      >
        <v-card class="rounded-card full-height" height="150">
          <v-img
            :src="`https://picsum.photos/500/300?image=${item.id * 2 + 10}`"
            class="h-100"
            cover
          >
            <v-card-text class="h-100 pa-2 d-flex flex-column">
              <v-row justify="end">
                <v-chip
                  class="ma-3 text-capitalize text-white"
                  :style="{ backgroundColor: item.type == 'vouchers' ? 'blue' : item.type == 'products' ? 'orange' : 'green' }"
                  variant="elevated"
                  dark
                  small
                  >{{ item.type }}
                </v-chip>
              </v-row>
              <v-spacer />
              <v-row justify="start">
                <h3 class="text-grey font-weight-black ma-3">{{ item.point_needed }} Poin</h3>
              </v-row>
            </v-card-text>
          </v-img>
        </v-card>
        <h2 class="pl-1 pt-1">{{ item.name }} </h2>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { reactive } from "vue";

export default {
  name: "Home",
  setup() {
    const state = reactive({
      items: [],
      currentPage: 2
    });

    return { state };
  },
  beforeMount() {
    this.award();
  },
  mounted() {
    this.nextAward();
  },
  computed: {
    filter() {
      return this.$store.state.filterString;
    },
  },
  methods: {
    chipColor() {
      console.log(this.item.type);
      switch ("") {
        case "products":
          return "red";
        case "voucher":
          return "yellow";
        case "giftcards":
          return "orange";
        default:
          return "unknown";
      }
    },
    award() {
      try {
        this.$axios
          .get(
            `http://localhost:8000/api/award?page=1&${this.$store.state.filterString}`
          )
          .then((response) => {
            this.state.items = response.data.data.data;
          });
      } catch (error) {
        console.log(error);
        this.state.error = "Get Award Failed. Please try again.";
      }
    },
    nextAward() {
      window.onscroll = () => {
        let bottom =
          document.documentElement.scrollHeight - document.documentElement.scrollTop ===
          document.documentElement.clientHeight;
        console.log(bottom)
        console.log(document.documentElement.scrollHeight - document.documentElement.scrollTop)
        console.log(document.documentElement.clientHeight)
        if (bottom) {
          try {
            this.$axios
              .get(
                `http://localhost:8000/api/award?page=${this.state.currentPage}&${this.$store.state.filterString}`
              )
              .then((response) => {
                this.state.items.push(...response.data.data.data)
              });

              this.state.currentPage++
          } catch (error) {
            console.log(error);
            this.state.error = "Get Award Failed. Please try again.";
          }
        }
      };
    },
  },
};
</script>

<style>
.rounded-card {
  border-radius: 20px;
}

.v-card-text .v-row {
  flex: none !important;
}
</style>
