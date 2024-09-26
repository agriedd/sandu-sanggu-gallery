<script lang="ts" setup>

import { computed, ref } from 'vue';
import type { Ref } from 'vue';
import type { ImageLabel } from '../types/index';

const startGallery = ()=>{
  window.galleryApi.startGallery();
};

const image = ref('ina_boi');
const imageActive = computed(()=>{
  let exists = images.value.findIndex((e: ImageLabel) => e.label === image.value);
  let active = null;
  if(exists > -1){
    active = images.value[exists].path;
  } else {
    active = images.value[0]?.path || null;
  }
  return active;
});
const images: Ref<ImageLabel[]> = ref([]);

window.galleryApi.onShowImage((_event, label)=>{
  image.value = label.toString();
});
window.galleryApi.onLoadImageListJson((_event, labels) => {
  images.value = labels;
});
window.galleryApi.requestImageListJson();
/**
 * import style tailwind
 * 
 */
import '../assets/app.css';

const container = ref<HTMLElement | null>(null);
// const { toggle } = useFullscreen(container);
const fullScreen = ref(false);

const toggleFullscreen = ()=>{
  fullScreen.value = !fullScreen.value;
};

</script>

<template>
  <div 
    ref="container"
    class="grid grid-cols-1 gap-1 pt-14" 
  >
    <div class="p-5 grid grid-cols-1 gap-1 max-w-lg mx-auto w-full">
      <button 
        class="p-4 w-full bg-slate-200 hover:bg-slate-400 flex justify-between rounded-md fill-slate-700"
        @click="startGallery()"
      >
        <div class="text-sm">
          Sandu Sanggu Galeri
        </div>
        <div>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
          ><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10c5.515 0 10-4.486 10-10S17.515 2 12 2zm0 14-5-6h10l-5 6z"></path></svg>
        </div>
      </button>
      <button 
        class="p-4 w-full bg-slate-200 hover:bg-slate-400 flex justify-between rounded-md fill-slate-700"
        @click="startGallery()"
      >
        <div class="text-sm">
          Sandu Sanggu Animasi
        </div>
        <div>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
          ><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10c5.515 0 10-4.486 10-10S17.515 2 12 2zm0 14-5-6h10l-5 6z"></path></svg>
        </div>
      </button>
    </div>
    <div class="h-12 w-full title-bar fixed top-0 left-0 right-0 cursor-grab"></div>
    <div 
      v-if="imageActive" 
      class="fixed bg-black w-full flex justify-center items-center bottom-0 transition-all"
      :class="[
        {
          'h-full': fullScreen,
          'h-96': !fullScreen
        }
      ]"
    >
      <div class="flex gap-1 fixed bottom-0 right-0">
        <button 
          class="p-2 fill-slate-300 opacity-25 hover:opacity-100"
          @click="toggleFullscreen()"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
          ><path d="M21 11H6.414l5.293-5.293-1.414-1.414L2.586 12l7.707 7.707 1.414-1.414L6.414 13H21z"></path></svg>
        </button>
        <button 
          class="p-2 fill-slate-300 opacity-25 hover:opacity-100"
          @click="toggleFullscreen()"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
          ><path d="M5 5h5V3H3v7h2zm5 14H5v-5H3v7h7zm11-5h-2v5h-5v2h7zm-2-4h2V3h-7v2h5z"></path></svg>
        </button>
      </div>
      <Transition 
        name="fade" 
        :mode="'out-in'"
      >
        <img 
          :key="imageActive"
          :src="imageActive"
          crossorigin="use-credentials"
          alt="Gambar aktif"
          class="max-h-full m-auto w-auto"
        >
      </Transition>
    </div>
  </div>
</template>

<style>

.title-bar{
  -webkit-app-select: none;
  -webkit-app-region: drag;
}

.fade-enter-active,
  .fade-leave-active {
    transition: all 0.5s ease;
  }

  .fade-enter-from{
    opacity: 0;
    transform: translateY(-50%);
  }
  .fade-leave-to {
    opacity: 0;
    transform: translateY(50%);
  }
</style>
