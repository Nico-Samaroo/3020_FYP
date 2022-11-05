import type { Component, ComponentPublicInstance } from "vue";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";

declare module "@vue/runtime-core" {
  export interface GlobalComponents {
    fa: { icon: IconDefinition };
  }
}
