import { selectPeerAudioByID } from "@100mslive/hms-video-store";
import { hmsStore } from "./hms";

/**
 * show audio level by creating a box shadow around the peer element when the person speaks
 * @return the unsubscribe function to run on unmount
 */
export function addAudioBorder(peerId, element) {
  return hmsStore.subscribe((level) => {
    if (!element) {
      return;
    }
    const sigmoid = (num) => 1 / (1 + Math.exp(-num));
    const tile = element.parentNode;
    const color = "#afd3ea";
    if (tile) {
      tile.style.transition = "box-shadow 0.3s ease-in-out";
      tile.style.boxShadow = level
        ? `0px 0px ${24 * sigmoid(level)}px ${color}, 0px 0px ${
            16 * sigmoid(level)
          }px ${color}`
        : "";
    }
    element.style.transition =
      "box-shadow 0.3s ease-in-out, transform 0.5s ease-in-out";
  }, selectPeerAudioByID(peerId));
}
