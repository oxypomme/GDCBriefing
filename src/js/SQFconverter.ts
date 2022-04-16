import type Delta from "quill-delta";
import type AttributeMap from "quill-delta/dist/AttributeMap";

/**
 * Prepare various attributes for XML parsing
 *
 * https://community.bistudio.com/wiki/createDiaryRecord
 * TODO: img (don't show image)
 * TODO: marker
 * TODO: log
 * TODO: gear
 * TODO: currentTask
 * TODO: font
 *
 * @param {object} attributes The attributes
 * @returns The object
 */
const parseAttributes = (attributes: AttributeMap) => {
	const tags: Record<string, Record<string, string | number>> = {};
	// Parsing color
	if (attributes.color) {
		tags.font = {
			...(tags.font ?? {}),
			color: attributes?.color,
		};
	}
	// Parsing size
	if (attributes.size) {
		let pxSize;
		switch (attributes.size) {
			case "small":
				pxSize = 9.75;
				break;
			case "large":
				pxSize = 27.69;
				break;
			case "huge":
				pxSize = 32.5;
				break;
			default:
				pxSize = 13;
				break;
		}
		tags.font = {
			...(tags.font ?? {}),
			size: pxSize,
		};
	}
	return tags;
};

/**
 * Parse JS Object into a XML tag
 *
 * @param name The name of the tag
 * @param attributes The atttributes of the tag
 * @param content The content of the tag
 * @returns The XML tag
 */
const renderXMLTag = (
	name: string,
	attributes: Record<string, string | number>,
	content?: string | number
) => {
	// Keeping the start of the tag (eg: <font) to put it at the end of the string
	const xmlName = "<" + name;
	let xmlStart = xmlName;

	for (const [key, value] of Object.entries(attributes)) {
		xmlStart += ` ${key}='${value}'`;
	}

	if (content) {
		return `${xmlStart}>${content}${xmlName}/>`;
	}
	return `${xmlStart} />`;
};

/**
 * Parse Quill Delta into a createDiaryRecord.
 *
 * @param name The Diary name
 * @param delta
 * @returns The formatted SQF
 */
export const toSQF = (name: string, delta: Delta) => {
	let sqf = `player createDiaryRecord ["Diary", ["${name}", "`;

	if (delta?.ops) {
		for (let i = 0; i < delta.ops.length; i++) {
			const { insert, attributes } = delta.ops[i];
			let data = insert;
			if (typeof data === "string") {
				if (!attributes?.header) {
					data = data.replaceAll("\n", "\n<br/>");
				}

				if (attributes) {
					const tags = parseAttributes(attributes);

					for (const [key, attrs] of Object.entries(tags)) {
						data = renderXMLTag(key, attrs, data);
					}
				}
				sqf += insert;
			} else {
				console.error(
					"Type of insert: %s (value: %s)",
					typeof insert,
					JSON.stringify(insert)
				);
			}
		}
		// Removing last \n
		sqf = sqf.replace(/\n<br\/>$/, "");
	}
	return sqf + '"]];';
};
