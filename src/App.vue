<script>
import Selector from "./components/Selector";
import API from "./data_access";

export default {
  name: "App",
  components: {
    Selector,
  },
  data() {
    return {
      loading: true,
      data: null,
      square: 0,
      floorHeight: null,
    };
  },
  watch: {
    square() {
      if (this.square > 1000) {
        this.square = 1000;
      }
    },
  },
  computed: {
    finalCost() {
      if (this.data) {
        const floorType =
          this.data.floor_types.find(
            (floor) => floor.text === this.floorHeight
          ) || 0;
        const stepsSumms = this.data.steps.map((step) => {
          if (step.chooses.length <= 0) return 0;
          const choose = step.chooses[step.selectedId] || step.chooses[0];

          return (
            (this.square * this.data.base_price * +choose.coefficient +
              choose.price_increase) *
            +floorType.coefficient
          );
        });
        return Math.floor(stepsSumms.reduce((acc, curVal) => acc + curVal));
      }
      return 0;
    },
  },
  methods: {
    setStepSelection(stepId, selectionId) {
      this.data.steps[stepId].selectedId = selectionId;
    },
  },
  async mounted() {
    const APIString = this.$refs.container.parentNode.getAttribute("api");
    const req = API.getConfig(APIString);

    req
      .then((resp) => {
        if (resp.ok) {
          const data = resp.json();
          return data;
        } else {
          alert("Проблема при загрузке данных для калькулятора");
          console.error("Calc error = ", resp.status);
          console.error(resp.statusText);
          return null;
        }
      })
      .then((data) => {
        if (data) {
          this.data = data;
          this.square = this.data.base_square;
          this.floorHeight = this.data.floor_types[0].text;
          this.loading = false;
        }
      });
  },
};
</script>

<template>
  <div class="app-container" ref="container">
    <div v-if="loading">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    <div class="calc-wrapper" v-else>
      <h3 class="calc-header">Рассчитать стоимость ремонта с материалами</h3>
      <ul class="calc-steps-list">
        <li
          v-for="id of data.steps.map((item, id) => id)"
          :key="id"
          class="calc-steps-item"
        >
          <img
            class="calc-steps-item-icon"
            :src="data.steps[id].icon_url"
            v-if="data.steps[id].icon_url"
          />
          <div class="calc-steps-item-icon" v-else></div>
          <div class="calc-steps-item-number-wrapper">
            <div class="calc-steps-item-number">{{ id + 1 }}</div>
          </div>
          <div class="calc-steps-item-name">{{ data.steps[id].name }}</div>
          <Selector
            :items="
              data.steps[id].chooses.map((item, index) => ({
                name: item.text,
                id: index,
              }))
            "
            :description="data.steps[id].description"
            @selection="(selectionId) => setStepSelection(id, selectionId)"
          />
        </li>
      </ul>
      <div class="calc-square">
        <span class="calc-square-label">Общая площадь, м^2</span>
        <input
          type="number"
          :min="data.base_square"
          class="calc-square-input"
          v-model="square"
        />
      </div>
      <div class="calc-height">
        <span class="calc-height-label">Высота потолков, м</span>
        <select class="calc-height-select" v-model="floorHeight">
          <option
            class="calc-height-option"
            v-for="opt of data.floor_types"
            :key="opt.text"
            >{{ opt.text }}</option
          >
        </select>
      </div>
      <div class="calc-result">
        <h3 class="calc-header calc-header-result">
          Результаты предварительного расчета
        </h3>
        <div class="calc-final_cost">
          <span class="calc-final_cost-label">Итого</span>
          <span class="calc-final_cost-number"
            ><span style="font-size: 32px">{{ `${finalCost} ` }}</span
            >рублей</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.calc-header {
  font-size: 24px;
  font-weight: bold;
  text-transform: uppercase;

  &-result {
    margin-top: 24px;
    text-align: center;
  }
}

.calc-result {
  display: flex;
  flex-flow: column;
  align-items: center;
}

.calc-final_cost {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: flex-end;
  margin-top: 32px;

  &-label {
    font-weight: bold;
    font-size: 24px;
  }

  &-number {
    font-weight: bold;
    font-size: 24px;
  }
}

.calc-wrapper {
  overflow: hidden;
  display: flex;
  flex-flow: column;
  align-items: center;
}

.calc-height {
  padding-left: 210px;
  margin-top: 20px;
  flex: 1;
  display: flex;
  width: 100%;
  align-items: center;

  &-label {
    font-weight: bold;
    width: 20%;
  }

  &-select {
    padding: 10px 40px;
    border: 1px solid #807f92;
    border-radius: 5px;
    text-align: center;
    outline: none;
  }
}

.calc-square {
  padding-left: 210px;
  flex: 1;
  display: flex;
  width: 100%;
  align-items: center;

  &-label {
    font-weight: bold;
    width: 20%;
  }

  &-input {
    outline: none;
    border: 1px solid #807f92;
    border-radius: 6px;
    display: flex;
    text-align: center;
    padding: 10px 40px;
    max-width: 40px;
  }
}

.calc-steps {
  &-list {
    display: flex;
    flex-flow: column;
  }

  &-item {
    display: flex;

    &-icon {
      width: 40px;
      height: 40px;
      margin-top: 10px;
      margin-right: 12px;
    }

    &-number {
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 25px;
      height: 25px;
      border: 1px solid #807f92;

      &-wrapper {
        height: 100%;
        position: relative;
        padding-top: 15px;
        margin-right: 24px;
        /* &::after {
          content: "";
          height: calc(100% - 44px);
          border: 1px dashed #807f92;
          position: absolute;
          top: 42px;
          left: 50%;
          transform: translate(-50%, 0);
        } */
      }
    }

    &:last-child {
      .calc-steps-item-number-wrapper::after {
        display: none;
      }
    }

    &-name {
      font-weight: bold;
      padding-top: 20px;
      width: 20%;
    }
  }
}

@media screen and (max-width: 750px) {
  .calc-steps-item {
    flex-flow: column;
    margin-bottom: 32px;

    &-name {
      font-weight: bold;
      padding-top: 20px;
      width: 100%;
    }

    &-icon {
      display: none;
    }

    &-number {
      &-wrapper {
        display: none;
      }
    }
  }
  .calc-square,
  .calc-height {
    padding-left: 0;
  }
}

* {
  padding: 0;
  margin: 0;
}

* {
  font-family: "Montserrat", sans-serif !important;
  font-size: 12px;
  color: #331809;
}

ul {
  list-style-type: none;
}
</style>
