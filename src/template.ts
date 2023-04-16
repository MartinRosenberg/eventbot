import nunjucks from "nunjucks";
import { z } from "zod";

nunjucks.configure("templates", { autoescape: false });

export const eventDataSchema = z.object({
	name: z.string().or(z.null()),
	date: z.string().or(z.null()),
	location: z.string().or(z.null()),
	url: z.string().or(z.null()),
});
export type EventData = z.infer<typeof eventDataSchema>;

export async function render(name: string, args: Record<string, any>): Promise<string> {
	for (const [key, value] of Object.entries(args)) {
		if (typeof value === "object") args[key] = JSON.stringify(value);
	}
	return nunjucks.render(`${name}.njk`, args);
}

export async function promptCreateEvent(args: { dateWithTZ: string; eventInfo: string }): Promise<string> {
	return render("prompt-create-event", args);
}

export async function promptEditEvent(args: {
	dateWithTZ: string;
	existingEventData: EventData;
	updateInfo: string;
}): Promise<string> {
	return render("prompt-edit-event", args);
}

export async function proposedEvent(args: {
	name: string;
	date: string;
	location: string;
	url: string;
	desc: string;
}): Promise<string> {
	return render("proposed-event", args);
}
