<template>
  <v-flex row class="align-center justify-center fill-height">
      <v-avatar color="primary" size="200">
        <v-icon
          size="100"
          v-if="!value"
          @click="$refs.image.click()"
          v-ripple="{ center: true }"
          class="white--text"
        >fa-camera</v-icon>
        <v-img v-else @click="$refs.image.click()" v-ripple="{ center: true }" :src="value" />
        <input ref="image" @change="addImage" type="file" hidden />
      </v-avatar>
    </v-flex>
</template>
<script>
export default {
  name: "FormUserAvatar",
  props: {
    value: {
      type: String
    }
  },
  methods: {
    addImage(e) {
      var file = e.target.files[0];
      if (file) {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.$emit('input', reader.result)
        };
      }
    }
  }
};
</script>