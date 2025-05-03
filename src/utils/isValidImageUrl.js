export const isValidImageUrl = (url) =>
	url?.startsWith("http") &&
	!url.includes("localhost:3000") &&
	/\.(jpeg|jpg|gif|png|webp|svg)$/i.test(url);
