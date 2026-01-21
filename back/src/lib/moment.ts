import momentApi from "moment-timezone";

export default function moment(date?: string) {
	return momentApi(date).tz("America/Sao_Paulo");
}
