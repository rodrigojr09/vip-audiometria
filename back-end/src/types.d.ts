declare module "xlsx-populate" {
	export interface OutputOptions {
		type?:
			| "base64"
			| "binarystring"
			| "uint8array"
			| "arraybuffer"
			| "blob"
			| "nodebuffer";
		password?: string;
	}

	export interface Workbook {
		sheet(nameOrIndex: string | number): Worksheet | undefined;
		outputAsync(
			opts?: OutputOptions
		): Promise<string | Uint8Array | ArrayBuffer | Blob | Buffer>;
		sheets: () => Array<Sheet>;
	}

	export interface Worksheet {
		cell(cell: string): Cell;
	}

	export interface Cell {
		value(value: any): Cell;
	}

	export function fromFileAsync(path: string): Promise<Workbook>;
}
