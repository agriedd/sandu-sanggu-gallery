import { contextBridge, ipcRenderer } from 'electron';
import { ImageLabel } from '../../../../../types';

type EventCallbackonShowImage = (event: Electron.IpcRendererEvent, label: string) => void;
type EventCallbackonLoadImageListJson = (event: Electron.IpcRendererEvent, labels: ImageLabel[]) => void;

contextBridge.exposeInMainWorld('galleryApi', {
	startGallery: () => {
		ipcRenderer.send('start-gallery');
	},
	requestImageListJson: () => {
		ipcRenderer.send('load-image-list');
	},
	onLoadImageListJson: (callback: EventCallbackonLoadImageListJson) => {
		ipcRenderer.on('load-image-labels-complete', callback);
	},
	stopGallery: () => {
		ipcRenderer.send('stop-gallery', false);
	},
	onShowImage: (callback: EventCallbackonShowImage) => {
		ipcRenderer.on('show-image-label', callback);
	},
});