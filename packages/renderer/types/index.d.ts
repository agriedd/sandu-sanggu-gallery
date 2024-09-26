
export type ImageLabel = {
	label: string,
	path: string,
}

declare global {

	type EventCallbackonShowImage = (event: Electron.IpcRendererEvent, label: string) => void;
	type EventCallbackonLoadImageListJson = (event: Electron.IpcRendererEvent, labels: ImageLabel[]) => void;

	interface Window {
		galleryApi: {
			startGallery: () => void,
			stopGallery: () => void,
			onShowImage: (callback: EventCallbackonShowImage) => void,
			requestImageListJson: () => void,
			onLoadImageListJson: (callback: EventCallbackonLoadImageListJson) => void,
		},
	}
}

export { };