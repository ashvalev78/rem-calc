<script>
export default {
  name: "Selector",
  props: {
    description: {
      required: false,
      default: "",
      type: String
    },
    items: {
      required: true,
      default: () => [],
      type: Array
    }
  },
  data() {
    return {
      selectedItemId: this.items[0].id
    };
  },
  watch: {
    selectedItemId() {
      this.$emit("selection", this.selectedItemId);
    }
  }
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
    <p class="selector-description">lorem ipsum</p>
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
  cursor: pointer;
}

.selector-item {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: lightgray;
  font-weight: bold;
  border-radius: 10px;
  padding: 15px 7px;
  margin-right: 2%;

  &--selected {
    background-color: goldenrod;
  }
}

.selector-description {
  display: flex;
  color: lightgray;
  font-style: italic;
}
</style>
