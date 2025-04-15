declare module "docxtemplater-image-module-free" {
	class ImageModule {
		constructor(options: {
			centered?: boolean;
			fileType?: "docx" | "pptx" | string;
			getImage: (tag: any) => Buffer | string;
			getSize: () => number[];
		});
	}

	export = ImageModule;
}
