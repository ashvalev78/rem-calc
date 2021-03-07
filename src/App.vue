<script>
import Selector from "./components/Selector";

export default {
  name: "App",
  components: {
    Selector,
  },
  data() {
    return {
      typeMock: [
        {
          name: "Новостройка",
          id: "1",
        },
        {
          name: "Вторичное жилье",
          id: "2",
        },
        {
          name: "Загородный дом",
          id: "3",
        },
      ],
    };
  },
};
</script>

<template>
  <div>
    <h2 class="calc-header">Рассчитать стоимость ремонта с материалами</h2>
    <ul class="calc-steps-list">
      <li class="calc-steps-item" :style="{ height: '120px' }">
        <div class="calc-steps-item-icon"></div>
        <div class="calc-steps-item-number-wrapper">
          <div class="calc-steps-item-number">1</div>
        </div>
        <div class="calc-steps-item-name">Выберите тип недвижимости</div>
        <Selector :items="typeMock" />
      </li>
      <li class="calc-steps-item" :style="{ height: '120px' }">
        <div class="calc-steps-item-icon"></div>
        <div class="calc-steps-item-number-wrapper">
          <div class="calc-steps-item-number">2</div>
        </div>
        <div class="calc-steps-item-name">Выберите тип недвижимости</div>
        <Selector :items="typeMock" />
      </li>
      <li class="calc-steps-item" :style="{ height: '120px' }">
        <div class="calc-steps-item-icon"></div>
        <div class="calc-steps-item-number-wrapper">
          <div class="calc-steps-item-number">3</div>
        </div>
        <div class="calc-steps-item-name">Выберите тип недвижимости</div>
        <Selector :items="typeMock" />
      </li>
      <li class="calc-steps-item" :style="{ height: '120px' }">
        <div class="calc-steps-item-icon"></div>
        <div class="calc-steps-item-number-wrapper">
          <div class="calc-steps-item-number">4</div>
        </div>
        <div class="calc-steps-item-name">Выберите тип недвижимости</div>
        <Selector :items="typeMock" />
      </li>
      <li class="calc-steps-item" :style="{ height: '120px' }">
        <div class="calc-steps-item-icon"></div>
        <div class="calc-steps-item-number-wrapper">
          <div class="calc-steps-item-number">5</div>
        </div>
        <div class="calc-steps-item-name">Выберите тип недвижимости</div>
        <Selector :items="typeMock" />
      </li>
      <li class="calc-steps-item" :style="{ height: '120px' }">
        <div class="calc-steps-item-icon"></div>
        <div class="calc-steps-item-number-wrapper">
          <div class="calc-steps-item-number">6</div>
        </div>
        <div class="calc-steps-item-name">Выберите тип недвижимости</div>
        <Selector :items="typeMock" />
      </li>
      <li class="calc-steps-item" :style="{ height: '120px' }">
        <div class="calc-steps-item-icon"></div>
        <div class="calc-steps-item-number-wrapper">
          <div class="calc-steps-item-number">7</div>
        </div>
        <div class="calc-steps-item-name">Выберите тип недвижимости</div>
        <Selector :items="typeMock" />
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.calc-header {
  font-size: 24px;
  font-weight: bold;
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
      background: red;
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
      border: 1px solid red;
      color: red;

      &-wrapper {
        height: 100%;
        position: relative;
        padding-top: 15px;
        margin-right: 24px;
        &::after {
          content: "";
          height: calc(100% - 44px);
          border: 1px dashed red;
          position: absolute;
          top: 42px;
          left: 50%;
          transform: translate(-50%, 0);
        }
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

* {
  padding: 0;
  margin: 0;
}

ul {
  list-style-type: none;
}
</style>
