import momentApi from "moment-timezone";

export default function moment(date?: string,format?:string) {
	return momentApi(date,format).tz("America/Sao_Paulo");
}
