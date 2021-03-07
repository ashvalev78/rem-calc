<script>
export default {
  name: "Selector",
  props: {
    description: {
      required: false,
      default: "",
      type: String,
    },
    items: {
      required: true,
      default: () => [],
      type: Array,
    },
  },
  data() {
    return {
      selectedItemId: 0,
    };
  },
  watch: {
    selectedItemId() {
      this.$emit("selection", this.selectedItemId);
    },
  },
};
</script>

<template>
  <div class="selector-wrapper">
    <div class="selector-items">
      <div
        v-for="item of items"
        class="selector-item"
        :class="{ 'selector-item--selected': selectedItemId === item.id }"
        :key="item.id"
        @click="selectedItemId = item.id"
      >
        {{ item.name }}
      </div>
    </div>
    <p class="selector-description">{{ description }}</p>
  </div>
</template>

<style lang="scss" scoped>
.selector-wrapper {
  display: flex;
  flex-flow: column;
  flex: 1;
  padding-top: 5px;
}

.selector-items {
  display: flex;
  overflow-x: auto;
}

.selector-item {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #eaeaea;
  font-weight: bold;
  border-radius: 10px;
  padding: 12px 7px;
  margin-right: 2%;
  cursor: pointer;

  &--selected {
    background-color: #daa520;
  }
}

.selector-description {
  display: flex;
  color: #807f92;
  font-style: italic;
}

p {
  margin-block-start: 0;
  margin-block-end: 0;
  margin-top: 10px;
}
</style>
